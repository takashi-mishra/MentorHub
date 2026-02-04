const jwt = require("jsonwebtoken");
const userModel = require("../Models/mentor.model");
const OTP = require("../Models/mentorOtp");
const { verifyOTP } = require('../Services/mentorOtp.services');
const { body, validationResult } = require('express-validator');

module.exports.authMentor = async (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
    if (!token) {
        return res.status(401).json({ message: 'No token provided, authorization denied' });
    }   

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log('Decoded JWT:', decoded);
        // Use mentorId from the token instead of userId
        req.user = await userModel.findById(decoded.mentorId).select('-password');
        
        // Check if user exists
        if (!req.user) {
            return res.status(404).json({
                message: "Mentor not found"
            });
        }
        
        if (!req.user.isVerified) {
         return res.status(403).json({
            message: "Please verify your email first"
        }); 
    }
    
        console.log('Authenticated User:', req.user);
        next();
    }
    catch (error) {
         console.error('Token verification failed:', error);
            res.status(401).json({ message: 'Token is not valid' });
    }
}