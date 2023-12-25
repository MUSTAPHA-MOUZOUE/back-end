// UserRoute.js
const express = require('express');
const { createUser, getUsers, getUsersbyid ,updateuserbyid,deleteuser} = require("../controllers/UserControler");
const router = express.Router();

router.post('/', createUser);
router.get('/', getUsers);
router.get('/:id', getUsersbyid);
router.put('/:id',updateuserbyid)
router.delete('/:id',deleteuser)

module.exports = router;
