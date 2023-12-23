const express = require("express");
const dotenv = require("dotenv");
dotenv.config({ path: 'config.env' });                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  
dotenv.config({ path: "config.env" });
//const dbConnection = require("./config/db");
const categoryRoute = require("./routes/CategoryRoute");
const UserRoute=require("./routes/UserRoute")
// Connect with db
//dbConnection();
const mongoose = require('mongoose');
const PORT=8000
mongoose.connect('mongodb+srv://ecommerce:ecommerce@cluster0.usyigca.mongodb.net/?retryWrites=true&w=majority')
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch(error => {
    console.error('Error connecting to MongoDB:', error.message);
  });

// express app
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Mount Routes
app.use('/api/v1/categories', categoryRoute);
app.use('/api/add/users', UserRoute); // Adjust the path if needed
app.use('/users', UserRoute); // Adjust the path if needed
//app.use('/api/user/', UserRoute);

//const PORT = process.env.PORT || 8000;
const server = app.listen(PORT, () => {
  console.log(`App running running on port ${PORT}`);
})