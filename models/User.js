const mongoose = require("mongoose");
const Schema = mongoose.Schema;
 
// define the Schema (the structure of the article)
const UserSchema = new Schema({
    fullname: {
        type: String,
        required: true
      },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    phonenumber:{
        type:String,
        required:false
    },
    createdAt:{
      type:Date
    },
    lastLogin:{
      type:Date
    },
    resetPasswordToken:{
      type:String
    },
    wishlist:[{
      items: [{
        name: { type: String, required: true },
        price: { type: Number, required: true },
      }]
    }],
    resetPasswordExpire:{
      type:Date
    },
    adresse:{
        type:String,
        required:false
    },
    role: {
        type: [
          {
            type: String,
            enum: ["user", "admin"],
            //default: ["user"]
          }
         ]
       }
},{ timestamp: true });
 
 
// Create a model based on that schema
const User = mongoose.model("User", UserSchema);
 
 
// export the model
module.exports = User;