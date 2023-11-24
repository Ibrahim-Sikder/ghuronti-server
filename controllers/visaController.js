const VisaConfirmation = require("../models/Visa/VisaModel");
const VisaDetails = require("../models/Visa/PostVisaModel");

exports.createVisaDetails = async (req, res) => {
  try {
    const postVisaDetails = new VisaDetails(req.body);
    console.log(postVisaDetails)
    const result = await postVisaDetails.save();
    console.log(result)
    res.status(200).json({
      message: "Successfully visa details posted.",
      result,
    });
  } catch (error) {
    console.log(error)
    res.send("Internal server error");
  }
};

// confirmation 
exports.createVisaConfirmation = async (req, res) => {
  try {
    const postVisaConfirmation = new VisaConfirmation(req.body);
    console.log(postVisaConfirmation)
    const result = await postVisaConfirmation.save();
    console.log(result)
    res.status(200).json({
      message: "Send request for Visa Confirmation.",
      result,
    });
  } catch (error) {
    console.log(error)
    res.send("Internal server error");
  }
};
