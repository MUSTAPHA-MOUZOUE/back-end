const express=require("express")
const {craeteTransaction,getTransaction,getTransactionid,updateTransaction,deleteTransaction} =require('../controllers/TransactionControler')
const { auth,isAdmin} = require("../middlewares/AuthMiddlewares");
const router=express.Router()

router.post('/',craeteTransaction)
router.get('/',getTransaction)
router.get('/:id',getTransactionid)
router.put("/:id",updateTransaction)
router.delete("/:id",deleteTransaction)
//router.post('/logout', auth,role({role : ["admin" | "moderator"] }), logout);
//router.post('/logout',  auth,isAdmin, logout);
module.exports = router;