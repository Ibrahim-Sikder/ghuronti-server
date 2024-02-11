const express = require("express");
const router = express.Router();
const domesticHotel = require("../controllers/domesticHotelController");

router
  .route("/domestic")
  .get(domesticHotel.getPackageForAddPage)
  .post(domesticHotel.domesticHotelCreate);
router
  .route("/domestic/:id")
  .get(domesticHotel.getSpecificPackage)
  .put(domesticHotel.updateHotelPackage)
  .delete(domesticHotel.deleteHotelPackage);
// router
//   .route("/user/:email")
//   .get(authController.getUser)
//   .put(authController.updateProfile)
//   .patch(authController.updatePassword)
//   .post(authController.forgotPasswordUpdate)

// router.route("/register").post(authController.registerUser);
// router.route("/login").post(authController.loginUser);
// router.route("/register/resend").post(authController.resendEmail);
// router.route("/login/forgot/password").post(authController.forgotPassword);
// router.route("/register/confirmation/:token").get(authController.confirmationUser);
// router.route("/register/resend/confirmation/:token").get(authController.resendConfirmationUser);

module.exports = router;
