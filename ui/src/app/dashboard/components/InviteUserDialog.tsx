"use client";

import Dialog from "@/components/Dialog";
import { Text, Input, Button } from "@/components/ui";
import React from "react";
import { useAddUserMutation } from "@/lib/services/users/userApi";

const InviteUserDialog = () => {
  const [addUser, { data, error, isLoading }] = useAddUserMutation();

  async function onClose() {
    console.log("Dialog has closed");
  }

  if (error) {
    if ("status" in error) {
      const errMsg =
        "error" in error ? error.error : JSON.stringify(error.data);
      return (
        <div>
          <div>An error has occurred:</div>
          <div>{errMsg}</div>
        </div>
      );
    } else {
      return <div>{error.message}</div>;
    }
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const email = formData.get("email");
    try {
      await addUser({ email: email as string });
    } catch (error) {
      return <div>Failed to add user</div>;
    }

    console.log("Inviting user with email", email);
  }

  return (
    <Dialog title="Invite User" onClose={onClose}>
      <form onSubmit={handleSubmit}>
        <Text as="label" htmlFor="email">
          New user email
        </Text>
        <Input
          className="mb-4"
          type="email"
          id="email"
          name="email"
          placeholder="email"
          required
        />
        <Button type="submit">Invite</Button>
      </form>
    </Dialog>
  );
};

export default InviteUserDialog;
