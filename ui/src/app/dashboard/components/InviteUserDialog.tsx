"use client";

import Dialog from "@/components/Dialog";
import { Text, Input, Button } from "@/components/ui";
import React from "react";
import { useAddUserMutation } from "@/lib/services/users/userApi";
import { useAppSelector } from "@/lib/hooks"; // Import the custom hook
import { RootState } from "@/lib/store"; // Import the RootState type

const InviteUserDialog: React.FC = () => {
  const [addUser, { error, isLoading }] = useAddUserMutation();
  const isVisible = useAppSelector(
    (store: RootState) => store.dialog.isVisible
  );

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

  async function handleClose() {
    console.log("Dialog has closed");
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

  return isVisible ? (
    <Dialog title="Invite User" onClose={handleClose}>
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
  ) : null;
};

export default InviteUserDialog;
