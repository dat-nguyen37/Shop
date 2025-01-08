const Slide=require("../model/Slide")

exports.create=async(req,res)=>{
    try {
        const slide=new Slide(req.body)
        await slide.save()
        res.status(200).send(slide)
    } catch (err) {
        res.status(500).send(err)
    }
}
exports.getAll=async(req,res)=>{
    try {
        const slides=await Slide.find().sort({createdAt:-1})
        res.status(200).send(slides)
    } catch (err) {
        res.status(500).send(err)
    }
}
exports.getByActive=async(req,res)=>{
    try {
        const slides=await Slide.find({isActive:true}).sort({order:-1})
        res.status(200).send(slides)
    } catch (err) {
        res.status(500).send(err)
    }
}

exports.update=async(req,res)=>{
    try {
        const { list1, list2 } = req.body;
        const updatedList2 = list2.map((slide, index) => ({
            ...slide,
            isActive: true,
            order: index + 1,
        }));
    
        const updatedList1 = list1.map(slide => ({
            ...slide,
            isActive: false,
            order: null, // Xóa dữ liệu order
        }));
        const bulkOperations = [
            ...updatedList2.map(slide => ({
                updateOne: {
                    filter: { _id: slide._id },
                    update: { $set: { isActive: slide.isActive, order: slide.order } },
                },
            })),
            ...updatedList1.map(slide => ({
                updateOne: {
                    filter: { _id: slide._id },
                    update: { $set: { isActive: slide.isActive }, $unset: { order: "" } },
                },
            })),
        ];

        await Slide.bulkWrite(bulkOperations);
        res.status(200).send("Cập nhật thành công")
    } catch (err) {
        res.status(500).send(err)
    }
}