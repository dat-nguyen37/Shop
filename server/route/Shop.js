const router=require('express').Router()
const shopController=require('../controller/Shop')
const checkLogin=require('../verifyToken')


router.post('/create',checkLogin,shopController.create)
router.get('/getAll',shopController.getAll)
router.patch('/update/:id',shopController.update)


module.exports=router