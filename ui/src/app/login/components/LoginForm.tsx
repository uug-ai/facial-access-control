"use client";

import React, { useRef } from "react";
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
} from "../../../components/ui";
import Credentials from "next-auth/providers/credentials";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

const LoginForm = () => {
  const router = useRouter();
  const email = useRef("");
  const password = useRef("");
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = await signIn("credentials", {
      email: email.current,
      password: password.current,
      redirect: false,
    });
    if (result && !result.error) {
      router.push("/");
    } else {
      console.error("User not found");
    }
  };
  return (
    <Stack className="p-8">
      <Text as="h2" size="5xl" weight="semibold" className="pb-8">
        Sign in
      </Text>
      <form onSubmit={onSubmit} className="w-full">
        <Text as="label" htmlFor="email" weight="semibold" className="mb-1">
          Email
        </Text>
        <Input
          type="text"
          name="email"
          id="email"
          placeholder="email"
          className="mb-4"
          onChange={(e: { target: { value: string } }) =>
            (email.current = e.target.value)
          }
        />
        <Row className="mb justify-between">
          <Text as="label" htmlFor="password" weight="semibold">
            Password
          </Text>
          <Text as="a" variant="link" color="light">
            forgot password?
          </Text>
        </Row>
        <Password
          name="password"
          id="password"
          placeholder="password"
          className="mb-4"
          onChange={(e: { target: { value: string } }) =>
            (password.current = e.target.value)
          }
        />
        <Button type="submit" name="Sign in" variant="solid" width="third">
          Sign in
        </Button>
      </form>
    </Stack>
  );
};

export default LoginForm;
