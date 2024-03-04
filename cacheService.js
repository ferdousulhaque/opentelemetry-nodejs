const Redis = require('ioredis');
const configureOpenTelemetry = require("./tracing");
const tracerProvider = configureOpenTelemetry("redis");
const tracer = tracerProvider.getTracer("open-express");

require("dotenv").config();

const redisOptions = {
    host: process.env.REDIS_HOST,                       // Redis server host
    port: parseInt(process.env.REDIS_PORT),             // Redis server port
    password: process.env.REDIS_PASS,             // Redis server password (if applicable)
    db: parseInt(process.env.REDIS_DB||0),                 // Redis database index
};

async function set(key, value) {   
    const redis = new Redis(redisOptions); 
    const span = tracer.startSpan("redis-set");

    try {
        await redis.set(key, value);
        console.log(`Key set: ${key}`);
        span.addEvent('Key set successfully');
    } catch (error) {
        console.error(`Error setting key ${key}:`, error);
        span.recordException(error);
        span.setStatus({ code: trace.SpanStatusCode.ERROR, message: error.message });
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
    const span = tracer.startSpan("redis-get");

    try {
        const value = await redis.get(key);
        console.log(`Value for ${key}:`, value);
        span.addEvent('Value retrieved successfully');
        return value;
        
    } catch (error) {
        console.error(`Error getting value for key ${key}:`, error);
        span.recordException(error);
        span.setStatus({ code: trace.SpanStatusCode.ERROR, message: error.message });
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