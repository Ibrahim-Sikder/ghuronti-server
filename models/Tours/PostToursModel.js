const mongoose = require("mongoose");

const postToursSchema = new mongoose.Schema(
  {
    travel_from: {
      type: String,
      // required: [true, "Email is required"],
    },
    title: {
      type: String,
      // required: [true, "Name is required"],
    },
     sub_title: {
      type: String,
      // required: [true, "Name is required"],
    },
    journey_date: {
      type: String,
      // required: [true, "Email is required"],
    },
    country_name: {
      type: String,
      // required: [true, "Email is required"],
    },
    city_name: {
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
    time: {
      type: String || Number,
      // required: [true, "Email is required"],
    },
    price: {
      type: Number,
      // required: [true, "Email is required"],
    },
    included: {
      type: String,
      // required: [true, "Surname is required"],
    },
    excluded: {
      type: String,
      // required: [true, "Surname is required"],
    },
    itinary: {
      type: String,
      // required: [true, "Surname is required"],
    },
    category_type: {
      type: String,
      // required: [true, "Surname is required"],
    },
    product_category: {
      type: String,
      // required: [true, "Surname is required"],
    },
    price_low_to_hight: {
      type: Number,
      // required: [true, "Surname is required"],
    },
    price_hight_to_low: {
      type: Number,
      // required: [true, "Surname is required"],
    },
    image: [{
      type: String,
      // required: [true, "Surname is required"],
    }],
    description: {
      type: String,
      // required: [true, "Surname is required"],
    },
  },
  {
    timestamps: true,
  }
);

const ToursDetails = mongoose.model("ToursDetails", postToursSchema);

module.exports = ToursDetails;
