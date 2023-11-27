const HotelConfirmation = require("../models/Hotel/HotelModel");
const HotelDetails = require("../models/Hotel/PostHotelDetails");

exports.createHotelDetails = async (req, res) => {
  try {
    const postHotel = new HotelDetails(req.body);
    console.log(postHotel);
    const result = await postHotel.save();
    console.log(result);
    res.status(200).json({
      message: "Successfully hotel details posted.",
      result,
    });
  } catch (error) {
    console.log(error);
    res.send("Internal server error");
  }
};

exports.getHotelPackages = async (req, res) => {
  try {
    const {
      country_name,
      city_name,
      check_in_date,
      check_out_date,
      child,
      adult,
      room_number,
    } = req.body;

    let getPackage;
    if (
      !country_name ||
      !city_name ||
      !check_in_date ||
      !check_out_date ||
      !adult ||
      !room_number
    ) {
      res.status(200).json({
        message: "Please select all the field.",
      });
    } else {
      getPackage = await HotelDetails.find({
        country_name,
        city_name,
        check_in_date,
        check_out_date,
        child,
        adult,
        room_number,
      });

      if (getPackage.length === 0) {
        res.status(200).json({
          message: "No matching package found.",
        });
      } else {
        res.status(200).json({
          message: "Successfully hotel details gets.",
          getPackage,
        });
      }
    }
  } catch (error) {
    console.log(error);
    res.send("Internal server error");
  }
};

exports.getPackageForAddPage = async (req, res) => {
  try {
    const getPackage = await HotelDetails.find({}).sort({ createdAt: -1 });
    res
      .status(200)
      .json({ message: "Successfully get all hotel data", getPackage });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};
exports.deleteHotelPackage = async (req, res) => {
  try {
    const id = req.params.id;

    const getPackage = await HotelDetails.deleteOne({ _id: id });

    res.status(200).json({ message: "Package delete successful" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// confirmatin hotel
exports.createHotelConfirmation = async (req, res) => {
  try {
    const postHotel = new HotelConfirmation(req.body);
    console.log(postHotel);
    const result = await postHotel.save();
    console.log(result);
    res.status(200).json({
      message: "Send request for hotel.",
      result,
    });
  } catch (error) {
    console.log(error);
    res.send("Internal server error");
  }
};
