const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    FullName : {
        type: String,
        required: true
    },

    email : {
        type: String,
        required: true,
        unique: true
    },

     password : {
        type: String,
        required: true
    },

    number : {
        type : Number,
        required: true,
        unique: true
    },
   address : {
        type : String,  
        required: true
   },
   profileImage: {
        type : String,
        default : ''
   },
    profileImageId : {
        type : String,
        default : ''
    },
    role : {
        type : String,
        enum : ['user','admin'],
        default : 'user'
    },
    
    isVerified : {
        type : Boolean,
        default : false
    }
})

const userModel = mongoose.model('users',userSchema);
module.exports = userModel;