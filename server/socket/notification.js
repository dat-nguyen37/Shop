module.exports = (io, socket) => {
    // Lắng nghe sự kiện gửi thông báo
    socket.on('notification:send', (data) => {
        console.log('Thông báo nhận được:', data);

        // Phát thông báo đến client cụ thể
        io.to(data.userId).emit('notification:receive', {
            title: data.title,
            message: data.message,
            timestamp: new Date(),
        });
    });

    // Xử lý user kết nối
    socket.on('user:register', (userId) => {
        socket.join(userId);
        console.log(`User ${userId} đã được kết nối với socket ${socket.id}`);
    });
};
