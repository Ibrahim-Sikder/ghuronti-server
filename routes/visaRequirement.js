const express = require("express");
const router = express.Router();
const visaController = require("../controllers/visaController");

// for requirement
router
  .route("/requirement")
  .get(visaController.getAllVisaRequirement)
  .post(visaController.postVisaRequirement);
router
  .route("/requirement/:id")
  .get(visaController.getSingleVisaRequirement)
  .put(visaController.updateVisaRequirement)
  .delete(visaController.deleteVisaRequirement);

router.route("/visa/requirement").post(visaController.getVisaRequirement);

module.exports = router;
