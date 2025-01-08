const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
    userId: {
        type: String,
    },
    shopId: {
        type: String,
    },
    productId: {
        type: String,

    },
    reason: {
        type: String,
    },
    description: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ['Đang xử lý', 'Đã giải quyết', 'Đã từ chối'],
        default: 'Đang xử lý',
    },
},
{timestamps: true}
);

// Tạo model từ schema
const Report = mongoose.model('Report', reportSchema);

module.exports = Report;
