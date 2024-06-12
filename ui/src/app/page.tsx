import { authOptions } from "@/utils/auth";
import { Text } from "../components/ui";
import { getServerSession } from "next-auth";
import React from "react";
import SignOutButton from "@/components/SignOutButton";

export default async function App() {
  const session = await getServerSession(authOptions);
  return (
    <div>
      <Text as="h1" size="5xl">
        APP
      </Text>
      <pre>{JSON.stringify(session, null, 2)}</pre>
      <SignOutButton />
    </div>
  );
}
