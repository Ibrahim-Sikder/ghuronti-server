const BusConfirmation = require("../models/Bus/BusModel");
const  PostBusDetails = require("../models/Bus/PostBusModel")



exports.createBusPostDetails = async (req, res) => {
  try {
    const postBusConfirmation = new PostBusDetails(req.body);
    console.log(postBusConfirmation)
    const result = await postBusConfirmation.save();
    console.log(result)
    res.status(200).json({
      message: "Successfully post bus details.",
      result,
    });
  } catch (error) {
    console.log(error)
    res.send("Internal server error");
  }
};
// bus confirmation 

exports.createBusConfirmation = async (req, res) => {
  try {
    const postBusConfirmation = new BusConfirmation(req.body);
    console.log(postBusConfirmation)
    const result = await postBusConfirmation.save();
    console.log(result)
    res.status(200).json({
      message: "Send request for bus confirmation.",
      result,
    });
  } catch (error) {
    console.log(error)
    res.send("Internal server error");
  }
};
