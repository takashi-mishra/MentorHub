const Otp = require("../Models/mentorOtp");

/**
 * Generate 6 digit OTP
 */
exports.generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

/**
 * Save OTP (old OTP auto removed)
 */
exports.saveOTP = async (email, otp) => {
  await Otp.deleteMany({ email });
  return await Otp.create({ email, otp });
};

/**
 * Verify OTP (TTL handled by MongoDB)
 */
exports.verifyOTP = async (email, otp) => {
  const record = await Otp.findOne({ email, otp });
  return !!record;
};
