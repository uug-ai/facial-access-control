"use client";

import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function SignOutButton() {
  const router = useRouter();

  const handleSignOut = () => {
    signOut({
      callbackUrl: "/signin",
    });
  };

  return <button onClick={handleSignOut}>Sign out</button>;
}
