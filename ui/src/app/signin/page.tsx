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
  Logo,
} from "../../components/ui";
import React from "react";
import SignInForm from "./components/SignInForm";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import FaceScan from "./components/Facescan";
import Background from "./components/Background";

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
        <Box className="flex justify-center items-center w-full relative">
        <Background className="absolute"/>
      <FaceScan className="opacity-30"/>
        <Row className="absolute bottom-3 gap-2 place-content-end mr-10">
        <Text>
          A product made by
        </Text>
        <Logo/>
      </Row>
      </Box>
    </Row>
  );
}
