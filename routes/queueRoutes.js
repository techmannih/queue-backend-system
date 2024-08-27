const express = require("express");
const router = express.Router();
const {
  addRequestToQueue,
  processRequestFromQueue,
  getQueueStatus,
} = require("../controllers/queueController");
const authMiddleware = require("../middleware/authMiddleware");
const loggingMiddleware = require("../middleware/loggingMiddleware");

router.use(loggingMiddleware);

// Route to add request to the queue
router.post("/enqueue", authMiddleware, addRequestToQueue);

// Route to process request from the queue
router.get("/dequeue/:userId", authMiddleware, processRequestFromQueue);

// Route to get queue length/status
router.get("/status/:userId", authMiddleware, getQueueStatus);

module.exports = router;
