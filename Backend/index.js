const express = require("express"); // Import the express module
const app = express(); // Import the express module and create an instance of it
const studentRoutes = require("./routes/students.routes"); // Import the student routes
const connectDB = require("./config/database"); // Import the database connection function
const auth = require("./middleware/auth"); // Import the authentication middleware
const userRoutes = require("./routes/users.routes"); // Import the user routes
const { MulterError } = require("multer");   // Import the MulterError class from the multer module
const ratelimit = require("express-rate-limit"); // Import the express-rate-limit module
const cors = require("cors");  // Import the CORS middleware to enable Cross-Origin Resource Sharing
const path = require("path");  // Import the path module to work with file and directory paths

// Connect to MongoDB
connectDB();

const PORT = process.env.PORT;

const limiter = ratelimit({
  windowMs: 1000 * 60, //1 minute
  max: 5, // Limit each IP to 5 requests per windowMs
  message: "Too many requests from this IP, please try again after sometime",
});

// express application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }));

// express application/json
app.use(express.json());

// Serve static files (like index.html, CSS, JS) from the frontend public folder
app.use(
  express.static(
    path.join(__dirname, "..", "Frontend", "public"),
  ),
);

// Serve static files from the "uploads" folder for image access
app.use("/uploads", express.static(path.join(__dirname,"uploads")));

// Enable CORS for all routes
app.use(cors());

app.use(limiter); // Apply the rate limiting middleware to all requests

// Use the user routes for any requests to /api/users
app.use("/api/users", userRoutes);

// Apply the authentication middleware to all routes below this line
app.use(auth);

// express static files
app.use("/api/students", studentRoutes);

// Error handling middleware
app.use((error, req, res, next) => {
  if (error instanceof MulterError) {
    return res
      .status(400)
      .send(`Image Error: ${error.message} : ${error.code}`);
  } else if (error) {
    return res.status(500).send(`Something went wrong: ${error.message}`);
  }
  next();
});

// Start the server
app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
