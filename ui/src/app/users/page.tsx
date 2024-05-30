"use client";

import { useGetUsersQuery } from "@/lib/features/users/userApi";
import React from "react";

let i = 0;

export default function Users() {
  const { data, error, isLoading, refetch } = useGetUsersQuery("");

  console.log(data);
  console.log(i++);
  console.log(error);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  // Possible values of error:
  // FetchBaseQueryError | SerializedError | undefined
  // 1) Checking if error is NOT undefined:
  if (error) {
    // 2) Checking if error is FetchBaseQueryError based on
    // discriminated property 'status':
    if ("status" in error) {
      // you can access all properties of `FetchBaseQueryError` here
      const errMsg =
        "error" in error ? error.error : JSON.stringify(error.data);

      return (
        <div>
          <div>An error has occurred:</div>
          <div>{errMsg}</div>
        </div>
      );
      // 3) We're left with the 3rd case, SerializedError:
    } else {
      // you can access all properties of `SerializedError` here
      return <div>{error.message}</div>;
    }
  }

  return (
    <div>
      <button onClick={() => refetch()}>Refresh Data</button>
      {data &&
        data.data.map((user: any) => (
          <div key={user.username}>{user.username}</div>
        ))}
    </div>
  );
}
