const User = require("../models/userModel");
const { getToken } = require("../config/auth");
const handleErrors = require("../utils/handleError");

// User register
module.exports.register = async (req, res) => {
  const { fullName, email, password } = req.body;
  console.log("Attempting to sign up");

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        errors: {
          email: "Email is already in use. Please choose a different email.",
        },
      });
    }

    // Create a new user
    const user = await User.create({ fullName, email, password });
    console.log("New user created", user);

    res.status(201).json({
      success: "Signed up successfully",
      user,
    });
  } catch (err) {
    console.error("Error signing up:", err);

    // Handle errors (e.g., validation errors, database errors)
    const errors = handleErrors(err);
    res.status(500).json({ errors });
  }
};

// User login
module.exports.login = async (req, res) => {
  const { email, password } = req.body;
  console.log("Attempting to log in");

  try {
    const user = await User.login(email, password);
    console.log("User authenticated", user);

    const token = getToken(user);
    res.status(200).json({
      success: "Logged in successfully",
      user,
      token,
    });
  } catch (err) {
    console.error("Error logging in:", err.message);

    // Handle authentication errors (e.g., invalid credentials)
    const errors = handleErrors(err);
    res.status(401).json({ errors, message: err.message });
  }
};
