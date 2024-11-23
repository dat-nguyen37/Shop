const router=require('express').Router()
const CategoryController=require('../controller/Category')

router.post('/create',CategoryController.create)
router.get('/getAll',CategoryController.getAll)


module.exports=router