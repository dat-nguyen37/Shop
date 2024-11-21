const route=require('express').Router()
const OtpRouter=require('../controller/Otp')

route.post('/sendOTP', OtpRouter.sendOTP);
route.post('/verifyOTP', OtpRouter.verifyOtp);

module.exports = route;
