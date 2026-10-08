import { contactInfo, NavCategory } from "@/lib/navLinks";
import Image from "next/image";
import Link from "next/link";
import {
  FaCreditCard,
  FaEnvelope,
  FaFacebookF,
  FaInstagram,
  FaLocationDot,
  FaPhone,
  FaXTwitter,
  FaYoutube,
} from "react-icons/fa6";
import logo from "@/assets/logo.svg";
import FeaturesStrip from "./FeaturesStrip";

const buildColumns = (categories: NavCategory[]) => [
  {
    title: "Shop",
    links: [
      { label: "All Products", href: "/products" },
      { label: "Categories", href: "/categories" },
      { label: "Brands", href: "/brands" },
      ...categories
        .filter((c) => c.name !== "Beauty & Health")
        .map((c) => ({ label: c.name, href: `/products?category=${c.id}` })),
    ],
  },
  {
    title: "Account",
    links: [
      { label: "My Account", href: "/profile/settings" },
      { label: "Order History", href: "/allorders" },
      { label: "Wishlist", href: "/wishlist" },
      { label: "Shopping Cart", href: "/cart" },
      { label: "Sign In", href: "/login" },
      { label: "Create Account", href: "/signup" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Contact Us", href: "/contact" },
      { label: "Help Center", href: "/help" },
      { label: "Shipping Info", href: "/shipping" },
      { label: "Returns & Refunds", href: "/returns" },
      { label: "Track Order", href: "/track-order" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
      { label: "Cookie Policy", href: "/cookies" },
    ],
  },
];

const socials = [
  { icon: FaFacebookF, label: "Facebook", href: "https://facebook.com" },
  { icon: FaXTwitter, label: "Twitter", href: "https://x.com" },
  { icon: FaInstagram, label: "Instagram", href: "https://instagram.com" },
  { icon: FaYoutube, label: "YouTube", href: "https://youtube.com" },
];

export default function Footer({ categories }: { categories: NavCategory[] }) {
  const columns = buildColumns(categories);
  return (
    <footer>
      <FeaturesStrip />
      <div className="bg-navy text-gray-400">
        <div className="container-fc grid gap-10 py-14 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Link
              href="/"
              className="inline-flex rounded-lg bg-white px-4 py-2.5 transition hover:opacity-90"
            >
              <Image src={logo} alt="FreshCart" className="h-7 w-auto" />
            </Link>
            <p className="mt-5 max-w-sm text-sm leading-relaxed">
              FreshCart is your one-stop destination for quality products. From
              fashion to electronics, we bring you the best brands at
              competitive prices with a seamless shopping experience.
            </p>
            <ul className="mt-5 space-y-3 text-sm">
              <li>
                <a
                  href={contactInfo.phoneHref}
                  className="flex items-center gap-3 transition hover:text-green-500"
                >
                  <FaPhone className="text-green-500" /> {contactInfo.phone}
                </a>
              </li>
              <li>
                <a
                  href={contactInfo.emailHref}
                  className="flex items-center gap-3 transition hover:text-green-500"
                >
                  <FaEnvelope className="text-green-500" /> {contactInfo.email}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <FaLocationDot className="text-green-500" />{" "}
                {contactInfo.address}
              </li>
            </ul>
            <div className="mt-6 flex gap-3">
              {socials.map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className="flex size-10 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-green-600"
                >
                  <Icon className="text-sm" />
                </a>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4 lg:col-span-8">
            {columns.map((col) => (
              <div key={col.title}>
                <h3 className="mb-5 font-semibold text-white">{col.title}</h3>
                <ul className="space-y-3 text-sm">
                  {col.links.map((l) => (
                    <li key={l.label}>
                      <Link
                        href={l.href}
                        className="transition hover:text-green-500"
                      >
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="border-t border-white/10">
          <div className="container-fc flex flex-col items-center justify-between gap-3 py-6 text-sm sm:flex-row">
            <p>© {new Date().getFullYear()} FreshCart. All rights reserved.</p>
            <div className="flex items-center gap-5">
              {["Visa", "Mastercard", "PayPal"].map((p) => (
                <span key={p} className="flex items-center gap-1.5">
                  <FaCreditCard /> {p}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
