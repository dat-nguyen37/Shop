const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
    userId:{
        type: String,
        required: true,
    },
    productId:{
        type: String,
        required: true,
    },
    commentText:{
        type: String,
    },
    rating:{
        type: Number,
    },
},
{
    timestamps:true
});

module.exports = mongoose.model('Comment', CommentSchema);
