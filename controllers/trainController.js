const TrainConfirmation = require("../models/Train/TrainModel");
const PostTrainDetails = require("../models/Train/PostTrainModel");

exports.createTrainDetails = async (req, res) => {
  try {
    const postTrainDetails = new PostTrainDetails(req.body);
    console.log(postTrainDetails);
    const result = await postTrainDetails.save();
    console.log(result);
    res.status(200).json({
      message: "Successfully post train details.",
      result,
    });
  } catch (error) {
    console.log(error);
    res.send("Internal server error");
  }
};

// train confirmation
exports.createTrainConfirmation = async (req, res) => {
  try {
    const postTrainConfirmation = new TrainConfirmation(req.body);
    console.log(postTrainConfirmation);
    const result = await postTrainConfirmation.save();
    console.log(result);
    res.status(200).json({
      message: "Send request for train confirmation.",
      result,
    });
  } catch (error) {
    console.log(error);
    res.send("Internal server error");
  }
};
exports.updateTrainConfirmation = async (req, res) => {
  try {
    const id = req.params.id;
    const updateTrainConfirmation = new TrainConfirmation(req.body);
    const updateUser = await TrainConfirmation.updateOne(
      { _id: id },
      { $set: updateTrainConfirmation },
      { runValidators: true }
    );

    if (updateUser.nModified === 0) {
      return res.status(404).json({
        message: "Data not found",
      });
    }

    res.status(200).json({
      message: "Data updated successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Update failed: " + error.message,
    });
  }
};
