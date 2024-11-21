const User=require('../model/User')
const bcrypt=require('bcrypt')


exports.update=async(req,res)=>{
    try {
        const updateUser=req.body
        const user=await User.findOne({_id:req.params.id})
        if(!user){
            return res.status(404).send({message:"Không tìm thấy người dùng"})
        }
        if(updateUser.password){
            const hashPassword=await bcrypt.hash(updateUser.password,10)
            updateUser.password=hashPassword
        }
        const userUpdate=await User.findByIdAndUpdate(
            req.params.id,               
            { $set: updateUser }, 
            { new: true }        
          );
          res.status(200).send(userUpdate)
    } catch (err) {
        res.status(500).send(err)
    }
}