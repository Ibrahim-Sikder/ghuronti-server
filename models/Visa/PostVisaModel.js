const mongoose = require("mongoose");

const postVisaSchema = new mongoose.Schema(
  {
    country_name: {
      type: String,
      // required: [true, "Name is required"],
    },
    city_name: {
      type: String,
      // required: [true, "Name is required"],
    },
    visa_type: {
      type: String,
      // required: [true, "Email is required"],
    },
    traveler_type: {
      type: String,
      // required: [true, "Email is required"],
    },
    entry: {
      type:  String || Number,
      // required: [true, "Surname is required"],
    },
    duration: {
      type: String || Number,
      // type: mongoose.Schema.Types.Mixed,
      // required: [true, "Surname is required"],
    },
    interview: {
      type: String,
      // type: mongoose.Schema.Types.Mixed,
      // required: [true, "Surname is required"],
    },
    processing_time: {
      type: String || Number,
      // required: [true, "Surname is required"],
    },
    embassy_fee: {
      type: Number,
      // required: [true, "Surname is required"],
    },
    agent_fee: {
      type: Number,
      // required: [true, "Surname is required"],
    },
    agency_fee: {
      type: Number,
      // required: [true, "Surname is required"],
    },
    service_charge: {
      type: Number,
      // required: [true, "Surname is required"],
    },
     stay: {
      type: String || Number,
      // required: [true, "Surname is required"],
    },
    max_stay: {
      type: String || Number,
      // required: [true, "Surname is required"],
    },
    validity_day: {
      type: String || Number,
      // required: [true, "Surname is required"],
    },
    date: {
      type: String,
      // required: [true, "Surname is required"],
    },
    requirement: {
      type: String,
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

const VisaDetails = mongoose.model("VisaDetails", postVisaSchema);

module.exports = VisaDetails;
