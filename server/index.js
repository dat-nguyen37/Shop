const express=require('express')
const connect=require('./config/db')
const cookieParser=require('cookie-parser')
const cors=require('cors')
const session = require('express-session')
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
app.use(session({secret:process.env.SECRET, resave: false, saveUninitialized: true,}))

app.use(passport.initialize());
app.use(passport.session());


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



app.get('/',(req,res)=>{
    res.send("Hello")
})





const port = process.env.PORT || 5000;
server.listen(port,()=>{
    console.log("Sever is running on port 5000")
    connect()
})