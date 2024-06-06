"use client";

import React from "react";
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

const LoginForm = () => {
  return (
    <Stack className="p-8">
      <Text as="h2" size="5xl" weight="semibold" className="pb-8">
        Sign in
      </Text>
      <Text as="label" htmlFor="email" weight="semibold" className="mb-1">
        Email
      </Text>
      <Input type="text" id="email" placeholder="email" className="mb-4" />
      <Row className="mb justify-between">
        <Text as="label" htmlFor="password" weight="semibold">
          Password
        </Text>
        <Text as="a" variant="link" color="light">
          forgot password?
        </Text>
      </Row>
      <Password placeholder="password" id="username" className="mb-4" />
      <Button type="submit" name="Sign in" variant="solid" width="third">
        Sign in
      </Button>
    </Stack>
  );
};

export default LoginForm;
