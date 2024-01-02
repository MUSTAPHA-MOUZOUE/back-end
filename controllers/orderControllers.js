const stripe = require("stripe")(process.env.stripe_scret);
const OrderModel = require("../models/Order");
const Offer = require("../models/Offer");
const productModel = require("../models/Product");
const factory = require("./HandlersFactory");
const asyncHandler = require("express-async-handler");

//

// @desc    create cash order
// @route   POST /api/v1/orders/cartId
// @access  Protected/User
exports.createCashOrderWithOffer = asyncHandler(async (req, res, next) => {
  try {
    // App settings
    const taxPrice = 0;
    const shippingPrice = 0;

    // Get product details from the request body
    const { productId, quantity, offerCode } = req.body;

    // Check if the offer code is valid
    const offer = await Offer.findOne({
      code: offerCode,
      status: "active",
      startDate: { $lte: new Date() },
      endDate: { $gte: new Date() },
    });
console.log("1");
    // Calculate the total price without the discount
    const totalPrice = 100 + taxPrice + shippingPrice;
 console.log(offer);
    // If a valid offer code is provided, apply the discount
    if (offer) {
      // Calculate the discounted price
      const discountedPrice = totalPrice * (1 - offer.discountPercentage / 100);
      console.log("2");
      // Create the order with the discounted price and offer details
      const order = await OrderModel.create({
        userId: req.body.userId,
        productId: productId,
        totalPrice: discountedPrice,
        paymentMethod: "cash", // Assuming the default payment method is 'cash'
        discount: offer.discount,
        offerCode: offerCode,
      });

      // Update the product quantity
      const bulkOption = [
        {
          updateOne: {
            filter: { _id: productId },
            update: { $inc: { stockQty: -quantity } },
          },
        },
      ];

      await productModel.bulkWrite(bulkOption, {});
      console.log("3");
      res.status(201).json({ status: "success", data: order });
    } else {
        console.log("4");
      // If the offer code is invalid, create the order without the discount
      const order = await OrderModel.create({
        
        userId: req.body.userId,
        productId: productId,
        totalPrice: totalPrice,
        paymentMethod: "cash", // Assuming the default payment method is 'cash'
      });
      console.log("4");
      // Update the product quantity
      const bulkOption = [
        {
          updateOne: {
            filter: { _id: productId },
            update: { $inc: { stockQty: -quantity } },
          },
        },
      ];
      console.log("5");
      await productModel.bulkWrite(bulkOption, {});
      console.log("6");
      res.status(201).json({ status: "success", data: order });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

exports.checkoutSession = asyncHandler(async (req, res, next) => {
try {
    // App settings
    const taxPrice = 0;
    const shippingPrice = 0;

    // Get product details from the request body
    const { productId, quantity, offerCode } = req.body;

    // Check if the offer code is valid
    const offer = await Offer.findOne({
      code: offerCode,
      status: "active",
      startDate: { $lte: new Date() },
      endDate: { $gte: new Date() },
    });
console.log("1");
    // Calculate the total price without the discount
    const totalPrice = 100 + taxPrice + shippingPrice;
 console.log(offer);


    // If a valid offer code is provided, apply the discount
    if (offer) {
      // Calculate the discounted price
      const discountedPrice = totalPrice * (1 - offer.discountPercentage / 100);
      console.log("2");
      // Create the order with the discounted price and offer details
      const order = await OrderModel.create({
        userId: req.body.userId,
        productId: productId,
        totalPrice: discountedPrice,
        paymentMethod: "cart", // Assuming the default payment method is 'cart'
        discount: offer.discount,
        offerCode: offerCode,
      });

      // Update the product quantity
      const bulkOption = [
        {
          updateOne: {
            filter: { _id: productId },
            update: { $inc: { stockQty: -quantity } },
          },
        },
      ];

      await productModel.bulkWrite(bulkOption, {});
      console.log("3");

      res.status(201).json({ status: "success", data: order,session });
    } else {
        console.log("4");
      // If the offer code is invalid, create the order without the discount
      const order = await OrderModel.create({
        
        userId: req.body.userId,
        productId: productId,
        totalPrice: totalPrice,
        paymentMethod: "cash", // Assuming the default payment method is 'cash'
      });
      console.log("4");
      // Update the product quantity
      const bulkOption = [
        {
          updateOne: {
            filter: { _id: productId },
            update: { $inc: { stockQty: -quantity } },
          },
        },
      ];
      console.log("5");
      await productModel.bulkWrite(bulkOption, {});
      const session = await stripe.checkout.sessions.create({
        line_items: [
          {
            // name: req.user.name,
            // price: cart.cartItems[0]._id,
            // currency: "mad",
            // quantity: 1,
            price_data: {
              currency: "mad",
              product_data: {
                name: req.body.userId,
              },
              unit_amount: totalPrice * 100,
            },
            quantity: 1,
          },
        ],
        mode: "payment",
        success_url: `${req.protocol}://${req.get("host")}/orders`,
        cancel_url: `${req.protocol}://${req.get("host")}/cart`,
        // customer_email: req.user.email,
        // client_reference_id: req.params.cartId,
        metadata: req.body.shippingAddress,
      });
 
      console.log("6");
      res.status(201).json({ status: "success", data: order ,session });
    }


 
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
exports.getOrders = factory.getAll(OrderModel);
exports.getOrderById = factory.getOne(OrderModel);
exports.updateOrder = factory.updateOne(OrderModel);
exports.deleteOrder = factory.deleteOne(OrderModel);
