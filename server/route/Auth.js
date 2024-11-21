const route=require('express').Router()
const AuthController=require('../controller/Auth')
const checkLogin=require('../verifyToken')

route.post('/register',AuthController.register)
route.get('/verifyEmail',AuthController.verifyEmail)
route.post('/login',AuthController.login)
route.get('/logout',AuthController.logout)
route.post('/verifyPassword',checkLogin,AuthController.verifyPassword)





module.exports=route