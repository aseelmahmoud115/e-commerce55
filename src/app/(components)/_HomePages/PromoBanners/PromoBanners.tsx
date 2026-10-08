import Reveal from "@/app/_sharedComponents/Reveal/Reveal";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa6";

const banners = [
  {
    badge: "🔥 Deal of the Day",
    title: "Fresh Organic Fruits",
    text: "Get up to 40% off on selected organic fruits",
    off: "40% OFF",
    code: "ORGANIC40",
    cta: "Shop Now",
    bg: "from-emerald-500 to-emerald-700",
    ctaColor: "text-emerald-600",
    from: "left" as const,
  },
  {
    badge: "✨ New Arrivals",
    title: "Exotic Vegetables",
    text: "Discover our latest collection of premium vegetables",
    off: "25% OFF",
    code: "FRESH25",
    cta: "Explore Now",
    bg: "from-orange-500 to-rose-500",
    ctaColor: "text-orange-500",
    from: "right" as const,
  },
];

export default function PromoBanners() {
  return (
    <section className="container-fc overflow-hidden pb-6">
      <div className="grid gap-5 md:grid-cols-2">
        {banners.map((b) => (
          <Reveal key={b.title} from={b.from}>
            <div className={`relative h-full overflow-hidden rounded-2xl bg-linear-to-br p-7 text-white shadow-lg sm:p-8 ${b.bg}`}>
              <span className="pointer-events-none absolute -inset-e-12 -top-12 size-44 rounded-full bg-white/10" />
              <span className="pointer-events-none absolute -bottom-16 -inset-s-10 size-40 rounded-full bg-white/10" />
              <span className="relative inline-block rounded-full bg-white/20 px-3 py-1 text-xs font-medium backdrop-blur">
                {b.badge}
              </span>
              <h3 className="relative mt-4 text-2xl font-bold sm:text-3xl">{b.title}</h3>
              <p className="relative mt-2 text-sm text-white/85">{b.text}</p>
              <div className="relative mt-5 flex items-center gap-3">
                <span className="text-3xl font-extrabold">{b.off}</span>
                <span className="text-xs text-white/80">
                  Use code: <b className="text-white">{b.code}</b>
                </span>
              </div>
              <Link
                href="/products"
                className={`group relative mt-6 inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold shadow-md transition hover:-translate-y-0.5 hover:shadow-lg ${b.ctaColor}`}
              >
                {b.cta}
                <FaArrowRight className="transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
