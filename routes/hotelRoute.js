const express = require("express");
const router = express.Router();
const hotelController = require("../controllers/hotelController");
router
  .route("/hotel")
  .get(hotelController.getPackageForAddPage)
  .post(hotelController.createHotelConfirmation);
router.route("/hotel/details").post(hotelController.createHotelDetails);
router.route("/hotel/get/packages").post(hotelController.getHotelPackages);
router.route("/hotel/:id").delete(hotelController.deleteHotelPackage);

module.exports = router;
