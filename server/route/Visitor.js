const router=require('express').Router()
const VisitorController=require('../controller/Visitor')

router.post('/create',VisitorController.create)




module.exports=router