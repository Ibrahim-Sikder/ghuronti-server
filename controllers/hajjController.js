const HajjDetails = require("../models/Hajj/HajjPackageModel");

exports.createHajjDetails = async (req, res) => {
  try {
    const hajjDetails = new HajjDetails(req.body);
    const result = await hajjDetails.save();
    res.status(200).json({
      message: "Post hajj package details.",
      result,
    });
  } catch (error) {
    console.log(error);
    res.send("Internal server error");
  }
};
exports.getOneHajjDetails = async (req, res) => {
  try {
    const { hajj_package } = req.body;

    let economy;

    if (hajj_package === "Economy Hajj Package") {
      economy = await HajjDetails.find({ hajj_package })
        .sort({
          createdAt: -1,
        })
        .limit(1);
    }
    let nonShifting;

    if (hajj_package === "Non Shifting Hajj Package") {
      nonShifting = await HajjDetails.find({ hajj_package })
        .sort({
          createdAt: -1,
        })
        .limit(1);
    }
    let shifting;

    if (hajj_package === "Shifting Hajj Package") {
      shifting = await HajjDetails.find({ hajj_package })
        .sort({
          createdAt: -1,
        })
        .limit(1);
    }

    res.status(200).json({
      message: "Post hajj package details.",
      economy,
      nonShifting,
      shifting,
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
    console.log(id);
    const getPackage = await HajjDetails.deleteOne({ _id: id });

    res.status(200).json({ message: "Package delete successful" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.getSpecificPackage = async (req, res) => {
  try {
    const id = req.params.id;

    const getPackage = await HajjDetails.findOne({ _id: id });

    res.status(200).json({ message: "Gei specific package.", getPackage });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
exports.updateHajjPackage = async (req, res) => {
  try {
    const id = req.params.id;
    const {
      hajj_package,
      title,
      sub_title,
      date,
      price,
      day_night,
      requirement_list,
      popular_hajj_package,
      image,
      description,
    } = req.body;

    const updateHajjInfo = await HajjDetails.updateMany(
      { _id: id },
      {
        $set: {
          hajj_package,
          title,
          sub_title,
          date,
          price,
          day_night,
          requirement_list,
          popular_hajj_package,
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
