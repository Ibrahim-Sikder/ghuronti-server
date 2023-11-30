const express = require("express");
const router = express.Router();
const trainController = require("../controllers/trainController");

router
  .route("/train")
  .post(trainController.createTrainConfirmation)
  .get(trainController.getPackageForAddPage);
router.route("/train/details").post(trainController.createTrainDetails);
router.route("/train/gets/packages").post(trainController.getTrainPackages);
router
  .route("/train/:id")
  .get(trainController.getSpecificPackage)
  .put(trainController.updateTrainConfirmation)
  .delete(trainController.deleteTrainPackage);
  router.route("/train/update/:id").put(trainController.updateTrainPackage);

module.exports = router;
