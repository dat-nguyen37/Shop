const Product=require('../model/Product')
const User=require('../model/User')

exports.create=async(req,res)=>{
    try {
        let errors={}
        const products=req.body
        if(!products.name){
            errors.name="Tên sản phẩm không được để trống"
            return res.status(400).send({errors})
        }
        if(!products.price){
            errors.price="Nhập giá cho sản phẩm"
            return res.status(400).send({errors})
        }
        if(!products.image){
            errors.image="Ảnh cho sản phẩm"
            return res.status(400).send({errors})
        }
        const product=new Product(products)
        await product.save()
        res.status(200).send('Tạo thành công')
    } catch (err) {
        res.status(500).send(err)
    }
}

exports.getByShop=async(req,res)=>{
    try {
        const products=await Product.find({shopId:req.params.id})
        res.status(200).send(products)
    } catch (err) {
        res.status(200).send(err)
    }
}
exports.update=async(req,res)=>{
    try {
        let errors={}
        const products=req.body
        // if(!products.name){
        //     errors.name="Tên sản phẩm không được để trống"
        //     return res.status(400).send({errors})
        // }
        // if(!products.price){
        //     errors.price="Nhập giá cho sản phẩm"
        //     return res.status(400).send({errors})
        // }
        // if(!products.image){
        //     errors.image="Ảnh cho sản phẩm"
        //     return res.status(400).send({errors})
        // }
        await Product.findByIdAndUpdate(req.params.id,{$set:products},{new:true})
        res.status(200).send('Cập nhật thành công')
    } catch (err) {
        res.status(500).send(err)
    }
}

exports.delete=async(req,res)=>{
    try {
        await Product.findByIdAndDelete(req.params.id)
        res.status(200).send('Xóa thành công')
    } catch (err) {
        res.status(500).send(err)
    }
}
exports.getAll=async(req,res)=>{
    try {
        const product=await Product.find()
        res.status(200).send(product)
    } catch (err) {
        res.status(500).send(err)
    }
}

exports.getOne=async(req,res)=>{
    try {
        const product=await Product.findById(req.params.id)
        if(product){
            const users = await User.find({ "shop.0": { $exists: true } }, 'shop').lean()
            const shops =  users.flatMap(user => user.shop)
            const shop = shops.find(shop => shop._id.toString() === product.shopId.toString());
            res.status(200).send({product,shop})
        }else{
            res.status(404).send('Không tìm thấy sản phẩm')
        }
    } catch (err) {
        res.status(500).send(err)
    }
}