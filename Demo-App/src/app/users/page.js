"use client";

import UserList from "@/components/UserList";
import Link from "next/link";

export default function UsersPage() {
  return (
    <main className="p-4 min-h-[90vh] bg-gradient-to-br from-black to-red-600 text-white flex flex-col justify-between">
      <UserList />
      <div className="flex justify-center mt-4">
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