const express = require("express");
const app = express();
const userRoutes = require("./routes/userRoutes");
const loggingMiddleware = require("./middleware/loggingMiddleware");
const errorMiddleware = require("./middleware/errorMiddleware");

require("dotenv").config();
const connectDB = require("./config/db");

connectDB();

const port = process.env.PORT || 8880;

// Middleware to parse JSON
app.use(express.json());

// Apply logging middleware globally
app.use(loggingMiddleware);

// routes
app.use("/api/user", userRoutes);

// Basic route
app.get("/", (req, res) => {
  res.send("Hello from the server");
});

// Global error handling middleware
app.use(errorMiddleware);

app.listen(port, function () {
  console.log(`Listening on port ${port}`);
});
