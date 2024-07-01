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
  FaceScan,
  Logo
} from "../../components/ui";
import React from "react";
import SignInForm from "./components/SignInForm";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Image from "next/image";
import BG from "../../../public/BG.png"


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
        <Image src={BG} alt="background image" layout="fill"></Image>
        <FaceScan className="absolute size-96"/>
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
