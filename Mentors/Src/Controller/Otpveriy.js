const jwt = require("jsonwebtoken");
const Mentor = require("../Models/mentor.model");
const OTP = require("../Models/mentorOtp");
const { verifyOTP } = require("../Services/mentorOtp.services");

/**
 * Verify OTP and activate mentor
 */
exports.verifyOtp = async (req, res) => {
  const { email, otp } = req.body;

  const isValid = await verifyOTP(email, otp);
  if (!isValid) {
    return res.status(400).json({ message: "Invalid or expired OTP" });
  }

  await Mentor.updateOne({ email }, { isVerified: true });
  await OTP.deleteMany({ email });

  const mentor = await Mentor.findOne({ email });

  const token = jwt.sign(
    { mentorId: mentor._id },
    process.env.JWT_SECRET,
    { expiresIn: "24h" }
  )
   res.cookie('token', token, { httpOnly: true });

  res.json({
    message: "OTP verified successfully",
    token,
   mentorId: mentor._id
  });
};
