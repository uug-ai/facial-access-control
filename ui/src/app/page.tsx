import { Text } from "../components/ui";
import { getServerSession } from "next-auth";
import React from "react";

export default async function App() {
  const session = await getServerSession();
  return (
    <div>
      <Text as="h1" size="5xl">
        APP
      </Text>
      <pre>{JSON.stringify(session, null, 2)}</pre>
    </div>
  );
}
