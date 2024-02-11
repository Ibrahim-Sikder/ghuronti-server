const mongoose = require("mongoose");

const internationalHotelSchema = new mongoose.Schema(
  {
    hotel_name: {
      type: String,
      // required: [true, "Name is required"],
    },
    price: {
      type: Number,
      // required: [true, "Surname is required"],
    },
    short_description: {
      type: String,
    },

    day: {
      type: String,
      // required: [true, "Surname is required"],
    },
    night: {
      type: String,
      // required: [true, "Surname is required"],
    },
    price_per_person: {
      type: Number,
    },
    price_twin_person: {
      type: Number,
    },
    price_triple_person: {
      type: Number,
      // required: [true, "Mobile number is required"],
    },
    image: [
      {
        type: String,
      },
    ],

    description: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const InternationalHotel = mongoose.model("InternationalHotel", internationalHotelSchema);

module.exports = InternationalHotel;
