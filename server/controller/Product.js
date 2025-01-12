const Product=require('../model/Product')
const User=require('../model/User')
const Category=require('../model/Category')
const Client=require('../elasticsearch/connection')


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
        const result=await product.save()
        Client.index({
            index: 'products',
            id: result._id.toString(),
            body: {product}
        }, (err, result) => {
            if (err) {
                console.log(err)
            }else{
                console.log(result)
            }
        })
        res.status(200).send('Tạo thành công')
    } catch (err) {
        res.status(500).send(err)
    }
}

exports.getByShop=async(req,res)=>{
    try {
        const { search } = req.query;
        const searchCondition = search
        ? { name: { $regex: search, $options: "i" } }
        : {};
        const products=await Product.find({shopId:req.params.id,...searchCondition}).sort({createdAt:-1})
        res.status(200).send(products)
    } catch (err) {
        res.status(200).send(err)
    }
}
exports.update=async(req,res)=>{
    try {
        const products=req.body

        const product=await Product.findByIdAndUpdate(req.params.id,{$set:products},{new:true})
        await Client.index({
            index: 'products',
            id: product._id.toString(),
            body: {product},
        });
        res.status(200).send('Cập nhật thành công')
    } catch (err) {
        res.status(500).send(err)
    }
}

exports.delete=async(req,res)=>{
    try {
        await Product.findByIdAndDelete(req.params.id,{new:true})
        await Client.delete({
            index: 'products',
            id: req.params.id 
        });
        res.status(200).send('Xóa thành công')
    } catch (err) {
        res.status(500).send(err)
    }
}
exports.getAll=async(req,res)=>{
    try {
        const { search } = req.query;
        const query = {
            index: 'products',
            body: {
                query: {
                    bool: {
                        must: [],
                    }
                },
                size: 50,
            }
        };
        if (search) {
            query.body.query.bool.must.push({
                match: {
                    "product.name": {
                        query: search,
                        fuzziness: "AUTO",
                        operator: "and"
                    }
                }
            });
        }
        const result = await Client.search(query);
        const products = result.hits.hits.map(hit => hit._source.product);
        res.status(200).send(products)
    } catch (err) {
        res.status(500).send(err)
    }
}
exports.getByActive=async(req,res)=>{
    try {
        const product=await Product.find({status:"có sẵn"})
        res.status(200).send(product)
    } catch (err) {
        res.status(500).send(err)
    }
}


exports.getOne=async(req,res)=>{
    try {
        const product=await Product.findById(req.params.id)
        const category = await Category.findOne(
            { "subcategories._id": product.categoryId },
            { "subcategories.$": 1, name: 1 }
        );
        product.view +=1
        await product.save()
        res.status(200).send({product,category})
    } catch (err) {
        res.status(500).send(err)
    }
}

exports.getByView=async(req,res)=>{
    try {
        const products = await Product.find({status:"có sẵn"})
        .sort({ view: -1 })
        .limit(6)     
        res.status(200).send(products)
    } catch (err) {
        res.status(500).send(err)
    }
}


exports.getBestSellingByShop=async(req,res)=>{
    try {
        const products = await Product.find({ shopId: req.params.id,status:"có sẵn"})
        .sort({ quantitySold: -1 })
        .limit(6)     
        res.status(200).send(products)
    } catch (err) {
        res.status(500).send(err)
    }
}
exports.getBestSelling=async(req,res)=>{
    try {
        const products = await Product.find({status:"có sẵn"})
        .sort({ productSold: -1 })
        .limit(18)
        .lean();        
        res.status(200).send(products)
    } catch (err) {
        res.status(500).send(err)
    }
}
exports.search = async (req, res) => {
    try {
        const { q, categoryId, subcategoryId, shipId, shopId, min, max, rating, sort } = req.query;

        let query = { status: "có sẵn" };
        let productIds = []; // Lưu danh sách ID sản phẩm từ Elasticsearch
        let products;

        // Tìm kiếm bằng Elasticsearch nếu có `q`
        if (q) {
            const esResult = await Client.search({
                index: "products",
                body: {
                    query: {
                        match: {
                            "product.name": {
                                query: q,      
                                fuzziness: "1", 
                                operator: "and" 
                            }
                        }
                    }
                },
            });
            productIds = esResult.hits.hits.map(hit => hit._source.product._id);
            if (productIds.length === 0) {
                return res.status(200).send([]); // Không có sản phẩm khớp
            }

            query._id = { $in: productIds }; // Lọc chỉ các sản phẩm có trong danh sách từ Elasticsearch
        }

        // Tìm shopId theo categoryId
        let shopIds = [];
        if (categoryId && categoryId !== "undefined") {
            const users = await User.find({ "shop.categoryId": categoryId }, "shop").lean();
            shopIds = users.flatMap(user =>
                user.shop.filter(shop => shop.categoryId === categoryId).map(shop => shop._id)
            );
            query.shopId = { $in: shopIds };
        }

        // Tìm shopId theo shipId
        if (shipId && shipId !== "undefined") {
            const users = await User.find({ "shop.ship": shipId }, "shop").lean();
            const shipShopIds = users.flatMap(user =>
                user.shop.filter(shop => shop.ship.includes(shipId)).map(shop => shop._id)
            );
            query.shopId = { $in: shipShopIds };

            // Kết hợp shopId từ categoryId và shipId
            if (categoryId && categoryId !== "undefined" && shopIds.length > 0) {
                query.shopId = { $in: shopIds.filter(id => shipShopIds.includes(id.toString())) };
            }
        }

        // Các điều kiện lọc thêm
        if (shopId) query.shopId = shopId;
        if (subcategoryId) query.categoryId = subcategoryId;
        if (min) {
            query.price = query.price || {};
            query.price.$gte = parseFloat(min);
        }
        if (max) {
            query.price = query.price || {};
            query.price.$lte = parseFloat(max);
        }
        if (rating && rating !== "undefined") {
            query.rating = { $gte: parseFloat(rating) };
        }

        // Lấy sản phẩm từ MongoDB
        products = await Product.find(query)
            .sort({
                price: sort === "desc" ? -1 : 1,
                createdAt: sort === "new" ? -1 : 1,
                productSold: sort === "bestSell" ? -1 : 1,
            })
            .lean();

        res.status(200).send(products);
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: "Lỗi server", error: err });
    }
};

exports.likeProduct=async(req,res)=>{
    try {
        const product=await Product.findById(req.params.id)
        const alreadyLiked =product.like.includes(req.userId)
        if(alreadyLiked){
            product.like.pull(req.userId);
        }else{
            product.like.push(req.userId);
        }
        await product.save();
        res.status(200).send(product)
    } catch (err) {
        res.status(500).send(err)
    }
}

exports.getElasticSearch = async (req, res) => {
    try {
        const { shopId, search } = req.query;
        const query = {
            index: 'products',
            body: {
                query: {
                    bool: {
                        must: [],
                        filter: shopId ? [{ term: { "product.shopId": shopId } }] : []  // Lọc theo shopId nếu có
                    }
                },
                size: 50,
            }
        };
        if (search) {
            query.body.query.bool.must.push({
                match: {
                    "product.name": {
                        query: search,
                        fuzziness: "1",
                        operator: "and"
                    }
                }
            });
        }
        const result = await Client.search(query);

        // Lấy danh sách sản phẩm từ kết quả tìm kiếm
        const products = result.hits.hits.map(hit => hit._source.product);

        res.status(200).send(products);
    } catch (err) {
        console.error("Error fetching product:", err);
        res.status(500).send({ error: "Không thể tìm thấy sản phẩm", details: err.message });
    }
};

