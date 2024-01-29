const mongoose = require("mongoose");

const hajjConfirmationSchema = new mongoose.Schema(
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
    confirmation_email: {
      type: String,
      // required: [true, "Surname is required"],
    },
    profile_type: {
      type: String,
      // required: [true, "Surname is required"],
    },
    email: {
      type: String,
      // required: [true, "Surname is required"],
    },
    user_type: {
      type: String,
      // required: [true, "Email is required"],
    },
    approved: {
      type: String  ,
      default: "pending",
      // required: [true, "Surname is required"],
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

const HajjConfirmation = mongoose.model(
  "HajjConfirmation",
  hajjConfirmationSchema
);

module.exports = HajjConfirmation;
