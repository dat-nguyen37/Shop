const User=require('../model/User')
const Product=require('../model/Product')
const Comment=require('../model/Comment')
const Category=require('../model/Category')

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
exports.getByUser=async(req,res)=>{
    try {
        const user = await User.findOne({_id:req.userId,"shop.0": { $exists: true } }, 'shop').lean()
        const shops = user.shop || []
        res.status(200).send(shops)
    } catch (err) {
        res.status(500).send(err)
    }
}

exports.getOne = async (req, res) => {
    try {
        const users = await User.find({ "shop.0": { $exists: true } }, 'shop').lean();
        const shops = users.flatMap(user => user.shop);
        const shop =shops.find(s => s._id.toString() === req.params.id);
        
        if (!shop) {
            return res.status(404).send({ message: "Shop not found" });
        }
        const category= await Category.findById(shop.categoryId)
        const products = await Product.find({ shopId: shop._id }).lean();
        
        let totalRating = 0;
        let ratingCount = 0;
        let totalComments = 0;

        for (let product of products) {
            const comments = await Comment.find({ productId: product._id }).lean();
            
            totalComments += comments.length; 
            totalRating += product.rating || 0; 
            if (product.rating !== undefined) ratingCount++; 
        }

        const averageRating = ratingCount > 0 ? parseFloat((totalRating / ratingCount).toFixed(2)) : 0;

        const data = {
            shop,
            category,
            productCount: products.length, 
            averageRating: averageRating,
            totalComments: totalComments 
        };

        res.status(200).send(data);
    } catch (err) {
        res.status(500).send({ message: "Server error", error: err });
    }
};


exports.update=async(req,res)=>{
    try {
        const {name,categoryId,address,avatar,background,ownerName,email,phone,subcategories,ship,isActivated}=req.body
        
        const user=await User.findOneAndUpdate({
            "shop._id": req.params.id
            }
            ,{$set:{
                "shop.$.name": name,
                "shop.$.categoryId": categoryId,
                "shop.$.address": address,
                "shop.$.ownerName": ownerName,
                "shop.$.email": email,
                "shop.$.phone": phone,
                "shop.$.avatar": avatar,
                "shop.$.background": background,
                "shop.$.subcategories": subcategories,
                "shop.$.ship": ship,
                "shop.$.isActivated": isActivated,
            }},{new:true})
            if(!isActivated){
                const userUpdate=await User.findByIdAndUpdate(
                    user._id,               
                    { $set: {role:"Seller"} }, 
                    { new: true }        
                  );
            }
            const updatedShop = user.shop.find((shop) => shop._id.toString() === req.params.id);
        res.status(200).send(updatedShop)
    } catch (err) {
        res.status(500).send(err)
    }
}

exports.deleteSubcategories=async(req,res)=>{
    try {        
        const user=await User.findOneAndUpdate(
            {"shop._id": req.params.shopId},
            {$pull:{"shop.$.subcategories":{_id:req.params.subcategoryId}}},{new:true})
            const updatedShop = user.shop.find((shop) => shop._id.toString() === req.params.shopId);
        res.status(200).send(updatedShop)
    } catch (err) {
        res.status(500).send(err)
    }
}