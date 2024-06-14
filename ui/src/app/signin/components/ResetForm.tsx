"use client";

import React, { useRef } from "react";
import { Button, Input, Row, Text } from "@/components/ui";

type ResetFormProps = {
  onCancel: () => void;
};

const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  // Handle form submission
};

const ResetForm = ({ onCancel }: ResetFormProps) => {
  const email = useRef("");

  return (
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
      <Row className="mb justify-between items-center">
        <Button
          type="submit"
          name="Reset password"
          variant="solid"
          width="third"
        >
          Reset password
        </Button>
        <Text as="a" variant="link" color="light" onClick={onCancel}>
          cancel
        </Text>
      </Row>
    </form>
  );
};

export default ResetForm;
