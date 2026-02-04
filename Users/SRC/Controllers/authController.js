const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userModel = require("../Models/userModel");
const imagekitService = require("../Services/Profilepic_upload");
const { generateOTP, saveOTP } = require('../Services/otpService');
const { sendOTPEmail } = require('../Services/emailService');
const axios = require('axios');


module.exports.register = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { FullName, email, password, number, address, } = req.body;
    
    try {
        const userExists = await userModel.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: "User already exists" });
        }

        let profileImage = null;
        let profileImageId = null;

        // 👇 Image Upload
        if (req.file) {
            const uploadResult = await imagekitService.uploadProfilePic(req.file);
            profileImage = uploadResult.url;
            profileImageId = uploadResult.fileId;
        }

           const otp = generateOTP();
           await saveOTP(email, otp);
           await sendOTPEmail(email, otp);

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = await userModel.create({
            FullName,
            email,
            password: hashedPassword,
            number,
            address,
            profileImage,
            profileImageId,
            isVerified: false,
        });

      

        // Generate a short-lived token containing the user's email for OTP verification
        const token = jwt.sign(
            { email },
            process.env.JWT_SECRET,
            { expiresIn: '15m' }
        );

        res.status(201).json({
            message: "User registered successfully",
            user: {
                id: newUser._id,
                FullName: newUser.FullName,
                email: newUser.email,
                number: newUser.number,
                address: newUser.address,
                profileImage: newUser.profileImage
            },
            token
        });

    } catch (error) {
        console.error("Register Error:", error);
        res.status(500).json({ message: "Server Error" });
    }
};

module.exports.login = async(req,res)=>{
    const errors = validationResult(req);   
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }
    const {email, password} = req.body;
    try {
        // Check if user exists
        const user = await userModel.findOne({email});
        if(!user){
            return res.status(400).json({message: "Invalid credentials"});
        }       
        // Compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(400).json({message: "Invalid credentials"});
        }
        // Generate JWT token
        const token = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );
        res.cookie('token', token, { httpOnly: true });
        res.status(200).json({message: "Login successful",
            user : {
                id: user._id,
                FullName: user.FullName,
                email: user.email,
                number: user.number,
                address: user.address
            },
            token  });
    } catch (error) {
        console.log("Error in user login:", error);
        res.status(500).json({message: "Server Error" });
    }
} 

module.exports.logout = async(req,res)=>{
    try {
        res.clearCookie('token');
        res.status(200).json({message: "Logout successful"});
    } catch (error) {
        console.log("Error in user logout:", error);
        res.status(500).json({message: "Server Error" });
    }
}

module.exports.updateUserProfile = async (req, res) => {
    try {
        const userId = req.user._id; // 🔐 logged-in user

        const {
            FullName,
            number,
            address,
            profileImage
        } = req.body;

        // Update only allowed fields
        const updatedUser = await userModel.findByIdAndUpdate(
            userId,
            {
                FullName,
                number,
                address,
                profileImage
            },
            { new: true, runValidators: true }
        ).select("-password");

        res.status(200).json({
            message: "Profile updated successfully",
            user: updatedUser
        });

    } catch (error) {
        console.error("Update profile error:", error);
        res.status(500).json({
            message: "Server error while updating profile"
        });
    }
};

module.exports.deleteUserAccount = async (req, res) => {
    try {
        const userId = req.user._id;

        await userModel.findByIdAndDelete(userId);

        res.status(200).json({
            message: "User account deleted successfully"
        });

    } catch (error) {
        console.error("Delete account error:", error);
        res.status(500).json({
            message: "Server error while deleting account"
        });
    }
};

module.exports.getUserProfile = async (req, res) => {
    try {
        const user = req.user; // Retrieved from authentication middleware
        res.status(200).json({
            user: {
                id: user._id,
                FullName: user.FullName,
                email: user.email,
                number: user.number,
                address: user.address,
                profileImage: user.profileImage || null,
                isVerified: user.isVerified || false
            }
        });
    } catch (error) {
        console.log("Error in fetching user profile:", error);
        res.status(500).json({ message: "Server Error" });
    }   
}

//get all users
module.exports.getAllUsers = async (req, res) => {
    try {
        const users = await userModel.find().select("-password").sort({ createdAt: -1 });
        res.status(200).json({ users });
    } catch (error) {
        console.log("Error in fetching all users:", error);
        res.status(500).json({ message: "Server Error" });
    }
};

// send data to mentor service for review
module.exports.sendReviewData = async (req, res) => {
    try {
        const userId = req.user._id;
        const { mentorId } = req.params; // Params se lo
        const { rating, comment } = req.body;

        const user = await userModel.findById(userId).select("FullName");
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const reviewData = {
            userId: userId,
            userName: user.FullName, // Small 'n' (Mentor controller yahi expect kar raha hai)
            rating: rating,
            comment: comment
        };

        // 🛑 Error yahan ho sakta hai agar MENTOR_SERVICE_URL undefined ho
        const serviceUrl = `${process.env.MENTOR_SERVICE_URL}/mentorRegister/addReview/${mentorId}`;
        console.log("Calling Mentor Service at:", serviceUrl);

        const response = await axios.post(serviceUrl, reviewData);

        return res.status(200).json({
            success: true,
            message: "Review added!",
            data: response.data
        });

    } catch (error) {
        // "Cannot convert object to primitive value" ko rokne ke liye:
        console.error("Detailed Error:", error.response?.data || error.message);
        
        return res.status(500).json({ 
            message: "Server Error", 
            error: error.response?.data?.message || error.message 
        });
    }
};