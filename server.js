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
<<<<<<< HEAD
const authRoute=require("./routers/authRoute")
=======
const productRoute = require("./routers/productRoute");
const authRoutes = require("./routers/authRoute");
>>>>>>> c6c3abc54bfa05b53b346d138bef1c98bdd3fefc
// Connect with db
dbConnection();

// express app
const app = express();

//const mongoose = require("mongoose");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Mount Routes
app.use('/api/v1/products', productRoute);
app.use('/api/v1/categories', categoryRoute);
app.use("/api/v1/order", orderRoute);
app.use("/api/v1/offers", offerRoute);
app.use("/api/v1/notification", notificationRoute);
app.use("/api/v1/user",UserRoute)
// Routes Shipping
app.use("/api/v1/shipping",ShippingRoute )
//Routes Transaction
app.use("/api/v1/transa",TransactionRoute)
<<<<<<< HEAD
app.use("/api",authRoute)
=======
app.use("/api/v1/auth", authRoutes);

>>>>>>> c6c3abc54bfa05b53b346d138bef1c98bdd3fefc
const PORT = process.env.PORT || 8000;
 app.listen(PORT, () => {
  console.log(`App running running on port ${PORT}`);
});
