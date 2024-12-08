const Product=require('../model/Product')
const User=require('../model/User')

exports.create=async(req,res)=>{
    try {
        let errors={}
        const products=req.body
        if(!products.categoryId){
            errors.categoryId="Chọn danh mục"
            return res.status(400).send({errors})
        }
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
        const products=await Product.find({shopId:req.params.id,IsActivate:true}).sort({createdAt:-1})
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
exports.getByActive=async(req,res)=>{
    try {
        const product=await Product.find({IsActivate:true})
        res.status(200).send(product)
    } catch (err) {
        res.status(500).send(err)
    }
}


exports.getOne=async(req,res)=>{
    try {
        const product=await Product.findById(req.params.id)
        res.status(200).send(product)
    } catch (err) {
        res.status(500).send(err)
    }
}

exports.getBestSellingByShop=async(req,res)=>{
    try {
        const products = await Product.find({ shopId: req.params.id,IsActivate:true})
        .sort({ productSold: -1 })
        .lean();        
        res.status(200).send(products)
    } catch (err) {
        res.status(500).send(err)
    }
}
exports.search = async (req, res) => {
    try {
        const { q, categoryId,subcategoryId, shipId,shopId, min, max, rating, sort } = req.query;

        let query = {IsActivate: true};

        let shopIds = [];
        if (categoryId&&categoryId!=='undefined') {
            const users = await User.find({ "shop.categoryId": categoryId }, "shop").lean();
            shopIds = users.flatMap(user =>
                user.shop.filter(shop => shop.categoryId === categoryId).map(shop => shop._id)
            );
            
            query.shopId = { $in: shopIds };
        }

           if (shipId&&shipId!=='undefined') {
            const users = await User.find({ "shop.ship": shipId }, "shop").lean();
            const shipShopIds = users.flatMap(user =>
                user.shop.filter(shop => shop.ship.includes(shipId)).map(shop => shop._id)
            );
            query.shopId = { $in: shipShopIds };

            // Kết hợp shopId từ shipId và categoryId (nếu có cả hai)
            if (categoryId&&categoryId!=='undefined'&&shipId&&shipId!=='undefined') {
                const shopIdStrings = shopIds.map(id => id.toString());
                const shipShopIdStrings = shipShopIds.map(id => id.toString());

                // Lấy giao giữa hai danh sách
                const commonShopIds = shopIdStrings.filter(id => shipShopIdStrings.includes(id));
                if(commonShopIds.length>0){
                    query.shopId = { $in: commonShopIds };
                }else{
                    query.shopId = { $in: [] };
                }
            }
        }

        // Các điều kiện lọc sản phẩm
        if (shopId) {
            query.shopId = shopId
        }
        if (subcategoryId) {
            query.categoryId = subcategoryId
        }
        if (q) {
            query.name = { $regex: q, $options: "i" };
        }
        if (min) {
            query.price = query.price || {};
            query.price.$gte = parseFloat(min);
        }
        if (max) {
            query.price = query.price || {};
            query.price.$lte = parseFloat(max);
        }
        if (rating&&rating!=='undefined') {
            query.rating = { $gte: parseFloat(rating) };
        }


        const products = await Product.find(query)
            .sort({ price: sort === "desc" ? -1 : 1, createdAt: sort === "new" ? -1 : 1 ,productSold:sort==='bestSell'? -1 : 1})
            .lean();

        res.status(200).send(products);
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: "Lỗi server", error: err });
    }
};
