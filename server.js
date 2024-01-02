const express = require("express");
const dotenv = require("dotenv");
dotenv.config({ path: '.env' });                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  

const dbConnection = require("./config/db");
const categoryRoute = require("./routers/categoryRoute");
const orderRoute = require("./routers/orderRoute");
const offerRoute = require("./routers/offerRoute");
const notificationRoute = require("./routers/notificationRoute");
const UserRoute = require("./routers/UserRoute");
const TransactionRoute = require("./routers/TransactionRoute");
const ShippingRoute = require("./routers/ShippingRoute");
const authRoute=require("./routers/authRoute")
// Connect with db
dbConnection();

// express app
const app = express();

//const mongoose = require("mongoose");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// Mount Routes
app.use('/api/v1/categories', categoryRoute);
app.use("/api/v1/order", orderRoute);
app.use("/api/v1/offers", offerRoute);
app.use("/api/v1/notification", notificationRoute);
app.use("/api/v1/user",UserRoute)
// Routes Shipping
app.use("/api/v1/shipping",ShippingRoute )
//Routes Transaction
app.use("/api/v1/transa",TransactionRoute)
app.use("/api",authRoute)
const PORT = process.env.PORT || 8000;
 app.listen(PORT, () => {
  console.log(`App running running on port ${PORT}`);
});
