const jwt = require("jsonwebtoken");
const userModel = require("../Models/userModel");
const OTP = require("../Models/OTPModel");
const { verifyOTP } = require('../Services/otpService');

module.exports.verifyOtp = async (req, res) => {
  try {
    const { otp, token } = req.body;

    if (!token) {
      return res.status(401).json({ message: "Token missing" });
    }

    // 🔐 Decode token → get email
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const email = decoded.email;

    // ✅ Verify OTP
    const isValid = await verifyOTP(email, otp);
    if (!isValid) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    // ✅ Update user
    const user = await userModel.findOneAndUpdate(
      { email },
      { isVerified: true },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // 🧹 Delete OTP
    await OTP.deleteOne({ email });

    // 🎯 Login token
    const authToken = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    res.cookie("token", authToken, {
      httpOnly: true,
      secure: false, // production me true
      sameSite: "lax"
    });

    res.json({
      message: "OTP verified successfully",
      token: authToken
    });

  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};
