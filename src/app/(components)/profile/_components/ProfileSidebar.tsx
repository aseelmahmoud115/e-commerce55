"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaChevronRight, FaGear, FaLocationDot } from "react-icons/fa6";

const links = [
  { href: "/profile/addresses", label: "My Addresses", icon: FaLocationDot },
  { href: "/profile/settings", label: "Settings", icon: FaGear },
];

export default function ProfileSidebar() {
  const pathname = usePathname();
  return (
    <aside className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm lg:sticky lg:top-24">
      <h2 className="border-b border-gray-100 px-5 py-4 font-bold text-gray-900">My Account</h2>
      <nav className="flex gap-1 p-2 lg:flex-col">
        {links.map(({ href, label, icon: Icon }) => {
          const active = pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              className={`group flex flex-1 items-center gap-3 whitespace-nowrap rounded-xl px-3 py-3 text-sm font-medium transition ${active ? "bg-green-50 text-green-700" : "text-gray-700 hover:bg-gray-50"}`}
            >
              <span className={`flex size-8 items-center justify-center rounded-lg text-sm transition ${active ? "bg-green-600 text-white" : "bg-gray-100 text-gray-500 group-hover:bg-green-100 group-hover:text-green-600"}`}>
                <Icon />
              </span>
              {label}
              <FaChevronRight className="ms-auto text-xs text-gray-400" />
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
