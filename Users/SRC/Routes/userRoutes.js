const express = require('express');
const router = express.Router();
const {body} = require('express-validator');
const authController = require('../Controllers/authController');
const OTPVerify = require('../Controllers/OTPVerify');
const auth_middleware = require('../Middlewares/Authenticate_user');
const upload = require("../Middlewares/Multer");

//user Registration Route
router.post(
    "/user-Register",
    upload.single("profileImage"),
    [
        body("FullName").notEmpty().withMessage("Full Name is required"),
        body("email").isEmail().withMessage("Invalid email"),
        body("password").isLength({ min: 6 }).withMessage("Password too short"),
        body("number").isMobilePhone().withMessage("Invalid phone number"),
        body("address").notEmpty().withMessage("Address is required")
    ],
    authController.register
);

//otp verification route
router.post('/verify-OTP',OTPVerify.verifyOtp);

//user Login Route
router.post('/user-Login',[
  body('email').isEmail().withMessage('Please enter a valid email'),
  body('password').not().isEmpty().withMessage('Password is required')
],authController.login);

//user Logout Route
router.get('/user-Logout',authController.logout);

//get user profile route
router.get('/user-Profile',auth_middleware.authenticateUser,authController.getUserProfile);

// Update logged-in user
router.put("/update-profile", auth_middleware.authenticateUser, authController.updateUserProfile);

// Delete logged-in user
router.delete("/delete-account", auth_middleware.authenticateUser, authController.deleteUserAccount);

// get all users
router.get('/allUsers',authController.getAllUsers);

// send data of review to the mentor services
router.post('/sendReviewData/:mentorId', auth_middleware.authenticateUser, authController.sendReviewData);

// sending user data and mentor data for video call using zegocloud
router.post("/sendCallData/:mentorId", auth_middleware.authenticateUser, authController.sendCallData);



module.exports = router;