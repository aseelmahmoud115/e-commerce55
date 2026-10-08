"use client";
import Reveal from "@/app/_sharedComponents/Reveal/Reveal";
import { FormEvent, useEffect, useState } from "react";
import {
  FaApple,
  FaArrowRight,
  FaCheck,
  FaEnvelope,
  FaGooglePlay,
  FaLeaf,
  FaMobileScreen,
  FaTag,
  FaTruck,
} from "react-icons/fa6";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!done) return;
    const t = setTimeout(() => setDone(false), 3000);
    return () => clearTimeout(t);
  }, [done]);

  function subscribe(e: FormEvent) {
    e.preventDefault();
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setError("Please enter a valid email address");
      return;
    }
    setError("");
    setEmail("");
    setDone(true);
  }

  const scrollTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <section className="container-fc py-14">
      <Reveal>
        <div className="relative grid grid-cols-1 gap-8 overflow-hidden rounded-3xl border border-gray-100 bg-linear-to-br from-emerald-50 via-white to-teal-50/60 p-6 shadow-sm sm:p-10 lg:grid-cols-[1.4fr_1fr] lg:gap-10">
          <div className="pointer-events-none absolute -inset-s-16 -top-16 size-56 rounded-full bg-emerald-100/50 blur-2xl" />
          <div className="relative">
            <div className="flex items-center gap-3">
              <span className="flex size-12 items-center justify-center rounded-xl bg-linear-to-br from-emerald-500 to-teal-500 text-lg text-white shadow-lg shadow-emerald-500/25">
                <FaEnvelope />
              </span>
              <div>
                <p className="text-xs font-bold uppercase tracking-wide text-emerald-600">Newsletter</p>
                <p className="text-xs text-gray-500">50,000+ subscribers</p>
              </div>
            </div>
            <h2 className="mt-6 text-2xl font-bold text-gray-900 sm:text-3xl">
              Get the Freshest Updates <span className="block text-emerald-600 lg:inline">Delivered Free</span>
            </h2>
            <p className="mt-3 text-gray-500">Weekly recipes, seasonal offers & exclusive member perks.</p>
            <div className="mt-5 flex flex-wrap gap-2.5">
              {[
                { icon: FaLeaf, label: "Fresh Picks Weekly" },
                { icon: FaTruck, label: "Free Delivery Codes" },
                { icon: FaTag, label: "Members-Only Deals" },
              ].map(({ icon: Icon, label }) => (
                <span key={label} className="flex items-center gap-2 rounded-full border border-emerald-100 bg-white px-3.5 py-2 text-xs font-medium text-gray-700 shadow-sm">
                  <span className="flex size-6 items-center justify-center rounded-full bg-emerald-100 text-[10px] text-emerald-600"><Icon /></span>
                  {label}
                </span>
              ))}
            </div>
            <form onSubmit={subscribe} noValidate className="mt-6 flex flex-row gap-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                aria-label="Email address"
                aria-invalid={!!error}
                className="input-fc h-14 min-w-0 flex-1 border-2 py-0 text-base shadow-sm focus:border-emerald-500 focus:ring-emerald-500/15"
              />
              <button
                type="submit"
                className={`flex h-14 shrink-0 items-center justify-center gap-2 rounded-xl px-6 text-base font-semibold sm:px-8 text-white shadow-lg transition hover:-translate-y-0.5 ${done ? "bg-emerald-700 shadow-emerald-700/25" : "bg-linear-to-r from-emerald-600 to-emerald-500 shadow-emerald-500/25 hover:from-emerald-700 hover:to-emerald-600"}`}
              >
                {done ? (
                  <>
                    <FaCheck /> You&apos;re In!
                  </>
                ) : (
                  <>
                    Subscribe <FaArrowRight />
                  </>
                )}
              </button>
            </form>
            {error ? (
              <p className="mt-2 text-xs text-red-500">{error}</p>
            ) : (
              <p className="mt-2 text-xs text-gray-400">✨ Unsubscribe anytime. No spam, ever.</p>
            )}
          </div>

          <div className="relative overflow-hidden rounded-2xl bg-linear-to-br from-navy to-[#1e2939] p-7 text-white">
            <div className="pointer-events-none absolute -inset-e-10 -top-10 size-36 rounded-full bg-green-500/25 blur-2xl" />
            <span className="relative inline-flex items-center gap-1.5 rounded-full border border-green-500/40 bg-green-500/15 px-3 py-1 text-xs font-semibold text-green-400">
              <FaMobileScreen /> MOBILE APP
            </span>
            <h3 className="relative mt-4 text-xl font-bold">Shop Faster on Our App</h3>
            <p className="relative mt-2 text-sm text-gray-400">Get app-exclusive deals & 15% off your first order.</p>
            <div className="relative mt-6 space-y-3">
              <button onClick={scrollTop} className="flex w-full items-center gap-3 rounded-xl border border-white/10 bg-white/10 px-4 py-3 text-start transition hover:bg-white/20">
                <FaApple className="text-2xl" />
                <span>
                  <span className="block text-[10px] uppercase text-gray-400">Download on</span>
                  <span className="block text-sm font-semibold">App Store</span>
                </span>
              </button>
              <button onClick={scrollTop} className="flex w-full items-center gap-3 rounded-xl border border-white/10 bg-white/10 px-4 py-3 text-start transition hover:bg-white/20">
                <FaGooglePlay className="text-xl" />
                <span>
                  <span className="block text-[10px] uppercase text-gray-400">Get it on</span>
                  <span className="block text-sm font-semibold">Google Play</span>
                </span>
              </button>
            </div>
            <p className="relative mt-5 text-xs text-gray-400">
              <span className="text-yellow-400">★★★★★</span> 4.9 · 100K+ downloads
            </p>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
