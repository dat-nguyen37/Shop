const User=require('../model/User')
const bcrypt=require('bcrypt')


exports.getAll=async(req,res)=>{
    try {
        const users=await User.find()
        res.status(200).send(users)
    } catch (err) {
        res.status(500).send(err)
    }
}
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

exports.addAddress=async(req,res)=>{
    try {
        let errors={}
        const {name,phone,address,addressDetail,status}=req.body
        if(!name){
            errors.name='Vui lòng nhập tên người nhận'
            return res.status(400).send({errors})
        }
        if(!phone){
            errors.phone='Số điện thoại không được để trống'
            return res.status(400).send({errors})
        }
        const regexPhone=/(84|0[3|5|7|8|9])+([0-9]{8})\b/g

        if(!regexPhone.test(phone)){
            errors.phone='Số điện thoại không đúng định dạng'
            return res.status(400).send({errors})
        }
        if(!address){
            errors.address='Chọn địa chỉ'
            return res.status(400).send({errors})
        }
        if(!addressDetail){
            errors.addressDetail='Nhập địa chỉ cụ thể'
            return res.status(400).send({errors})
        }
        const newAddress={name,phone,address,addressDetail,status}
        await User.findByIdAndUpdate(req.userId,{$push:{address:newAddress}},{new:true})
        res.status(200).send('Tạo thành công')
    } catch (err) {
        res.status(500).send(err)
    }
}
exports.getAddress=async(req,res)=>{
    try {
        const user=await User.findById(req.userId)
        if(!user){
            return res.status(404).send("Không tìm thấy người dùng")
        }
        const addresses=user.address.map((address)=>address)
        res.status(200).send(addresses)
    } catch (err) {
        res.status(500).send(err)
    }
}
exports.getAddressOne=async(req,res)=>{
    try {
        const user=await User.findById(req.userId)
        if(!user){
            return res.status(404).send("Không tìm thấy người dùng")
        }
        const address = user.address.find(addr => addr._id.toString() === req.params.id);
        res.status(200).send(address)
    } catch (err) {
        res.status(500).send(err)
    }
}
exports.deleteAddress=async(req,res)=>{
    try {
        const user=await User.findById(req.userId)
        if(!user){
            return res.status(404).send("Không tìm thấy người dùng")
        }
        await User.findByIdAndUpdate(req.userId,{$pull:{ address: { _id: req.params.id } }},{new:true})
        res.status(200).send("Xóa thành công")
    } catch (err) {
        res.status(500).send(err)
    }
}
exports.updateAddress=async(req,res)=>{
    try {
        let errors={}
        const user=await User.findById(req.userId)
        if(!user){
            return res.status(404).send("Không tìm thấy người dùng")
        }
        const {name,phone,address,addressDetail,status}=req.body
        if(!name){
            errors.name='Vui lòng nhập tên người nhận'
            return res.status(400).send({errors})
        }
        if(!phone){
            errors.phone='Số điện thoại không được để trống'
            return res.status(400).send({errors})
        }
        const regexPhone=/(84|0[3|5|7|8|9])+([0-9]{8})\b/g

        if(!regexPhone.test(phone)){
            errors.phone='Số điện thoại không đúng định dạng'
            return res.status(400).send({errors})
        }
        if(!address){
            errors.address='Chọn địa chỉ'
            return res.status(400).send({errors})
        }
        if(!addressDetail){
            errors.addressDetail='Nhập địa chỉ cụ thể'
            return res.status(400).send({errors})
        }
        if (status === true) {
            await User.updateOne(
                { _id: req.userId },
                { $set: { "address.$[].status": false } }
            );
        }
        await User.findOneAndUpdate({
            _id:req.userId,"address._id": req.params.id
            }
            ,{$set:{
                "address.$.name": name,
                "address.$.phone": phone,
                "address.$.address": address,
                "address.$.addressDetail": addressDetail,
                "address.$.status": status
            }},{new:true})
        res.status(200).send("Cập nhật thành công")
    } catch (err) {
        res.status(500).send(err)
    }
}
