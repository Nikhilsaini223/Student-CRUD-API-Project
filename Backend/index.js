const express = require("express"); // Import the express module
const app = express(); // Import the express module and create an instance of it
const studentRoutes = require("./routes/students.routes"); // Import the student routes
const connectDB = require("./config/database"); // Import the database connection function
const auth = require("./middleware/auth"); // Import the authentication middleware
const userRoutes = require("./routes/users.routes"); // Import the user routes
const { MulterError } = require("multer");
const cors = require("cors");
const path = require("path");

// Connect to MongoDB
connectDB();

const PORT = process.env.PORT;

// express application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }));

// express application/json
app.use(express.json());

// Serve static files (like index.html, CSS, JS) from the frontend public folder
app.use(
  express.static(
    path.join(__dirname, "..", "Frontend CRUD-API Project", "public"),
  ),
);

// Serve static files from the "uploads" folder for image access
app.use("/uploads", express.static(path.join(__dirname,"uploads")));

// Enable CORS for all routes
app.use(cors());

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
