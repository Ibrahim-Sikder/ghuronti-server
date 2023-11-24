const mongoose = require("mongoose");

const postTrainSchema = new mongoose.Schema(
  {
    country_name: {
      type: String,
      // required: [true, "Name is required"],
    },
    city_name: {
      type: String,
      // required: [true, "Name is required"],
    },
    address: {
      type: String,
      // required: [true, "Email is required"],
    },
    category_type: {
      type: String,
      // required: [true, "Email is required"],
    },
    product_category: {
      type: String,
      // required: [true, "Surname is required"],
    },
    date: {
      type: String,
      // required: [true, "Surname is required"],
    },
    price: {
      type: Number,
      // required: [true, "Surname is required"],
    },
    title: {
      type: String,
      // required: [true, "Surname is required"],
    },
    sub_title: {
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
