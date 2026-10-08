import Link from "next/link";
import { FaArrowRight } from "react-icons/fa6";

export default function SectionTitle({
  title,
  subTitle,
  link,
}: {
  title: string;
  subTitle: string;
  link?: { href: string; label: string };
}) {
  return (
    <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <h2 className="flex items-center gap-3 text-2xl font-bold text-gray-800 sm:text-3xl">
        <span className="h-8 w-1.5 rounded-full bg-linear-to-b from-green-500 to-green-700" />
        <span>
          {subTitle} <span className="text-green-600">{title}</span>
        </span>
      </h2>
      {link && (
        <Link
          href={link.href}
          className="group flex items-center gap-2 self-end font-medium text-green-600 transition hover:text-green-700 sm:self-auto"
        >
          {link.label}
          <FaArrowRight className="transition-transform group-hover:translate-x-1" />
        </Link>
      )}
    </div>
  );
}
