const mongoose = require("mongoose");

const callSessionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    userName: {
      type: String,
      required: true,
    },

    mentorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Mentor",
      required: true,
    },

    callType: {
      type: String,
      enum: ["chat", "video", "voice"],
      required: true,
    },

    roomId: {
      type: String,
      required: true,
      unique: true,
    },

    callStatus: {
      type: String,
      enum: ["initiated", "accepted", "rejected", "ended"],
      default: "initiated",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("CallSession", callSessionSchema);