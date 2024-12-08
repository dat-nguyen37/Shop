const chatHandler = require('./chat');

module.exports = (io) => {
    io.on('connection', (socket) => {
        console.log(`User kết nối với socket ID: ${socket.id}`);

        // Gọi module chat
        chatHandler(io, socket);

        // Gọi module notification

        // Xử lý ngắt kết nối
        socket.on('disconnect', () => {
            console.log(`User với socket ID: ${socket.id} đã ngắt kết nối`);
        });
    });
};
