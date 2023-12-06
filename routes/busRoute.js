const express = require("express");
const router = express.Router();
const busController = require("../controllers/busController");

router
  .route("/bus")
  .get(busController.getPackageForAddPage)
  .post(busController.createBusConfirmation);
router.route("/bus/details").post(busController.createBusPostDetails);
router.route("/bus/gets/packages").post(busController.getBusPackages);
router.route("/bus/gets/packages/filter").post(busController.getBusFilterPackages);
router
  .route("/bus/:id")
  .get(busController.getSpecificPackage)
  .delete(busController.deleteBusPackage);
router.route("/bus/update/:id").put(busController.updateBusPackage);

module.exports = router;
