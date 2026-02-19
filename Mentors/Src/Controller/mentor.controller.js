const Mentor = require("../Models/mentor.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { uploadFile } = require("../Services/imagekit.service");
const CallSession = require("../Models/CallSession");
const { generateZegoToken } = require("../Services/zegoToken");
const { v4: uuidv4 } = require("uuid");
const {
  generateOTP,
  saveOTP,
} = require("../Services/mentorOtp.services");
const { sendOTPEmail } = require("../Services/mentorEmail");

/**
 * Register Mentor
 */
exports.registerMentor = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      number,
      address,
      yearOfExperience,
      domain,
      skills,
      aboutYourself,
    } = req.body;

    const existingMentor = await Mentor.findOne({ email });
    if (existingMentor) {
      return res.status(400).json({ message: "Mentor already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    let profileThumbnail = null;
    let certificate = null;

    if (req.files?.profileThumbnail) {
      const result = await uploadFile(
        req.files.profileThumbnail[0],
        "/mentor/profile"
      );
      profileThumbnail = { url: result.url, fileId: result.fileId };
    }

    if (req.files?.certificate) {
      const result = await uploadFile(
        req.files.certificate[0],
        "/mentor/certificates"
      );
      certificate = { url: result.url, fileId: result.fileId };
    }

    const mentor = await Mentor.create({
      name,
      email,
      password: hashedPassword,
      number,
      address,
      yearOfExperience,
      domain,
      skills: skills ? skills.split(",") : [],
      aboutYourself,
      profileThumbnail,
      certificate,
    });

    // OTP flow
    const otp = generateOTP();
    await saveOTP(email, otp);
    await sendOTPEmail(email, otp);

    res.status(201).json({
      message: "Mentor registered. OTP sent to email",
    });
  } catch (error) {
    res.status(500).json({
      message: "Mentor registration failed",
      error: error.message,
    });
  }
};

// Mentor Login

exports.mentorLogin = async (req, res) => {
  const { email, password } = req.body;

  const mentor = await Mentor.findOne({ email });
  if (!mentor) {
    return res.status(404).json({ message: "Mentor not found" });
  }

  if (!mentor.isVerified) {
    return res.status(403).json({
      message: "Please verify your email first",
    });
  }

  const isMatch = await bcrypt.compare(password, mentor.password);
  if (!isMatch) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = jwt.sign(
    { mentorId: mentor._id },
    process.env.JWT_SECRET,
    { expiresIn: "24h" }
  );
   res.cookie('token', token, { httpOnly: true });

  res.json({ message: "Login successful", token,mentorId: mentor._id });
};

// Get logged-in mentor profile

exports.getMentorProfile = async (req, res) => {
  try {
    // req.user is already the full mentor object from the middleware
    const mentor = req.user;

    if (!mentor) {
      return res.status(404).json({ message: "Mentor not found" });
    }

    // Return mentor profile without password
    res.json({ 
      mentor: {
        _id: mentor._id,
        name: mentor.name,
        email: mentor.email,
        number: mentor.number,
        address: mentor.address,
        yearOfExperience: mentor.yearOfExperience,
        domain: mentor.domain,
        skills: mentor.skills,
        aboutYourself: mentor.aboutYourself,
        profileThumbnail: mentor.profileThumbnail?.url || mentor.profileThumbnail,
        certificate: mentor.certificate?.url || mentor.certificate,
        isVerified: mentor.isVerified,
        createdAt: mentor.createdAt
      } 
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/** Logout Mentor
 */
exports.mentorLogout = async (req, res) => {
  res.clearCookie('token');
  res.json({ message: "Logout successful" });
};  

// Update Mentor Profile
exports.mentorUpdateProfile = async (req, res) => {
  try {
    const mentorId = req.user._id;

    const mentor = await Mentor.findById(mentorId);
    if (!mentor) {
      return res.status(404).json({ message: "Mentor not found" });
    }

    // ✅ Allowed fields only
    const allowedFields = [
      "name",
      "address",
      "domain",
      "yearOfExperience",
      "skills",
      "aboutYourself",
    ];

    const updateData = {};

    // ✅ Pick only allowed fields from req.body
    allowedFields.forEach((field) => {
      if (req.body[field] !== undefined) {
        updateData[field] = req.body[field];
      }
    });

    // ✅ Handle profile image upload
    if (req.files?.profileThumbnail) {
      const result = await uploadFile(
        req.files.profileThumbnail[0],
        "/mentor/profile"
      );
      updateData.profileThumbnail = {
        url: result.url,
        fileId: result.fileId,
      };
    }

    // ✅ Handle certificate upload
    if (req.files?.certificate) {
      const result = await uploadFile(
        req.files.certificate[0],
        "/mentor/certificates"
      );
      updateData.certificate = {
        url: result.url,
        fileId: result.fileId,
      };
    }

    const updatedMentor = await Mentor.findByIdAndUpdate(
      mentorId,
      { $set: updateData },
      { new: true, runValidators: true }
    );

    res.json({
      message: "Profile updated successfully",
      mentor: updatedMentor,
    });
  } catch (error) {
    res.status(500).json({
      message: "Profile update failed",
      error: error.message,
    });
  }
};

// delete mentor account
exports.deleteMentorAccount = async (req, res) => {
  try {
    const mentorId = req.user._id;
    await Mentor.findByIdAndDelete(mentorId);
    res.json({ message: "Mentor account deleted successfully" });
  }
  catch (error) {
    res.status(500).json({ message: "Account deletion failed", error: error.message });
  }
};

// get all listed mentor

exports.allListedMentor = async (req,res) => {
  try {
    const allMentor = await Mentor.find({ isVerified: true })
    .select("name domain skills yearOfExperience aboutYourself profileThumbnail address")
    .sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      totalMentors: allMentor.length,
      mentors: allMentor,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch mentors",
      error: error.message,
    });
  }
}

// get specific mentor details
exports.getSpecificMentor = async (req, res) => {
  try {
    const mentorId = req.params.id;

    // 🛑 Invalid MongoDB ObjectId check
    if (!mentorId.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ message: "Invalid mentor id" });
    }

    const mentor = await Mentor.findOne({
      _id: mentorId,
      isVerified: true,
    }).select(
      "name domain skills yearOfExperience aboutYourself profileThumbnail address certificate review "
    );

    if (!mentor) {
      return res.status(404).json({ message: "Mentor not found" });
    }

    res.status(200).json({
      success: true,
      mentor,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch mentor",
      error: error.message,
    });
  }
};

// serach base menotr list 

exports.searchMentors = async (req, res) => {
  try {
    const { q } = req.query;

    if (!q) {
      return res.status(400).json({ message: "Search query is required" });
    }

    // 🔹 Step 1: keywords
    const keywords = q.toLowerCase().split(" ");

    // 🔹 Step 2: get mentors
    const mentors = await Mentor.find({ isVerified: true }).select(
      "name domain skills aboutYourself yearOfExperience profileThumbnail address"
    );

    // 🔹 Step 3: scoring logic
    const scoredMentors = mentors.map((mentor) => {
      let score = 0;

      const searchableText = `
        ${mentor.name}
        ${mentor.domain}
        ${mentor.skills.join(" ")}
        ${mentor.aboutYourself || ""}
      `.toLowerCase();

      keywords.forEach((word) => {
        if (searchableText.includes(word)) {
          score++;
        }
      });

      return {
        mentor,
        score,
      };
    });

    // 🔹 Step 4: filter & sort
    const result = scoredMentors
      .filter((item) => item.score > 0)
      .sort((a, b) => b.score - a.score)
      .map((item) => item.mentor);

    res.status(200).json({
      success: true,
      totalResults: result.length,
      mentors: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Search failed",
      error: error.message,
    });
  }
};

// review of mentors 
module.exports.addReview = async (req, res) => {
    const { mentorId } = req.params;
    const { userId, userName, rating, comment } = req.body; // userName comes from User Service

    try {
        const mentor = await Mentor.findById(mentorId);
        if (!mentor) return res.status(404).json({ message: "Mentor not found" });

        const newReview = {
            userId: userId,
            Username: userName, // <--- Matching your Schema (Capital U)
            mentorId: mentorId,
            mentorname: mentor.name,
            rating: rating,
            comment: comment
        };

        // Agar schema mein review: [] array hai:
        mentor.review.push(newReview); 
        await mentor.save();

        res.status(200).json({ message: "Review added!", review: newReview });
    } catch (error) {
        res.status(500).json({ message: "Failed", error: error.message });
    }
};




module.exports.ReciveCallData = async (req, res) => {
  try {
    const { mentorId } = req.params;
    // Note: userId aur userName aapke auth middleware se aana chahiye (req.user)
    // Agar body se bhej rahe ho toh ye sahi hai:
    const { userId, userName, callType } = req.body;

    if (!userId || !userName || !callType) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields",
      });
    }

    const mentor = await Mentor.findById(mentorId).select("fullName");
    if (!mentor) {
      return res.status(404).json({
        success: false,
        message: "Mentor not found",
      });
    }

    const roomId = `room_${uuidv4()}`;

    const callSession = await CallSession.create({
      userId,
      userName,
      mentorId,
      callType,
      roomId,
      status: "pending",
    });

    // Response structure ko frontend ke mutabik set kiya hai
   // backend controller rewrite
// backend controller
return res.status(200).json({
  success: true,
  message: "Call data sent!",
  data: {  // <-- Sirf ek baar data likhein
    callId: callSession._id,
    roomId,
    callType,
    userId,
    userName,
    mentorId,
    mentorName: mentor.fullName,
  },
});

  } catch (error) {
    console.error("Receive Call Error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};