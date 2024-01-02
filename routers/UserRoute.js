// UserRoute.js
const express = require('express');
const { createUser, getUsers, getUsersbyid ,updateuserbyid,deleteuser} = require("../controllers/UserControler");
const router = express.Router();
const { auth,isAdmin,isModerator } = require("../middlewares/Authmiddlewares");
router.post('/', auth,isAdmin ,createUser);
router.get('/',auth,isAdmin,isModerator , getUsers);
router.get('/:id',auth,isAdmin,isModerator , getUsersbyid);
router.put('/:id',auth,isAdmin ,updateuserbyid)
router.delete('/:id',auth,isAdmin ,deleteuser)

module.exports = router;
