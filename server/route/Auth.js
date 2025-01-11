const route=require('express').Router()
const AuthController=require('../controller/Auth')
const Passport=require('passport')
const User=require('../model/User')
const jwt =require('jsonwebtoken')

const CLIENT_URL="https://shop-fe.onrender.com"
const checkLogin=require('../verifyToken')

route.post('/register',AuthController.register)
route.get('/verifyEmail',AuthController.verifyEmail)
route.post('/login',AuthController.login)
route.get('/logout',AuthController.logout)
route.post('/verifyPassword',checkLogin,AuthController.verifyPassword)

// google
route.get("/login/success",async(req,res)=>{  
  console.log("login/success - req.user", req.passport);
    if(req.user){
        try {
         const user=await User.findOne({email:req.user.email})
         const token=jwt.sign({userId:user._id,role:user.role},process.env.SECRET)
         const {password,role,shop,status,...others}=user._doc
        res.cookie("access_token", token,{
          httpOnly:true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'None',
          maxAge: 7 * 24 * 60 * 60 * 1000}).status(200).send(others); 
        } catch (err) {
          res.send(err)
        }
    }
 })
 route.get("/google",Passport.authenticate("google", {scope:["email","profile"]}))
 route.get("/google/callback",Passport.authenticate("google", { 
   failureRedirect: `${CLIENT_URL}/dang_nhap`,
   successRedirect: CLIENT_URL
}), (req, res) => {
  console.log("Google callback - req.user", req.user);  // Kiểm tra sau khi xác thực
});


module.exports=route