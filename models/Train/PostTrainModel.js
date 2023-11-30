const mongoose = require("mongoose");

const postTrainSchema = new mongoose.Schema(
  {
    travel_from: {
      type: String,
      // required: [true, "Name is required"],
    },
    travel_to: {
      type: String,
      // required: [true, "Name is required"],
    },
    train_name: {
      type: String,
      // required: [true, "Name is required"],
    },
    title: {
      type: String,
      // required: [true, "Name is required"],
    },
    country_name: {
      type: String,
      // required: [true, "Name is required"],
    },
    city_name: {
      type: String,
      // required: [true, "Name is required"],
    },
    class_type: {
      type: String,
      // required: [true, "Email is required"],
    },
    journey_date: {
      type: String,
      // required: [true, "Surname is required"],
    },
    seat_type: {
      type: String,
      // required: [true, "Surname is required"],
    },
    departure_time: {
      type: String || Number,
      // required: [true, "Email is required"],
    },
    arrival_time: {
      type: String || Number,
      // required: [true, "Surname is required"],
    },
    price: {
      type: Number,
      // required: [true, "Surname is required"],
    },
    starting_point: {
      type: String,
      // required: [true, "Surname is required"],
    },
    end_point: {
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

const PostTrainDetails = mongoose.model("PostTrainDetails", postTrainSchema);

module.exports = PostTrainDetails;
