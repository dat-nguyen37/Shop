const UserController=require('../controller/User')
const route=require('express').Router()

route.patch('/update/:id',UserController.update)

module.exports=route
