import { Button, Input, Gradient, Socials, Box, Stack, Password, Row } from "../../components/ui";
import React from "react";

export default function Home() {
  return (
    <Box className="shadow-inner min-h-screen min-w-fit max-w-96 w-4/12 flex flex-col items-start bg-primary-50/15">
        <Gradient />

        <h1>Home</h1>
        <Stack className="p-8">
        <Input
            type="text"
            id="username"
            placeholder="username"
            className="mb-4"
        />
        <Row className="mb-1"></Row>
        <Password placeholder="password" id="username" className="mb-4" />
        <Button type="submit" variant="solid" width="third">
            Sign in
        </Button>
        </Stack>
        <Socials className="mt-auto self-center justify-self-end p-8" />
    </Box>
  );
}
 