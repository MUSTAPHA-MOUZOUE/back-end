// controllers/orderController.js
const OrderModel = require("../models/Order");

exports.createOrder = (req, res) => {
  const {
    ProductId,
    date,
    totalPrice,
    paymentMethod,
    customer,
    discount,
    shippingAddress,
    trackingNumber,
    billingAddress,
    orderNotes,
    tax,
    userId,
  } = req.body;

  const newOrder = new OrderModel({
    ProductId,
    date,
    totalPrice,
    paymentMethod,
    customer,
    discount,
    shippingAddress,
    trackingNumber,
    billingAddress,
    orderNotes,
    tax,
    userId,
  });

  newOrder
    .save()
    .then((doc) => {
      res.json(doc);
    })
    .catch((err) => {
      res.status(400).json({ error: err.message });
    });
};

exports.getOrders = (req, res) => {
  OrderModel.find()
    .then((orders) => {
      res.json(orders);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
};

exports.getOrderById = (req, res) => {
  OrderModel.findById(req.params.id)
    .then((order) => {
      if (!order) {
        return res.status(404).json({ message: "Order not found" });
      }
      res.json(order);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
};

exports.updateOrder = (req, res) => {
  OrderModel.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((order) => {
      if (!order) {
        return res.status(404).json({ message: "Order not found" });
      }
      res.json(order);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
};

exports.deleteOrder = (req, res) => {
  OrderModel.findByIdAndDelete(req.params.id)
    .then((order) => {
      if (!order) {
        return res.status(404).json({ message: "Order not found" });
      }
      res.status(204).send();
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
};
