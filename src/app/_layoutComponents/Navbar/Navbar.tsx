"use client";
import { useCart } from "@/context/cartContext";
import { useWishlist } from "@/context/wishlistContext";
import { NavCategory } from "@/lib/navLinks";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import {
  FaBars,
  FaCartShopping,
  FaChevronDown,
  FaHeadset,
  FaRegHeart,
  FaRegUser,
  FaRightFromBracket,
  FaXmark,
} from "react-icons/fa6";
import Logo from "./Logo";
import SearchBar from "./SearchBar";
import UserMenu from "./UserMenu";

const links = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Shop" },
  { href: "/brands", label: "Brands" },
];

function Badge({ value, color }: { value: number; color: "red" | "green" }) {
  if (value <= 0) return null;
  return (
    <span
      className={`absolute -inset-e-1 -top-1 flex h-4.5 min-w-4.5 items-center justify-center rounded-full px-1 text-[10px] font-bold text-white ring-2 ring-white ${color === "red" ? "bg-red-500" : "bg-green-600"}`}
    >
      {value > 99 ? "99+" : value}
    </span>
  );
}

export default function Navbar({
  categories: featuredCategories,
}: {
  categories: NavCategory[];
}) {
  const pathname = usePathname();
  const { data: session, status } = useSession();
  const { cartNumber } = useCart();
  const { count: wishCount } = useWishlist();
  const [menuOpen, setMenuOpen] = useState(false);

  const [prevPath, setPrevPath] = useState(pathname);
  if (pathname !== prevPath) {
    setPrevPath(pathname);
    setMenuOpen(false);
  }
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
  }, [menuOpen]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  const linkClass = (active: boolean) =>
    `relative px-1 py-2 text-[15px] transition-colors hover:text-green-600 ${active ? "font-semibold text-green-600" : "text-gray-700"}`;

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-gray-100 bg-white/95 backdrop-blur supports-backdrop-filter:bg-white/85">
        <nav
          aria-label="Main navigation"
          className="container-fc flex h-17 items-center gap-4 lg:h-18 lg:gap-6"
        >
          <Logo />

          <div className="hidden min-w-0 flex-1 lg:block">
            <Suspense>
              <SearchBar />
            </Suspense>
          </div>

          <ul className="hidden items-center gap-5 lg:flex">
            <li>
              <Link href="/" className={linkClass(isActive("/"))}>
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/products"
                className={linkClass(
                  isActive("/products") || isActive("/search"),
                )}
              >
                Shop
              </Link>
            </li>
            <li className="group relative">
              <Link
                href="/categories"
                className={`flex items-center gap-1.5 ${linkClass(isActive("/categories"))} group-hover:text-green-600`}
              >
                Categories
                <FaChevronDown className="text-[10px] transition-transform duration-200 group-hover:rotate-180" />
              </Link>
              <div className="invisible absolute inset-s-0 top-full z-50 w-56 translate-y-2 pt-3 opacity-0 transition-all duration-200 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                <div className="rounded-2xl border border-gray-100 bg-white p-2 shadow-xl shadow-gray-900/10">
                  <Link
                    href="/categories"
                    className="block rounded-xl px-4 py-2.5 text-sm text-gray-700 transition hover:bg-green-50 hover:text-green-700"
                  >
                    All Categories
                  </Link>
                  {featuredCategories.map((c) => (
                    <Link
                      key={c.id}
                      href={`/products?category=${c.id}`}
                      className="block rounded-xl px-4 py-2.5 text-sm text-gray-700 transition hover:bg-green-50 hover:text-green-700"
                    >
                      {c.name}
                    </Link>
                  ))}
                </div>
              </div>
            </li>
            <li>
              <Link href="/brands" className={linkClass(isActive("/brands"))}>
                Brands
              </Link>
            </li>
          </ul>

          <div className="ms-auto flex items-center gap-1 sm:gap-2 lg:ms-0">
            <Link
              href="/contact"
              className="me-2 hidden items-center gap-2.5 border-e border-gray-200 pe-4 xl:flex"
            >
              <span className="flex size-9 items-center justify-center rounded-full bg-green-50 text-green-600 transition group-hover:bg-green-100">
                <FaHeadset />
              </span>
              <span className="leading-tight">
                <span className="block text-[11px] text-gray-500">Support</span>
                <span className="block text-xs font-semibold text-gray-800">
                  24/7 Help
                </span>
              </span>
            </Link>

            <Link
              href="/wishlist"
              aria-label="Wishlist"
              className={`relative flex size-10 items-center justify-center rounded-full text-xl transition hover:bg-green-50 hover:text-green-600 ${isActive("/wishlist") ? "bg-green-50 text-green-600" : "text-gray-600"}`}
            >
              <FaRegHeart />
              <Badge value={wishCount} color="red" />
            </Link>

            <Link
              href="/cart"
              aria-label="Cart"
              className={`relative flex size-10 items-center justify-center rounded-full text-xl transition hover:bg-green-50 hover:text-green-600 ${isActive("/cart") ? "bg-green-50 text-green-600" : "text-gray-600"}`}
            >
              <FaCartShopping />
              <Badge value={cartNumber} color="green" />
            </Link>

            <div className="hidden lg:block">
              {status === "authenticated" ? (
                <UserMenu />
              ) : (
                <Link
                  href="/login"
                  className="ms-2 inline-flex items-center gap-2 rounded-full bg-green-600 px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-green-600/20 transition hover:bg-green-700"
                >
                  <FaRegUser className="text-xs" /> Sign In
                </Link>
              )}
            </div>

            <button
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
              className="ms-1 flex size-11 items-center justify-center rounded-full bg-green-600 text-lg text-white shadow-md shadow-green-600/25 transition hover:bg-green-700 lg:hidden"
            >
              <FaBars />
            </button>
          </div>
        </nav>
      </header>

      <div
        onClick={() => setMenuOpen(false)}
        className={`fixed inset-0 z-50 bg-gray-900/40 backdrop-blur-sm transition-opacity lg:hidden ${menuOpen ? "opacity-100" : "pointer-events-none opacity-0"}`}
      />
      <aside
        aria-label="Mobile menu"
        className={`fixed inset-y-0 inset-e-0 z-50 flex h-dvh w-[86%] max-w-xs flex-col overflow-y-auto bg-white shadow-2xl transition-transform duration-300 ease-out lg:hidden ${menuOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="flex items-center justify-between px-4 py-5">
          <Logo />
          <button
            onClick={() => setMenuOpen(false)}
            aria-label="Close menu"
            className="flex size-9 items-center justify-center rounded-full bg-gray-100 text-gray-600 transition hover:bg-gray-200"
          >
            <FaXmark />
          </button>
        </div>

        <div className="border-b border-gray-100 px-4 pb-4">
          <Suspense>
            <SearchBar variant="menu" onSearch={() => setMenuOpen(false)} />
          </Suspense>
        </div>

        <nav className="flex flex-col gap-1 border-b border-gray-100 p-4">
          {[
            ...links.slice(0, 2),
            { href: "/categories", label: "Categories" },
            links[2],
          ].map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="rounded-xl px-4 py-3 text-base font-medium text-gray-700 transition hover:bg-gray-50 hover:text-green-600"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <nav className="flex flex-col gap-1 border-b border-gray-100 p-4">
          <Link
            href="/wishlist"
            className="flex items-center justify-between rounded-xl px-4 py-2.5 text-base font-medium text-gray-700 transition hover:bg-gray-50"
          >
            <span className="flex items-center gap-3">
              <span className="flex size-9 items-center justify-center rounded-full bg-red-50 text-red-500">
                <FaRegHeart />
              </span>
              Wishlist
            </span>
            {wishCount > 0 && (
              <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1.5 text-xs font-bold text-white">
                {wishCount > 99 ? "99+" : wishCount}
              </span>
            )}
          </Link>
          <Link
            href="/cart"
            className="flex items-center justify-between rounded-xl px-4 py-2.5 text-base font-medium text-gray-700 transition hover:bg-gray-50"
          >
            <span className="flex items-center gap-3">
              <span className="flex size-9 items-center justify-center rounded-full bg-green-50 text-green-600">
                <FaCartShopping />
              </span>
              Cart
            </span>
            {cartNumber > 0 && (
              <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-green-600 px-1.5 text-xs font-bold text-white">
                {cartNumber > 99 ? "99+" : cartNumber}
              </span>
            )}
          </Link>
        </nav>

        <div className="p-4">
          {status === "authenticated" ? (
            <div className="flex flex-col gap-1">
              <Link
                href="/profile"
                className={`flex items-center gap-3 rounded-xl px-4 py-2.5 text-base font-medium transition ${isActive("/profile") ? "bg-green-50 text-green-700" : "text-gray-700 hover:bg-gray-50"}`}
              >
                <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-gray-100 text-gray-500">
                  <FaRegUser />
                </span>
                <span className="truncate">{session.user.name}</span>
              </Link>
              <button
                onClick={() => signOut({ callbackUrl: "/login" })}
                className="flex items-center gap-3 rounded-xl px-4 py-2.5 text-start text-base font-medium text-red-600 transition hover:bg-red-50"
              >
                <span className="flex size-9 items-center justify-center rounded-full bg-red-50 text-red-500">
                  <FaRightFromBracket />
                </span>
                Sign Out
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-3">
              <Link
                href="/login"
                className="flex items-center justify-center rounded-xl bg-green-600 py-3 text-base font-semibold text-white transition hover:bg-green-700"
              >
                Sign In
              </Link>
              <Link
                href="/signup"
                className="flex items-center justify-center rounded-xl border-2 border-green-600 py-3 text-base font-semibold text-green-600 transition hover:bg-green-50"
              >
                Sign Up
              </Link>
            </div>
          )}

          <Link
            href="/contact"
            className="mt-5 flex items-center gap-3 rounded-xl border border-gray-100 bg-gray-50 p-4 transition hover:bg-green-50"
          >
            <span className="flex size-10 items-center justify-center rounded-full bg-green-100 text-green-600">
              <FaHeadset />
            </span>
            <span>
              <span className="block text-sm font-semibold text-gray-900">
                Need Help?
              </span>
              <span className="block text-sm text-green-600">
                Contact Support
              </span>
            </span>
          </Link>
        </div>
      </aside>
    </>
  );
}
