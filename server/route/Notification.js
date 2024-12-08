const router=require('express').Router()
const NotificationController=require('../controller/Notification')


router.post('/create',NotificationController.create)
router.get('/getByShop/:id',NotificationController.getByShop)
router.patch('/update/:id',NotificationController.update)



module.exports=router