const router=require('express').Router()
const CartController=require('../controller/Cart')
const CheckLogin=require('../verifyToken')

router.post('/create',CheckLogin,CartController.create)
router.patch('/update/:id',CheckLogin,CartController.update)
router.delete('/delete/:id',CheckLogin,CartController.delete)
router.get('/getByUser',CheckLogin,CartController.cartByUser)


module.exports=router