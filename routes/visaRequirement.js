const express = require("express");
const router = express.Router();
const visaController = require("../controllers/visaController");

 
// for requirement
router
  .route("/requirement")
  .post(visaController.postVisaRequirement);
router
  .route("/visa/requirement")
  .post(visaController.getVisaRequirement);

module.exports = router;
