const client = require("../config/queue");

// Enqueue request to Redis
const enqueueRequest = async (userId, request) => {
  const queueName = `${userId}_queue`;
  try {
    await client.rPush(queueName, JSON.stringify(request));
  } catch (err) {
    throw err;
  }
};

// Dequeue request from Redis
const dequeueRequest = async (userId) => {
  console.log("Dequeue Request for User ID:", userId);
  const queueName = `${userId}_queue`;
  console.log("Queue Name:", queueName);
  try {
    const request = await client.lPop(queueName);
    console.log("Dequeued Request:", request);
    return request ? JSON.parse(request) : null;
  } catch (err) {
    console.error("Error in dequeueRequest:", err);
    throw err;
  }
};

// Get queue length from Redis
const getQueueLength = async (userId) => {
  const queueName = `${userId}_queue`;
  try {
    const length = await client.lLen(queueName);
    return length;
  } catch (err) {
    throw err;
  }
};

// Clear queue in Redis
const clearQueueService = async (userId) => {
  const queueName = `${userId}_queue`;
  try {
    await client.del(queueName);
    console.log(`Queue cleared for user ID: ${userId}`);
  } catch (err) {
    throw err;
  }
};

module.exports = {
  enqueueRequest,
  dequeueRequest,
  getQueueLength,
  clearQueueService,
};
