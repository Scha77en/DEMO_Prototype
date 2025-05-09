import { createClient } from "redis";


// Ensures we connect once to Redis and reuse the same client across requests
let clientPromise; // singleton client

export async function getRedisClient() {
  if (!clientPromise) {
    const client = createClient({
      url: process.env.REDIS_URL || "redis://localhost:6379",
    });
    client.on("error", (err) => console.error("Redis Client Error", err));
    clientPromise = client.connect().then(() => client);
  }
  return clientPromise;
}