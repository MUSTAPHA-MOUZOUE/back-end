const OfferModel = require("../models/Offer");
const asyncHandler = require("express-async-handler");
const factory = require("./HandlersFactory");


// exports.CreateOffer = asyncHandler(async (req, res) => {
//   const {
//     code,
//     description,
//     discountPercentage,
//     startDate,
//     endDate,
//     //  products,
//     status,
//   } = req.body;

//   const offer = await OfferModel.create({
//     code,
//     description,
//     discountPercentage,
//     startDate,
//     endDate,
//     //   products,
//     status,
//   });

//   res.status(201).json({ data: offer });
// });

// Function to get all offers
// exports.getOffers = asyncHandler(async (req, res) => {
//   const offers = await OfferModel.find();
//   res.status(200).json({ data: offers });
// });

// Function to get active offers
exports.getActiveOffers = asyncHandler(async (req, res) => {
  const activeOffers = await OfferModel.find({ status: "active" });
  res.status(200).json({ data: activeOffers });
});

// Function to get active offers
exports.getInActiveOffers = asyncHandler(async (req, res) => {
  const activeOffers = await OfferModel.find({ status: "inactive" });
  res.status(200).json({ data: activeOffers });
});

// Function to toggle offer status by code
exports.toggleOfferStatus = asyncHandler(async (req, res) => {
  const code = req.params.code;
  const offer = await OfferModel.findOne({ code });

  if (!offer) {
    return res.status(404).json({ error: "Offer not found" });
  }

  // Toggle the offer status
  offer.status = offer.status === "active" ? "inactive" : "active";

  // Save the updated offer
  await offer.save();

  res.status(200).json({ data: offer });
});

// Function to delete expired offers
exports.deleteExpiredOffers = asyncHandler(async (req, res) => {
  const currentDate = new Date();
  const expiredOffers = await Offer.find({ endDate: { $lt: currentDate } });

  if (expiredOffers.length === 0) {
    return res.status(404).json({ error: "No expired offers found" });
  }

  // Delete the expired offers
  await Offer.deleteMany({
    _id: { $in: expiredOffers.map((offer) => offer._id) },
  });

  res.status(200).json({ message: "Expired offers deleted successfully" });
});

// Function to update an offer by code
exports.updateOffer = asyncHandler(async (req, res) => {
  const code = req.params.code;
  const updatedDetails = req.body;

  const offer = await OfferModel.findOne({ code });

  if (!offer) {
    return res.status(404).json({ error: "Offer not found" });
  }

  // Update offer details
  Object.assign(offer, updatedDetails);

  // Save the updated offer
  await offer.save();

  res.status(200).json({ data: offer });
});

exports.deleteOffer = asyncHandler(async (req, res) => {
  const code = req.params.code;

  const offer = await OfferModel.findOne({ code });

  if (!offer) {
    return res.status(404).json({ error: "Offer not found" });
  }

  // Delete the offer
  await offer.remove();

  res.status(200).json({ message: "Offer deleted successfully" });
});

exports.CreateOffer = factory.createOne(OfferModel);

exports.getOffers = factory.getAll(OfferModel);


