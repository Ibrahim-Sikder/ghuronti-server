const mongoose = require("mongoose");

const postBusSchema = new mongoose.Schema(
  {
    Job_no: {
      type: Number,
      // required: [true, "Name is required"],
    },
    starting_point: {
      type: String,
      // required: [true, "Name is required"],
    },
    end_point: {
      type: String,
      // required: [true, "Name is required"],
    },
    starting_time: {
      type: String || Number,
      // required: [true, "Name is required"],
    },
    end_time: {
      type: String || Number,
      // required: [true, "Name is required"],
    },
    price: {
      type: Number,
    },
    journey_date: {
      type: String,
    },
    child: {
      type: Number,
    },
    adult: {
      type: Number,
    },
    seat_type: {
      type: String,
    },
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
