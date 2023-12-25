const express=require("express")
const {craeteTransaction,getTransaction,getTransactionid,updateTransaction,deleteTransaction} =require('../controllers/TransactionControler')
const router=express.Router()

router.post('/',craeteTransaction)
router.get('/',getTransaction)
router.get('/:id',getTransactionid)
router.put("/:id",updateTransaction)
router.delete("/:id",deleteTransaction)

module.exports = router;