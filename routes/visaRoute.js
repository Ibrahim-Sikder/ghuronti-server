const express = require("express");
const router = express.Router();
const visaController = require("../controllers/visaController");

router
  .route("/visa")
  .get(visaController.getPackageForAddPage)
  .post(visaController.createVisaConfirmation);
router.route("/visa/details").post(visaController.createVisaDetails);
router.route("/visa/gets/package").post(visaController.getVisaPackages);
router
  .route("/visa/:id")
  .get(visaController.getSpecificPackage)
  .put(visaController.approvedUpdate)
  .patch(visaController.cancelUpdate)
  .delete(visaController.deleteVisaPackage);
router.route("/visa/update/:id").put(visaController.updateVisaPackage);
router
  .route("/confirmation/visa")
  .get(visaController.getConfirmationDetails)
// for requirement
// router
//   .route("/visa/requirement/post/type")
//   .post(visaController.postVisaRequirement);
// router
//   .route("/visa/requirement/get/type/specific")
//   .post(visaController.getVisaRequirement);

module.exports = router;
