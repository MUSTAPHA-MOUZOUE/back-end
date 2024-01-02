const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderControllers");
const { auth,isAdmin,isModerator } = require("../middlewares/Authmiddlewares");

router.post("/", orderController.createOrder);

router.get("/",auth,isModerator, orderController.getOrders);

router.get("/:id",auth,isModerator, orderController.getOrderById);

router.put("/:id",auth,isAdmin, orderController.updateOrder);

router.delete("/:id",auth,isAdmin, orderController.deleteOrder);

module.exports = router;
