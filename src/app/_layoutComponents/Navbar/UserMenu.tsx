"use client";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import {
  FaBoxOpen,
  FaGear,
  FaRegAddressCard,
  FaRegCircleUser,
  FaRegHeart,
  FaRegUser,
  FaRightFromBracket,
} from "react-icons/fa6";

const items = [
  { href: "/profile/settings", label: "My Profile", icon: FaRegUser },
  { href: "/allorders", label: "My Orders", icon: FaBoxOpen },
  { href: "/wishlist", label: "My Wishlist", icon: FaRegHeart },
  { href: "/profile/addresses", label: "Addresses", icon: FaRegAddressCard },
  { href: "/profile/settings", label: "Settings", icon: FaGear },
];

export default function UserMenu() {
  const { data: session } = useSession();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function close(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    function esc(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", close);
    document.addEventListener("keydown", esc);
    return () => {
      document.removeEventListener("mousedown", close);
      document.removeEventListener("keydown", esc);
    };
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label="Account menu"
        aria-expanded={open}
        className={`flex size-10 items-center justify-center rounded-full text-xl transition hover:bg-green-50 hover:text-green-600 ${open ? "bg-green-50 text-green-600" : "text-gray-600"}`}
      >
        <FaRegCircleUser />
      </button>

      {open && (
        <div className="absolute inset-e-0 top-full z-50 mt-3 w-64 overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-xl shadow-gray-900/10 animate-in fade-in-0 zoom-in-95">
          <div className="flex items-center gap-3 border-b border-gray-100 p-4">
            <span className="flex size-11 items-center justify-center rounded-full bg-green-100 text-xl text-green-600">
              <FaRegCircleUser />
            </span>
            <div className="min-w-0">
              <p className="truncate font-semibold text-gray-900">{session?.user.name}</p>
              <p className="truncate text-xs text-gray-500">{session?.user.email}</p>
            </div>
          </div>
          <nav className="p-2">
            {items.map(({ href, label, icon: Icon }) => (
              <Link
                key={label}
                href={href}
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-gray-700 transition hover:bg-green-50 hover:text-green-700"
              >
                <Icon className="text-gray-400" /> {label}
              </Link>
            ))}
          </nav>
          <div className="border-t border-gray-100 p-2">
            <button
              onClick={() => signOut({ callbackUrl: "/login" })}
              className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-red-600 transition hover:bg-red-50"
            >
              <FaRightFromBracket /> Sign Out
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
