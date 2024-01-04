// index.js
const express = require("express");
const dotenv = require("dotenv");
dotenv.config({ path: ".env" });

const dbConnection = require("./config/db");
const categoryRoute = require("./routers/categoryRoute");
const orderRoute = require("./routers/orderRoute");
const offerRoute = require("./routers/offerRoute");
const notificationRoute = require("./routers/notificationRoute");
const UserRoute = require("./routers/UserRoute");
const TransactionRoute = require("./routers/TransactionRoute");
const ShippingRoute = require("./routers/ShippingRoute");
const authRoute = require("./routers/authRoute");
const productRoute = require("./routers/productRoute");

dbConnection();

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api/v1/products", productRoute);
app.use("/api/v1/categories", categoryRoute);
app.use("/api/v1/order", orderRoute);
app.use("/api/v1/offers", offerRoute);
app.use("/api/v1/notification", notificationRoute);
app.use("/api/v1/user", UserRoute);
app.use("/api/v1/shipping", ShippingRoute);
app.use("/api/v1/transa", TransactionRoute);

// Include authRoute for authentication-related functionalities
app.use("/api/v1/auth", authRoute);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`App running on port ${PORT}`);
});
