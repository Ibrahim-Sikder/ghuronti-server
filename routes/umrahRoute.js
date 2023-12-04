const express = require("express");
const router = express.Router();
const umrahController = require("../controllers/umraController");

router.route("/umrah/details").post(umrahController.createUmrahDetails);
router.route("/umrag/get/packages").post(umrahController.getUmrahPackages);
router.route("/umrah/details/filter/getOne").post(umrahController.getOneUmrahDetails);
router
  .route("/umrah")
  .get(umrahController.getPackageForAddPage)
  .post(umrahController.createUmrahPost);
router
  .route("/umrah/:id")
  .get(umrahController.getSpecificPackage)
  .delete(umrahController.deleteUmrahPackage);
router.route("/umrah/update/:id").put(umrahController.updateUmrahPackage);

module.exports = router;
