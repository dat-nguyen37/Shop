const mongoose = require('mongoose');

const LogSchema = new mongoose.Schema({
    apiUrl: { type: String, required: true },
    statusCode:{type:Number},
    timestamp: { type: Date, default: Date.now },
});
module.exports= mongoose.model('Log', LogSchema);
