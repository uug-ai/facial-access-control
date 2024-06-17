import Dialog from "@/components/Dialog";
import { Text, Input, Button } from "@/components/ui";
import React from "react";

const InviteUserDialog = () => {
  async function onClose() {
    "use server";
    console.log("Dialog has closed");
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    "use server";
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const email = formData.get("email");
    console.log("Inviting user with email", email);
  }

  return (
    <Dialog title="Invite User" onClose={onClose}>
      <form onSubmit={handleSubmit}>
        <Text as="label" htmlFor="email">
          Email
        </Text>
        <Input className="mb-4" type="email" id="email" name="email" />
        <Button type="submit">Invite</Button>
      </form>
    </Dialog>
  );
};

export default InviteUserDialog;
