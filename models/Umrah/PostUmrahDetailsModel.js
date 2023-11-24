const mongoose = require("mongoose");

const  umrahDetailsSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      // required: [true, "City is required"],
    },
    sub_title: {
      type: String,
      // required: [true, "Passenger number is required"],
    },

    latest_umrah_package: {
      type: String,
      // required: [true, "Name is required"],
    },
    day_night: {
      type: String,
      // required: [true, "Surname is required"],
    },

    date: {
      type:   String,
    },
    price: {
      type: Number,
    },
     
    image: [{
      type: String,
      // required: [true, "Email is required"],
    }],
    description: {
      type: String,
    },
    questions: {
      type: String,
    },
    category: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const UmrahDetails = mongoose.model("UmrahDetails",  umrahDetailsSchema);

module.exports = UmrahDetails;
