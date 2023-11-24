const express = require("express");
const router = express.Router();
const visaController = require("../controllers/visaController");

router.route("/visa/details").post(visaController.createVisaDetails);
router.route("/visa").post(visaController.createVisaConfirmation);

module.exports = router;
