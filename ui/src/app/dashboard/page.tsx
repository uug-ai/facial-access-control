import { Box, Row, Stack, Text, Gradient } from "@uug-ai/ui";
import React from "react";
import AddUser from "./components/AddUser";
import UserTable from "./components/UserTable";

const Dashboard = () => {
  return (
    <Box>
      <Gradient />
      <Stack className="gap-12 p-8 ">
        <Row className="justify-between">
          <Text as="h1" size="5xl" weight="semibold">
            Dashboard
          </Text>
          <Text as="h2" size="4xl" weight="semibold" className="self-end">
            Organisation
          </Text>
        </Row>
        <Row>
          <AddUser />
        </Row>
        <UserTable />
      </Stack>
    </Box>
  );
};

export default Dashboard;
