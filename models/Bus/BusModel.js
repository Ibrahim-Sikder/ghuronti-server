const mongoose = require("mongoose");

const busSchema = new mongoose.Schema(
  {
    Seats: {
      type: String,
      required: [true, "Name is required"],
    },
    fare: {
      type: String,
      required: [true, "Fare is required"],
    },
    class: {
      type: String,
      required: [true, "Class is required"],
    },
    total: {
      type: Number,
      required: [true, "Total is required"],
    },
    boarding_point: {
      type: String,
      required: [true, "boarding_point is required"],
    },
    name: {
      type: String,
    },
    email: {
      type: String,
    },

    mobile_number: {
      type: Number,
      required: [true, "Mobile number is required"],
    },
  },
  {
    timestamps: true,
  }
);

const BusConfirmation = mongoose.model("BusConfirmation", busSchema);

module.exports = BusConfirmation;
