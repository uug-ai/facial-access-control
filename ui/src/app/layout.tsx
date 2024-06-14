import StoreProvider from "./StoreProvider";
import type { Metadata } from "next";
import Head from "next/head";
import { Inter } from "next/font/google";
import "../index.css";
import SessionProvider from "../components/SessionProvider";
import { getServerSession } from "next-auth";
import { Row, Stack } from "../components/ui";
import { authOptions } from "@/utils/auth";
import SignOutButton from "@/components/SignOutButton";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Facial access control",
  description: "By UUG.AI",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);
  return (
    <StoreProvider>
      <html lang="en">
        <body className={inter.className}>
          <SessionProvider session={session}>{children}</SessionProvider>
        </body>
      </html>
    </StoreProvider>
  );
}
