
const express = require("express");
const router = express.Router();
const hajjController = require("../controllers/hajjController");

router.route("/hajj").post(hajjController.getHajjPackages);
router.route("/hajj/details").post(hajjController.createHajjDetails);

module.exports = router;
