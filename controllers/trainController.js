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
    const { travel_from, travel_to, journey_date, class_type } = req.body;

    let getPackage;
    if (!travel_from || !travel_to || !journey_date || !class_type) {
      res.status(200).json({
        message: "Please select all the field.",
      });
    } else {
      const lowerCaseCityFrom = travel_from.toLowerCase();
      const lowerCaseCityTo = travel_to.toLowerCase();

      getPackage = await PostTrainDetails.find({
        travel_from: { $regex: new RegExp(lowerCaseCityFrom, "i") },
        travel_to: { $regex: new RegExp(lowerCaseCityTo, "i") },
        journey_date,
        class_type,
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
    const result = await postTrainConfirmation.save();
    res.status(200).json({
      message: "Send request for train confirmation.",
      result,
    });
  } catch (error) {
    console.log(error);
    res.send("Internal server error");
  }
};
// exports.updateTrainConfirmation = async (req, res) => {
//   try {
//     const id = req.params.id;
//     const updateTrainConfirmation = new TrainConfirmation(req.body);
//     const updateUser = await TrainConfirmation.updateOne(
//       { _id: id },
//       { $set: updateTrainConfirmation },
//       { runValidators: true }
//     );

//     if (updateUser.nModified === 0) {
//       return res.status(404).json({
//         message: "Data not found",
//       });
//     }

//     res.status(200).json({
//       message: "Data updated successfully",
//     });
//   } catch (error) {
//     res.status(500).json({
//       message: "Update failed: " + error.message,
//     });
//   }
// };

exports.getConfirmationData = async (req, res) => {
  try {
    const currentDate = new Date();

    // Set the time to midnight
    const startOfDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 0, 0, 0);

    // Set the time to 11:59:59 PM
    const endOfDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 23, 59, 59);

    // Find documents created between startOfDay and endOfDay
    const getPackage = await TrainConfirmation.find({
      createdAt: { $gte: startOfDay, $lte: endOfDay }  
    }).sort({ createdAt: -1 });

    res.status(200).json({ message: "Successfully get train data for the current day", getPackage });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};


exports.getConfirmationDetails = async (req, res) => {
  try {
    const { email, profile_type } = req.query;
    console.log(email, profile_type);

    const result = await TrainConfirmation.find({ email, profile_type }).sort({
      createdAt: -1,
    });
    console.log(result);
    res.status(200).json({
      message: "Successfully train confirmation gets.",
      result,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Internal server error",
      error: error.message, // Provide the specific error message
    });
  }
};
exports.approvedUpdate = async (req, res) => {
  try {
    const id = req.params.id;

    const updateTrainConfirmation = await TrainConfirmation.updateOne(
      { _id: id },
      { $set: { approved: "approved" } },
      { runValidators: true }
    );

    res.status(200).json({
      message: "Approved successful.",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
      error: error.message, // Provide the specific error message
    });
  }
};
exports.cancelUpdate = async (req, res) => {
  try {
    const id = req.params.id;

    const updateTrainConfirmation = await TrainConfirmation.updateOne(
      { _id: id },
      { $set: { approved: "rejected" } },
      { runValidators: true }
    );
    console.log(updateTrainConfirmation);
    res.status(200).json({
      message: "Rejected",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
      error: error.message, // Provide the specific error message
    });
  }
};
