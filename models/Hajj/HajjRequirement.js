const mongoose = require("mongoose");

const hajjRequirementSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      // required: [true, "City is required"],
    },
    sub_title: {
      type: String,
      // required: [true, "City is required"],
    },
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

const HajjRequirement = mongoose.model("HajjRequirement",hajjRequirementSchema);

module.exports = HajjRequirement;
