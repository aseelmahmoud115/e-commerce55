"use server";
import { getToken } from "next-auth/jwt";
import { cookies, headers } from "next/headers";

async function readJwt() {
  const cookieStore = await cookies();
  const headerList = await headers();

  return getToken({
    req: {
      cookies: Object.fromEntries(
        cookieStore.getAll().map((c) => [c.name, c.value]),
      ),
      headers: Object.fromEntries(headerList.entries()),
    } as never,
    secret: process.env.NEXTAUTH_SECRET,
  });
}

export async function getMyToken() {
  const token = await readJwt();
  return token?.token as string | undefined;
}

export async function getMyUserId() {
  const token = await readJwt();
  return token?.id as string | undefined;
}
