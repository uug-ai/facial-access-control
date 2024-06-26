import {
  Button,
  Input,
  Gradient,
  Text,
  Socials,
  Box,
  Stack,
  Password,
  Row,
} from "../../components/ui";
import React from "react";
import SignInForm from "./components/SignInForm";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function Signin() {
  const session = await getServerSession();
  if (session) {
    redirect("/dashboard");
  }

  return (
    <Row>
      <Box className="shadow-inner-right min-h-screen min-w-fit max-w-96 w-4/12 flex flex-col items-start bg-primary-50/15">
        <Gradient />
        <Stack className="p-8 ">
          <Text as="h1" size="5xl" weight="semibold" className="pb-8">
            Sign in
          </Text>
          <SignInForm callbackUrl="/dashboard" />
        </Stack>
        <Socials className="mt-auto self-center justify-self-end p-8" />
      </Box>
      <Box className="bg-gradient-to-t from-primary-600 to-primary-900 flex justify-center items-center w-full">
        <Text as="h2" size="5xl" className="text-white p-8">
          UUG.AI
        </Text>
      </Box>
    </Row>
  );
}
