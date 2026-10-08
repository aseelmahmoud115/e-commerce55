import { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { jwtDecode } from "jwt-decode";

export const authOption: NextAuthOptions = {
  providers: [
    Credentials({
      name: "Login",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "password", type: "password" },
      },

      async authorize(credentials) {
        const response = await fetch(`${process.env.BASE_URL}/auth/signin`, {
          method: "POST",
          signal: AbortSignal.timeout(15000),
          body: JSON.stringify({
            email: credentials?.email,
            password: credentials?.password,
          }),
          headers: { "content-type": "application/json" },
        });
        const data = await response.json().catch(() => null);

        if (!response.ok || !data?.token) {
          throw new Error(
            data?.errors?.msg ?? data?.message ?? "Incorrect email or password",
          );
        }
        const decoded = jwtDecode<{ id: string }>(data.token);

        return {
          id: decoded.id,
          email: data.user.email,
          name: data.user.name,
          token: data.token,
        };
      },
    }),
  ],

  pages: {
    signIn: "/login",
  },

  session: { strategy: "jwt" },

  callbacks: {
    // server
    jwt({ token, user, trigger, session }) {
      if (user) {
        token.id = user.id;
        token.token = user.token;
      }
      if (trigger === "update" && session) {
        if (session.name) token.name = session.name;
        if (session.email) token.email = session.email;
        if (session.token) token.token = session.token;
      }
      return token;
    },
    //client
    session({ session, token }) {
      if (token) {
        session.user.id = token.id as string;
        session.user.name = token.name;
        session.user.email = token.email;
      }
      return session;
    },
  },
};
