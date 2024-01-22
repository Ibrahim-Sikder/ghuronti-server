const BusConfirmation = require("../models/Bus/BusModel");
const PostBusDetails = require("../models/Bus/PostBusModel");

exports.createBusPostDetails = async (req, res) => {
  try {
    const postBusConfirmation = new PostBusDetails(req.body);
    console.log(postBusConfirmation);
    const result = await postBusConfirmation.save();
    console.log(result);
    res.status(200).json({
      message: "Successfully post bus details.",
      result,
    });
  } catch (error) {
    console.log(error);
    res.send("Internal server error");
  }
};

exports.getBusPackages = async (req, res) => {
  try {
    const { starting_point, end_point, journey_date, child, adult, seat_type } =
      req.body;

    let getPackage;
    if (
      !starting_point ||
      !end_point ||
      !journey_date ||
      !child ||
      !adult ||
      !seat_type
    ) {
      res.status(200).json({
        message: "Please select all the field.",
      });
    } else {
      const lowerCaseCityFrom = starting_point.toLowerCase();
      const lowerCaseCityTo = end_point.toLowerCase();
      getPackage = await PostBusDetails.find({
        starting_point: { $regex: new RegExp(lowerCaseCityFrom, "i") },
        end_point: { $regex: new RegExp(lowerCaseCityTo, "i") },
        journey_date,
        child,
        adult,
        seat_type,
        // room_number,
      });
      if (getPackage.length === 0) {
        res.status(200).json({
          message: "No matching package found.",
        });
      } else {
        res.status(200).json({
          message: "Successfully bus details gets.",
          getPackage,
        });
      }
    }
  } catch (error) {
    console.log(error);
    res.send("Internal server error");
  }
};
exports.getBusFilterPackages = async (req, res) => {
  try {
    const {
      starting_point,
      end_point,
      journey_date,
      child,
      adult,
      seat_type,
      operators,
      bus_type,
      boarding_point,
      facilities,
    } = req.body;

    let query = {};

    if (operators) {
      query.operators = { $regex: new RegExp(operators, "i") };
    }
    if (bus_type) {
      query.type_of_bus = { $regex: new RegExp(bus_type, "i") };
    }

    if (boarding_point) {
      query.boarding_point = { $regex: new RegExp(boarding_point, "i") };
    }

    if (facilities) {
      query.facilities = { $regex: new RegExp(facilities, "i") };
    }

    const getPackage = await PostBusDetails.find({
      starting_point: { $regex: new RegExp(starting_point.toLowerCase(), "i") },
      end_point: { $regex: new RegExp(end_point.toLowerCase(), "i") },
      journey_date,
      child,
      adult,
      seat_type,
      ...query,
    }).sort({ createdAt: -1 });

    if (getPackage.length === 0) {
      res.status(200).json({
        message: "No matching package found.",
      });
    } else {
      res.status(200).json({
        message: "Successfully bus details get.",
        getPackage,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal server error");
  }
};

exports.getPackageForAddPage = async (req, res) => {
  try {
    const getPackage = await PostBusDetails.find({}).sort({ createdAt: -1 });
    res
      .status(200)
      .json({ message: "Successfully get all bus data", getPackage });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};
exports.deleteBusPackage = async (req, res) => {
  try {
    const id = req.params.id;

    const getPackage = await PostBusDetails.deleteOne({ _id: id });

    res.status(200).json({ message: "Package delete successful" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
exports.updateBusPackage = async (req, res) => {
  try {
    const id = req.params.id;
    const {
      bus_name,
      starting_point,
      end_point,
      starting_time,
      end_time,
      price,
      journey_date,
      child,
      adult,
      seat_type,
      operators,
      type_of_bus,
      boarding_point,
      facilities,
      image,
      description,
    } = req.body;

    const updateBusInfo = await PostBusDetails.updateMany(
      { _id: id },
      {
        $set: {
          bus_name,
          starting_point,
          end_point,
          starting_time,
          end_time,
          price,
          journey_date,
          child,
          adult,
          seat_type,
          operators,
          type_of_bus,
          boarding_point,
          facilities,
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

    const getPackage = await PostBusDetails.findOne({ _id: id });

    res.status(200).json({ message: "Gei specific package.", getPackage });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
// bus confirmation

exports.createBusConfirmation = async (req, res) => {
  try {
    const postBusConfirmation = new BusConfirmation(req.body);
    console.log(postBusConfirmation);
    const result = await postBusConfirmation.save();
    console.log(result);
    res.status(200).json({
      message: "Send request for bus confirmation.",
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
    console.log(email, profile_type);

    const result = await BusConfirmation.find({ email, profile_type }).sort({
      createdAt: -1,
    });
    console.log(result);
    res.status(200).json({
      message: "Successfully bus confirmation gets.",
      result,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Internal server error",
      error: error.message,  
    });
  }
};
exports.approvedUpdate = async (req, res) => {
  try {
    const id = req.params.id;
 
    const updateBusConfirmation = await BusConfirmation.updateOne(
      { _id: id },
      { $set: { approved: "approved" } },
      { runValidators: true }
    );
    
    res.status(200).json({
      message: "Approved successful.",
      
    });
  } catch (error) {
    res.status(500).json("Internal server error");
  }
};
exports.cancelUpdate = async (req, res) => {
  try {
    const id = req.params.id;
 
    const updateBusConfirmation = await BusConfirmation.updateOne(
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
