const HotelConfirmation = require("../models/Hotel/HotelModel");
const HotelDetails = require("../models/Hotel/PostHotelDetails");

exports.createHotelDetails = async (req, res) => {
  try {
    const postHotel = new HotelDetails(req.body);
    console.log(postHotel)
    const result = await postHotel.save();
    console.log(result)
    res.status(200).json({
      message: "Successfully hotel details posted.",
      result,
    });
  } catch (error) {
    console.log(error)
    res.send("Internal server error");
  }
};

// confirmatin hotel 
exports.createHotelConfirmation = async (req, res) => {
  try {
    const postHotel = new HotelConfirmation(req.body);
    console.log(postHotel)
    const result = await postHotel.save();
    console.log(result)
    res.status(200).json({
      message: "Send request for hotel.",
      result,
    });
  } catch (error) {
    console.log(error)
    res.send("Internal server error");
  }
};
