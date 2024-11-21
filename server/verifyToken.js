const jwt =require("jsonwebtoken")

const checkLogin=async(req,res,next)=>{
    const token=req.cookies.access_token;
    if(!token){
        return res.status(401).send({message:'Bạn chưa xác thực người dùng'})
    }
    try {
        const decode=jwt.verify(token,process.env.SECRET)
        req.userId=decode.userId
        req.role=decode.role

    } catch (err) {
        return res.status(401).send({message:'Bạn chưa xác thực người dùng'})
    }
    next()
}

module.exports=checkLogin