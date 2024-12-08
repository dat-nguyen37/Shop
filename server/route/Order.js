const router=require('express').Router()
const OrderController=require('../controller/Order')
const CheckLogin=require('../verifyToken')

router.post('/create',CheckLogin,OrderController.creatOrder)
router.get('/getByShopAndUser/:userId/:shopId',OrderController.getByShopAndUser)
router.get('/getByShop/:shopId',OrderController.getAllByShop)
router.get('/getOrderByUser',CheckLogin,OrderController.getOrderByUser)
router.patch('/update',OrderController.update)
router.delete('/delete/:id',OrderController.delete)




module.exports=router