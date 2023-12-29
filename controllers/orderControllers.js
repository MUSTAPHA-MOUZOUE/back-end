const OrderModel = require("../models/Order");
const factory = require("./HandlersFactory");


// 
exports.createOrder = factory.createOne(OrderModel);
exports.getOrders = factory.getAll(OrderModel);
exports.getOrderById = factory.getOne(OrderModel);
exports.updateOrder = factory.updateOne(OrderModel);
exports.deleteOrder = factory.deleteOne(OrderModel);
