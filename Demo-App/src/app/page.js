// src/app/page.js
"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden bg-gradient-to-br from-black to-red-600">
      {/* Animated background circles */}
      {/* Pulsing background circle animation */}
      <motion.div
        className="absolute rounded-full bg-white opacity-10 w-80 h-80 top-10 left-10"
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 8, repeat: Infinity }}
      />
      <motion.div
        className="absolute rounded-full bg-white opacity-10 w-96 h-96 bottom-20 right-20"
        animate={{ scale: [1, 1.3, 1] }}
        transition={{ duration: 10, repeat: Infinity }}
      />

      {/* Main content */}
      <main className="z-10 text-center p-8">
        <h1 className="text-4xl font-bold text-white mb-8">Welcome</h1>
        <Link href="/posts" passHref>
          {/* Button with hover & tap animations */}
          <motion.a
            className="inline-block bg-white text-red-600 font-semibold px-6 py-3 rounded-lg shadow-lg hover:bg-red-50"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Go to Posts
          </motion.a>
        </Link>
      </main>
    </div>
  );
}
