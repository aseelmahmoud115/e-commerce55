"use client";
import { IBrand } from "@/interface/brand.interface";
import { Category } from "@/interface/category.interface";
import { useEffect, useState } from "react";
import { FaList, FaSliders, FaTableCellsLarge } from "react-icons/fa6";
import SearchFilters from "./SearchFilters";
import { useQueryUpdater } from "./useQueryUpdater";

const sorts = [
  { value: "", label: "Relevance" },
  { value: "price", label: "Price: Low to High" },
  { value: "-price", label: "Price: High to Low" },
  { value: "-ratingsAverage", label: "Top Rated" },
  { value: "-sold", label: "Best Selling" },
  { value: "-createdAt", label: "Newest" },
];

export default function SearchToolbar({
  categories,
  brands,
}: {
  categories: Category[];
  brands: IBrand[];
}) {
  const { update, params, isPending } = useQueryUpdater();
  const view = params.get("view") === "list" ? "list" : "grid";
  const [drawer, setDrawer] = useState(false);

  useEffect(() => {
    document.body.style.overflow = drawer ? "hidden" : "";
  }, [drawer]);

  const viewBtn = (active: boolean) =>
    `flex size-9 items-center justify-center rounded-lg text-sm transition ${active ? "bg-green-600 text-white" : "text-gray-500 hover:bg-gray-100 hover:text-green-600"}`;

  return (
    <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
      <div className="flex items-center gap-2">
        <button
          onClick={() => setDrawer(true)}
          className="flex h-10 items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 text-sm font-medium text-gray-700 transition hover:border-green-600 hover:text-green-600 lg:hidden"
        >
          <FaSliders /> Filters
        </button>
        <div className="flex gap-1 rounded-xl border border-gray-200 bg-white p-0.5">
          <button aria-label="Grid view" onClick={() => update({ view: null })} className={viewBtn(view === "grid")}>
            <FaTableCellsLarge />
          </button>
          <button aria-label="List view" onClick={() => update({ view: "list" })} className={viewBtn(view === "list")}>
            <FaList />
          </button>
        </div>
        {isPending && <span className="size-4 animate-spin rounded-full border-2 border-green-200 border-t-green-600" />}
      </div>

      <label className="flex items-center gap-2 text-sm text-gray-600">
        Sort by:
        <select
          value={params.get("sort") ?? ""}
          onChange={(e) => update({ sort: e.target.value || null })}
          className="h-10 rounded-xl border border-gray-200 bg-white px-3 text-sm text-gray-800 outline-none focus:border-green-600"
        >
          {sorts.map((s) => (
            <option key={s.value} value={s.value}>
              {s.label}
            </option>
          ))}
        </select>
      </label>

      {/* mobile filter drawer */}
      <div
        onClick={() => setDrawer(false)}
        className={`fixed inset-0 z-50 bg-gray-900/40 transition-opacity lg:hidden ${drawer ? "opacity-100" : "pointer-events-none opacity-0"}`}
      />
      <aside
        className={`fixed inset-y-0 inset-s-0 z-50 h-dvh w-[85%] max-w-xs overflow-y-auto bg-white p-5 shadow-2xl transition-transform duration-300 lg:hidden ${drawer ? "translate-x-0" : "-translate-x-full"}`}
      >
        <SearchFilters categories={categories} brands={brands} onClose={() => setDrawer(false)} />
      </aside>
    </div>
  );
}
