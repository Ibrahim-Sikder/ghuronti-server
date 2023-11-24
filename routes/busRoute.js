const express = require("express");
const router = express.Router();
const busController = require("../controllers/busController");


router.route("/bus").post(busController.createBusConfirmation);
router.route("/bus/details").post(busController.createBusPostDetails);

module.exports = router;
