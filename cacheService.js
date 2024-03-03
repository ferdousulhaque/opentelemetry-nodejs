const redis = require("redis");

// Specify your Redis server configurations
const redisConfig = {
  host: "localhost", // Replace with your Redis server host
  port: 6379, // Replace with your Redis server port
  password: "", // Replace with your Redis server password if applicable
  // Add other configuration options as needed
};

const redisClient = redis.createClient(redisConfig);

(async () => {
  redisClient.on("error", (err) => {
    console.log("Redis Client Error", err);
  });
  redisClient.on("ready", () => console.log("Redis is ready"));

  await redisClient.connect();

  await redisClient.ping();
})();

// Function to put a key-value pair in Redis
async function putKey(key, value) {
    await redisClient.set(key, value);
}

// Function to get a value by key from Redis
async function getKey(key) {
    return  await redisClient.get(key);
}

// Export the functions for use in other modules
module.exports = {
  putKey,
  getKey,
};