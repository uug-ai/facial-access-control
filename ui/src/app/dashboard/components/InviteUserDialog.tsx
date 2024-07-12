"use client";

import Dialog from "@/components/Dialog";
import { Text, Input, Button } from "@/components/ui";
import React, { useState } from "react";
import { useInviteUserMutation } from "@/lib/services/users/userApi";
import { useAppSelector } from "@/lib/hooks";
import { RootState } from "@/lib/store";

const InviteUserDialog: React.FC = () => {
  const [inviteUser, { isLoading }] = useInviteUserMutation();
  const isVisible = useAppSelector(
    (store: RootState) => store.dialog.isVisible
  );
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  function handleClose() {
    setEmail("");
    setFirstName("");
    setLastName("");
    setIsSubmitted(false);
    setSubmitError(null);
    console.log("Dialog has closed");
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitError(null);

    try {
      await inviteUser({
        status: "invited",
        email: email,
        firstname: firstName,
        lastname: lastName,
      }).unwrap();
      setIsSubmitted(true);
      console.log("Inviting user with email", email);
    } catch (err) {
      if (err && typeof err === "object" && "data" in err) {
        const errorData = (err as { data?: { error?: string } }).data;
        setSubmitError(errorData?.error || "Failed to add user");
      } else {
        setSubmitError("An unexpected error occurred");
      }
    }
  }

  return isVisible ? (
    <Dialog title="Invite User" onClose={handleClose}>
      {isSubmitted ? (
        <>
          <Text as="p" className="mb-4">
            User has been invited.
          </Text>
          <Button onClick={handleClose}>Close</Button>
        </>
      ) : (
        <form onSubmit={handleSubmit}>
          <Text as="label" htmlFor="email">
            Email
          </Text>
          <Input
            className="mb-4"
            type="email"
            id="email"
            name="email"
            placeholder="email"
            value={email}
            onChange={(e: { target: { value: string } }) =>
              setEmail(e.target.value)
            }
            required
          />
          <Text as="label" htmlFor="firstName">
            First Name
          </Text>
          <Input
            className="mb-4"
            type="firstName"
            id="firstName"
            name="firstName"
            placeholder="firstName"
            value={firstName}
            onChange={(e: { target: { value: string } }) =>
              setFirstName(e.target.value)
            }
            required
          />
          <Text as="label" htmlFor="lastName">
            Last Name
          </Text>
          <Input
            className="mb-4"
            type="lastName"
            id="lastName"
            name="lastName"
            placeholder="lastName"
            value={lastName}
            onChange={(e: { target: { value: string } }) =>
              setLastName(e.target.value)
            }
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
      )}
    </Dialog>
  ) : null;
};

export default InviteUserDialog;
