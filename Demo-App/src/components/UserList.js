"use client";

import React from "react";
import { useGetUsers } from "@/hooks/useGetUsers";

export default function UserList() {
  const { users, fetchTime } = useGetUsers();

  return (
    <div className="flex flex-col items-center">
      {fetchTime !== null && (
        <div className="bg-white text-black border border-blue-200 px-4 py-2 rounded mb-4">
          <span className="font-medium">Data fetch time:</span>{" "}
          <span className="font-mono font-bold">{fetchTime} ms</span>
        </div>
      )}
      <ul className="space-y-2 w-full max-w-2xl">
        {users.slice(0, 10).map((user) => (
          <li key={user.id} className="border p-2 rounded">
            <h2 className="font-semibold">{user.name}</h2>
            <p className="text-sm text-gray-600">{user.email}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}