const InternationalHotel = require("../models/Hotel/InternationalHotel");

exports.internationalHotelCreate = async (req, res) => {
  try {
    const postHotel = new InternationalHotel(req.body);

    const result = await postHotel.save();
    console.log(result);
    res.status(200).json({
      message: "Successfully international hotel details posted.",
      result,
    });
  } catch (error) {
    console.log(error);
    res.send("Internal server error");
  }
};
exports.getPackageForAddPage = async (req, res) => {
  try {
    const getPackage = await InternationalHotel.find({}).sort({ createdAt: -1 });
    res
      .status(200)
      .json({
        message: "Successfully get all international hotel data",
        getPackage,
      });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.getSpecificPackage = async (req, res) => {
  try {
    const id = req.params.id;

    const getPackage = await InternationalHotel.findOne({ _id: id });

    res.status(200).json({ message: "Gei specific package.", getPackage });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.deleteHotelPackage = async (req, res) => {
  try {
    const id = req.params.id;

    const getPackage = await InternationalHotel.deleteOne({ _id: id });

    res.status(200).json({ message: "Package delete successful" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
exports.updateHotelPackage = async (req, res) => {
  try {
    const id = req.params.id;
    const body = req.body;

    const updateHotelInfo = await InternationalHotel.updateMany(
      { _id: id },
      {
        $set: body,
      },
      { runValidators: true }
    );

    res.status(200).json({ message: "Package update successful" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
// exports.getHotelPackages = async (req, res) => {
//   try {
//     const {
//       country_name,
//       city_name,
//       check_in_date,
//       check_out_date,
//       child,
//       adult,
//       room_number,
//     } = req.body;

//     let getPackage;
//     if (
//       !country_name ||
//       !city_name ||
//       !check_in_date ||
//       !check_out_date ||
//       !adult ||
//       !room_number
//     ) {
//       res.status(400).json({
//         message: "Please select all the field.",
//       });
//     } else {
//       getPackage = await HotelDetails.find({
//         country_name,
//         city_name,
//         check_in_date,
//         check_out_date,
//         child,
//         adult,
//         room_number,
//       }).sort({ createdAt: -1 });

//       res.status(200).json({
//         message: "Successfully hotel details gets.",
//         getPackage,
//       });
//     }
//   } catch (error) {

//     res.send("Internal server error");
//   }
// };

// exports.getHotelPackageForPriceFilter = async (req, res) => {
//   try {
//     const {
//       price,
//       country_name,
//       city_name,
//       check_in_date,
//       check_out_date,
//       child,
//       adult,
//       room_number,
//     } = req.body;

//     const getPackage = await HotelDetails.find({
//       country_name,
//       city_name,
//       check_in_date,
//       check_out_date,
//       child,
//       adult,
//       room_number,
//       highest_price: { $gte: price[0], $lte: price[1] },
//     }).sort({ createdAt: -1 });

//     return res.status(200).json({
//       message:
//         "Successfully got hotel details within the specified price range.",
//       getPackage,
//     });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).send("Internal server error");
//   }
// };

// exports.getSpecificPackage = async (req, res) => {
//   try {
//     const id = req.params.id;

//     const getPackage = await HotelDetails.findOne({ _id: id });

//     res.status(200).json({ message: "Gei specific package.", getPackage });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// };
// exports.deleteHotelPackage = async (req, res) => {
//   try {
//     const id = req.params.id;

//     const getPackage = await HotelDetails.deleteOne({ _id: id });

//     res.status(200).json({ message: "Package delete successful" });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// };

// exports.updateHotelPackage = async (req, res) => {
//   try {
//     const id = req.params.id;
//     const {
//       hotel_name,
//       title,
//       sub_title,
//       address,
//       country_name,
//       city_name,
//       day_night,
//       price_per_person,
//       price_twin_person,
//       price_triple_person,
//       check_in_date,
//       check_out_date,
//       child,
//       adult,
//       room_number,
//       hotel_type,
//       highest_price,
//       lowest_price,
//       start_price,
//       discount_price,
//       image,
//       description,
//     } = req.body;

//     const updateHotelInfo = await HotelDetails.updateMany(
//       { _id: id },
//       {
//         $set: {
//           hotel_name,
//           title,
//           sub_title,
//           address,
//           country_name,
//           city_name,
//           day_night,
//           price_per_person,
//           price_twin_person,
//           price_triple_person,
//           check_in_date,
//           check_out_date,
//           child,
//           adult,
//           room_number,
//           hotel_type,
//           highest_price,
//           lowest_price,
//           start_price,
//           discount_price,
//           image,
//           description,
//         },
//       },
//       { runValidators: true }
//     );

//     res.status(200).json({ message: "Package update successful" });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// };

// // confirmatin hotel
// exports.createHotelConfirmation = async (req, res) => {
//   try {
//     const postHotel = new HotelConfirmation(req.body);
//     console.log(postHotel);
//     const result = await postHotel.save();
//     console.log(result);
//     res.status(200).json({
//       message: "Send request for hotel.",
//       result,
//     });
//   } catch (error) {
//     console.log(error);
//     res.send("Internal server error");
//   }
// };

// exports.getConfirmationDetails = async (req, res) => {
//   try {
//     const { email, profile_type } = req.query;

//     const result = await HotelConfirmation.find({ email, profile_type }).sort({
//       createdAt: -1,
//     });
//     res.status(200).json({
//       message: "Successfully hotel confirmation gets.",
//       result,
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({
//       message: "Internal server error",
//       error: error.message,
//     });
//   }
// };
// exports.approvedUpdate = async (req, res) => {
//   try {
//     const id = req.params.id;

//     const updateHotelConfirmation = await HotelConfirmation.updateOne(
//       { _id: id },
//       { $set: { approved: "approved" } },
//       { runValidators: true }
//     );

//     res.status(200).json({
//       message: "Approved successful.",

//     });
//   } catch (error) {
//     res.status(500).json({
//       message: error.message,
//       error: error.message, // Provide the specific error message
//     });
//   }
// };
// exports.cancelUpdate = async (req, res) => {
//   try {
//     const id = req.params.id;

//     const updateHotelConfirmation = await HotelConfirmation.updateOne(
//       { _id: id },
//       { $set: { approved: "rejected" } },
//       { runValidators: true }
//     );

//     res.status(200).json({
//       message: "Rejected",

//     });
//   } catch (error) {
//     res.status(500).json({
//       message: error.message,
//       error: error.message,
//     });
//   }
// };
