import { getRedisClient } from "@/lib/redis";

export async function GET(req) {
  const redisClient = await getRedisClient();
  const cacheKey = "users:all";

  let users = await redisClient.get(cacheKey);
  if (users) {
    users = JSON.parse(users);
  } else {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    if (!response.ok) {
      return new Response(JSON.stringify({ error: "Failed to fetch users" }), { status: 500 });
    }
    users = await response.json();
    await redisClient.setEx(cacheKey, 60, JSON.stringify(users)); // Cache for 60 seconds
  }

  return new Response(JSON.stringify(users), { status: 200 });
}