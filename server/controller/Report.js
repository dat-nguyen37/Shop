const Report=require("./../model/Report")

exports.create=async(req,res)=>{
    try {
        const {shopId,productId,reason,description}=req.body
        const newReport=new Report({
            userId:req.userId,
            shopId,
            productId,
            reason,
            description
        })
        await newReport.save()
        res.status(200).send('Tạo thành công')
    } catch (err) {
        res.status(500).send(err)
    }
}
exports.getAll=async(req,res)=>{
    try {

        const reports=await Report.find().sort({createAt:-1})
        res.status(200).send(reports)
    } catch (err) {
        res.status(500).send(err)
    }
}
exports.update=async(req,res)=>{
    try {

        const reports=await Report.findByIdAndUpdate(req.params.id,{status:req.body.status},{new:true}) 
        res.status(200).send(reports)
    } catch (err) {
        res.status(500).send(err)
    }
}
exports.delete=async(req,res)=>{
    try {

        const reports=await Report.findByIdAndDelete(req.params.id,{new:true})
        res.status(200).send(reports)
    } catch (err) {
        res.status(500).send(err)
    }
}