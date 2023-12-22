const express = require("express");
const app = express();
const port = 3001;qdd
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