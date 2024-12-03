const router=require('express').Router()
const productController=require('../controller/Product')

router.post('/create',productController.create)
router.get('/getProductByShop/:id',productController.getByShop)
router.patch('/update/:id',productController.update)
router.delete('/delete/:id',productController.delete)
router.get('/getAll',productController.getAll)
router.get('/getByActive',productController.getByActive)
router.get('/getOne/:id',productController.getOne)
router.get('/getBestSellingByShop/:id',productController.getBestSellingByShop)
router.get('/search',productController.search)







module.exports=router