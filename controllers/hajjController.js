const HajjDetails = require("../models/Hajj/HajjPackageModel");
const HajjRequirement = require("../models/Hajj/HajjRequirement");
const HajjConfirmation= require("../models/Hajj/HajjConfirmation");

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
    const getPackage = await HajjDetails.find({ hajj_package }).sort({ createdAt: -1 });

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

// for hajj requirements

exports.postHajjRequirement = async (req, res) => {
  try {
    const postHajjRequirement = new HajjRequirement(req.body);
    const result = await postHajjRequirement.save();
   
    res.status(200).json({
      message: "Successfully hajj requirements details posted.",
      result,
    });
  } catch (error) {
    console.log(error);
    res.send("Internal server error");
  }
};
exports.getAllHajjRequirement = async (req, res) => {
  try {
    const result = await HajjRequirement.find({}).sort({ createdAt: -1 });
    console.log(result);
    res.status(200).json({
      message: "Successfully hajj requirement gets",
      result,
    });
  } catch (error) {
    console.log(error);
    res.send("Internal server error");
  }
};

exports.deleteHajjRequirement = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await HajjRequirement.deleteOne({ _id: id });
    res.status(200).json({
      message: "Successfully visa requirement deleted",
    });
  } catch (error) {
    console.log(error);
    res.send("Internal server error");
  }
};

exports.updateHajjRequirement = async (req, res) => {
  try {
    const id = req.params.id;
    const hajjRequirement = req.body;

    const updateVisaInfo = await HajjRequirement.updateMany(
      { _id: id },
      {
        $set: hajjRequirement,
      },
      { runValidators: true }
    );

    res.status(200).json({ message: "Package update successful" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
exports.getSingleHajjRequirement = async (req, res) => {
  try {
    const id = req.params.id;

    const result = await HajjRequirement.findOne({ _id: id });

    res
      .status(200)
      .json({ message: "Get single visa requirement successful", result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// confirmatuion 


exports.createHajjPost = async (req, res) => {
  try {
    const postHajj = new HajjConfirmation(req.body);
    
    const result = await postHajj.save();
    console.log(result);
    res.status(200).json({
      message: "Send request for hajj.",
      result,
    });
  } catch (error) {
    console.log(error);
    res.send("Internal server error");
  }
};


exports.getConfirmationDetails = async (req, res) => {
  try {
    const { email, profile_type } = req.query;

    const result = await HajjConfirmation.find({ email, profile_type }).sort({
      createdAt: -1,
    });
 
    res.status(200).json({
      message: "Successfully hajj confirmation gets.",
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
 
    const updateHajjConfirmation = await HajjConfirmation.updateOne(
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
 
    const updateHajjConfirmation = await HajjConfirmation.updateOne(
      { _id: id },
      { $set: { approved: "rejected" } },
      { runValidators: true }
    );
     
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
