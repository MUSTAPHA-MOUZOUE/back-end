const TransactionModele=require("../models/Transaction")
const factory = require("./HandlersFactory");

// exports.craeteTransaction=async(req,res)=>{
//     try {
//         const Transaction=await TransactionModele.create(req.body)
//         res.status(200).json(Transaction)

//     } catch (error) {
//         console.error('Error creating Transaction:', error);
//         res.status(500).json({ error: 'Internal Server Error' });
//     }  
// }
// exports.getTransaction=async(req,res)=>{
//     try {
//         const Transaction=await TransactionModele.find({})
//         res.status(200).json(Transaction)
        
//     } catch (error) {
//         console.error('Error get Transaction:', error);
//         res.status(500).json({ error: 'Internal Server Error' });   
//     }
// }
// exports.getTransactionid=async(req,res)=>{
//     try {
//         const {id}=req.params
//         const Transaction=await TransactionModele.findById(id)
//         res.status(200).json(Transaction)
//     } catch (error) {
//         console.log("Error get transaction by id ",error)
//         res.status(500).json({error:"Internal Server Error"})
//     }
// }
// exports.updateTransaction=async(req,res)=>{
//     try {
//         const {id}=req.params
//         const UpdateTransaction=await TransactionModele.findByIdAndUpdate(id,req.body)
//         res.status(200).json(UpdateTransaction)
        
//     } catch (error) {
//         console.log("Error update transaction :",error)
//         res.status(500).json({error:"Internal Server Error"})
//     }
// }
// exports.deleteTransaction=async(req,res)=>{
//     try {
//         const {id}=req.params
//         const Transaction = await TransactionModele.findByIdAndDelete(id)
//          if (!Transaction) {
//              res.status(200).json({message:"Transaction not found"})
//          }
//         res.status(200).json({ message: "Transaction deleted successfully", deleteTransaction: Transaction });

//     } catch (error) {
//         console.log("Erro delete transaction :",error)
//         res.status(500).json({error:"Internal Server Error"})
//     }
// }

exports.craeteTransaction = factory.createOne(TransactionModele);
exports.getTransactionid = factory.getOne(TransactionModele);
exports.getTransaction = factory.getAll(TransactionModele);
exports.updateTransaction = factory.updateOne(TransactionModele);
exports.deleteTransaction = factory.deleteOne(TransactionModele);

