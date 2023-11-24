const UmrahConfirmation = require("../models/Umrah/UmrahModel");
const UmrahDetails = require("../models/Umrah/PostUmrahDetailsModel");

exports.createUmrahDetails = async (req, res) => {
  try {
    const postUmrahDetails = new UmrahDetails(req.body);
    console.log(postUmrahDetails)
    const result = await postUmrahDetails.save();
    console.log(result)
    res.status(200).json({
      message: "Successfully post umrah details.",
      result,
    });
  } catch (error) {
    console.log(error)
    res.send("Internal server error");
  }
};

exports.getUmrahPackages = async (req, res) => {
  try {
    const { latest_umrah_package } = req.body;
    const getPackage = await UmrahDetails.find({ latest_umrah_package });

    res.status(200).json({ packages: getPackage });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};


// confirmation 
exports.createUmrahPost = async (req, res) => {
  try {
    const postUmrah = new UmrahConfirmation(req.body);
    console.log(postUmrah)
    const result = await postUmrah.save();
    console.log(result)
    res.status(200).json({
      message: "Send request for umrah.",
      result,
    });
  } catch (error) {
    console.log(error)
    res.send("Internal server error");
  }
};
