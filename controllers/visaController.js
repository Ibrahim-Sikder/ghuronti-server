const VisaConfirmation = require("../models/Visa/VisaModel");
const VisaDetails = require("../models/Visa/PostVisaModel");
const VisaRequirement = require("../models/Visa/VisaRequirements");

exports.createVisaDetails = async (req, res) => {
  try {
    const postVisaDetails = new VisaDetails(req.body);
    console.log(postVisaDetails);
    const result = await postVisaDetails.save();
    console.log(result);
    res.status(200).json({
      message: "Successfully visa details posted.",
      result,
    });
  } catch (error) {
    console.log(error);
    res.send("Internal server error");
  }
};

exports.getPackageForAddPage = async (req, res) => {
  try {
    const getPackage = await VisaDetails.find({}).sort({ createdAt: -1 });
    res
      .status(200)
      .json({ message: "Successfully get all visa data", getPackage });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};
exports.deleteVisaPackage = async (req, res) => {
  try {
    const id = req.params.id;

    const getPackage = await VisaDetails.deleteOne({ _id: id });

    res.status(200).json({ message: "Package delete successful" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.updateVisaPackage = async (req, res) => {
  try {
    const id = req.params.id;
    const visaDetails = req.body;

    const updateVisaInfo = await VisaDetails.updateMany(
      { _id: id },
      {
        $set: visaDetails,
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

    const getPackage = await VisaDetails.findOne({ _id: id });

    res.status(200).json({ message: "Gei specific package.", getPackage });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// for getVisaRequirement

exports.postVisaRequirement = async (req, res) => {
  try {
    const postVisaRequirement = new VisaRequirement(req.body);
    // console.log(postVisaRequirement);
    const result = await postVisaRequirement.save();
    console.log(result);
    res.status(200).json({
      message: "Successfully visa details posted.",
      result,
    });
  } catch (error) {
    console.log(error);
    res.send("Internal server error");
  }
};
exports.getVisaRequirement = async (req, res) => {
  try {
    const { visa_type } = req.body;
    // console.log(getVisaRequirement);
    const result = await VisaRequirement.findOne({ visa_type });
    console.log(result);
    res.status(200).json({
      message: "Successfully visa details posted.",
      result,
    });
  } catch (error) {
    console.log(error);
    res.send("Internal server error");
  }
};
// getVisaPackages
exports.getVisaPackages = async (req, res) => {
  try {
    const { country_name, visa_type } = req.body;
    let getPackage;
    if (!country_name || !visa_type) {
      res.status(200).json({
        message: "Please select a country and visa type.",
      });
    } else {
      getPackage = await VisaDetails.find({
        country_name: country_name,
        visa_type: visa_type,
      });
      if (getPackage.length === 0) {
        res.status(200).json({
          message: "No matching package found.",
        });
      } else {
        res.status(200).json({
          message: "Successfully visa details gets.",
          getPackage,
        });
      }
    }
  } catch (error) {
    console.log(error);
    res.send("Internal server error");
  }
};

// confirmation
exports.createVisaConfirmation = async (req, res) => {
  try {
    const postVisaConfirmation = new VisaConfirmation(req.body);
    console.log(postVisaConfirmation);
    const result = await postVisaConfirmation.save();
    console.log(result);
    res.status(200).json({
      message: "Send request for Visa Confirmation.",
      result,
    });
  } catch (error) {
    console.log(error);
    res.send("Internal server error");
  }
};
