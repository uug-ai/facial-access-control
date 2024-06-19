"use client";

import Dialog from "@/components/Dialog";
import { Text, Input, Button } from "@/components/ui";
import React, { useState } from "react";
import { useAddUserMutation } from "@/lib/services/users/userApi";
import { useAppSelector } from "@/lib/hooks";
import { RootState } from "@/lib/store";

const InviteUserDialog: React.FC = () => {
  const [addUser, { error, isLoading }] = useAddUserMutation();
  const isVisible = useAppSelector(
    (store: RootState) => store.dialog.isVisible
  );
  const [email, setEmail] = useState("");
  const [submitError, setSubmitError] = useState<string | null>(null);

  async function handleClose() {
    console.log("Dialog has closed");
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitError(null);

    try {
      await addUser({ email }).unwrap();
      console.log("Inviting user with email", email);
    } catch (err) {
      if ("data" in err) {
        setSubmitError(err.data.error || "Failed to add user");
      } else {
        setSubmitError("An unexpected error occurred");
      }
    }
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
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        {submitError && (
          <Text as="p" variant="error" className="text-red-700">
            {submitError}
          </Text>
        )}
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Inviting..." : "Invite"}
        </Button>
      </form>
    </Dialog>
  ) : null;
};

export default InviteUserDialog;
