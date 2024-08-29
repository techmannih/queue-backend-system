const workerFunction = require("../worker/queueWorker");

// Controller to process requests from the queue
const processRequests = async (req, res) => {
  try {
    const { userId } = req.params;
    console.log("Processing requests for user ID:", userId);
    workerFunction(userId);
    res.status(200).json({ success: "Worker started" });
  } catch (error) {
    console.error("Error in processRequests:", error);
    res.status(500).json({ error: "Failed to process request" });
  }
};

module.exports = { processRequests };
