import { useEffect, useState } from "react";
import { getUsers } from "@/utils/api";

export function useGetUsers() {
  const [users, setUsers] = useState([]);
  const [fetchTime, setFetchTime] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      const start = Date.now();
      try {
        const users = await getUsers();
        setUsers(users);
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