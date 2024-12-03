    let users=[]
    const addUser=(userId,socketId)=>{
    !users.some(user=>user.userId===userId) &&
    users.push({userId,socketId})
    }

    const removeUser=(socketId)=>{
    users=users.filter(user=>user.socketId !==socketId)
    }

    // tìm người người dùng
    const getUser=(userId)=>{
    return users.find(user=>user.userId===userId)
    }
module.exports = (io, socket) => {

    socket.on("addUser",userId=>{
        addUser(userId,socket.id)
    })
    socket.on("sendMessage",({senderId,receiverId,text})=>{
        const user=getUser(receiverId)
        // gửi tin nhắn đến người dùng cụ thể
        console.log(user)
        io.to(user.socketId).emit("getMessage",{
            senderId,
            text
        })
    })
    socket.on("disconnect", () => {
        removeUser(socket.id);
        console.log("User disconnected:", users); // Debugging
    });
};
