const Message=require('../model/Message')
const Conversation=require('../model/Conversation')
const User=require('../model/User')



//add
exports.create=async(req,res)=>{
    const newMessage=await new Message({
        conversationId:req.body.conversationId,
        sender:req.body.sender,
        text:req.body.text
    })

    try {
        const saveMessage=await newMessage.save()
        res.status(200).json(saveMessage)
    } catch (err) {
        res.status(500).json(err)
    }
}

//get
exports.getConversationByUser= async(req,res)=>{
    try {
        const messages=await Message.find({
            conversationId:req.params.conversationId
        })
        const conversation=await Conversation.findById(req.params.conversationId)
        const shopId=conversation.members.filter(cv=>cv!==req.params.userId)
        const user = await User.findOne(
            { "shop._id": shopId },
            { "shop": 1 }
        ).lean(); 
        const shop = {
            id: user.shop[0]._id,
            name: user.shop[0].name,
            avatar: user.shop[0].avatar,
        };
        const result = {
            shop,
            messages,
        };
        res.status(200).json(result)
    } catch (err) {
        res.status(500).json(err)
    }
}

exports.getConversationByShop= async(req,res)=>{
    try {
        const messages=await Message.find({
            conversationId:req.params.conversationId
        })
        const conversation=await Conversation.findById(req.params.conversationId)
        const userId=conversation.members.filter(cv=>cv!==req.params.shopId)
        const users = await User.findById(userId)
        const user = {
            id: users._id,
            image:users.image,
            name: users.name,
            phone: users.phone,
            email: users.email,
        };
        const result = {
            user,
            messages,
        };
        res.status(200).json(result)
    } catch (err) {
        res.status(500).json(err)
    }
}
