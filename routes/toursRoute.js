const express = require("express");
const router = express.Router();
const toursController = require("../controllers/toursController");

router
  .route("/tours")
  .get(toursController.getPackageForAddPage)
  .post(toursController.createToursConfirmation);
router.route("/tours/details").post(toursController.createToursDetails);
router.route("/tours/gets/packages").post(toursController.getToursPackages);
router
  .route("/tours/:id")
  .get(toursController.getSpecificPackage)
  .delete(toursController.deleteToursPackage);
router.route("/tours/update/:id").put(toursController.updateToursPackage);

module.exports = router;
