const express = require("express");
const dotenv = require("dotenv");
dotenv.config({ path: 'config.env' });                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  

dotenv.config({ path: "config.env" });
const dbConnection = require("./config/db");
const categoryRoute = require("./routers/categoryRoute");

// Connect with db
dbConnection();

// express app
const app = express();

const mongoose = require("mongoose");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// Mount Routes
app.use('/api/v1/categories', categoryRoute);

const PORT = process.env.PORT || 8000;

const server = app.listen(PORT, () => {
  console.log(`App running running on port ${PORT}`);
});