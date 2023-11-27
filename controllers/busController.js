const BusConfirmation = require("../models/Bus/BusModel");
const PostBusDetails = require("../models/Bus/PostBusModel");

exports.createBusPostDetails = async (req, res) => {
  try {
    const postBusConfirmation = new PostBusDetails(req.body);
    console.log(postBusConfirmation);
    const result = await postBusConfirmation.save();
    console.log(result);
    res.status(200).json({
      message: "Successfully post bus details.",
      result,
    });
  } catch (error) {
    console.log(error);
    res.send("Internal server error");
  }
};

exports.getBusPackages = async (req, res) => {
  try {
    const { starting_point, end_point, journey_date, child, adult, seat_type } =
      req.body;

    let getPackage;
    if (
      !starting_point ||
      !end_point ||
      !journey_date ||
      !child ||
      !adult ||
      !seat_type
    ) {
      res.status(200).json({
        message: "Please select all the field.",
      });
    } else {
      const lowerCaseCityFrom = starting_point.toLowerCase();
      const lowerCaseCityTo = end_point.toLowerCase();
      getPackage = await PostBusDetails.find({
        starting_point: { $regex: new RegExp(lowerCaseCityFrom, "i") },
        end_point: { $regex: new RegExp(lowerCaseCityTo, "i") },
        journey_date,
        child,
        adult,
        seat_type,
        // room_number,
      });
      if (getPackage.length === 0) {
        res.status(200).json({
          message: "No matching package found.",
        });
      } else {
        res.status(200).json({
          message: "Successfully bus details gets.",
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
    const getPackage = await PostBusDetails.find({}).sort({ createdAt: -1 });
    res
      .status(200)
      .json({ message: "Successfully get all bus data", getPackage });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};
exports.deleteBusPackage = async (req, res) => {
  try {
    const id = req.params.id;

    const getPackage = await PostBusDetails.deleteOne({ _id: id });

    res.status(200).json({ message: "Package delete successful" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// bus confirmation

exports.createBusConfirmation = async (req, res) => {
  try {
    const postBusConfirmation = new BusConfirmation(req.body);
    console.log(postBusConfirmation);
    const result = await postBusConfirmation.save();
    console.log(result);
    res.status(200).json({
      message: "Send request for bus confirmation.",
      result,
    });
  } catch (error) {
    console.log(error);
    res.send("Internal server error");
  }
};
