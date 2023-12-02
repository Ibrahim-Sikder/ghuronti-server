const mongoose = require("mongoose");

const visaRequirementSchema = new mongoose.Schema(
  {
    visa_type: {
      type: String,
      // required: [true, "City is required"],
    },
    requirements: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const VisaRequirement = mongoose.model("VisaRequirement", visaRequirementSchema);

module.exports = VisaRequirement;
