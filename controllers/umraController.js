const UmrahConfirmation = require("../models/Umrah/UmrahModel");
const UmrahDetails = require("../models/Umrah/PostUmrahDetailsModel");

exports.createUmrahDetails = async (req, res) => {
  try {
    const postUmrahDetails = new UmrahDetails(req.body);
    console.log(postUmrahDetails);
    const result = await postUmrahDetails.save();
    console.log(result);
    res.status(200).json({
      message: "Successfully post umrah details.",
      result,
    });
  } catch (error) {
    console.log(error);
    res.send("Internal server error");
  }
};

exports.getUmrahPackages = async (req, res) => {
  try {
    const { latest_umrah_package } = req.body;
    const getPackage = await UmrahDetails.find({ latest_umrah_package });

    res.status(200).json({ getPackage });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
exports.getPackageForAddPage = async (req, res) => {
  try {
    const getPackage = await UmrahDetails.find({}).sort({ createdAt: -1 });
    res
      .status(200)
      .json({ message: "Successfully get all umrah data", getPackage });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};
exports.deleteUmrahPackage = async (req, res) => {
  try {
    const id = req.params.id;

    const getPackage = await UmrahDetails.deleteOne({ _id: id });

    res.status(200).json({ message: "Package delete successful" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.updateUmrahPackage = async (req, res) => {
  try {
    const id = req.params.id;
    const {
      title,
      sub_title,
      latest_umrah_package,
      day_night,
      date,
      price,
      image,
      description,
    } = req.body;

    const updateUmrahInfo = await UmrahDetails.updateMany(
      { _id: id },
      {
        $set: {
          title,
          sub_title,
          latest_umrah_package,
          day_night,
          date,
          price,
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

    const getPackage = await UmrahDetails.findOne({ _id: id });

    res.status(200).json({ message: "Gei specific package.", getPackage });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
// confirmation
exports.createUmrahPost = async (req, res) => {
  try {
    const postUmrah = new UmrahConfirmation(req.body);
    console.log(postUmrah);
    const result = await postUmrah.save();
    console.log(result);
    res.status(200).json({
      message: "Send request for umrah.",
      result,
    });
  } catch (error) {
    console.log(error);
    res.send("Internal server error");
  }
};
