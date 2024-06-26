import { Box, Row, Stack, Text, Gradient } from "../../components/ui";
import React from "react";
import AddUser from "./components/AddUser";
import UserTable from "./components/UserTable";
import LocationInfo from "./components/LocationInfo";
import AddLocation from "./components/AddLocation";
import InviteUser from "./components/InviteUser";
import InviteUserDialog from "./components/InviteUserDialog";
import { useAppSelector } from "@/lib/hooks";

const Dashboard = () => {
  return (
    <Box className="w-full">
      <InviteUserDialog />

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
            <InviteUser />
          </Row>
        </Row>
        <UserTable />
      </Stack>
    </Box>
  );
};

export default Dashboard;
