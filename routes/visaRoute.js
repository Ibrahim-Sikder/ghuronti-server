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
  .delete(visaController.deleteVisaPackage);
router.route("/visa/update/:id").put(visaController.updateVisaPackage);

module.exports = router;
