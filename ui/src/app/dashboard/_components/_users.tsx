"use client";

import { useGetUsersQuery } from "@/lib/services/users/userApi";
import { Table, Text } from "@uug-ai/ui";
import { ColumnProps } from "@uug-ai/ui/lib/components/Table/Table";
import React from "react";

interface Data {
  id: number;
  name: string;
  email: string;
}

const Users = () => {
  const { data, error, isLoading } = useGetUsersQuery(undefined);

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

  const mappedData =
    data?.data.map((user: User) => ({
      id: user.id,
      name: `${user.firstname} ${user.lastname}`,
      email: user.email,
    })) ?? [];

  const columns: Array<ColumnProps<Data>> = [
    {
      key: "id",
      title: "Id",
    },
    {
      key: "name",
      title: "Name",
    },
    {
      key: "email",
      title: "Email",
    },
  ];

  return (
    <Table columns={columns} data={mappedData} size="md" colors="primary" />
  );
};

export default Users;
