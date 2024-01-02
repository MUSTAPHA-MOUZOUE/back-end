const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderControllers");

router.post("/", orderController.createCashOrderWithOffer);
router.post("/cart", orderController.checkoutSession);

router.get("/", orderController.getOrders);

router.get("/:id", orderController.getOrderById);

router.put("/:id", orderController.updateOrder);

router.delete("/:id", orderController.deleteOrder);

module.exports = router;
