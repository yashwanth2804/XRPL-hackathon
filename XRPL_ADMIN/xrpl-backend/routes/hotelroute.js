const express = require("express");
const router = express.Router();
const hotelController = require("../controller/hotelController");

/**
 * App Routes
 */
router.get("/", hotelController.getHotels);

router.get("/makeAuthorized", hotelController.makeAuthorizedMinter);
router.get(
  "/makeAuthorizedNFTAcceptOffer",
  hotelController.makeAuthorizedNFTAcceptOffer
);
router.get("/currentMinter", hotelController.getCurrentMinter);
router.get("/getUserBookings", hotelController.getUserBookings);

router.post("/acceptoffer", hotelController.acceptNFTOffer);
router.post("/list", hotelController.saveHotels);

module.exports = router;
