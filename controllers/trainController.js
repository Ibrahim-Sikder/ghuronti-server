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

exports.getTrainPackages = async (req, res) => {
  try {
    const { city_from, city_to, journey_date, seat_type } = req.body;

    let getPackage;
    if (!city_from || !city_to || !journey_date || !seat_type) {
      res.status(200).json({
        message: "Please select all the field.",
      });
    } else {
      const lowerCaseCityFrom = city_from.toLowerCase();
      const lowerCaseCityTo = city_to.toLowerCase();

      getPackage = await PostTrainDetails.find({
        city_from: { $regex: new RegExp(lowerCaseCityFrom, "i") },
        city_to: { $regex: new RegExp(lowerCaseCityTo, "i") },
        journey_date,
        seat_type,
        // room_number,
      });
      if (getPackage.length === 0) {
        res.status(200).json({
          message: "No matching package found.",
        });
      } else {
        res.status(200).json({
          message: "Successfully train details gets.",
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
    const getPackage = await PostTrainDetails.find({}).sort({ createdAt: -1 });
    res
      .status(200)
      .json({ message: "Successfully get all train data", getPackage });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};
exports.deleteTrainPackage = async (req, res) => {
  try {
    const id = req.params.id;

    const getPackage = await PostTrainDetails.deleteOne({ _id: id });

    res.status(200).json({ message: "Package delete successful" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};


exports.getSpecificPackage = async (req, res) => {
  try {
    const id = req.params.id;

    const getPackage = await PostTrainDetails.findOne({ _id: id });

    res.status(200).json({ message: "Gei specific package.", getPackage });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
exports.updateTrainPackage = async (req, res) => {
  try {
    const id = req.params.id;
    const trainDetails = req.body;

    const updateTrainInfo = await PostTrainDetails.updateMany(
      { _id: id },
      {
        $set: trainDetails,
      },
      { runValidators: true }
    );

    res.status(200).json({ message: "Package update successful" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
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
