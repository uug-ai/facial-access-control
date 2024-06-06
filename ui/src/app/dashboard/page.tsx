import { Box, Row, Stack, Text, Gradient } from "@uug-ai/ui";
import React from "react";
import AddUser from "./components/AddUser";
import UserTable from "./components/UserTable";
import LocationInfo from "./components/LocationInfo";
import AddLocation from "./components/AddLocation";
import { AuthWrapper } from "@/components/AuthWrapper";

const Dashboard = () => {
  return (
    <AuthWrapper>
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
          <Row className="justify-between gap-4">
            <Row>
              <LocationInfo />
            </Row>
            <Row className="gap-4 justify-end">
              <AddLocation />
              <AddUser />
            </Row>
          </Row>
          <UserTable />
        </Stack>
      </Box>
    </AuthWrapper>
  );
};

export default Dashboard;
