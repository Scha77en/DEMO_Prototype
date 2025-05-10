import React from "react";
import { useGetUsers } from "@/hooks/useGetUsers";

export default function UserList() {
  const { users, fetchTime, isLoading } = useGetUsers();

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[200px]">
        <p className="text-lg font-medium text-white">Loading users...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center">
      {fetchTime !== null && (
        <div className="bg-white text-black border border-blue-200 px-4 py-2 rounded mb-4">
          <span className="font-medium">Data fetch time:</span>{" "}
          <span className="font-mono font-bold">{fetchTime} ms</span>
        </div>
      )}
      <ul className="space-y-2 w-full max-w-2xl">
        {users.map((user) => (
          <li key={user.id} className="border p-2 rounded">
            <h2 className="font-semibold">{user.name}</h2>
            <p className="text-sm text-gray-600">{user.email}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}