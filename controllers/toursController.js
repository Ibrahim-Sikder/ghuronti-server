const ToursConfirmation = require("../models/Tours/ToursConfirmationModel");
const ToursDetails = require("../models/Tours/PostToursModel");

exports.createToursDetails = async (req, res) => {
  try {
    const postToursDetails = new ToursDetails(req.body);
    console.log(postToursDetails);
    const result = await postToursDetails.save();
    console.log(result);
    res.status(200).json({
      message: "Successfully tours details posted.",
      result,
    });
  } catch (error) {
    console.log(error);
    res.send("Internal server error");
  }
};

exports.getToursPackages = async (req, res) => {
  try {
    const { country_name, travel_from, journey_date, child, adult } = req.body;

    let getPackage;
    if (!country_name || !travel_from || !journey_date || !child || !adult) {
      res.status(200).json({
        message: "Please select all the field.",
      });
    } else {
      const lowerCaseTravelFrom = travel_from.toLowerCase();
      getPackage = await ToursDetails.find({
        country_name,
        travel_from: { $regex: new RegExp(lowerCaseTravelFrom, "i") },
        journey_date,
        child,
        adult,
        // room_number,
      });
      if (getPackage.length === 0) {
        res.status(200).json({
          message: "No matching package found.",
        });
      } else {
        res.status(200).json({
          message: "Successfully tours details gets.",
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
    const getPackage = await ToursDetails.find({}).sort({ createdAt: -1 });
    res
      .status(200)
      .json({ message: "Successfully get all tours data", getPackage });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};
exports.deleteToursPackage = async (req, res) => {
  try {
    const id = req.params.id;

    const getPackage = await ToursDetails.deleteOne({ _id: id });

    res.status(200).json({ message: "Package delete successful" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.updateToursPackage = async (req, res) => {
  try {
    const id = req.params.id;
    const {
      title,
      sub_title,
      journey_date,
      price,
      country_name,
      travel_from,
      child,
      adult,
      time,

      included,
      excluded,
      itinary,
      category_type,
      product_category,
      price_low_to_hight,
      price_hight_to_low,
      image,
      description,
    } = req.body;

    const updateToursInfo = await ToursDetails.updateMany(
      { _id: id },
      {
        $set: {
          title,
          sub_title,
          journey_date,
          price,
          country_name,
          travel_from,
          child,
          adult,
          time,

          included,
          excluded,
          itinary,
          category_type,
          product_category,
          price_low_to_hight,
          price_hight_to_low,
          image,
          description,
        },
      },
      { runValidators: true }
    );

    res.status(200).json({ message: "Package update successful" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};


exports.getSpecificPackage = async (req, res) => {
  try {
    const id = req.params.id;

    const getPackage = await ToursDetails.findOne({ _id: id });

    res.status(200).json({ message: "Gei specific package.", getPackage });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
// confirmation
exports.createToursConfirmation = async (req, res) => {
  try {
    const postToursConfirmation = new ToursConfirmation(req.body);
    console.log(postToursConfirmation);
    const result = await postToursConfirmation.save();
    console.log(result);
    res.status(200).json({
      message: "Send request for tours confirmation.",
      result,
    });
  } catch (error) {
    console.log(error);
    res.send("Internal server error");
  }
};
