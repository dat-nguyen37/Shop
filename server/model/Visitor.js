const mongoose = require('mongoose');

const VisitSchema = new mongoose.Schema({
    page: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
});
module.exports= mongoose.model('Visitor', VisitSchema);
