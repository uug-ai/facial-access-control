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
} from "../components/ui";
import React from "react";

export default function App() {
  return (
    <Box className="shadow-inner min-h-screen min-w-fit max-w-96 w-4/12 flex flex-col items-start bg-primary-50/15">
      <Gradient />
      <Stack className="p-8">
        <Text as="h2" size="5xl" weight="semibold" className="pb-8">
          Sign in
        </Text>
        <Text as="label" weight="semibold" className="mb-1">
          username
        </Text>
        <Input
          type="text"
          id="username"
          placeholder="username"
          className="mb-4"
        />
        <Row className="mb-1">
          <Text as="label" weight="semibold">
            password
          </Text>
          <Text as="a" variant="link" color="light">
            forgot password?
          </Text>
        </Row>
        <Password placeholder="password" id="username" className="mb-4" />
        <Button type="submit" variant="solid" width="third">
          Sign in
        </Button>
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
