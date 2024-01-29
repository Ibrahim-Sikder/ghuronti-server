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
  .put(hajjController.approvedUpdate)
  .patch(hajjController.cancelUpdate)
  .delete(hajjController.deleteHajjPackage);
router.route("/hajj/update/:id").put(hajjController.updateHajjPackage);
router
  .route("/confirmation/hajj/post/one")
  .post(hajjController.createHajjPost)
router
  .route("/confirmation/hajj")
  .get(hajjController.getConfirmationDetails)

module.exports = router;
