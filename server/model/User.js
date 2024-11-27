
const mongoose=require('mongoose')

const userSchema=new mongoose.Schema({
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
    address:[
            {
                name: String,
                phone: String,
                address: String,
                addressDetail: String,
                status:{
                    type:Boolean,
                    default:false
                }
            }
        ],
    shop:[
        {
            name:String,
            categoryId:String,
            address:String,
            ownerName: String,
            email:String,
            phone:String,
            ship:[String],
            follower:[String],
            isActivated:{
                type:Boolean,
                default:false
            },
            createdAt: { type: Date}
        }
    ],
    role:{
        type:String,
        default:'User'
    },
    status:{
        type:Boolean,
        default:true
    }
},
{
    timestamps:true
})
module.exports = mongoose.model('user', userSchema);