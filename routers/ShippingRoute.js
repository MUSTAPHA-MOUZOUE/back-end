const express = require('express');
const { createshipping ,getshipping,updateshipping,deleteshipping} = require('../controllers/ShippingControler'); // Corrected function name
const { auth,isAdmin,isModerator } = require("../middlewares/Authmiddlewares");

const router = express.Router();

router.post('/',auth ,isAdmin,isModerator,createshipping); // Corrected function name
router.get('/',auth,isAdmin,isModerator,getshipping)
router.put('/:id',auth,isAdmin,isModerator,updateshipping)
router.delete("/:id",auth,isAdmin,isModerator,deleteshipping)
module.exports = router;