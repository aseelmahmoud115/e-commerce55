"use client";
import { contactInfo } from "@/lib/navLinks";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import {
  FaGift,
  FaPhone,
  FaRegEnvelope,
  FaRegUser,
  FaRightFromBracket,
  FaTruck,
  FaUserPlus,
} from "react-icons/fa6";

export default function TopBar() {
  const { data: session, status } = useSession();

  return (
    <div className="hidden border-b border-gray-100 bg-white text-xs text-gray-600 lg:block">
      <div className="container-fc flex h-10 items-center justify-between">
        <div className="flex items-center gap-6">
          <span className="flex items-center gap-2">
            <FaTruck className="text-green-600" /> Free Shipping on Orders 500 EGP
          </span>
          <span className="flex items-center gap-2">
            <FaGift className="text-green-600" /> New Arrivals Daily
          </span>
        </div>

        <div className="flex items-center gap-5">
          <a href={contactInfo.phoneHref} className="flex items-center gap-1.5 transition hover:text-green-600">
            <FaPhone className="text-[11px]" /> {contactInfo.phone}
          </a>
          <a href={contactInfo.emailHref} className="flex items-center gap-1.5 transition hover:text-green-600">
            <FaRegEnvelope /> {contactInfo.email}
          </a>
          <span className="h-4 w-px bg-gray-200" />
          {status === "authenticated" ? (
            <>
              <Link href="/profile/settings" className="flex items-center gap-1.5 transition hover:text-green-600">
                <FaRegUser /> {session.user.name}
              </Link>
              <button
                onClick={() => signOut({ callbackUrl: "/login" })}
                className="flex items-center gap-1.5 transition hover:text-green-600"
              >
                <FaRightFromBracket /> Sign Out
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className="flex items-center gap-1.5 transition hover:text-green-600">
                <FaRegUser /> Sign In
              </Link>
              <Link href="/signup" className="flex items-center gap-1.5 transition hover:text-green-600">
                <FaUserPlus /> Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
