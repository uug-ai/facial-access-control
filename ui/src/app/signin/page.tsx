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

export default async function Signin() {
  // const session = await getServerSession();
  // if (session) {
  //   return {
  //     redirect: {
  //       destination: "/dashboard",
  //     },
  //   };
  // }

  return (
    <Row>
      <Box className="shadow-inner-right min-h-screen min-w-fit max-w-96 w-4/12 flex flex-col items-start bg-primary-50/15">
        <Gradient />
        <Stack className="p-8 ">
          <Text as="h1" size="5xl" weight="semibold" className="pb-8">
            Sign in
          </Text>
          <SignInForm />
        </Stack>
        <Socials className="mt-auto self-center justify-self-end p-8" />
      </Box>
      <Box className="bg-primary-950 flex justify-center items-center w-full">
        <Text as="h2" size="5xl" className="text-white p-8">
          UUG.AI
        </Text>
      </Box>
    </Row>
  );
}
