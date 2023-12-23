const express = require('express');
const { createshipping ,getshipping,updateshipping,deleteshipping} = require('../controller/ShippingControler'); // Corrected function name

const router = express.Router();

router.post('/', createshipping); // Corrected function name
router.get('/',getshipping)
router.put('/:id',updateshipping)
router.delete("/:id",deleteshipping)
module.exports = router;