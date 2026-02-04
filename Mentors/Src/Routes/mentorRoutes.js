const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload.middleware");
const {authMentor} = require("../Middleware/AuthMentor");
const {searchMentors,mentorLogout} = require("../Controller/mentor.controller");
const {addReview} = require("../Controller/mentor.controller");


const {
  registerMentor,
  mentorLogin,
  allListedMentor,
  getMentorProfile,
  mentorUpdateProfile,
  deleteMentorAccount,
  getSpecificMentor
} = require("../Controller/mentor.controller");
const { verifyOtp } = require("../Controller/Otpveriy");
const { body } = require("express-validator");

/**
 * @route   POST /mentorRegister/register
 * @desc    Register mentor + upload files + send OTP
 */
router.post(
  "/register",
  upload.fields([
    { name: "certificate", maxCount: 1 },
    { name: "profileThumbnail", maxCount: 1 },
  ]),
  registerMentor
);

/**
 * @route   POST /mentorRegister/verify-otp
 * @desc    Verify OTP and activate mentor account
 */
router.post("/verify-otp", verifyOtp);

/**
 * @route   POST /mentorRegister/mentorLogin
 * @desc    Mentor login after OTP verification
 */
router.post(
  "/mentorLogin",
  [
    body("email").isEmail().withMessage("Please enter a valid email"),
    body("password").notEmpty().withMessage("Password is required"),
  ],
  mentorLogin
);

// Get logged-in mentor profile
router.get('/mentorProfile',authMentor, getMentorProfile);

// Update logged-in mentor profile
router.put('/mentorUpdateProfile',authMentor, mentorUpdateProfile);

// Delete logged-in mentor profile
router.delete('/mentorDeleteProfile',authMentor, deleteMentorAccount);

// get all menotrs
router.get('/allMenotrsList',allListedMentor)

// get specific mentor by id
router.get("/specificmentor/:id", getSpecificMentor);

// search menotrs
router.get("/search", searchMentors)

// logout mentor
router.get("/mentorLogout", authMentor,mentorLogout); 

// reciving review from user services
router.post("/addReview/:mentorId",addReview)


module.exports = router;
