const {
  enqueueRequest,
  dequeueRequest,
  getQueueLength,
  clearQueueService,
} = require("../services/queueService");

const Request = require("../models/requestModel");

// Add request to the queue
const addRequestToQueue = async (req, res) => {
  const { userId, request } = req.body;
  console.log("Request Data Received:", request);

  try {
    const newRequest = new Request({
      userId,
      data: request,
    });
    console.log("New Request Object Created:", newRequest);
    await newRequest.save();
    console.log("Request Saved to Database:", newRequest);
    await enqueueRequest(userId, newRequest);
    console.log("Request Added to Queue:", newRequest);
    res
      .status(200)
      .json({ success: "Request added to queue", request: newRequest });
  } catch (error) {
    console.error("Error Adding Request to Queue:", error);
    res.status(500).json({ error: "Failed to add request to queue" });
  }
};

const processRequestFromQueue = async (req, res) => {
  const { userId } = req.params;

  try {
    // Dequeue the request from the queue first
    const request = await dequeueRequest(userId);
    console.log("Request Dequeued from Queue:", request);

    if (!request) {
      console.log("No request found in the queue for user ID:", userId);
      return res.status(404).json({ error: "No request found in the queue" });
    }
    if (!request._id) {
      console.log("Dequeued request does not have an _id field:", request);
      return res.status(500).json({ error: "Dequeued request missing _id" });
    }

    // Delete the request from the database using the request's ID
    const deleted = await Request.findByIdAndDelete(request._id);
    console.log(
      "Attempting to delete request from database with ID:",
      request._id
    );

    if (!deleted) {
      console.log("Request not found in the database:", request._id);
      return res
        .status(404)
        .json({ error: "Request not found in the database" });
    }

    console.log("Request deleted from database:", deleted);

    // Respond to the client with the dequeued request
    res.status(200).json({ success: "Request deleted successfully", request });
  } catch (error) {
    console.error("Error processing request:", error);
    res.status(500).json({ error: "Failed to process request" });
  }
};

// Get queue length/status
const getQueueStatus = async (req, res) => {
  const { userId } = req.params;
  try {
    const length = await getQueueLength(userId);
    res.status(200).json({ length });
  } catch (error) {
    res.status(500).json({ error: "Failed to get queue status" });
  }
};

// Clear queue

const clearQueue = async (req, res) => {
  const { userId } = req.params;
  console.log("Clearing queue for user:", userId);
  try {
    const result = await Request.deleteMany({ userId });

    await clearQueueService(userId);

    if (result.deletedCount === 0) {
      return res.status(404).json({ error: "No requests found in the queue" });
    }

    res
      .status(200)
      .json({ success: "Queue cleared", deletedCount: result.deletedCount });
  } catch (error) {
    console.error("Error clearing queue:", error);
    res.status(500).json({ error: "Failed to clear queue" });
  }
};

module.exports = {
  addRequestToQueue,
  processRequestFromQueue,
  getQueueStatus,
  clearQueue,
};
