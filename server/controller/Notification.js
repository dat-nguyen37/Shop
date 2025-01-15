const Notification=require('../model/Notification')
const Conversation=require('../model/Conversation')

exports.create=async(req,res)=>{
    try {
        const newNotification=new Notification({
            conversationId:req.body.conversationId,
            sender:req.body.sender,
            type:req.body.type,
            title:req.body.title,
            text:req.body.text
        })
        const notification=await newNotification.save()
        res.status(200).send(notification)
    } catch (err) {
        res.status(500).send(err)
    }
}
exports.getByShop=async(req,res)=>{
    try {
        const conversations=await Conversation.find({
            members: { $in: [req.params.id] }
        })
        const notification = await Notification.find({
            conversationId: { $in: conversations.map(conv => conv._id) },
            isRead:false
        }).sort({createdAt:-1})
        res.status(200).send(notification)
    } catch (err) {
        res.status(500).send(err)
    }
}
exports.update=async(req,res)=>{
    try {
        const conversations=await Conversation.find({
            members: { $in: [req.params.id] }
        })
        await Notification.updateMany(
            { conversationId: { $in: conversations.map(conv => conv._id) }, isRead: false },
            { $set: { isRead: true } },
            {new: true}
        );
        res.status(200).send("Cập nhật thành công")
    } catch (err) {
        res.status(500).send(err)
    }
}