const router=require('express').Router()
const ShipController=require('../controller/Ship')

router.post('/create',ShipController.create)
router.get('/getAll',ShipController.getAll)
router.get('/getByShop/:id',ShipController.getByShop)



module.exports=router