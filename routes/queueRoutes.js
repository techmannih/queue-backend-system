const express = require("express");
const router = express.Router();
const {
  addRequestToQueue,
  processRequestFromQueue,
  getQueueStatus,
  clearQueue,
} = require("../controllers/queueController");
const { processRequests } = require("../controllers/requestController");
const authMiddleware = require("../middleware/authmiddleware");
const loggingMiddleware = require("../middleware/loggingMiddleware");

router.use(loggingMiddleware);

// Route to add request to the queue
router.post("/enqueue", authMiddleware, addRequestToQueue);

// Route to process request from the queue
router.get("/dequeue/:userId", authMiddleware, processRequestFromQueue);

// Route to get queue length/status
router.get("/status/:userId", authMiddleware, getQueueStatus);

router.delete("/clear/:userId", authMiddleware, clearQueue);

// request process route and respose with update queue
router.get("/process/:userId", authMiddleware, processRequests);

module.exports = router;
