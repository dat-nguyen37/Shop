const UserController=require('../controller/User')
const route=require('express').Router()
const checkLogin=require('../verifyToken')


route.patch('/update/:id',UserController.update)
route.post('/addAddress',checkLogin,UserController.addAddress)
route.get('/getAddress',checkLogin,UserController.getAddress)
route.delete('/deleteAddress/:id',checkLogin,UserController.deleteAddress)
route.patch('/updateAddress/:id',checkLogin,UserController.updateAddress)


module.exports=route
