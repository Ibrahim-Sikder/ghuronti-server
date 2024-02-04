// controllers/authController.js
const Users = require("../models/authModel");
const bcrypt = require("bcryptjs");
const { resendEmailConfirmation } = require("../utils/mail/resendEmail");
const { forgotPasswordLink } = require("../utils/mail/forgotLink");

const {
  sendVerificationEmail,
} = require("../utils/mail/sendVerificationEmail");
const crypto = require("crypto");

exports.registerUser = async (req, res) => {
  try {
    const credentials = req.body;

    if (credentials.password !== credentials.confirm_password) {
      return res.status(400).json({
        message: "Passwords do not match",
        errors: {
          confirm_password: {
            message: "Passwords do not match",
          },
        },
      });
    }

    if (credentials.username) {
      const existingUser = await Users.findOne({
        username: credentials.username,
      });

      if (existingUser) {
        return res.status(400).json({
          message: "Username already in use.",
        });
      }
    }
    if (credentials.email) {
      const existingUser = await Users.findOne({
        email: credentials.email,
      });

      if (existingUser) {
        return res.status(400).json({
          message: "Email already in use.",
        });
      }
    }

    const newUser = new Users(credentials);

    // Attempt to save the user
    await sendVerificationEmail(req, newUser, res);
    await newUser.save();

    return res.status(201).json({
      id: newUser._id.toString(),
      name: newUser.username,
      email: newUser.email,
      agentId: newUser.agentId,
    });
  } catch (error) {
    console.error("Error registering user:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.send({
        status: "failed",
        error: "Please provide email  and password.",
      });
    }
    const user = await Users.findOne({ email });
    if (!user) {
      return res.status(403).json({
        status: "failed",
        message: "No user found.",
      });
    }
    if (!user.isVerified) {
      return res.json({
        status: "failed",
        message: "Account is not verified.",
      });
    }

    const isPasswordValid = await bcrypt.compareSync(password, user.password);

    if (!isPasswordValid) {
      return res.json({
        status: "failed",
        message: "Email or Password is not correct.",
      });
    }

    const token = crypto.randomBytes(64).toString("hex");

    return res.json({
      status: "success",
      user: {
        id: user._id.toString(),
        name: user.username,
        email: user.email,
        agentId: user.agentId,
      },
      token: token,
    });
  } catch (error) {
    console.error("Error logging in user:", error);
    return res
      .status(500)
      .json({ status: "failed", error: "Internal Server Error" });
  }
};
exports.confirmationUser = async (req, res) => {
  try {
    const { token } = req.params;

    const user = await Users.findOne({ confirmation_token: token });

    if (!user) {
      return res.status(403).json({
        status: "Failed",
        error:
          "The entered token is considered invalid, suggesting an error or mismatch. Please double-check and ensure the accuracy of the provided token for proper authentication",
      });
    }

    const expired = new Date() > new Date(user.token_expire);

    if (expired) {
      return res.status(401).json({
        status: "Failed",
        error:
          "The token provided is no longer valid as it has exceeded its expiration period.",
      });
    }
    // const authToken = jwt.sign(
    //   { confirmation_token: token },
    //   user.confirmation_token
    // );
    user.isVerified = true;

    // res.cookie("token", user.confirmation_token, {
    //   httpOnly: true,
    //   secure: true, // Set to true to ensure the cookie is only sent over HTTPS
    //   maxAge: 30 * 24 * 60 * 60 * 1000,
    // });

    user.confirmation_token = undefined;
    user.token_expire = undefined;

    // Save the user changes to the database
    await user.save();

    // res.cookie("em", user.email, {
    //   httpOnly: true,
    //   secure: true, // Set to true to ensure the cookie is only sent over HTTPS
    //   maxAge: 30 * 24 * 60 * 60 * 1000,
    // });

    res.redirect("http://localhost:3000/login");

    res.status(200).json({
      message:
        "Success! Your account has been verified, and you are now ready to access our services. Welcome aboard!",
    });
  } catch (error) {
    console.error("Error registering user:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getUser = async (req, res) => {
  try {
    const email = req.params.email;

    const result = await Users.find({ email }).sort({ createdAt: -1 });
    const getUser = result[0];
    res.status(200).json({
      message: "Successfully user get.",
      getUser,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Internal server error",
      error: error.message, // Provide the specific error message
    });
  }
};
exports.updateProfile = async (req, res) => {
  try {
    const email = req.params.email;
    const body = req.body;

    // Find the user by email
    const user = await Users.findOne({ email });

    // If user doesn't exist, return an error
    if (!user) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    // Use updateOne instead of updateMany for a single document
    const updateProfile = await Users.updateOne(
      { email },
      { $set: body },
      { runValidators: true }
    );

    // Check if any document was modified
    if (updateProfile.modifiedCount > 0) {
      return res.status(200).json({
        message: "Update user successful.",
      });
    } else {
      return res.status(200).json({
        message: "No changes made. User profile already up-to-date.",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};
exports.updatePassword = async (req, res) => {
  try {
    const email = req.params.email;
    console.log(email);
    const { password } = req.body;

    // Find the user by email
    const user = await Users.findOne({ email });
    console.log(user);
    // If user doesn't exist, return an error
    if (!user) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const updateProfile = await Users.updateOne(
      { email },
      { $set: { password: hashPassword } },
      { runValidators: true }
    );
    
    if (updateProfile.modifiedCount > 0) {
      return res.status(200).json({
        message: "Password update successful.",
      });
    } else {
      return res.status(200).json({
        message: "No changes made.",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};
exports.resendEmail = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await Users.findOne({ email });
    if (!user) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }
    if (user && !user.confirmation_token) {
      return res.status(401).json({
        message: "Email already verified",
      });
    }

    await resendEmailConfirmation(req, user, res);

    res.status(200).json({
      message: "Resend email.",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

exports.resendConfirmationUser = async (req, res) => {
  try {
    const { token } = req.params;

    const user = await Users.findOne({ confirmation_token: token });

    if (!user) {
      res.redirect("http://localhost:3000/login");
      return res.status(403).json({
        status: "Failed",
        error: "Already verified",
      });
    }

    const expired = new Date() > new Date(user.token_expire);

    if (expired) {
      return res.status(401).json({
        status: "Failed",
        error:
          "The token provided is no longer valid as it has exceeded its expiration period.",
      });
    }

    user.isVerified = true;
    user.confirmation_token = undefined;
    user.token_expire = undefined;
    await user.save();
    res.redirect("http://localhost:3000/login");

    res.status(200).json({
      message:
        "Success! Your account has been verified, and you are now ready to access our services. Welcome aboard!",
    });
  } catch (error) {
    console.error("Error registering user:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await Users.findOne({ email });
  
    if (!user) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }
    if (user && user.confirmation_token) {
      return res.status(401).json({
        message: "Email is not verified.",
      });
    }

    const token = Math.floor(100000 + Math.random() * 900000);
    const updatePassword = await Users.updateOne(
      { email },
      { $set: { forgot_pass_token: token } },
      { runValidators: true }
    );
    await forgotPasswordLink(req, user, res, token);
    res.status(200).json({
      message: "Verification email send.",
      email: user.email,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

exports.forgotPasswordUpdate = async (req, res) => {
  try {
    const { email } = req.params;
    const {code} = req.body;
    const user = await Users.findOne({ email });
 
    if (!user) {
      return res.status(403).json({
        status: "Failed",
        error: "Unauthorized",
      });
    }

    if (!user.forgot_pass_token) {
      return res.status(403).json({
        status: "Failed",
        error: "Invalid code.",
      });
    }
    if (code !== user.forgot_pass_token) {
      return res.status(403).json({
        status: "Failed",
        error: "Code didn't match",
      });
    }

    user.forgot_pass_token = undefined;
    await user.save();

    res.status(200).json({
      message: "Submitted",
      
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};
