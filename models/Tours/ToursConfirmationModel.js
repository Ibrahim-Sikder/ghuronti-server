const mongoose = require("mongoose");

const toursConfirmationSchema = new mongoose.Schema(
  {
    country: {
      type: String,
      // required: [true, "City is required"],
    },
    write_down_country: {
      type: String,
      // required: [true, "Passenger number is required"],
    },

    journey_date: {
      type:   String,
    },
    passport: {
      type: Number,
    },
     given_name: {
      type: String,
      // required: [true, "Name is required"],
    },
    surname: {
      type: String,
      // required: [true, "Surname is required"],
    },
    mobile_number: {
      type: Number,
      // required: [true, "Mobile number is required"],
    },
    confirmation_email: {
      type: String,
      // required: [true, "Email is required"],
    },
    email: {
      type: String,
      // required: [true, "Email is required"],
    },
    profile_type: {
      type: String,
      // required: [true, "Email is required"],
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
    pdf: [{
      type: String,
      // required: [true, "Email is required"],
    }],
    requirements: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const ToursConfirmation = mongoose.model("ToursConfirmation", toursConfirmationSchema);

module.exports = ToursConfirmation;
