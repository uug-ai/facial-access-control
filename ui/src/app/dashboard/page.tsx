import { Box, Row, Stack, Text } from "@uug-ai/ui";
import React from "react";
import Users from "./_components/_users";
import AddUser from "./_components/_addUser";

const Dashboard = () => {
  return (
    <Box>
      <Stack className="gap-12 p-8 ">
        <Row className="justify-between">
          <Text as="h1" size="5xl" weight="semibold">
            Dashboard
          </Text>
          <Text as="h2" size="4xl" weight="semibold" className="self-end">
            Organisation
          </Text>
        </Row>
        <AddUser />
        <Users />
      </Stack>
    </Box>
  );
};

export default Dashboard;
