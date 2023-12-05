const express = require("express");
const router = express.Router();
const hajjController = require("../controllers/hajjController");

// for requirement
router
  .route("/requirement/hajj/package")
  .get(hajjController.getAllHajjRequirement)
  .post(hajjController.postHajjRequirement);
router
  .route("/requirement/hajj/:id")
  .delete(hajjController.deleteHajjRequirement)
  .put(hajjController.updateHajjRequirement)
  .get(hajjController.getSingleHajjRequirement);

// router.route("/visa/requirement").post(hajjController.getVisaRequirement);

module.exports = router;
