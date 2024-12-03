const { default: mongoose } = require("mongoose");

const cartSchema=new mongoose.Schema({
    userId:{
        type:String,
        required:true
    },
    shopId:{
        type:String,
    },
    productId:{
        type:String,
        required:true
    },
    color:{
        type:String,
    },
    size:{
        type:String,
    },
    price:{
        type:Number,
    },
    quantity:{
        type:Number,
        default:1
    },
    totalAmount:{
        type:Number
    }
},
{timestamps:true}
)

module.exports=mongoose.model('cart',cartSchema)