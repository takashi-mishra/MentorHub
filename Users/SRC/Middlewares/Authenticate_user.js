const { Model } = require('mongoose');
const userModel = require('../Models/userModel');
const jwt = require('jsonwebtoken');
const multer = require("multer");



module.exports.authenticateUser = async (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];

    if (!token) {
        return res.status(401).json({ message: 'No token provided, authorization denied' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log('Decoded JWT:', decoded);
        req.user = await userModel.findById(decoded.userId).select('-password');
        if (!req.user.isVerified) {
         return res.status(403).json({
         message: "Please verify your email first"
      });
    }
    
        console.log('Authenticated User:', req.user);
        next();
    } catch (error) {
       console.error('Token verification failed:', error);
       res.status(401).json({ message: 'Token is not valid' }); 
    }
}

