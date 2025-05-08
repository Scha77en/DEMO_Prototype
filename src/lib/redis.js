import {createClient} from "redis";

const redisClient = createClient({
    url: process.env.REDIS_URL || "redis://localhost:6379",
});

if (!redisClient.isOpen) {
    redisClient.connect().catch(console.error);
}

export default redisClient;