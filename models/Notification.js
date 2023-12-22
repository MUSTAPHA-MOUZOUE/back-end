const mongoose=require("mongoose");
const Schema=mongoose.Schema;
const NotificationSchema=new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
   message:{
        type:String
    },
    status:{
        type:String,
        enum:["read","noread"],
        default:"red"
    },
    
},{timestamps:true})
const Notification=mongoose.model("Notification",NotificationSchema)
module.exports=Notification