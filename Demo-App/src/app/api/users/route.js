import { getRedisClient } from "@/lib/redis";

export async function GET(req) {
  const redisClient = await getRedisClient();
  const cacheKey = "users:all";

  let users = await redisClient.get(cacheKey);
  if (users) {
    console.log(`🔍 [Redis] Cache HIT for key="${cacheKey}"`);
    users = JSON.parse(users);
  } else {
    console.log(`🔍 [Redis] Cache MISS for key="${cacheKey}", fetching from API...`);
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    if (!response.ok) {
      return new Response(JSON.stringify({ error: "Failed to fetch users" }), { status: 500 });
    }
    users = await response.json();
    await redisClient.setEx(cacheKey, 60, JSON.stringify(users));
    console.log(`🔧 [Redis] Stored key="${cacheKey}" in cache`);
  }

  return new Response(JSON.stringify(users), { status: 200 });
}