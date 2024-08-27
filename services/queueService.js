const { createClient } = require("redis");
const client = createClient({
  url: process.env.REDIS_URL,
});

client.on("error", (err) => {
  console.error("Redis error:", err);
});

(async () => {
  await client.connect();
})();

// Function to create a queue (Redis list)
const createQueue = async (userId) => {
  const queueName = `${userId}_queue`;
  await client.lPush(queueName, "");
};

// Function to add a request to a queue
const enqueueRequest = async (userId, request) => {
  const queueName = `${userId}_queue`;
  try {
    await client.rPush(queueName, JSON.stringify(request));
    console.log("Request enqueued");
  } catch (err) {
    console.error("Error enqueuing request:", err);
    throw err;
  }
};

// Function to get requests from a queue
const dequeueRequest = async (userId) => {
  const queueName = `${userId}_queue`;
  try {
    const request = await client.lPop(queueName);
    return request ? JSON.parse(request) : null;
  } catch (err) {
    console.error("Error dequeuing request:", err);
    throw err;
  }
};

// Function to monitor the length of a queue
const getQueueLength = async (userId) => {
  const queueName = `${userId}_queue`;
  try {
    const length = await client.lLen(queueName);
    return length;
  } catch (err) {
    console.error("Error getting queue length:", err);
    throw err;
  }
};

module.exports = {
  createQueue,
  enqueueRequest,
  dequeueRequest,
  getQueueLength,
};
