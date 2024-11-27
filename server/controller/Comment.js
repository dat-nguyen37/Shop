const Comment=require('../model/Comment')
const User=require('../model/User')
const Product=require('../model/Product')

exports.create=async(req,res)=>{
    try {
        const comment=req.body
        const newComment=new Comment({
            userId:req.userId,
            productId:comment.productId,
            commentText:comment.commentText,
            rating:comment.rating
        })
        await newComment.save()
        const comments=await Comment.find({productId:comment.productId})
        let totalRating = 0;
        let ratingCount = 0;
        for (let item of comments) {
                totalRating += item.rating;
                ratingCount++;
        }
        const averageRating = parseFloat((totalRating / ratingCount).toFixed(2));
        const result=await Product.findByIdAndUpdate(comment.productId,{$set:{rating:averageRating}},{new:true})
        console.log(result)
        res.status(200).send('Tạo thành công')
    } catch (err) {
        res.status(500).send(err)
    }
}

exports.getAll=async(req,res)=>{
    try {
        const comments=await Comment.find({productId:req.params.id})
        res.status(200).send(comments)
    } catch (err) {
        res.status(500).send(err)
    }
}