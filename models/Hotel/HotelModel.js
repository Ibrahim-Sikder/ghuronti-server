const mongoose = require("mongoose");

const hotelConfirmationSchema = new mongoose.Schema(
  {
    given_name: {
      type: String,
      // required: [true, "Name is required"],
    },
    
    nationality: {
      type: String,
      // required: [true, "Surname is required"],
    },

    nric_no: {
      type: Number,
    },
    country_of_residence: {
      type: String,
    },
    mobile_number: {
      type: Number,
      // required: [true, "Mobile number is required"],
    },
    
    guest: {
      type: Number,
    },
    guest_adult_name: {
      type: String,
    },
     adult_surname: {
      type: String,
    },
    guest_children_name: {
      type: String,
    },
     children_surname: {
      type: String,
    },
    guest_infant_name: {
      type: String,
    },
     infant_surname: {
      type: String,
    },
    guest_staying: {
      type: Boolean,
    },
    privacy_policy: {
      type: Boolean,
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

const HotelConfirmation = mongoose.model("HotelConfirmation", hotelConfirmationSchema);

module.exports = HotelConfirmation;
