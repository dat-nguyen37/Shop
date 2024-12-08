const paymentController=require('../controller/payment')
const router=require('express').Router()

router.post('/create_payment_url',paymentController.create_payment_url)
router.get('/vnpay_return',paymentController.vnpay_return)
router.get('/vnpay_ipn',paymentController.vnpay_ipn)

module.exports=router