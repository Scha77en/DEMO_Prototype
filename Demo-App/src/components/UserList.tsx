"use client";

import React from "react";
import { useGetUsers } from "@/hooks/useGetUsers";

export default function UserList() {
  const { users, fetchTime } = useGetUsers();

  return (
    <div className="p-4 min-h-screen bg-gradient-to-br from-black to-red-600 text-white">
      <h1 className="text-2xl font-bold mb-4 text-center">Users</h1>
      {fetchTime !== null && (
        <div className="flex justify-center mb-4">
          <div className="bg-white text-black border border-blue-200 px-4 py-2 rounded">
            <span className="font-medium">Data fetch time:</span>{" "}
            <span className="font-mono font-bold">{fetchTime} ms</span>
          </div>
        </div>
      )}
      <ul className="list-disc list-inside">
        {users.map((user: any) => (
          <li key={user.id} className="mb-2">
            <span className="font-bold">{user.name}</span> - {user.email}
          </li>
        ))}
      </ul>
    </div>
  );
}