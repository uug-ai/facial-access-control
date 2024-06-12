"use client";

import { signOut } from "next-auth/react";

export default () => <button onClick={() => signOut()}>Sign out</button>;
