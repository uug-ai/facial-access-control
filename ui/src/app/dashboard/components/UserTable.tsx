"use client";

import { useGetUsersQuery } from "@/lib/services/users/userApi";
import { Button, Row, Stack, Table, Text } from "../../../components/ui";
import { ColumnProps } from "@uug-ai/ui/lib/components/Table/Table";
import React from "react";
import DeleteUser from "./DeleteUser";

interface Data {
  id: number;
  name: string;
  email: string;
}

const UserTable = () => {
  const { data, error, isLoading, refetch } = useGetUsersQuery(undefined);

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
    {
      key: "delete",
      title: "",
      render: (_, record) => {
        return <DeleteUser id={record.id} />;
      },
    },
  ];

  const handleRefresh = () => {
    refetch();
  };

  return (
    <Stack>
      <Row className="justify-between">
        <Text as="h2" size="4xl" weight="semibold">
          Users
        </Text>
        <Button onClick={handleRefresh}>Refresh</Button>
      </Row>
      <Table columns={columns} data={mappedData} size="md" colors="primary" />
    </Stack>
  );
};

export default UserTable;
