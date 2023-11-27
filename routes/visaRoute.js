const express = require("express");
const router = express.Router();
const visaController = require("../controllers/visaController");

router
  .route("/visa")
  .get(visaController.getPackageForAddPage)
  .post(visaController.createVisaConfirmation);
router.route("/visa/details").post(visaController.createVisaDetails);
router.route("/visa/gets/package").post(visaController.getVisaPackages);
router.route("/visa/:id").delete(visaController.deleteVisaPackage);

module.exports = router;
