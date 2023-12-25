const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OfferSchema = new Schema({
  code: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  discountPercentage: {
    type: Number,
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  //   products: [
  //     {
  //       type: Schema.Types.ObjectId,
  //       ref: "Product",
  //     },
  //   ],
  status: {
    type: String,
    enum: ["active", "inactive"],
    default: "active",
  },
});

const Offer = mongoose.model("Offer", OfferSchema);

module.exports = Offer;
