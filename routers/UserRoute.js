// UserRoute.js
const express = require("express");
const {
  createUser,
  getUsers,
  getUsersbyid,
  updateuserbyid,
  deleteuser,
  forgetPassword,
  resetPassword,
} = require("../controllers/UserControler");
const router = express.Router();
const {
  auth,
  isAdmin,
  isModerator,
} = require("../middlewares/Authmiddlewares");

// Existing user-related endpoints
router.post("/", auth, isAdmin, createUser);
router.get("/", auth, isAdmin, isModerator, getUsers);
router.get("/:id", auth, isAdmin, isModerator, getUsersbyid);
router.put("/:id", auth, isAdmin, updateuserbyid);
router.delete("/:id", auth, isAdmin, deleteuser);

// New endpoints for forget password and reset password
router.post("/forget-password", forgetPassword);
router.post("/reset-password", resetPassword);

module.exports = router;
