const route=require('express').Router()
const AuthController=require('../controller/Auth')

route.post('/register',AuthController.register)
route.get('/verifyEmail',AuthController.verifyEmail)
route.post('/login',AuthController.login)
route.get('/logout',AuthController.logout)




module.exports=route