const express = require("express");
const dotenv = require("dotenv");
dotenv.config({ path: 'config.env' });                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  

dotenv.config({ path: "config.env" });
const dbConnection = require("./config/db");
const categoryRoute = require("./routers/categoryRoute");
const orderRoute = require("./routers/orderRoute");
const offerRoute = require("./routers/offerRoute");
const notificationRoute = require("./routers/notificationRoute");
const UserRoute = require("./routers/UserRoute");
const TransactionRoute = require("./routers/TransactionRoute");
const ShippingRoute = require("./routers/ShippingRoute");

// Connect with db
dbConnection();

// express app
const app = express();

const mongoose = require("mongoose");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// Mount Routes
app.use('/api/v1/categories', categoryRoute);
app.use("/api/v1/order", orderRoute);
app.use("/api/v1/offers", offerRoute);
app.use("/api/v1/notification", notificationRoute);

const PORT = process.env.PORT || 8000;

const server = app.listen(PORT, () => {
  console.log(`App running running on port ${PORT}`);
});
