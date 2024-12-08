const mongoose = require("mongoose");

const NotificationSchema = new mongoose.Schema(
  {
    conversationId:{
        type: String
      },
    sender: {
        type: String,
        required: true,
    },
    text: {
      type: String,
      required: true,
    },
    isRead: {
      type: Boolean,
      default: false,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("notification", NotificationSchema);
