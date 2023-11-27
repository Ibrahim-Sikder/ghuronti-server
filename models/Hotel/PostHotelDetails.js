const mongoose = require("mongoose");

const hotelDetailsSchema = new mongoose.Schema(
  {
    hotel_name: {
      type: String,
    },
    title: {
      type: String,
    },
    sub_title: {
      type: String,
    },
    address: {
      type: String,
    },
    country_name: {
      type: String,
      // required: [true, "Name is required"],
    },
    city_name: {
      type: String,
      // required: [true, "Email is required"],
    },
    day_night: {
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
    check_in_date: {
      type: String,
      // required: [true, "Email is required"],
    },
    check_out_date: {
      type: String,
      // required: [true, "Email is required"],
    },
    child: {
      type: Number,
      // required: [true, "Email is required"],
    },
    adult: {
      type: Number,
      // required: [true, "Email is required"],
    },
    room_number: {
      type: String || Number,
      // required: [true, "Email is required"],
    },
    hotel_type: {
      type: String,
      // required: [true, "Email is required"],
    },
    

    
    highest_price: {
      type: Number,
      // required: [true, "Mobile number is required"],
    },
    lowest_price: {
      type: Number,
      // required: [true, "Mobile number is required"],
    },
    start_price: {
      type: Number,
      // required: [true, "Mobile number is required"],
    },
    discount_price: {
      type: Number,
      // required: [true, "Mobile number is required"],
    },

    // date: {
    //   type: String,
    // },
    

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

const HotelDetails = mongoose.model("HotelDetails", hotelDetailsSchema);

module.exports = HotelDetails;
