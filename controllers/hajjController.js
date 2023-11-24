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

exports.getHajjPackages = async (req, res) => {
  try {
    const { hajj_package } = req.body;
    const getPackage = await HajjDetails.find({ hajj_package });

    res.status(200).json({ packages: getPackage });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
