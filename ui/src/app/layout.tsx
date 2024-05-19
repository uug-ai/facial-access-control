import type { Metadata } from "next";
import Head from 'next/head';
import { Inter } from "next/font/google";
import "../index.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Facial access control",
  description: "By UUG.AI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
