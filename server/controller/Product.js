const Product=require('../model/Product')


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
        await Product.findByIdAndUpdate(req.params.id,{$set:products})
        res.status(200).send('Cập nhật thành công')
    } catch (err) {
        res.status(500).send(err)
    }
}