import Link from "next/link";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";

export default function Pagination({
  current,
  total,
  basePath,
  params,
}: {
  current: number;
  total: number;
  basePath: string;
  params: Record<string, string | string[] | undefined>;
}) {
  if (total <= 1) return null;

  const hrefFor = (page: number) => {
    const sp = new URLSearchParams();
    Object.entries(params).forEach(([k, v]) => {
      if (k === "page" || v === undefined) return;
      ([] as string[]).concat(v).forEach((x) => sp.append(k, x));
    });
    if (page > 1) sp.set("page", String(page));
    const s = sp.toString();
    return s ? `${basePath}?${s}` : basePath;
  };

  const base = "flex size-10 items-center justify-center rounded-xl border text-sm font-medium transition";
  return (
    <nav aria-label="Pagination" className="mt-10 flex items-center justify-center gap-2">
      {current > 1 ? (
        <Link href={hrefFor(current - 1)} aria-label="Previous page" className={`${base} border-gray-200 bg-white text-gray-600 hover:border-green-600 hover:text-green-600`}>
          <FaChevronLeft className="text-xs" />
        </Link>
      ) : (
        <span className={`${base} border-gray-100 bg-gray-50 text-gray-300`}><FaChevronLeft className="text-xs" /></span>
      )}
      {Array.from({ length: total }, (_, i) => i + 1).map((p) => (
        <Link
          key={p}
          href={hrefFor(p)}
          aria-current={p === current ? "page" : undefined}
          className={`${base} ${p === current ? "border-green-600 bg-green-600 text-white" : "border-gray-200 bg-white text-gray-700 hover:border-green-600 hover:text-green-600"}`}
        >
          {p}
        </Link>
      ))}
      {current < total ? (
        <Link href={hrefFor(current + 1)} aria-label="Next page" className={`${base} border-gray-200 bg-white text-gray-600 hover:border-green-600 hover:text-green-600`}>
          <FaChevronRight className="text-xs" />
        </Link>
      ) : (
        <span className={`${base} border-gray-100 bg-gray-50 text-gray-300`}><FaChevronRight className="text-xs" /></span>
      )}
    </nav>
  );
}
