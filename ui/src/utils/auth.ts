import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: "Credentials",
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can  pass any HTML attribute to the <input> tag through the object.
      credentials: {
        email: { label: "Email", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        // You need to provide your own logic here that takes the credentials
        // submitted and returns either a object representing a user or value
        // that is false/null if the credentials are invalid.
        // e.g. return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
        // You can also use the `req` object to obtain additional parameters
        // (i.e., the request IP address)
        const res = await fetch("http://localhost/api/login", {
          method: "POST",
          body: JSON.stringify(credentials),
          headers: { "Content-Type": "application/json" },
        });
        const user = await res.json();

        // If no error and we have user data, return it
        if (res.ok && user) {
          return user;
        }
        // Return null if user data could not be retrieved
        return null;
      },

      // WITH TEST DATA
      //   async authorize(credentials) {
      //     const users = [
      //       {
      //         id: "test-user-1",
      //         userName: "test1",
      //         name: "Test 1",
      //         password: "pass",
      //         email: "test1@donotreply.com",
      //       },
      //       {
      //         id: "test-user-2",
      //         userName: "test2",
      //         name: "Test 2",
      //         password: "pass",
      //         email: "test2@donotreply.com",
      //       },
      //     ];
      //     const user = users.find(
      //       (user) =>
      //         user.email === credentials?.email &&
      //         user.password === credentials?.password
      //     );
      //     return user
      //       ? { id: user.id, name: user.name, email: user.email }
      //       : null;
      //   },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
    maxAge: 1,
  },
};
