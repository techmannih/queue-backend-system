const express = require("express");
const app = express();
const morgan = require("morgan"); 
const userRoutes = require("./routes/userRoutes");
const loggingMiddleware = require("./middleware/loggingMiddleware");
const errorMiddleware = require("./middleware/errorMiddleware");
const queueRoutes = require('./routes/queueRoutes');

require("dotenv").config();
const connectDB = require("./config/db");

connectDB();

const port = process.env.PORT || 8880;

// Middleware
app.use(morgan('dev'));
app.use(express.json());

// Apply logging middleware globally
app.use(loggingMiddleware);

// routes
app.use("/api/user", userRoutes);
app.use('/api/queue', queueRoutes);

// Basic route
app.get("/", (req, res) => {
  res.send("Hello from the server");
});

// Global error handling middleware
app.use(errorMiddleware);

app.listen(port, function () {
  console.log(`Listening on port ${port}`);
});
