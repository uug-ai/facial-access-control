"use client";

import { Text, Input, Row, Password, Button } from "../../../components/ui";
import React, { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

import ResetForm from "./ResetForm";

type Props = {
  className?: string | null;
  callbackUrl?: string | null;
  error?: string | null;
};

export default function SignInForm(props: Props) {
  const [showResetForm, setShowResetForm] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    if (!result?.error) {
      router.push(props.callbackUrl ?? "/");
    } else {
      console.error(result.error);
      setError(result.error);
    }
  };

  const handleForgotPasswordClick = () => {
    setShowResetForm(true);
  };

  const handleCancel = () => {
    setShowResetForm(false);
  };

  return showResetForm ? (
    <ResetForm email={email} onEmailChange={setEmail} onCancel={handleCancel} />
  ) : (
    <form onSubmit={onSubmit} className="w-full">
      <Text as="label" htmlFor="email" weight="semibold" className="mb-1">
        Email
      </Text>
      <Input
        type="text"
        name="email"
        id="email"
        placeholder="email"
        className="mb-4 h-auto"
        required
        value={email}
        onChange={(e: { target: { value: string } }) =>
          setEmail(e.target.value)
        }
      />
      <Row className="mb justify-between">
        <Text as="label" htmlFor="password" weight="semibold">
          Password
        </Text>
        <Text
          as="a"
          variant="link"
          color="light"
          onClick={handleForgotPasswordClick}
        >
          forgot password?
        </Text>
      </Row>
      <Password
        name="password"
        id="password"
        placeholder="password"
        className="mb-4"
        required
        onChange={(e: { target: { value: string } }) =>
          setPassword(e.target.value)
        }
      />
      <Text as="p" variant="error" className="mb-4 text-red-700">
        {error}
      </Text>
      <Button type="submit" name="Sign in" variant="solid" width="third">
        Sign in
      </Button>
    </form>
  );
}
