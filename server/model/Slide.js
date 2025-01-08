const mongoose=require('mongoose')

const SlideSchema=new mongoose.Schema({
    imageUrl:{
        type:String
    },
    order:{
        type:Number
    },
    isActive:{
        type:Boolean,
        default:false
    }
},
{
    timestamps:true
})

module.exports=mongoose.model('slide',SlideSchema)