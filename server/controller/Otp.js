const Otp=require('../model/Otp')
const sendmail=require('../until/sendMail')
const User=require('../model/User')

exports.sendOTP=async(req,res)=>{
    try {
        let errors={}
        const { email } = req.body;
        if(!email){
            errors.email='Email không được để trống'
            return res.status(400).send({errors});
        } 
        const emailRegex =/^[^\s@]{5,}@[^\s@]+\.[^\s@]{2,}$/
        if(!emailRegex.test(email.toLowerCase())){
            errors.email='Email không đúng định dạng'
            return res.status(400).send({errors});
        }
        const user=await User.findOne({email:email})
        if(!user){
            errors.email='Email chưa được đăng kí'
            return res.status(404).send({errors})
        }
        const otp = Math.floor(100000 + Math.random() * 900000);
        const expiresAt=new Date(Date.now() + 5 * 60 * 1000);
        const existingOTP = await Otp.findOne({ email: email });
        if (existingOTP) {
            existingOTP.otp = otp;
            existingOTP.expiresAt = expiresAt;
            await existingOTP.save();
        } else {
            const newOTP = new Otp({ 
                email:email, 
                otp:otp,
                expiresAt:expiresAt
            });
            await newOTP.save();
        }

        await sendmail({
            from:process.env.EMAIL,
            to: email,
            subject: 'Xác minh tài khoản',
            html: `<p>Mã otp của bạn là: <strong>${otp}</strong>.Thời gian có hiệu lực là 5 phút</p>`,
        });

        res.status(200).send({ success: true, message: 'OTP sent successfully' });
    } catch (error) {
        res.status(500).send(error);
    }
}

exports.verifyOtp=async(req,res)=>{
    try {
        let errors={}
        const { email, otp } = req.body
        if(!email){
            errors.email='Email không được để trống'
            return res.status(400).send({errors});
        }
        const emailRegex =/^[^\s@]{5,}@[^\s@]+\.[^\s@]{2,}$/
        if(!emailRegex.test(email.toLowerCase())){
            errors.email='Email không đúng định dạng'
            return res.status(400).send({errors});
        }
         if(!otp){
            errors.otp='Otp không được để trống'
            return res.status(400).send({errors});
        }
        const otpRegex=/^\d{6}$/
        if(!otpRegex.test(otp)){
            errors.otp='Otp là dãy số có 6 kí tự.'
            return res.status(400).send({errors});
        }
        const existingOTP = await Otp.findOneAndDelete({ email, otp },{new:true});
        if (existingOTP) {
            res.status(200).json('Xác minh thành công');
        } else {
            errors.otp='Otp không chính xác hoặc đã hết hạn'
            res.status(400).send({errors});
        }
    } catch (err) {
        res.status(500).send(err)
    }
}