const express = require("express");
const router = express.Router();
const busController = require("../controllers/busController");

router
  .route("/bus")
  .get(busController.getPackageForAddPage)
  .post(busController.createBusConfirmation);
router.route("/bus/details").post(busController.createBusPostDetails);
router.route("/bus/gets/packages").post(busController.getBusPackages);
router
  .route("/bus/gets/packages/filter")
  .post(busController.getBusFilterPackages);
router
  .route("/bus/:id")
  .get(busController.getSpecificPackage)
  .put(busController.approvedUpdate)
  .patch(busController.cancelUpdate)
  .delete(busController.deleteBusPackage);
router.route("/bus/update/:id").put(busController.updateBusPackage);
router.route("/confirmation/bus").get(busController.getConfirmationDetails);

module.exports = router;
