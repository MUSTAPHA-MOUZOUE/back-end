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
const port = 3001;
const mongoose = require("mongoose");
app.use(express.urlencoded({ extended: true }));

mongoose
  .connect(`mongodb://localhost:37017`)
  .then(() => {
    app.listen(port, () => {
      console.log(`http://localhost:${port}/`);
    });
  })

  .catch((err) => {
    console.log(err);
  });
app.listen(port)