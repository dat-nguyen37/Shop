
const Cart =require('../model/Cart')
const Product=require('../model/Product')

exports.create=async(req,res)=>{
    try {
        const isCart=await Cart.findOne({userId: req.userId,shopId:req.body.shopId,productId:req.body.productId,size:req.body.size,color:req.body.color})
        console.log(req.body.shopId)
        if(isCart){
            isCart.quantity += req.body.quantity; 
            isCart.totalAmount += req.body.totalAmount; 
            await Cart.findByIdAndUpdate(isCart._id,{
                $set:{
                    quantity:isCart.quantity,
                    totalAmount:isCart.totalAmount
                }
            })
            res.status(200).send(isCart)
        }else{
            const newCart=new Cart({
                userId:req.userId,
                shopId:req.body.shopId,
                productId:req.body.productId,
                color:req.body.color,
                size:req.body.size,
                price:req.body.price,
                quantity:req.body.quantity,
                totalAmount:req.body.totalAmount
            })
            const cart=await newCart.save()
            res.status(200).send(cart)
        }
    } catch (err) {
        res.status(500).send(err)
    }
}

exports.update=async(req,res)=>{
    try {
        const cart=await Cart.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true})
        res.status(200).send(cart)
    } catch (err) {
        res.status(500).send(err)
    }
}
exports.delete=async(req,res)=>{
    try {
        const cart=await Cart.findByIdAndDelete(req.params.id,{new:true})
        res.status(200).send("Delete success")
    } catch (err) {
        res.status(500).send(err)
    }
}

exports.cartByUser=async(req,res)=>{
    try {
        if(req.userId){

            const cart=await Cart.find({userId:req.userId})
            const data=[]
            for(item of cart){
                const product=await Product.findById(item.productId)
                data.push({color:item.color,size:item.size,price:item.price,quantity:item.quantity,cartId:item._id,totalAmount:item.totalAmount,product})
            }
            res.status(200).send(data)
        }
    } catch (err) {
        res.status(500).send(err)
    }
}
