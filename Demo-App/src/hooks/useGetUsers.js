"use client";

import { useEffect, useState } from "react";

export function useGetUsers() {
  const [users, setUsers] = useState([]);
  const [fetchTime, setFetchTime] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      const cacheKey = "users:all";
      const start = Date.now();

      // Check if users are cached in localStorage
      const cached = localStorage.getItem(cacheKey);
      if (cached) {
        console.log(`🔍 [localStorage] cache HIT for key="${cacheKey}"`);
        setUsers(JSON.parse(cached));
        setFetchTime(Date.now() - start);
      } else {
        console.log(`🔍 [localStorage] cache MISS for key="${cacheKey}", fetching from API…`);
        try {
          const res = await fetch("https://jsonplaceholder.typicode.com/users");
          if (!res.ok) throw new Error("Failed to fetch users");
          const data = await res.json();

          // Cache the data in localStorage
          localStorage.setItem(cacheKey, JSON.stringify(data));
          console.log(`🔧 [localStorage] stored key="${cacheKey}"`);
          setUsers(data);
        } catch (error) {
          console.error("Error fetching users:", error);
        } finally {
          setFetchTime(Date.now() - start);
        }
      }
    };

    fetchUsers();
  }, []);

  return { users, fetchTime };
}