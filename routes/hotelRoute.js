const express = require("express");
const router = express.Router();
const hotelController = require("../controllers/hotelController");

router.route("/hotel/details").post(hotelController.createHotelDetails);
router.route("/hotel").post(hotelController.createHotelConfirmation);

module.exports = router;
