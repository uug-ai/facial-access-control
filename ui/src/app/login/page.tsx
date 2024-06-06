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
import LoginForm from "./components/LoginForm";

export default function Login() {
  return (
    <Box className="shadow-inner min-h-screen min-w-fit max-w-96 w-4/12 flex flex-col items-start bg-primary-50/15">
      <Gradient />
      <LoginForm />
      <Socials className="mt-auto self-center justify-self-end p-8" />
    </Box>
  );
}
