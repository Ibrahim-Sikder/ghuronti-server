const mongoose = require("mongoose");

const umrahConfirmationSchema = new mongoose.Schema(
  {
    city: {
      type: String,
      required: [true, "City is required"],
    },
    passenger: {
      type: Number,
      required: [true, "Passenger number is required"],
    },

    given_name: {
      type: String,
      required: [true, "Name is required"],
    },
    surname: {
      type: String,
      required: [true, "Surname is required"],
    },

    journey_date: {
      type: String,
    },
    passport: {
      type: Number,
    },
    mobile_number: {
      type: Number,
      required: [true, "Mobile number is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
    },
    pdf: [
      {
        type: String
      },
    ],
    requirements: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const UmrahConfirmation = mongoose.model(
  "UmrahConfirmation",
  umrahConfirmationSchema
);

module.exports = UmrahConfirmation;
