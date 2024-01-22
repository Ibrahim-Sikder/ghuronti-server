const mongoose = require("mongoose");

const trainSchema = new mongoose.Schema(
  {
    Seats: {
      type: String,
      // required: [true, "Name is required"],
    },
    fare: {
      type: String,
      // required: [true, "Email is required"],
    },
    class: {
      type: String,
      // required: [true, "Email is required"],
    },
    total: {
      type: Number,
      // required: [true, "Email is required"],
    },
    boarding_point: {
      type: String,
      // required: [true, "Surname is required"],
    },
    name: {
      type: String,
      // required: [true, "Surname is required"],
    },
    passenger_type: {
      type: String,
      // required: [true, "Surname is required"],
    },
    mobile_number: {
      type: String,
      // required: [true, "Surname is required"],
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
  },
  {
    timestamps: true,
  }
);

const TrainConfirmation = mongoose.model("TrainConfirmation", trainSchema);

module.exports = TrainConfirmation;
