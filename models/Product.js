const mongoose=require("mongoose");
const Schema=mongoose.Schema;

const ProductSchema=new Schema({
    name:{
        type:String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    thumbnail:{
        type:String
    },
    images:[ {
        type: String,
        required: true
    }],
    variants:[{
        size:Number,
        color:String
    }],
    title:{
        type:String
    },
    compareAtPrice:{
        type:Number
    },
    SKU:{
        type: String,
    },
    stockQty:{
        type:Number
    },
    status:{
        type:String
    },
    createdBy:{
        type:String
    },
    averageRating:{
        type:Number
    },
    reviews: [{type: mongoose.Schema.Types.ObjectId, ref: 'Review'}],
    tags: [{
        name: String,
        
      }],
    isFeatured:{
        type:Boolean
    },
    metaTitle:{
        type:String
    },
    metaDescription:{
        type:String
    },
    metaKeywords:{
        type:String
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    CategoryId:{
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    }
    
    
},{ timestamp: true })
const Product=mongoose.model("Product",ProductSchema)
module.exports=Product