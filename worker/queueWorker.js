const { dequeueRequest } = require("../services/queueService");
const { processRequest } = require("../services/requestService");

const workerFunction = async (userId) => {

  console.log("Worker running for user ID:", userId);
  try {
    while (true) {
      
      // Dequeue the request for the specific user
      const request = await dequeueRequest(userId);
      console.log("Request dequeued:", request);

      if (!request) {
        console.log("No request found in the queue. Stopping worker.");
        break;  // Exit the loop if no request is found
      }

      try {
        // Process the request
        await processRequest(request);
        console.log("Request processed successfully:", request);
      } catch (error) {
        console.error("Error processing request:", error);
      }

      // Sleep for a while to avoid busy-waiting
      await new Promise(resolve => setTimeout(resolve, 5000));
    }
  } catch (error) {
    console.error("Error in worker function:", error);
  }
};

module.exports = workerFunction;
