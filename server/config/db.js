const mongoose=require('mongoose')

const connect=async()=>{
    try {
        await mongoose.connect('mongodb+srv://nguyentuandatntd2k2:Datnguyen37@shop.l7tkp.mongodb.net/Shop_multi')
        console.log("Connected DB success")
    } catch (error) {
        console.log(error)
    }
}
module.exports=connect