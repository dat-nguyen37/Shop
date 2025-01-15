const Order =require('../model/Order')
const Cart=require('../model/Cart')
const Product=require('../model/Product')
const User=require('../model/User')
const reader = require('xlsx')
const fs=require('fs')

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
                paymentMethod:req.body.paymentMethod,
                description:req.body.description
            })
            const order=await newOrder.save()
            const cartItems=req.body.product.map(item=>item.productId)
            await Cart.deleteMany({userId:req.body.userId,productId:{$in:cartItems}})
            for (const item of req.body.product) {
                await Product.updateOne(
                    { _id: item.productId }, 
                    { $inc: { quantitySold: item.quantity ,quantity:-item.quantity} } 
                );
            }
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
                        paymentMethod:order.paymentMethod,
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
                product?.productName.toLowerCase().includes(value?.toLowerCase()) || 
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
        const orders = await Order.find().sort({createdAt:-1});
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
        if(req.query.orderId){
            const order=productsByShop.filter(p=>p.id.toString()===req.query.orderId)
            return res.status(200).send(order)
        }
        res.status(200).send(productsByShop)
    } catch (err) {
        res.status(500).send(err)
    }
}

exports.update=async(req,res)=>{
    try {
        const { orderId,orderItemId } = req.query;
        const filter = orderId 
            ? { _id: orderId }
            : { "product._id": orderItemId }
        await Order.findOneAndUpdate(
            filter,
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

exports.delete=async(req,res)=>{
    try {
        await Order.findOneAndDelete(
            { "product._id": req.params.id },
            { new: true })
        res.status(200).send("Xóa thành công")
    } catch (err) {
        res.status(500).send(err)
    }
}

exports.statistical = async (req, res) => {
    try {
        const shopId = req.query.shopId;

        const orders = await Order.aggregate([
            {
                $unwind: "$product" // Tách từng sản phẩm trước
            },
            {
                $match: {
                    paymentStatus: "Đã thanh toán",
                    "product.confimationStatus": "Đã giao",
                    "product.shopId": shopId // Chỉ giữ sản phẩm có shopId khớp
                }
            },
            {
                $group: {
                    _id: {
                        year: { $year: "$createdAt" }, // Nhóm theo năm
                        month: { $month: "$createdAt" } // Nhóm theo tháng
                    },
                    totalRevenue: {
                        $sum: {
                            $multiply: ["$product.price", "$product.quantity"] // Tổng doanh thu
                        }
                    }
                }
            },
            {
                $sort: { "_id.year": 1, "_id.month": 1 } // Sắp xếp theo năm và tháng
            },
            {
                $group: {
                    _id: "$_id.year", // Nhóm theo năm
                    monthlyRevenue: {
                        $push: {
                            month: "$_id.month",
                            revenue: "$totalRevenue"
                        }
                    },
                    total: { $sum: "$totalRevenue" } // Tổng doanh thu của cả năm
                }
            },
            {
                $addFields: {
                    monthlyRevenue: {
                        $map: {
                            input: { $range: [1, 13] }, // Danh sách từ tháng 1-12
                            as: "month",
                            in: {
                                month: "$$month",
                                revenue: {
                                    $ifNull: [
                                        {
                                            $arrayElemAt: [
                                                {
                                                    $map: {
                                                        input: {
                                                            $filter: {
                                                                input: "$monthlyRevenue",
                                                                as: "revenue",
                                                                cond: { $eq: ["$$revenue.month", "$$month"] }
                                                            }
                                                        },
                                                        as: "filteredRevenue",
                                                        in: "$$filteredRevenue.revenue" // Chỉ lấy giá trị revenue
                                                    }
                                                },
                                                0
                                            ]
                                        },
                                        0 // Trả về 0 nếu không có dữ liệu
                                    ]
                                }
                            }
                        }
                    }
                }
            }
            
        ]);

        const totalAmount = orders.reduce((sum, item) => {
            return sum + item.total;
        }, 0);

        res.status(200).send({
            data: orders.map(order => ({
                year: order._id,
                monthlyRevenue: order.monthlyRevenue,
                total: order.total
            })),
            totalAmount: totalAmount
        });
    } catch (err) {
        res.status(500).send(err);
    }
};

exports.getAll=async(req,res)=>{
    try {
        const orders=await Order.find()
        res.status(200).send(orders)
    } catch (err) {
        res.status(500).send(err)
    }
}

exports.exportFile =async (req,res) => {
    const year=req.query.year
    const {data}=req.body
    console.log(data)
    const filePath = `E:\DataFiles\Dulieu${year}.xlsx`;

    // Kiểm tra và tạo thư mục nếu cần thiết
    const dirPath = filePath.substring(0, filePath.lastIndexOf('/'));
    if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
    }

    // Chuyển đổi dữ liệu thành worksheet
    const ws = reader.utils.json_to_sheet(data);

    // Tạo file Excel mới
    const workbook = reader.utils.book_new();
    reader.utils.book_append_sheet(workbook, ws, 'Dulieu');

    // Ghi dữ liệu vào file
    reader.writeFile(workbook, filePath);

    console.log(`Tệp đã được lưu tại: ${filePath}`);
};


