const router=require('express').Router()
const ReportController=require('../controller/Report')
const CheckLogin=require('../verifyToken')


router.post('/create',CheckLogin,ReportController.create)
router.get('/getAll',ReportController.getAll)
router.patch('/update/:id',CheckLogin,ReportController.update)
router.delete('/delete/:id',CheckLogin,ReportController.delete)




module.exports=router