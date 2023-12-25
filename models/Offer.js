const mongoose=require("mongoose");
const Schema=mongoose.Schema;
const OfferSchema=new Schema({
    code:{
        type:String
    },
    description:{
        type:String
    },
    discountType:{
        type:String
    },
    discountValue:{
        type:Number
    },
    validFrom:{
        type:Date
    },
    validUntil:{
        type:Date
    },
    usageLimit:{
        type:Number
    }
    // applicableProducts:{

    // },
})
const Offer=mongoose.model("Offer",OfferSchema)
module.exports=Offer