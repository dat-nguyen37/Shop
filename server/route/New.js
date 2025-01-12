const router=require('express').Router()
const newController=require('../controller/New')
const CheckLogin=require('../verifyToken')


router.post('/create',CheckLogin,newController.create)
router.get('/getByUser/:id',newController.getByUser)
router.get('/getAll',newController.getAll)






module.exports=router