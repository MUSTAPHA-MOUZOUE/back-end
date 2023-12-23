const mongoose=require("mongoose");
const Schema=mongoose.Schema;
const TransictionSchema=new Schema({
    orderId: {
        type: Schema.Types.ObjectId,
        ref: 'Order',
        required: true
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    amount:{
        type:Number
    },
    transactionDate:{
        type:Date
    },
    paymentMethod:{
        type:String
    },
    status:{
        type:String
    },
})
const Transiction=mongoose.model("Transiction",TransictionSchema)
module.exports=Transiction