const router=require('express').Router()
const productController=require('../controller/Product')
const checkLogin=require('../verifyToken')
router.post('/create',productController.create)
router.get('/getProductByShop/:id',productController.getByShop)
router.patch('/update/:id',productController.update)
router.delete('/delete/:id',productController.delete)
router.get('/getAll',productController.getAll)
router.get('/getByActive',productController.getByActive)
router.get('/getOne/:id',productController.getOne)
router.get('/getByView',productController.getByView)
router.get('/getBestSellingByShop/:id',productController.getBestSellingByShop)
router.get('/getBestSelling',productController.getBestSelling)
router.get('/search',productController.search)
router.get('/like/:id',checkLogin,productController.likeProduct)








module.exports=router