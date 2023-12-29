const {
  registerUser,
  signInUser,
  logout,
} = require("../controllers/authcontrollers");
const { auth } = require("../middlewares/AuthMiddlewares"); // Updated import

const express = require("express");
const router = express.Router();

// Registration route
router.post("/sign-up", registerUser);

// Signin route
router.post("/sign-in", signInUser);

// Logout route with authentication middleware
router.post("/logout", auth, logout);
module.exports = router;
