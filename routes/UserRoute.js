// UserRoute.js
const express = require('express');
const { createUser, getUsers, getUsersbyid } = require("../controller/UserControler");
const router = express.Router();

router.post('/', createUser);
router.get('/:id', getUsersbyid); // Place this before the generic route
router.get('/', getUsers);

module.exports = router;
