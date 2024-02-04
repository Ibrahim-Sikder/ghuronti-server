const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

router
  .route("/user/:email")
  .get(authController.getUser)
  .put(authController.updateProfile)
  .patch(authController.updatePassword)
  .post(authController.forgotPasswordUpdate)

router.route("/register").post(authController.registerUser);
router.route("/login").post(authController.loginUser);
router.route("/register/resend").post(authController.resendEmail);
router.route("/login/forgot/password").post(authController.forgotPassword);
router.route("/register/confirmation/:token").get(authController.confirmationUser);
router.route("/register/resend/confirmation/:token").get(authController.resendConfirmationUser);
 
 

module.exports = router;
