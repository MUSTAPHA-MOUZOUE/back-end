const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");

// Create a new order
router.post("/", orderController.createOrder);

// Retrieve all orders
router.get("/", orderController.getOrders);

// Retrieve a specific order by ID
router.get("/:id", orderController.getOrderById);

// Update a specific order by ID
router.put("/:id", orderController.updateOrder);

// Delete a specific order by ID
router.delete("/:id", orderController.deleteOrder);

module.exports = router;
