const User=require('../model/User')
const bcrypt =require("bcrypt")
const nodemailer = require("nodemailer");
const jwt =require('jsonwebtoken')


const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
    },
});

exports.register=async(req,res)=>{
    try {
        const { email, name, password } = req.body;

        const user=await User.findOne({email:email})
        if(user){
            return res.status(409).send("Email đã được sử dụng")
        }
        const verificationToken = jwt.sign(
            { email, name, password },
            process.env.SECRET,
            { expiresIn: "1h" }
        );
        const verificationLink = `http://localhost:3000/kich_hoat?token=${verificationToken}`;
        await transporter.sendMail({
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