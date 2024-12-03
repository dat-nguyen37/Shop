const router=require('express').Router()
const MesageController=require('../controller/Message')
const CheckLogin=require('../verifyToken')

router.post("/create",CheckLogin,MesageController.create)
router.get("/user/:userId/:conversationId",MesageController.getConversationByUser)
router.get("/shop/:shopId/:conversationId",MesageController.getConversationByShop)


module.exports=router
