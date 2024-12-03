const Order =require('../model/Order')
const Cart=require('../model/Cart')
const Product=require('../model/Product')
const User=require('../model/User')

exports.creatOrder=async(req,res)=>{
    try {
        if(req.userId){
            const newOrder=new Order({
                userId:req.body.userId,
                product:req.body.product,
                price:req.body.price,
                name:req.body.name,
                phone:req.body.phone,
                address:req.body.address,
                shipping:req.body.shipping,
                description:req.body.description
            })
            const order=await newOrder.save()
            const cartItems=req.body.product.map(item=>item.productId)
            await Cart.deleteMany({userId:req.body.userId,productId:{$in:cartItems}})
            res.status(200).send(order)
        }else{
            res.status(401).send("Authentication")    
        }
    } catch (err) {
        res.status(500).send(err)
    }
}

exports.getByShopAndUser=async(req,res)=>{
    try {
        const orders = await Order.find({userId:req.params.userId ,"product.0": { $exists: true } }, 'product').lean();
        const products = orders.flatMap(order => order.product);
        const product =products.filter(s => s.shopId.toString() === req.params.shopId);
        res.status(200).send(product)
    } catch (err) {
        res.status(500).send(err)
    }
}
exports.getOrderByUser=async(req,res)=>{
    try {
        const orders = await Order.find({userId:req.userId});
        const productsByUser = [];
        for(let order of orders){
            for(let product of order.product){
                const users = await User.find({ "shop.0": { $exists: true } }, 'shop').lean();
                const shops = users.flatMap(user => user.shop);
                const shop =shops.find(s => s._id.toString() === product.shopId);
                productsByUser.push({
                        id:product._id,
                        shopId:product.shopId,
                        shopName:shop.name,
                        productId: product.productId,
                        productName: product.productName,
                        image: product.image,
                        size: product.size,
                        color: product.color,
                        quantity: product.quantity,
                        price: product.price,
                        confimationStatus: product.confimationStatus,
                        name: order.name,
                        phone:order.phone,
                        address: order.address,
                        description: order.description,
                        paymentStatus: order.paymentStatus,
                        createdAt: order.createdAt,
                    });
            }
        }
        const {params,value}=req.query
        let filteredProducts = [...productsByUser];
        if (value!=="") {
            filteredProducts = filteredProducts.filter(product => 
                product.productName.toLowerCase().includes(value?.toLowerCase()) || 
                product.id === value
            );
        }
        if (params === 'pending') {
            filteredProducts = filteredProducts.filter(p => p.paymentStatus === "Chưa thanh toán");
        } else if (params === 'shipping') {
            filteredProducts = filteredProducts.filter(p => p.confimationStatus === "Đã xác nhận");
        } else if (params === 'delivering') {
            filteredProducts = filteredProducts.filter(p => p.confimationStatus === "Đang giao");
        } else if (params === 'completed') {
            filteredProducts = filteredProducts.filter(p => p.confimationStatus === "Đã giao");
        } else if (params === 'canceled') {
            filteredProducts = filteredProducts.filter(p => p.confimationStatus === "Đã hủy");
        }
        res.status(200).send(filteredProducts);    
    } catch (err) {
        res.status(500).send(err)
    }
}

exports.getAllByShop=async(req,res)=>{
    try {
        const orders = await Order.find();
        const productsByShop = [];
        for(let order of orders){
            for(let product of order.product){
                if (product.shopId === req.params.shopId) {
                    productsByShop.push({
                        id:product._id,
                        userId:order.userId,
                        productId: product.productId,
                        productName: product.productName,
                        image: product.image,
                        size: product.size,
                        color: product.color,
                        quantity: product.quantity,
                        price: product.price,
                        confimationStatus: product.confimationStatus,
                        name: order.name,
                        phone:order.phone,
                        address: order.address,
                        description: order.description,
                        paymentStatus: order.paymentStatus,
                        createdAt: order.createdAt,
                    });
                }
            }
        }
        res.status(200).send(productsByShop)
    } catch (err) {
        res.status(500).send(err)
    }
}

exports.update=async(req,res)=>{
    try {
        await Order.findOneAndUpdate(
            {"product._id": req.params.id},
            {$set: { 
                "product.$.confimationStatus": req.body.confimationStatus,
                name:req.body.name,
                phone:req.body.phone,
                address:req.body.address,
                paymentStatus:req.body.paymentStatus,
                description:req.body.description,
            } },
            { new: true })
        res.status(200).send('Update thành công')
    } catch (err) {
        res.status(200).send(err)
    }
}