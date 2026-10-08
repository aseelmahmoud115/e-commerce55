import Link from "next/link";
import { ReactNode } from "react";

export type Crumb = { label: string; href?: string };

export function Breadcrumb({ items, light = false }: { items: Crumb[]; light?: boolean }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-4 text-sm">
      <ol className="flex flex-wrap items-center gap-2">
        {items.map((item, i) => {
          const last = i === items.length - 1;
          return (
            <li key={i} className="flex items-center gap-2">
              {item.href && !last ? (
                <Link
                  href={item.href}
                  className={`transition ${light ? "text-white/75 hover:text-white" : "text-gray-500 hover:text-green-600"}`}
                >
                  {item.label}
                </Link>
              ) : (
                <span className={`font-medium ${light ? "text-white" : "text-gray-900"}`} aria-current={last ? "page" : undefined}>
                  {item.label}
                </span>
              )}
              {!last && <span className={light ? "text-white/50" : "text-gray-300"}>/</span>}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

const variants = {
  green: "from-green-600 via-green-500 to-green-400",
  purple: "from-violet-600 via-purple-500 to-fuchsia-400",
};

export default function PageHero({
  title,
  subtitle,
  icon,
  crumbs,
  variant = "green",
}: {
  title: string;
  subtitle?: string;
  icon: ReactNode;
  crumbs: Crumb[];
  variant?: keyof typeof variants;
}) {
  return (
    <section className={`relative overflow-hidden bg-linear-to-r ${variants[variant]}`}>
      <div className="pointer-events-none absolute -inset-e-20 -top-24 size-80 rounded-full bg-white/10 blur-2xl" />
      <div className="pointer-events-none absolute -bottom-32 inset-s-1/3 size-72 rounded-full bg-white/10 blur-3xl" />
      <div className="container-fc relative py-10 sm:py-14">
        <Breadcrumb items={crumbs} light />
        <div className="flex items-center gap-4 animate-fade-up">
          <div className="flex size-14 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-white/20 text-2xl text-white shadow-lg ring-1 ring-white/30 backdrop-blur sm:size-16">
            {icon}
          </div>
          <div className="min-w-0">
            <h1 className="text-2xl font-bold text-white sm:text-4xl">{title}</h1>
            {subtitle && <p className="mt-1 text-sm text-white/85 sm:text-base">{subtitle}</p>}
          </div>
        </div>
      </div>
    </section>
  );
}
