const { registerUser, signInUser, logout,v } = require("../controllers/authcontrollers");
const { auth} = require("../middlewares/AuthMiddlewares"); // Updated import

const express = require("express");
const router = express.Router();

// Registration route
router.post('/sign-up', registerUser);

// Signin route
router.post('/sign-in', signInUser);
router.post('/verify', verify);

// Logout route with authentication middleware
router.post('/logout', auth, logout);


module.exports = router;