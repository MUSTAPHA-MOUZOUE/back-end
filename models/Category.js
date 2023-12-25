const mongoose=require("mongoose");
const Schema=mongoose.Schema;
const CategorySchema=new Schema({
    name:{
        type:String,
        required:true
    },
    description: {
        type: String,
        required: true
    },
    createdAt:{
        type:Date
    },
    parentCategory:{
        type:String
    },
    isActive: {
        type: Boolean, 
        default: true
    }

},{ timestamp: true })
const Category=mongoose.model("Category",CategorySchema)
module.exports=Category