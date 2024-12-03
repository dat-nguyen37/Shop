const express=require('express')
const connect=require('./config/db')
const cookieParser=require('cookie-parser')
const cors=require('cors')
const bodyParser = require('body-parser');
require('dotenv').config()
const http = require('http');
const { Server } = require('socket.io');
const socketHandlers = require('./socket');

const app=express()
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: 'http://localhost:3000',
        credentials: true,
    },
});

socketHandlers(io);

app.use(express.json())
app.use(cookieParser())
app.use(cors(
    {
        origin: 'http://localhost:3000',
        credentials: true,
    }
))
app.use(bodyParser.urlencoded({ extended: false }));


const AuthRoute=require('./route/Auth')
const UserRoute=require('./route/User')
const OtpRoute=require('./route/Otp')
const ShipRoute=require('./route/Ship')
const categoryRoute=require('./route/Category')
const shopRoute=require('./route/Shop')
const productRoute=require('./route/Product')
const commentRoute=require('./route/Comment')
const cartRoute=require('./route/Cart')
const conversationRoute=require('./route/conversation')
const messageRoute=require('./route/Message')
const orderRoute=require('./route/Order')











app.use('/auth',AuthRoute)
app.use('/user',UserRoute)
app.use('/otp',OtpRoute)
app.use('/ship',ShipRoute)
app.use('/category',categoryRoute)
app.use('/shop',shopRoute)
app.use('/product',productRoute)
app.use('/comment',commentRoute)
app.use('/cart',cartRoute)
app.use('/conversation',conversationRoute)
app.use('/message',messageRoute)
app.use('/order',orderRoute)








server.listen(5000,()=>{
    console.log("Sever is running on port 5000")
    connect()
})