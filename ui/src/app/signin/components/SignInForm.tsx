"use client";

import { Text, Input, Row, Password, Button } from "../../../components/ui";
import React, { useRef, useState } from "react";
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
  const router = useRouter();
  const email = useRef("");
  const password = useRef("");

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = await signIn("credentials", {
      email: email.current,
      password: password.current,
      redirect: false,
    });
    if (!result?.error) {
      router.push(props.callbackUrl ?? "/");
    } else {
      console.error(result.error);
      alert("Sign in failed. Please check your credentials and try again.");
    }
    console.log(result);
  };

  const handleForgotPasswordClick = () => {
    setShowResetForm(true);
  };

  const handleCancel = () => {
    setShowResetForm(false);
  };

  return showResetForm ? (
    <ResetForm onCancel={handleCancel} />
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
        onChange={(e: { target: { value: string } }) =>
          (email.current = e.target.value)
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
          (password.current = e.target.value)
        }
      />
      <Button type="submit" name="Sign in" variant="solid" width="third">
        Sign in
      </Button>
    </form>
  );
}
