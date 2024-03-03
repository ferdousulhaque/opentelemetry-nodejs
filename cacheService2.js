const Redis = require('ioredis');

// Replace the following with your actual Redis server details
const redisOptions = {
    host: 'localhost',      // Redis server host
    port: 6379,             // Redis server port
    password: '', // Redis server password (if applicable)
    db: 0,                  // Redis database index
    // Add other options as needed
};

// Example Redis operation
async function putKey(key, value) {   
    // Create the Redis client with the specified configuration
    const redis = new Redis(redisOptions); 
    try {
        

        // Your Redis operation here
        await redis.set(key, value);

        // Continue with other operations if needed
        // ...

        console.log('Redis operation successful');
    } catch (error) {
        console.error('Redis operation failed:', error.message);
    } finally {
        // Close the Redis connection in a finally block to ensure it's always closed
        if (redis) {
            await redis.quit();
        }
    }
}

// Example Redis operation
async function getKey(key) {
    // Create the Redis client with the specified configuration
    const redis = new Redis(redisOptions);
    try {
        
        console.log('Redis operation successful');

        // Your Redis operation here
        return await redis.get(key);
        
    } catch (error) {
        console.error('Redis operation failed:', error.message);
    } finally {
        // Close the Redis connection in a finally block to ensure it's always closed
        if (redis) {
            await redis.quit();
        }
    }
  }

module.exports = {
    putKey,
    getKey
}