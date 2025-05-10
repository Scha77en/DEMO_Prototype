"use client";

import React, { useState, useEffect } from "react";

export default function PostList({ posts }) {
  const [isLoading, setIsLoading] = useState(!posts || posts.length === 0);

  useEffect(() => {
    if (posts && posts.length > 0) {
      setIsLoading(false);
    }
  }, [posts]);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[200px]">
        <p className="text-lg font-medium text-white">Loading posts...</p>
      </div>
    );
  }

  return (
    <ul className="space-y-2">
      {posts.slice(0, 10).map((post) => (
        <li key={post.id} className="border p-2 rounded">
          <h2 className="font-semibold">{post.title}</h2>
          <p className="text-sm text-gray-600">{post.body}</p>
        </li>
      ))}
    </ul>
  );
}