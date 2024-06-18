"use client";

import { Button } from "@/components/ui";
import { showDialog } from "@/lib/features/dialog/dialogSlice";
import { useAppDispatch } from "@/lib/hooks";
import Link from "next/link";
import React from "react";

const InviteUser = () => {
  const dispatch = useAppDispatch();

  const handleInviteUser = () => {
    dispatch(showDialog());
  };
  return (
    <Link href="/dashboard?showDialog=true">
      <Button onClick={handleInviteUser}>Invite User</Button>
    </Link>
  );
};

export default InviteUser;
