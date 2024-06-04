import { useRouter } from "next/router";
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
import React, { FormEvent } from "react";

export default function Login() {
  const router = useRouter();

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const email = form.get("email") as string;
    const password = form.get("password") as string;

    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      router.push("/dashboard");
    } else {
      alert("Failed to login");
    }
  }

  return (
    <Box className="shadow-inner min-h-screen min-w-fit max-w-96 w-4/12 flex flex-col items-start bg-primary-50/15">
      <Gradient />
      <Stack className="p-8">
        <Text as="h2" size="5xl" weight="semibold" className="pb-8">
          Sign in
        </Text>
        <form onSubmit={handleSubmit}>
          <Text as="label" for="email" weight="semibold" className="mb-1">
            Email
          </Text>
          <Input type="text" id="email" placeholder="email" className="mb-4" />
          <Row className="mb justify-between ">
            <Text as="label" for="password" weight="semibold">
              Password
            </Text>
            <Text as="a" variant="link" color="light">
              forgot password?
            </Text>
          </Row>
          <Password placeholder="password" id="username" className="mb-4" />
          <Button type="submit" variant="solid" width="third">
            Sign in
          </Button>
        </form>
      </Stack>
      <Socials className="mt-auto self-center justify-self-end p-8" />
    </Box>

    // <Box className="shadow-inner min-h-screen min-w-fit max-w-96 w-4/12 flex flex-col items-start bg-primary-50/15">
    //   <Gradient />
    //   <Stack className="p-8">
    //     <Text as="h2" size="5xl" weight="semibold">
    //       Sign in
    //     </Text>
    //     <Input
    //       type="text"
    //       id="username"
    //       placeholder="username"
    //       className="mb-4"
    //     />
    //     <Row className="mb-1"></Row>
    //     <Password placeholder="password" id="username" className="mb-4" />
    //     <Button type="submit" variant="solid" width="third">
    //       Sign in
    //     </Button>
    //   </Stack>
    //   <Socials className="mt-auto self-center justify-self-end p-8" />
    // </Box>
  );
}
