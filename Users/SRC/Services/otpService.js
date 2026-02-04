const Otp = require('../Models/OTPModel');

exports.generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

exports.saveOTP = async (email, otp) => {
  await Otp.deleteMany({ email }); // old otp delete
  return await Otp.create({
    email,
    otp,
    expiresAt: new Date(Date.now() + 5 * 60 * 1000) // 5 min
  });
};

exports.verifyOTP = async (email, otp) => {
  const record = await Otp.findOne({ email, otp });
  if (!record) return false;
  if (record.expiresAt < new Date()) return false;
  return true;
};
