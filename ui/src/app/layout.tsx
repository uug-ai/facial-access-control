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
          <SessionProvider session={session}>
            {session ? (
              <Row>
                {/* Mock navigation element with session info */}
                <Stack className="w-60 bg-gray-200">
                  <div className="w-60 truncate">
                    <p>NAVIGATION</p>
                    <pre>{JSON.stringify(session, null, 2)}</pre>
                  </div>
                  <SignOutButton />
                </Stack>
                <main className="grow">{children}</main>
              </Row>
            ) : (
              children
            )}
          </SessionProvider>
        </body>
      </html>
    </StoreProvider>
  );
}
