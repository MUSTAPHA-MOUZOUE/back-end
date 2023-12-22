const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");

dotenv.config({ path: "config.env" });
const dbConnection = require("./config/db");
const categoryRoute = require("./routes/categoryRoute");

// Connect with db
dbConnection();

// express app
const app = express();
<<<<<<< HEAD
const port = 3001;qdd
const mongoose = require("mongoose");
app.use(express.urlencoded({ extended: true }));
=======
>>>>>>> 707d9f3bc5d372a14b70d62d2e06bade639f42cd

// Middlewares
app.use(express.json());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
  console.log(`mode: ${process.env.NODE_ENV}`);
}

// Mount Routes
app.use("/api/v1/categories", categoryRoute);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`App running running on port ${PORT}`);
});
