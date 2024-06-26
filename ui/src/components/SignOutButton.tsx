"use client";

import { signOut } from "next-auth/react";

export default function SignOutButton() {
  const handleSignOut = () => {
    signOut({
      callbackUrl: "/signin",
    });
  };

  return <button onClick={handleSignOut}>Sign out</button>;
}
