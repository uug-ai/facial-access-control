import { Button, Input, Gradient, Socials } from "@uug-ai/ui";
import React from "react";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>Facial Access Control</h1>
      <Gradient />
      <Button>Click me</Button>
      <Input placeholder="Type here" />
      <Socials />
    </main>
  );
}
 