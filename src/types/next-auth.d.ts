import { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
    } & DefaultSession["user"];
  }

  interface User extends DefaultUser {
    token: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
    token?: string;
    idToken?: string;
  }
}
