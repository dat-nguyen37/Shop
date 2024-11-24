const router=require('express').Router()
const CategoryController=require('../controller/Category')

router.post('/create',CategoryController.create)
router.patch('/update/:id',CategoryController.update)
router.delete('/delete/:id',CategoryController.delete)

router.get('/getAll',CategoryController.getAll)


module.exports=router