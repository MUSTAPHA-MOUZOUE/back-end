const mongoose=require("mongoose");
const Schema=mongoose.Schema;
const ShippingSchema=new Schema({
   type:{
       type:String
   },
   cost:{
       type:Number
   },
   estimatedDelivery:{
       type:String
   },
   regions: {
    type: [String], 
    required: true,
  },
})
const Shipping=mongoose.model("Transiction",ShippingSchema)
module.exports=Shipping