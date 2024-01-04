// authRoute.js

const express = require("express");
const router = express.Router();
const authController = require("../controllers/authcontrollers");

// Registration route
router.post("/sign-up", authController.registerUser);

// Signin route
router.post("/sign-in", authController.signInUser);

// Forget and Reset Password routes
router.post("/forget-password", authController.forgetPassword);
router.post("/reset-password", authController.resetPassword);

// Verification route
router.post("/verify", authController.verify);

// Logout route with authentication middleware
router.post("/logout", authController.logout);

module.exports = router;
