const User=require('../model/User')
const bcrypt =require("bcryptjs")
const jwt =require('jsonwebtoken')
const sendMail=require('../until/sendMail')


exports.register=async(req,res)=>{
    try {
        let errors={};
        const { email, name, password } = req.body;
        const user=await User.findOne({email:email})
        if(user){
            errors.email="Email đã được sử dụng"
            return res.status(409).send({errors})
        }
        const verificationToken = jwt.sign(
            { email, name, password },
            process.env.SECRET,
            { expiresIn: "1h" }
        );
        const verificationLink = `https://shop-fe.onrender.com/kich_hoat?token=${verificationToken}`;
        await sendMail({
            from: process.env.EMAIL,
            to: email,
            subject: "Kích hoạt tài khoản",
            html: `
                <h1>Chào ${name},</h1>
                <p>Vui lòng nhấp vào liên kết dưới đây để kích hoạt tài khoản của bạn:</p>
                <a href="${verificationLink}">${verificationLink}</a>
                <p>Liên kết sẽ hết hiệu lực sau 1 giờ</p>
            `,
        });
        res.status(200).send("Email xác minh đã được gửi, vui lòng kiểm tra email của bạn.");
    } catch (err) {
        res.status(500).send(err)
    }
}
exports.verifyEmail = async (req, res) => {
    try {
        const { token } = req.query;
        const decoded = jwt.verify(token,process.env.SECRET);
        const hashPassword = await bcrypt.hash(decoded.password, 10);
        const newUser = new User({
            email: decoded.email,
            name: decoded.name,
            password: hashPassword,
        });
        await newUser.save();

        res.status(200).send("Xác minh email thành công. Tài khoản của bạn đã được tạo.");
    } catch (err) {
        res.status(400).send("Liên kết xác minh không hợp lệ hoặc đã hết hạn.");
    }
};
exports.login=async(req,res)=>{
    try {
        let errors={}
        const user=await User.findOne({email:req.body.email})
        if(!user){
            errors.email="Email chưa được đăng kí"
            return res.status(404).send({errors})
        }
        const IsPassword=await bcrypt.compare(req.body.password,user.password)
        if(!IsPassword){
            errors.password="Mật khẩu không chính xác"
            return res.status(404).send({errors})
        }
        if(!user.status){
            return res.status(400).send({message:'Tài khoản của bạn đã bị khóa. Vui lòng liện hệ admin'})
        }
        const token= jwt.sign({userId:user._id,role:user.role},process.env.SECRET)
        const {password,shop,status,...others}=user._doc
        res.cookie("access_token", token,{
            httpOnly:true,
            secure: true,
            sameSite: 'None',
            maxAge: 7 * 24 * 60 * 60 * 1000}).status(200).json(others); 
    } catch (err) {
        res.status(500).send(err)
    }
}
exports.logout=(req,res)=>{
    req.session.destroy()
    res.clearCookie("access_token").status(200).json("User has been logged out.")
}

exports.verifyPassword=async(req,res)=>{
    try {
        let errors={};
        const user=await User.findById(req.userId)
        if(!user){
            errors.message='Không tìm thấy người dùng'
            return res.status(404).send({message:'Không tìm thấy người dùng'})
        }
        const isPassword=await bcrypt.compare(req.body.password,user.password)
        if(!isPassword){
            errors.password='Mật khẩu không chính xác'
            return res.status(400).send({errors})
        }
        res.status(200).send('Xác minh thành công')
    } catch (err) {
        res.status(500).send(err)
    }
}