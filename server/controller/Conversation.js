const Conversation=require('../model/Conversation')
const User=require("../model/User")
const Message=require("../model/Message")


//new conv
exports.create=async(req,res)=>{
    const newConversation=new Conversation({
        members:[req.body.senderId,req.body.receiverId]
    })
    try {
        const saveConsation=await newConversation.save()
        res.status(200).json(saveConsation)
    } catch (err) {
        res.status(500).json(err)
    }
}

//get conv of user

exports.getByUser = async (req, res) => {
    try {
        // Lấy danh sách các conversations liên quan đến userId
        const conversations = await Conversation.find({
            members: { $in: [req.userId] },
        });

        if (!conversations.length) {
            return res.status(404).json({ message: 'Không có hội thoại nào!' });
        }

        // Lấy danh sách shopId từ members
        const shopIds = conversations.flatMap(conv =>
            conv.members.filter(m => m.toString() !== req.userId)
        );

        // Lấy tin nhắn mới nhất cho mỗi conversation
        const messages = await Message.find({
            conversationId: { $in: conversations.map(conv => conv._id) },
        })
            .sort({ createdAt: -1 }) // Sắp xếp theo thời gian giảm dần
            .lean();
        const shops = await User.find(
            { "shop._id": { $in: shopIds } },
            "shop"
        ).lean();
        // Gộp tin nhắn theo shopId (mỗi shop chỉ giữ tin nhắn mới nhất)
        const result = shopIds.reduce((acc, shopId) => {
            const shop = shops.flatMap(user => user.shop).find(s => s._id.toString() === shopId);
            if (shop) {
                const latestMessage = messages.find(msg =>
                    conversations.some(conv =>
                        conv._id.toString() === msg.conversationId.toString() &&
                        conv.members.includes(shopId)
                    )
                );
                if (latestMessage) {
                    acc.push({
                        shop,
                        latestMessage,
                    });
                }
            }
            return acc;
        }, []);

        // Chuyển kết quả về mảng

        if (!result.length) {
            return res.status(404).json({ message: 'Không tìm thấy tin nhắn nào!' });
        }
        result.sort((a, b) => new Date(b.latestMessage.createdAt) - new Date(a.latestMessage.createdAt));

        // Trả về danh sách tin nhắn theo shopId
        res.status(200).json(result);
    } catch (err) {
        console.error('Lỗi:', err);
        res.status(500).json({ message: 'Đã xảy ra lỗi!', error: err.message });
    }
};

exports.getByShop = async (req, res) => {
    try {
        // Lấy danh sách các conversations liên quan đến userId
        const conversations = await Conversation.find({
            members: { $in: [req.params.shopId] },
        });

        if (!conversations.length) {
            return res.status(404).json({ message: 'Không có hội thoại nào!' });
        }

        // Lấy danh sách userId từ members
        const userIds = conversations.flatMap(conv =>
            conv.members.filter(m => m.toString() !== req.params.shopId)
        );

        // Lấy tin nhắn mới nhất cho mỗi conversation
        const messages = await Message.find({
            conversationId: { $in: conversations.map(conv => conv._id) },
        })
            .sort({ createdAt: -1 }) // Sắp xếp theo thời gian giảm dần
            .lean();
        const users = await User.find(
            { _id: { $in: userIds } }).lean();
        // Gộp tin nhắn theo userId (mỗi user chỉ giữ tin nhắn mới nhất)
        const result = userIds.reduce((acc, userId) => {
            const user = users.find(u=>u._id.toString()===userId);
            if (user) {
                const latestMessage = messages.find(msg =>
                    conversations.some(conv =>
                        conv._id.toString() === msg.conversationId.toString() &&
                        conv.members.includes(userId)
                    )
                );
                if (latestMessage) {
                    acc.push({
                        user,
                        latestMessage,
                    });
                }
            }
            return acc;
        }, []);

        // Chuyển kết quả về mảng

        if (!result.length) {
            return res.status(404).json({ message: 'Không tìm thấy tin nhắn nào!' });
        }
        result.sort((a, b) => new Date(b.latestMessage.createdAt) - new Date(a.latestMessage.createdAt));

        // Trả về danh sách tin nhắn theo shopId
        res.status(200).json(result);
    } catch (err) {
        console.error('Lỗi:', err);
        res.status(500).json({ message: 'Đã xảy ra lỗi!', error: err.message });
    }
};

//get conversation includes two userId
exports.getTwoUser= async(req,res)=>{
    try {
        const conversation=await Conversation.findOne({
            members:{$all:[req.params.userId,req.params.shopId]}
        })
        res.status(200).json(conversation)
    } catch (err) {
        res.status(500).json(err)
    }
}

