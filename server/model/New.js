const mongoose = require('mongoose');

// Định nghĩa Schema cho bài viết
const newsSchema = new mongoose.Schema({
    author: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    image: {
        type: String, 
        required: false,
    },
    detail: {
        type: String,
        required: false,
    },
},{
    timestamps: true,
});

// Tạo model từ schema
const News = mongoose.model('new', newsSchema);

module.exports = News;
