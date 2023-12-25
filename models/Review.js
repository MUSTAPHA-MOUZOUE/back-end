const mongoose=require("mongoose");
const Schema=mongoose.Schema;
const ReviewSchema=new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    productId: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    rating:{
        type:Number
    },
    comment:{
        type:String
    },
    createdAt:{
        type:Date
    }
})
const Review=mongoose.model("Review",ReviewSchema)
module.exports=Review