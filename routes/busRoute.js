const express = require("express");
const router = express.Router();
const busController = require("../controllers/busController");

router
  .route("/bus")
  .get(busController.getPackageForAddPage)
  .post(busController.createBusConfirmation);
router.route("/bus/details").post(busController.createBusPostDetails);
router.route("/bus/gets/packages").post(busController.getBusPackages);
router.route("/bus/:id").delete(busController.deleteBusPackage);

module.exports = router;
