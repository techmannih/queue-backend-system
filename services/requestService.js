const Request = require("../models/requestModel");

const processRequest = async (request) => {
  try {
    console.log("Processing request:", request);
    await Request.findByIdAndUpdate(request._id, {
      status: "processed",
      updatedAt: new Date(),
    });
    console.log("Request processed successfully:", request._id);
  } catch (error) {
    console.error("Error processing request:", error);

    await Request.findByIdAndUpdate(request._id, {
      status: "failed",
      updatedAt: new Date(),
    });
    throw error;
  }
};

module.exports = { processRequest };
