const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    shopId:{
        type: String,
        required: true,
    },
    categoryId:{
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true
    },
    subImages: {
        type: [String], 
        default: []
    },
    price: {
        type: Number,
        required: true,
        min: 0 
    },
    color:[String],
    size:[{
        name: String,
        price:Number
    }],
    description: {
        type: String,
        default: '' 
    },
    quantity: {
        type: Number,
        required: true,
        min: 0
    },
    quantitySold: {
        type: Number,
        default: 0,
        min: 0
    },
    rating: {
        type: Number,
        default: 5, 
        min: 0,
        max: 5
    },
    like: [String],
    view: {
        type: Number,
        default:0
    },
    status: {
        type: String,
        enum: ['có sẵn', 'hết hàng','cấm bán'], 
        default: 'có sẵn'
    },
},
{
    timestamps:true
});

module.exports = mongoose.model('Product', ProductSchema);
