const express = require("express");
const router = express.Router();
const toursController = require("../controllers/toursController");

router.route("/tours/details").post(toursController.createToursDetails);
router.route("/tours").post(toursController.createToursConfirmation);

module.exports = router;
