const ShippingModel=require('../models/Shipping')
const factory = require("./HandlersFactory");



// exports.createshipping=async(req,res)=>{
//     try{
//     const Shipping=await ShippingModel.create(req.body)
//     //console.log(Shipping)
//     res.status(200).json({ message: "add to data base"});
//     }catch(error){
//         console.log("Error craete Shiping",error)
//         res.status(500).json({error:"Internal Server Error"})
//     }
// }
// exports.getshipping=async(req,res)=>{
//     try{
//     const Shipping=await ShippingModel.find({})
//     res.status(200).json(Shipping)
//     }catch(error){
//         console.log("Error get shipping :",error)
//         res.status(500).json({error:"Internal Server Error"})
//     }
// }
// exports.updateshipping=async(req,res)=>{
//     try{
//     const {id}=req.params
//     const Shipping=await ShippingModel.findByIdAndUpdate(id,req.body)
//     res.status(200).json(Shipping)
//     }catch(error){
//         console.log("Error update shipping :",error)
//         res.status(500).json({error:"Internal Server Error"})
//     }
// }
// exports.deleteshipping=async(req,res)=>{
//     try {
//         const {id}=req.params
//         const Shipping=await ShippingModel.findByIdAndDelete(id)
//         res.status(200).json({message:"tamsah"})
//     } catch (error) {
//         console.log("Error delete Shipping :",error)
//         res.status(500).json({error:"Internal Server Error"})
//     }
// }

exports.createshipping = factory.createOne(ShippingModel);
exports.getshipping = factory.getAll(ShippingModel);
exports.updateshipping = factory.updateOne(ShippingModel);
exports.deleteshipping = factory.deleteOne(ShippingModel);
