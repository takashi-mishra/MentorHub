const mongoose = require("mongoose");

/**
 * OTP automatically expires after 5 minutes
 */
const otpSchema = new mongoose.Schema({
  email: { type: String, required: true },
  otp: { type: String, required: true },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 300, // 5 minutes
  },
});

module.exports = mongoose.model("mentorOtp", otpSchema);
