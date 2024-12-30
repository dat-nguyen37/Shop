const router=require('express').Router()
const LogController=require('../controller/Log')

router.get('/getAll',LogController.getAll)




module.exports=router