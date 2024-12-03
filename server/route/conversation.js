const router=require('express').Router()
const ConversationController=require('../controller/Conversation')
const CheckLogin=require('../verifyToken')

router.post("/create",ConversationController.create)
router.get("/getByUser",CheckLogin,ConversationController.getByUser)
router.get("/getByShop/:shopId",CheckLogin,ConversationController.getByShop)
router.get("/find/:shopId/:userId",CheckLogin,ConversationController.getTwoUser)

module.exports=router
