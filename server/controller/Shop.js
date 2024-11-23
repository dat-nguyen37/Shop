const User=require('../model/User')


exports.create=async(req,res)=>{
    try {
        let errors={}
        const {name,categoryId,address,ownerName,email,phone,ship}=req.body
        if(!name){
            errors.name='Vui lòng nhập tên cửa hàng'
            return res.status(400).send({errors})
        }
        if(!categoryId){
            errors.categoryId='Vui lòng chọn danh mục bán hàng'
            return res.status(400).send({errors})
        }
        if(!address){
            errors.address='Nhập địa chỉ lấy hàng'
            return res.status(400).send({errors})
        }
        if(!ownerName){
            errors.ownerName='Nhập tên chủ sở hữu'
            return res.status(400).send({errors})
        }
        if(!email){
            errors.email='Email không được để trống'
            return res.status(400).send({errors});
        }
        const emailRegex =/^[^\s@]{5,}@[^\s@]+\.[^\s@]{2,}$/
        if(!emailRegex.test(email.toLowerCase())){
            errors.email='Email không đúng định dạng'
            return res.status(400).send({errors});
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
        if(ship.length === 0){
            errors.ship='Chọn ít nhất 1 đơn vị vận chuyển'
            return res.status(400).send({errors})
        }
        const newShop={name,categoryId,address,ownerName,email,phone,ship}
        await User.findByIdAndUpdate(req.userId,{$push:{shop:newShop}},{new:true})
        res.status(200).send('Tạo thành công')
    } catch (err) {
        res.status(500).send(err)
    }
}
exports.getAll=async(req,res)=>{
    try {
        const users = await User.find({ "shop.0": { $exists: true } }, 'shop').lean()
        const shops = users.flatMap(user => user.shop)
        res.status(200).send(shops)
    } catch (err) {
        res.status(500).send(err)
    }
}

exports.update=async(req,res)=>{
    try {
        const {name,categoryId,address,ownerName,email,phone,ship,isActivated}=req.body
        await User.findOneAndUpdate({
            "shop._id": req.params.id
            }
            ,{$set:{
                "shop.$.name": name,
                "shop.$.categoryId": categoryId,
                "shop.$.address": address,
                "shop.$.ownerName": ownerName,
                "shop.$.email": email,
                "shop.$.phone": phone,
                "shop.$.ship": ship,
                "shop.$.isActivated": isActivated,
                "shop.$.createdAt": new Date(),
            }},{new:true})
        res.status(200).send("Cập nhật thành công")
    } catch (err) {
        res.status(500).send(err)
    }
}