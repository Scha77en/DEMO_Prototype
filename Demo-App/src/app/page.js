"use client";

import Link from "next/link";

export default function Home() {
  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden bg-gradient-to-br from-black to-red-600">
      {/* Main content */}
      <main className="z-10 text-center p-8">
        <h1 className="text-4xl font-bold text-white mb-8">Welcome</h1>
        <Link
          href="/posts"
          className="inline-block bg-white text-red-600 font-semibold px-6 py-3 rounded-lg shadow-lg hover:bg-red-50 transition-transform duration-200 hover:scale-105 active:scale-95"
        >
          Go to Posts
        </Link>
      </main>
    </div>
  );
}
