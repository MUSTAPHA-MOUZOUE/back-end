const express = require('express');

const { CreateCategories } = require('../controller/CategoryController');

const router = express.Router();

router.post('/', CreateCategories );

module.exports = router;