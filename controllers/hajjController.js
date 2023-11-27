const HajjDetails = require("../models/Hajj/HajjPackageModel");

exports.createHajjDetails = async (req, res) => {
  try {
    const hajjDetails = new HajjDetails(req.body);
    console.log(hajjDetails);
    const result = await hajjDetails.save();
    console.log(result);
    res.status(200).json({
      message: "Post hajj package details.",
      result,
    });
  } catch (error) {
    console.log(error);
    res.send("Internal server error");
  }
};

exports.getPackageForAddPage = async (req, res) => {
  try {
    const getPackage = await HajjDetails.find({}).sort({ createdAt: -1 });
    res
      .status(200)
      .json({ message: "Successfully get all hajj data", getPackage });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};
exports.getHajjPackages = async (req, res) => {
  try {
    const { hajj_package } = req.body;
    const getPackage = await HajjDetails.find({ hajj_package });

    res.status(200).json({ getPackage });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
exports.deleteHajjPackage = async (req, res) => {
  try {
    const id = req.params.id;
    console.log(id)
    const getPackage = await HajjDetails.deleteOne({ _id: id });
 
    res.status(200).json({ message:"Package delete successful" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
