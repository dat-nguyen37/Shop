const mongoose = require('mongoose');

const OtpSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  otp: {
    type: Number,
    required: true,
  },
  expiresAt: {
    type: Date,
    required: true,
  },
});
OtpSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });
module.exports= mongoose.model('Otp', OtpSchema);
