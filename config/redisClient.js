import Redis from 'ioredis';

const redisClient = new Redis({
    host: process.env.REDIS_HOST || '127.0.0.1',
    port: process.env.REDIS_PORT || 6379,
    retryStrategy: (times) => {
        const delay = Math.min(times * 50, 2000); // Retry delay
        if (times > 10) {
            console.error('Redis is down. Maximum retries reached.');
            return null;  // Stop retrying after 10 attempts
        }
        return delay;
    },
});

redisClient.on('connect', () => {
    console.log('Connected to Redis');
});

redisClient.on('error', (err) => {
    console.error('Redis connection error:', err);
});

// Graceful shutdown on SIGINT (Ctrl+C) and SIGTERM
process.on('SIGINT', async () => {
    await redisClient.quit();
    console.log('Redis connection closed gracefully');
    process.exit(0);
});

process.on('SIGTERM', async () => {
    await redisClient.quit();
    console.log('Redis connection closed gracefully');
    process.exit(0);
});

export default redisClient;
