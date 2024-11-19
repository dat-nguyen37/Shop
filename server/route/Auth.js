const route=require('express').Router()
const AuthController=require('../controller/Auth')

route.post('/register',AuthController.register)
route.get('/verifyEmail',AuthController.verifyEmail)


module.exports=route