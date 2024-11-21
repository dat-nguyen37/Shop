
const mongoose=require('mongoose')

const userSchema=mongoose.Schema({
    name:{
        type:String
    },
    email:{
        type:String,
        required: true,
        unique: true
    },
    password:{
        type:String,
    },
    phone:{
        type:String
    },
    imageUrl:{
        type:String
    },
    address:{
        type:String
    },
    role:{
        type:String,
        default:'User'
    }
},
{
    timestamps:true
})
module.exports = mongoose.model('user', userSchema);