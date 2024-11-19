const express=require('express')
const connect=require('./config/db')
const cookieParser=require('cookie-parser')
const cors=require('cors')
const bodyParser = require('body-parser');
require('dotenv')

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



app.use('/',AuthRoute)

app.listen(5000,()=>{
    console.log("Sever is running on port 5000")
    connect()
})