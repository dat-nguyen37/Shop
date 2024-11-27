const router=require('express').Router()
const CommentController=require('../controller/Comment')
const CheckLogin=require('../verifyToken')

router.post('/create',CheckLogin,CommentController.create)
router.get('/getAll/:id',CommentController.getAll)



module.exports=router