const mongoose = require("mongoose");

const hajjPackageSchema = new mongoose.Schema(
  {
    hajj_package: {
      type: String,
      // required: [true, "hajj_package is required"],
    },
    title: {
      type: String,
      // required: [true, "Title is required"],
    },

    sub_title: {
      type: String,
      // required: [true, "Sub title is required"],
    },
    date: {
      type: String,
      // required: [true, "Date is required"],
    },

    price: {
      type: Number,
    },
    day_night: {
      type: String,
    },
    requirement_list: {
      type: String,
      // required: [true, "Requirement list is required"],
    },
    popular_hajj_package: {
      type: String,
      // required: [true, "Email is required"],
    },
    image: [
      {
        type: String,
      },
    ],
    description: {
      type: String,
    },
    // hajj_category: {
    //   type: String,
    // },
  },
  {
    timestamps: true,
  }
);

const HajjPackage = mongoose.model("HajjPackage", hajjPackageSchema);

module.exports = HajjPackage;
