const router=require('express').Router()
const SlideController=require('../controller/Slide')

router.post('/create',SlideController.create)
router.get('/getAll',SlideController.getAll)
router.get('/getByActive',SlideController.getByActive)
router.post('/update',SlideController.update)





module.exports=router