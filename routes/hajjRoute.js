const express = require("express");
const router = express.Router();
const hajjController = require("../controllers/hajjController");

router
  .route("/hajj")
  .get(hajjController.getPackageForAddPage)
  .post(hajjController.getHajjPackages);
router.route("/hajj/details").post(hajjController.createHajjDetails);
router.route("/hajj/:id").delete(hajjController.deleteHajjPackage);

module.exports = router;
