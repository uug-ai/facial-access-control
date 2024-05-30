"use client";

import { useGetUsersQuery } from "@/lib/features/users/userApi";
import React from "react";

export default function Users() {
  const { data, error, isLoading } = useGetUsersQuery("/users");

  console.log(data);

  return (
    <div>
      {data &&
        data.data.map((user: any) => (
          <div key={user.username}>{user.username}</div>
        ))}
    </div>
  );
}
