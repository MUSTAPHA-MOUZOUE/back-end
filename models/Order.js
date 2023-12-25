const mongoose=require("mongoose");
const Schema=mongoose.Schema;
const PaymentMethods = ['PayPal', 'Bank Transfer'];
const shippingAddressSchema = new mongoose.Schema({
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    postalCode: { type: String, required: true },
    country: { type: String, required: true },
  });
  
  const billingAddressSchema = new mongoose.Schema({
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    postalCode: { type: String, required: true },
    country: { type: String, required: true },
  });
const OrderSchema=new Schema({
    ProductId:{
        type: Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    date:{
        type:date,
        required:true
    },
    totalPrice:{
        type:number,
        required:true
    },
    paymentmethod: {
        enum: PaymentMethods,
        required: true
    },
    customer:{
        type:String
    },
    discount: {
        type: Number,
    },
    shippingAddress: {
         type: shippingAddressSchema,
          required: true 
    },
    trackingNumber: {
         type: String
     },
    billingAddress: { 
        type: billingAddressSchema,
        required: true
    },
    orderNotes:{
        type: String
    },
    tax:{
        type:Number
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

},{ timestamp: true })
const Order=mongoose.model("Order",OrderSchema)
module.exports=Order