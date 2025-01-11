const express=require('express')
const connect=require('./config/db')
const cookieParser=require('cookie-parser')
const cors=require('cors')
const session = require('express-session')
const MongoStore = require('connect-mongo');
const bodyParser = require('body-parser');
require('dotenv').config()
const http = require('http');
const { Server } = require('socket.io');
const socketHandlers = require('./socket');
const passport = require('passport')
require('./controller/Passport')
const app=express()
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: 'https://shop-fe.onrender.com',
        credentials: true,
    },
});

socketHandlers(io);

app.use(express.json())
app.use(cookieParser())
app.use(cors(
    {
        origin: 'https://shop-fe.onrender.com',
        credentials: true,
    }
))
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,   // Không thể truy cập cookie từ JavaScript
        secure: process.env.NODE_ENV === 'production',  // Chỉ sử dụng cookie trên HTTPS
        sameSite: 'None',  // Cho phép cookie giữa các miền
        maxAge: 7 * 24 * 60 * 60 * 1000  // Thời gian hết hạn cookie
    }
}));
app.use(passport.initialize());
app.use(passport.session());


const createLog = require('./Log')
app.use(createLog)


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
const paymentRoute=require('./route/payment')
const NotificationRoute = require('./route/Notification')
const LogRoute = require('./route/Log')
const SlideRoute = require('./route/Slide')
const ReportRoute = require('./route/Report')











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
app.use('/payment',paymentRoute)
app.use('/notification',NotificationRoute)
app.use('/log',LogRoute)
app.use('/slide',SlideRoute)
app.use('/report',ReportRoute)









const port = process.env.PORT || 5000;
server.listen(port,()=>{
    console.log("Sever is running on port 5000")
    connect()
})