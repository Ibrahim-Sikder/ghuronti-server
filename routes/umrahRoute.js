const express = require("express");
const router = express.Router();
const umrahController = require("../controllers/umraController");
const uploader = require("../middleware/PdfUpload");
const Uploader = require("../middleware/PdfUpload");


router.route("/umrag/get/packages").post(umrahController.getUmrahPackages);
router.route("/umrah/details").post(umrahController.createUmrahDetails);
router.route("/umrah").post(Uploader,umrahController.createUmrahPost);

module.exports = router;
