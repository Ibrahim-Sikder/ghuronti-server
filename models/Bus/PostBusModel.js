const mongoose = require("mongoose");

const postBusSchema = new mongoose.Schema(
  {
    operators: {
      type: String,
      // required: [true, "Name is required"],
    },
    type_of_bus: {
      type: String,
      // required: [true, "Email is required"],
    },
    boarding_point: {
      type: String,
      // required: [true, "Email is required"],
    },
    facilities: {
      type: String,
      // required: [true, "Surname is required"],
    },
    price: {
      type: Number,
    },
    date: {
      type: String,
    },

    image:[ {
      type: String,
      // required: [true, "Mobile number is required"],
    }],
    description: {
      type: String,
      // required: [true, "Mobile number is required"],
    },
  },
  {
    timestamps: true,
  }
);

const  PostBusDetails = mongoose.model("PostBusDetails", postBusSchema);

module.exports =  PostBusDetails;
