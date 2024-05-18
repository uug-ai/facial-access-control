import { Button, Input, Gradient } from "@uug-ai/ui";
import React from "react";
import "../../styles/tailwind.css";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Gradient />
      <Button>Click me</Button>
      <Input placeholder="Type here" />
    </main>
  );
}
 