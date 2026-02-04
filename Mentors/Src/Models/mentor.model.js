const mongoose = require("mongoose");

const mentorSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },

    password: { type: String, required: true, minlength: 6 },

    number: { type: String, required: true },

    address: { type: String },

    yearOfExperience: { type: Number, required: true },

    domain: { type: String, required: true },

    skills: [{ type: String }],

    aboutYourself: { type: String },

    role: {
      type: String,
      enum: ["mentor", "admin"],
      default: "mentor",
    },

    // ImageKit stored data
    profileThumbnail: {
      url: String,
      fileId: String,
    },

    certificate: {
      url: String,
      fileId: String,
    },

  // Mentor Model file mein change karo
review: [{  // <--- Array banao isse
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    Username: { type: String },
    mentorId: { type: mongoose.Schema.Types.ObjectId, ref: "Mentor" },
    mentorname: { type: String },
    rating: { type: Number },
    comment: { type: String },
    createdAt: { type: Date, default: Date.now } // Optional: Date bhi add kar lo
}],

    isVerified: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Mentor", mentorSchema);
