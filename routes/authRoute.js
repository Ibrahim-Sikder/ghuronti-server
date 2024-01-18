const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

router
  .route("/user/:email")
  .get(authController.getUser);
router
  .route("/register")
  .post(authController.registerUser);
router
  .route("/login")
  .post(authController.loginUser);
router
  .route("/register/confirmation/:token")
  .get(authController.confirmationUser);
// router.route("/bus/details").post(busController.createBusPostDetails);
// router.route("/bus/gets/packages").post(busController.getBusPackages);
// router.route("/bus/gets/packages/filter").post(busController.getBusFilterPackages);
// router
//   .route("/bus/:id")
//   .get(busController.getSpecificPackage)
//   .delete(busController.deleteBusPackage);
// router.route("/bus/update/:id").put(busController.updateBusPackage);

module.exports = router;
