const express = require("express");

const {
  CreateOffer,
  getOffers,
  getActiveOffers,
  getInActiveOffers,
  toggleOfferStatus,
  deleteExpiredOffers,
  updateOffer,
  deleteOffer,
} = require("../controllers/offerControllers");

const router = express.Router();

router.route("/").get(getOffers).post(CreateOffer);

router.get("/getActiveOffers", getActiveOffers);
router.get("/getInActiveOffers", getInActiveOffers);

router.put("/toggleOfferStatus/:code", toggleOfferStatus);
router.put("/updateOffer/:code", updateOffer);

router.delete("/deleteExpiredOffers", deleteExpiredOffers);
router.delete("/deleteOffer/:code", deleteOffer);

module.exports = router;
