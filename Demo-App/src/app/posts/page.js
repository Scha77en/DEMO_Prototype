import dynamic from "next/dynamic";
import { getRedisClient } from "@/lib/redis";

export const revalidate = 0;

// Dynamically load the PostList client component
const PostList = dynamic(() => import("@/components/PostList"), {
  loading: () => <p>Loading posts…</p>,
});

export default async function PostsPage() {
  const redisClient = await getRedisClient();
  const cacheKey = "posts:all";

  // Measure fetch/cache time
  const start = Date.now();
  const cached = await redisClient.get(cacheKey);
  let posts;

  if (cached) {
    console.log(`🔍 [redis] cache HIT for key=\"${cacheKey}\"`);
    posts = JSON.parse(cached);
  } else {
    console.log(`🔍 [redis] cache MISS for key=\"${cacheKey}\", fetching from API…`);
    const res = await fetch("https://jsonplaceholder.typicode.com/posts");
    if (!res.ok) throw new Error("Failed to fetch posts");
    posts = await res.json();

    await redisClient.setEx(cacheKey, 60, JSON.stringify(posts));
    console.log(`🔧 [redis] stored key=\"${cacheKey}\" with TTL=60s`);
  }

  const fetchTime = Date.now() - start;

  return (
    <main className="p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">Posts (cached + split)</h1>
      <div className="flex justify-center mb-4">
        <div className="bg-blue-50 border border-blue-200 text-blue-800 px-4 py-2 rounded">
          <span className="font-medium">Data fetch time:</span>{" "}
          <span className="font-mono font-bold">{fetchTime} ms</span>
        </div>
      </div>
      <PostList posts={posts} />
    </main>
  );
}
