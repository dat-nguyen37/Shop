const express=require('express')
const connect=require('./config/db')
const cookieParser=require('cookie-parser')
const cors=require('cors')
const bodyParser = require('body-parser');
require('dotenv').config()

const app=express()


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







app.use('/auth',AuthRoute)
app.use('/user',UserRoute)
app.use('/otp',OtpRoute)
app.use('/ship',ShipRoute)
app.use('/category',categoryRoute)
app.use('/shop',shopRoute)
app.use('/product',productRoute)




app.listen(5000,()=>{
    console.log("Sever is running on port 5000")
    connect()
})