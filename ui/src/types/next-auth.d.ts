import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      id: number;
      firstname: string;
      lastname: string;
      email: string;
      role: string;
      installed: boolean;
      language: string;
      token: string;
    } & DefaultSession["user"];
  }
}
