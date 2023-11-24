const ToursConfirmation = require("../models/Tours/ToursConfirmationModel");
const ToursDetails = require("../models/Tours/PostToursModel");

exports.createToursDetails = async (req, res) => {
  try {
    const postToursDetails = new ToursDetails(req.body);
    console.log(postToursDetails)
    const result = await postToursDetails.save();
    console.log(result)
    res.status(200).json({
      message: "Successfully tours details posted.",
      result,
    });
  } catch (error) {
    console.log(error)
    res.send("Internal server error");
  }
};

// confirmation 
exports.createToursConfirmation = async (req, res) => {
  try {
    const postToursConfirmation = new ToursConfirmation(req.body);
    console.log(postToursConfirmation)
    const result = await postToursConfirmation.save();
    console.log(result)
    res.status(200).json({
      message: "Send request for tours confirmation.",
      result,
    });
  } catch (error) {
    console.log(error)
    res.send("Internal server error");
  }
};
