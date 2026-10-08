import PageHero from "@/app/_sharedComponents/PageHero/PageHero";
import Link from "next/link";
import { ReactNode } from "react";
import { FaCheck } from "react-icons/fa6";

export type InfoSection = { title: string; text?: string; list?: string[] };

export default function InfoPage({
  title,
  subtitle,
  icon,
  intro,
  sections,
  children,
}: {
  title: string;
  subtitle: string;
  icon: ReactNode;
  intro?: string;
  sections: InfoSection[];
  children?: ReactNode;
}) {
  return (
    <>
      <PageHero title={title} subtitle={subtitle} icon={icon} crumbs={[{ label: "Home", href: "/" }, { label: title }]} />
      <section className="container-fc py-10">
        <div className="mx-auto max-w-4xl space-y-5">
          {children}
          {intro && <p className="rounded-2xl border border-green-100 bg-green-50 p-5 leading-relaxed text-gray-700">{intro}</p>}
          {sections.map((s, i) => (
            <article key={s.title} className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
              <h2 className="flex items-center gap-3 text-lg font-bold text-gray-900">
                <span className="flex size-8 items-center justify-center rounded-lg bg-green-600 text-sm text-white">{i + 1}</span>
                {s.title}
              </h2>
              {s.text && <p className="mt-3 leading-relaxed text-gray-600">{s.text}</p>}
              {s.list && (
                <ul className="mt-3 space-y-2">
                  {s.list.map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-gray-600">
                      <FaCheck className="mt-1 shrink-0 text-sm text-green-600" /> {item}
                    </li>
                  ))}
                </ul>
              )}
            </article>
          ))}
          <p className="pt-2 text-center text-sm text-gray-500">
            Still have questions?{" "}
            <Link href="/contact" className="font-medium text-green-600 hover:underline">Contact our support team</Link>
          </p>
        </div>
      </section>
    </>
  );
}
