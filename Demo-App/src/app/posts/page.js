import { getRedisClient } from "@/lib/redis";
import Link from "next/link";
import PostList from "@/components/PostList";

export const revalidate = 0; // Disable ISR for this page

export default async function PostsPage() {
  const redisClient = await getRedisClient();
  const cacheKey = "posts:all";

  const start = Date.now();
  const cached = await redisClient.get(cacheKey);
  let posts;

  if (cached) {
    console.log(`🔍 [Redis] Cache HIT for key="${cacheKey}"`);
    posts = JSON.parse(cached);
  } else {
    console.log(`🔍 [Redis] Cache MISS for key="${cacheKey}", fetching from API...`);
    const res = await fetch("https://jsonplaceholder.typicode.com/posts");
    if (!res.ok) throw new Error("Failed to fetch posts");
    posts = await res.json();
    await redisClient.setEx(cacheKey, 60, JSON.stringify(posts)); // Cache with 60-second TTL
    console.log(`🔧 [Redis] Stored key="${cacheKey}" in cache`);
  }

  const fetchTime = Date.now() - start;

  return (
    <main className="p-4 min-h-screen bg-gradient-to-br from-black to-red-600 text-white">
      <h1 className="text-2xl font-bold mb-4 text-center">Posts</h1>
      <div className="flex justify-center mb-4">
        <div className="bg-white text-black border border-blue-200 px-4 py-2 rounded">
          <span className="font-medium">Data fetch time:</span>{" "}
          <span className="font-mono font-bold">{fetchTime} ms</span>
        </div>
      </div>
      <PostList posts={posts} />
      <div className="flex justify-center mt-8">
        <Link
          href="/"
          className="inline-block bg-white text-red-600 font-semibold px-6 py-3 rounded-lg shadow-lg hover:bg-red-50 transition-transform duration-200 hover:scale-105 active:scale-95"
        >
          Go to Home
        </Link>
      </div>
    </main>
  );
}