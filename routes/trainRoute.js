const express = require("express");
const router = express.Router();
const trainController = require("../controllers/trainController");

router.route("/train/details").post(trainController.createTrainDetails);
router.route("/train").post(trainController.createTrainConfirmation);
router.route("/train/:id").put(trainController.updateTrainConfirmation);

module.exports = router;
