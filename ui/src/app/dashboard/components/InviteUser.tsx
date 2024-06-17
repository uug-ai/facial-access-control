import { Button } from "@/components/ui";
import Link from "next/link";
import React from "react";

const InviteUser = () => {
  return (
    <Link href="/dashboard?showDialog=true">
      <Button>Invite User</Button>
    </Link>
  );
};

export default InviteUser;
