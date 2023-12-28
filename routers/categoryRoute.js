const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/categoryControllers");

router.post("/", categoryController.CreateCategories);

router.get("/", categoryController.getCategories);

router.get("/:id", categoryController.getCategoryById);

router.put("/:id", categoryController.updateCategory);

router.delete("/:id", categoryController.deleteCategory);

    module.exports = router;
