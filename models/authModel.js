const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const authSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      trim: true,
      lowercase: true,
      unique: true,
    },
    agentId: {
      type: String,
      // required: [true, "City is required"],
    },
    title: {
      type: String,
      // required: [true, "City is required"],
    },
    given_name: {
      type: String,
      // required: [true, "City is required"],
    },
    surname: {
      type: String,
      // required: [true, "Passenger number is required"],
    },
    gender: {
      type: String,
      // required: [true, "Passenger number is required"],
    },
    nationality: {
      type: String,
      // required: [true, "Passenger number is required"],
    },
    date: {
      type: String,
      // required: [true, "Passenger number is required"],
    },
    passport_number: {
      type: String,
      // required: [true, "Passenger number is required"],
    },
    passport_expire_date: {
      type: String,
      // required: [true, "Passenger number is required"],
    },
    address: {
      type: String,
      // required: [true, "Passenger number is required"],
    },

    company_name: {
      type: String,
    },
    email: {
      type: String || Number,
      trim: true,
      lowercase: true,
      unique: true,
    },
    password: {
      type: String || Number,
      //   validate: {
      //     validator: (value) =>
      //       validator.isStrongPassword(value, {
      //         minLength: 6,
      //       }),
      //     message: "Password{VALUE} is not strong enough.",
      //   },
    },
    confirm_password: {
      type: String || Number,
      validate: {
        validator: function (value) {
          return value === this.password;
        },
        message: "Password matching error.",
      },
    },
    country_name: {
      type: String,
      // required: [true, "Mobile number is required"],
    },
    city_name: {
      type: String,
      // required: [true, "Email is required"],
    },
    mobile_number: {
      type: Number,
      // required: [true, "Email is required"],
    },
    zip_code: {
      type: Number,
      // required: [true, "Email is required"],
    },
    image: [
      {
        type: String,
        // required: [true, "Email is required"],
      },
    ],
    agree: {
      type: Boolean,
    },
    user_type: {
      type: String,
      default: "user",
    },
    profile_type: {
      type: String,
      default: "b2c",
    },
    forgot_pass_token: {
      type: String,
    },
    confirmation_token: {
      type: String,
    },
    token_expire: {
      type: Date,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    profile_image: [
      {
        type: String,
 
      },
    ],
    passport_file: [
      {
        type: String,
      },
    ],
    visa_file: [
      {
        type: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);

authSchema.pre("save", async function (next) {
  try {
    const password = this.password;

    if (!password) {
      return next(); // No password to hash
    }

    const hashPassword = await bcrypt.hash(password, 10);
    this.password = hashPassword;
    this.confirm_password = undefined;

    next();
  } catch (error) {
    next(error);
  }
});


authSchema.methods.comparePassword = async function (password, hash) {
  try {
    const isPasswordValid = bcrypt.compareSync(password, hash);

    return isPasswordValid;
  } catch (error) {
    return false; // Return false in case of an error
  }
};
// authSchema.methods.comparePassword = async function (password, hash) {
//   try {

//     const isPasswordValid = await bcrypt.compareSync(password, hash);
//     console.log(isPasswordValid)
//     return isPasswordValid;
//   } catch (error) {
//     console.error("Error comparing passwords:", error);
//     return false; // Return false in case of an error
//   }
// };

authSchema.methods.generateConfirmationToken = function () {
  const token = crypto.randomBytes(64).toString("hex");
  this.confirmation_token = token;
  const date = new Date();
  date.setDate(date.getDate() + 1);

  this.token_expire = date;
  return token;
};

authSchema.methods.generateForgotPasswordToken = function () {
  const token = crypto.randomBytes(64).toString("hex");
  this.forgot_pass_token = token;
  const date = new Date();
  date.setDate(date.getDate() + 1);

  this.token_expire = date;
  return token;
};
const Users = mongoose.model("Users", authSchema);

module.exports = Users;
