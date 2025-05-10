"use client";

import { useEffect, useState } from "react";

export function useGetUsers() {
  const [users, setUsers] = useState([]);
  const [fetchTime, setFetchTime] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      const start = Date.now();
      try {
        const res = await fetch("/api/users");
        if (!res.ok) throw new Error("Failed to fetch users");
        const data = await res.json();
        setUsers(data);
        setFetchTime(Date.now() - start);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, []);

  return { users, fetchTime, isLoading };
}