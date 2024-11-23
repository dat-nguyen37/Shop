const mongoose=require('mongoose')

const ShipSchema=new mongoose.Schema({
    name:{
        type:String
    },
    price:{
        type:Number
    }
})

module.exports=mongoose.model('ship',ShipSchema)