const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/categoryControllers");

// Create a new category
router.post("/", categoryController.CreateCategories);

// Retrieve all categories
router.get("/", categoryController.getCategories);

// Retrieve a specific category by ID
router.get("/:id", categoryController.getCategoryById);

// Update a specific category by ID
router.put("/:id", categoryController.updateCategory);

// Delete a specific category by ID
router.delete("/:id", categoryController.deleteCategory);

module.exports = router;
