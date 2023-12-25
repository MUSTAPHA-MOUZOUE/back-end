const express = require("express");
const dotenv = require("dotenv");
dotenv.config({ path: 'config.env' });                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  
//dotenv.config({ path: "config.env" });
const dbConnection = require("./config/db");
const UserRoute=require("./routers/UserRoute")
const TransactionRoute=require('./routers/TransactionRoute')
const ShippingRoute=require('./routers/ShippingRoute')
// Connect with db
dbConnection();

// express app
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//  Routes users
app.use('/api/v1/users', UserRoute);
// Routes Transaction
app.use('/api/v1/Transaction', TransactionRoute);
//Routes Shipping
app.use('/api/v1/Shipping',ShippingRoute);


const PORT = process.env.PORT || 8000;
 const server = app.listen(PORT, () => {
   console.log(`App running running on port ${PORT}`);
 })