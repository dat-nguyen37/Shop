const router=require('express').Router()
const productController=require('../controller/Product')

router.post('/create',productController.create)
router.get('/getProductByShop/:id',productController.getByShop)
router.patch('/update/:id',productController.update)



module.exports=router