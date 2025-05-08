import redisClient from "@/lib/redis";
import dynamic from "next/dynamic";

export const revalidate = 0;

const PostList = dynamic(() => import('@/components/Postlist'), {
    loading: () => <p>Loading posts...</p>
});

export default async function PostsPage() {
    const cacheKey = "posts:all";

    // 1. Try cache first
    const cached = await redisClient.get(cacheKey);
    let posts;
    if (cached) {
        posts = JSON.parse(cached);
    } else {
        // 2. Fallback to fetch when cache miss
        const res = await fetch("https://jsonplaceholder.typicode.com/posts");
        if (!res.ok) throw new Error("Failed to fetch posts");
        posts = await res.json();

        // 3. Populate cache with TTL (eg. 60 seconds)
        await redisClient.setEx(cacheKey, 60, JSON.stringify(posts));
    }


    // 4. Render posts
    return (
        <main className="p-4">
            <h1 className="text-2xl font-bold mb-4">Posts (cached)</h1>
            <PostList posts={posts} />
        </main>
    );
}