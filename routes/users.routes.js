const express = require("express");
const router = express.Router();
const User = require("../model/users.models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

// Register a new user
router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;           // Destructure the username, email and password from the request body
    const existingUser = await User.findOne({                // Check if a user with the same username or email already exists
      $or: [{ username }, { email }],
    });
    if (existingUser)
      return res.status(400).json({
        message: "Username or email already exist",
      });

    const hasedPassword = await bcrypt.hash(password, 10);          // Hash the password with a salt round of 10
    const user = new User({                                        // Create a new user instance
      username,
      email,
      password: hasedPassword,
    });

    const savedUser = await user.save();                                    // Save the new user to the database
    res.json(savedUser);                                                   // Send the saved user as a response
  } catch (err) {
    res.status(500).json({ message: err.message });                       // Internal Server Error
  }
});

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });                             // Find the user by username
    if (!user) return res.status(404).json({ message: "User not found" });     // If user not found, return 404 Not Found

    const isMatch = await bcrypt.compare(password, user.password);             // Compare the provided password with the hashed password stored in the database
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });         // If password does not match, return 400 Bad Request

    const token = jwt.sign(
      { userId: user._id, username: user.username },                           // Sign a JWT token with the user's ID and username as payload, using the secret from the environment variables and setting an expiration time of 1 hour
      process.env.JWT_SECRET,
      { expiresIn: "1h" },
    );
    res.json({ token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post("/logout", async (req, res) => {
  res.json({ message: "Logout successful" });              // Send a response indicating that the logout was successful
});

module.exports = router;                                 // Export the router to be used in other parts of the application
