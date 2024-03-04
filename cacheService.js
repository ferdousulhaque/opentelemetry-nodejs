const Redis = require('ioredis');
const configureOpenTelemetry = require("./tracing");
const tracerProvider = configureOpenTelemetry("redis");

require("dotenv").config();

const redisOptions = {
    host: process.env.REDIS_HOST,                       // Redis server host
    port: parseInt(process.env.REDIS_PORT),             // Redis server port
    password: process.env.REDIS_PASS,             // Redis server password (if applicable)
    db: parseInt(process.env.REDIS_DB||0),                 // Redis database index
};

async function set(key, value) {   
    const redis = new Redis(redisOptions); 
    const tracer = tracerProvider.getTracer("open-express");
    const span = tracer.startSpan("redis-set");

    try {
        await redis.set(key, value);
    } catch (error) {
        console.error('Redis operation failed:', error.message);
    } finally {
        // Close the Redis connection in a finally block to ensure it's always closed
        if (redis) {
            await redis.quit();
        }
        span.end();
    }
}


async function get(key) {
    const redis = new Redis(redisOptions);
    const tracer = tracerProvider.getTracer("open-express");
    const span = tracer.startSpan("redis-get");

    try {
        return await redis.get(key);
        
    } catch (error) {
        console.error('Redis operation failed:', error.message);
    } finally {
        // Close the Redis connection in a finally block to ensure it's always closed
        if (redis) {
            await redis.quit();
        }
        span.end();
    }
  }

module.exports = {
    set,
    get
}