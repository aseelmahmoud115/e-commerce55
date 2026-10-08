"use client";
import { CartContextProvider } from "@/context/cartContext";
import { WishlistContextProvider } from "@/context/wishlistContext";
import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";

export default function Providers({
  children,
  mySession,
}: {
  children: ReactNode;
  mySession: Session | null;
}) {
  return (
    <SessionProvider session={mySession}>
      <CartContextProvider>
        <WishlistContextProvider>{children}</WishlistContextProvider>
      </CartContextProvider>
    </SessionProvider>
  );
}
