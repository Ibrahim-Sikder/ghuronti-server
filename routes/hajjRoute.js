const express = require("express");
const router = express.Router();
const hajjController = require("../controllers/hajjController");

router
  .route("/hajj")
  .get(hajjController.getPackageForAddPage)
  .post(hajjController.getHajjPackages);
router.route("/hajj/details").post(hajjController.createHajjDetails);
router.route("/hajj/filter/getOne").post(hajjController.getOneHajjDetails);
router
  .route("/hajj/:id")
  .get(hajjController.getSpecificPackage)
  .delete(hajjController.deleteHajjPackage);
router.route("/hajj/update/:id").put(hajjController.updateHajjPackage);

module.exports = router;
