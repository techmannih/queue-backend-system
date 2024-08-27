const {
  enqueueRequest,
  dequeueRequest,
  getQueueLength,
} = require("../services/queueService");

// Controller to add request to the queue
const addRequestToQueue = async (req, res) => {
  const { userId, request } = req.body;
  try {
    await enqueueRequest(userId, request);
    console.log("Request added to queue");
    res.status(200).json({ success: "Request added to queue" });
  } catch (error) {
    res.status(500).json({ error: "Failed to add request to queue" });
  }
};

// Controller to process request from the queue
const processRequestFromQueue = async (req, res) => {
  const { userId } = req.params;
  try {
    const request = await dequeueRequest(userId);
    res.status(200).json({ request });
  } catch (error) {
    res.status(500).json({ error: "Failed to process request" });
  }
};

// Controller to get queue length
const getQueueStatus = async (req, res) => {
  const { userId } = req.params;
  try {
    const length = await getQueueLength(userId);
    res.status(200).json({ length });
  } catch (error) {
    res.status(500).json({ error: "Failed to get queue status" });
  }
};

module.exports = { addRequestToQueue, processRequestFromQueue, getQueueStatus };
