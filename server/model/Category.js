const mongoose=require('mongoose')

const CategorySchema=new mongoose.Schema({
    name:{
        type:String
    },
    image:{
        type:String
    },
    subcategories: [
        {
            name: {
                type: String,
                required: true
            },
            createdAt: {
                type: Date,
                default: Date.now
            }
        }
    ]
})

module.exports=mongoose.model('category',CategorySchema)