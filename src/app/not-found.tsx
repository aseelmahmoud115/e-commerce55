import Link from "next/link";
import { FaArrowLeft, FaCartShopping, FaHouse } from "react-icons/fa6";
import { FaAppleAlt, FaCarrot, FaLeaf, FaLemon, FaSeedling } from "react-icons/fa";

const floating = [
  { Icon: FaAppleAlt, cls: "start-[5%] top-[8%] text-3xl", delay: "0s" },
  { Icon: FaCarrot, cls: "end-[10%] top-[18%] text-2xl", delay: "1s" },
  { Icon: FaLemon, cls: "start-[14%] top-[48%] text-xl", delay: "2s" },
  { Icon: FaLeaf, cls: "end-[6%] top-[42%] text-xl", delay: "0.5s" },
  { Icon: FaLeaf, cls: "start-[8%] bottom-[18%] text-2xl", delay: "1.5s" },
  { Icon: FaSeedling, cls: "end-[16%] bottom-[12%] text-3xl", delay: "2.5s" },
];

export default function NotFound() {
  return (
    <div className="relative overflow-hidden bg-linear-to-b from-green-50/40 via-white to-white">
      {floating.map(({ Icon, cls, delay }, i) => (
        <Icon key={i} aria-hidden style={{ animationDelay: delay }} className={`pointer-events-none absolute animate-float text-green-200 ${cls}`} />
      ))}
      <div className="container-fc relative flex flex-col items-center py-16 text-center sm:py-20">
        <div className="relative animate-fade-up">
          <div className="flex h-32 w-40 items-center justify-center rounded-3xl bg-white shadow-2xl shadow-green-900/10">
            <FaCartShopping className="text-6xl text-green-400" />
          </div>
          <span className="absolute -inset-e-6 -top-6 flex size-16 items-center justify-center rounded-full bg-green-600 text-lg font-extrabold text-white shadow-lg ring-4 ring-white">
            404
          </span>
        </div>
        <div className="mt-6 flex items-center gap-2" aria-hidden>
          <span className="size-2 rounded-full bg-green-500" />
          <span className="h-2 w-5 rounded-b-full border-b-2 border-green-500" />
          <span className="size-2 rounded-full bg-green-500" />
        </div>
        <h1 className="mt-6 animate-fade-up text-4xl font-extrabold text-gray-900 [animation-delay:100ms] sm:text-5xl">
          Oops! Nothing Here
        </h1>
        <p className="mt-4 max-w-md animate-fade-up text-gray-500 [animation-delay:200ms]">
          Looks like this page went out of stock! Don&apos;t worry, there&apos;s plenty more fresh content to explore.
        </p>
        <div className="mt-8 flex animate-fade-up flex-wrap justify-center gap-4 [animation-delay:300ms]">
          <Link href="/" className="flex items-center gap-2 rounded-xl bg-green-600 px-7 py-3.5 font-semibold text-white shadow-lg shadow-green-600/30 transition hover:-translate-y-0.5 hover:bg-green-800">
            <FaHouse /> Go to Homepage
          </Link>
          <Link href="/" className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-7 py-3.5 font-semibold text-gray-800 shadow-md transition hover:-translate-y-0.5 hover:shadow-lg">
            <FaArrowLeft /> Go Back
          </Link>
        </div>
        <div className="mt-12 w-full max-w-lg animate-fade-up rounded-2xl border border-gray-100 bg-white p-5 shadow-lg shadow-gray-900/5 [animation-delay:400ms]">
          <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">Popular Destinations</p>
          <div className="mt-3 flex flex-wrap justify-center gap-2">
            {[
              { href: "/products", label: "All Products", cls: "bg-green-50 text-green-700 hover:bg-green-100" },
              { href: "/categories", label: "Categories", cls: "bg-gray-100 text-gray-700 hover:bg-gray-200" },
              { href: "/deals", label: "Today's Deals", cls: "bg-gray-100 text-gray-700 hover:bg-gray-200" },
              { href: "/contact", label: "Contact Us", cls: "bg-gray-100 text-gray-700 hover:bg-gray-200" },
            ].map((l) => (
              <Link key={l.label} href={l.href} prefetch={l.href === "/deals" ? false : undefined} className={`rounded-lg px-4 py-2 text-xs font-medium transition ${l.cls}`}>
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
