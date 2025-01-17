const New=require("./../model/New")

exports.create=async(req,res)=>{
    try {
        const {author,title,content,image,detail}=req.body
        const news=new New({
            author,
            title,
            content,
            image,
            detail
        })
        await news.save()
        res.status(200).send('Tạo thành công')
    } catch (err) {
        res.status(500).send(err)
    }
}
exports.getByUser=async(req,res)=>{
    try {
        const news=await New.find({author:req.params.id}).sort({createdAt:-1})
        res.status(200).send(news)
    } catch (err) {
        res.status(500).send(err)
    }
}

exports.getAll=async(req,res)=>{
    try {
        const news=await New.find().sort({createdAt:-1})
        res.status(200).send(news)
    } catch (err) {
        res.status(500).send(err)
    }
}
exports.getOne=async(req,res)=>{
    try {
        const news=await New.findById(req.params.id)
        res.status(200).send(news)
    } catch (err) {
        res.status(500).send(err)
    }
}
exports.delete=async(req,res)=>{
    try {
        const news=await New.findByIdAndDelete(req.params.id,{new:true})
        res.status(200).send(news)
    } catch (err) {
        res.status(500).send(err)
    }
}