import Link from "next/link";
import { ReactNode } from "react";
import { FaFilter, FaXmark } from "react-icons/fa6";

export type FilterChip = {
  label: string;
  icon: ReactNode;
  removeHref: string;
  tone?: "green" | "purple";
};

export default function ActiveFilters({
  chips,
  clearHref = "/products",
}: {
  chips: FilterChip[];
  clearHref?: string;
}) {
  return (
    <div className="flex flex-wrap items-center gap-2.5 text-sm">
      <span className="flex items-center gap-2 text-gray-600">
        <FaFilter className="text-xs" /> Active Filters:
      </span>
      {chips.map((chip) => (
        <Link
          key={chip.label}
          href={chip.removeHref}
          aria-label={`Remove filter ${chip.label}`}
          className={`group flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium transition ${chip.tone === "purple" ? "bg-violet-100 text-violet-700 hover:bg-violet-200" : "bg-green-100 text-green-700 hover:bg-green-200"}`}
        >
          {chip.icon}
          {chip.label}
          <FaXmark className="transition group-hover:rotate-90" />
        </Link>
      ))}
      <Link href={clearHref} className="text-gray-500 underline underline-offset-2 transition hover:text-green-600">
        Clear all
      </Link>
    </div>
  );
}
