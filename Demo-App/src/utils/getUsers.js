"use server";

import { getRedisClient } from "@/lib/redis";

export async function getUsers() {
  const redisClient = await getRedisClient();
  const cacheKey = "users:all";

  const cached = await redisClient.get(cacheKey);
  let users;

  if (cached) {
    console.log(`🔍 [Redis] Cache HIT for key="${cacheKey}"`);
    users = JSON.parse(cached);
  } else {
    console.log(
      `🔍 [Redis] Cache MISS for key="${cacheKey}", fetching from API...`
    );
    const res = await fetch("https://jsonplaceholder.typicode.com/users");
    if (!res.ok) throw new Error("Failed to fetch users");
    users = await res.json();
    await redisClient.setEx(cacheKey, 60, JSON.stringify(users));
    console.log(`🔧 [Redis] Stored key="${cacheKey}" in cache`);
  }

  return users;
}