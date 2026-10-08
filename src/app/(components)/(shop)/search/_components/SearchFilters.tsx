"use client";
import { IBrand } from "@/interface/brand.interface";
import { Category } from "@/interface/category.interface";
import { useEffect, useState } from "react";
import { FaXmark } from "react-icons/fa6";
import { useQueryUpdater } from "./useQueryUpdater";

const priceChips = [
  { label: "Under 500", max: "500" },
  { label: "Under 1K", max: "1000" },
  { label: "Under 5K", max: "5000" },
  { label: "Under 10K", max: "10000" },
];

function CheckList({
  title,
  items,
  selected,
  onToggle,
}: {
  title: string;
  items: { _id: string; name: string }[];
  selected: string[];
  onToggle: (id: string) => void;
}) {
  return (
    <div>
      <h3 className="mb-3 font-bold text-gray-900">{title}</h3>
      <ul className="scroll-thin max-h-52 space-y-1 overflow-y-auto pe-2">
        {items.map((item) => {
          const checked = selected.includes(item._id);
          return (
            <li key={item._id}>
              <label className="flex cursor-pointer items-center gap-2.5 rounded-md py-1 text-sm text-gray-700 transition hover:text-green-600">
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => onToggle(item._id)}
                  className="size-4 cursor-pointer rounded border-gray-300 accent-green-600"
                />
                {item.name}
              </label>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default function SearchFilters({
  categories,
  brands,
  onClose,
}: {
  categories: Category[];
  brands: IBrand[];
  onClose?: () => void;
}) {
  const { update, params } = useQueryUpdater();
  const [selectedCats, setSelectedCats] = useState(params.getAll("category"));
  const [selectedBrands, setSelectedBrands] = useState(params.getAll("brand"));
  const [min, setMin] = useState(params.get("min") ?? "");
  const [max, setMax] = useState(params.get("max") ?? "");

  const paramsKey = params.toString();
  const [prevKey, setPrevKey] = useState(paramsKey);
  if (paramsKey !== prevKey) {
    setPrevKey(paramsKey);
    setMin(params.get("min") ?? "");
    setMax(params.get("max") ?? "");
    setSelectedCats(params.getAll("category"));
    setSelectedBrands(params.getAll("brand"));
  }

  useEffect(() => {
    const t = setTimeout(() => {
      if (min !== (params.get("min") ?? "") || max !== (params.get("max") ?? "")) {
        update({ min: min || null, max: max || null });
      }
    }, 600);
    return () => clearTimeout(t);
  }, [min, max]);

  const toggle = (key: "category" | "brand", list: string[], id: string) => {
    const next = list.includes(id) ? list.filter((x) => x !== id) : [...list, id];
    if (key === "category") setSelectedCats(next);
    else setSelectedBrands(next);
    update({ [key]: next });
  };

  const hasFilters = selectedCats.length || selectedBrands.length || params.get("min") || params.get("max");

  return (
    <div className="space-y-6">
      {onClose && (
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-gray-900">Filters</h2>
          <button onClick={onClose} aria-label="Close filters" className="flex size-9 items-center justify-center rounded-full bg-gray-100 text-gray-600">
            <FaXmark />
          </button>
        </div>
      )}

      <CheckList
        title="Categories"
        items={categories}
        selected={selectedCats}
        onToggle={(id) => toggle("category", selectedCats, id)}
      />

      <div className="border-t border-gray-100 pt-6">
        <h3 className="mb-3 font-bold text-gray-900">Price Range</h3>
        <div className="grid grid-cols-2 gap-3">
          <label className="text-xs text-gray-500">
            Min (EGP)
            <input
              type="number"
              min={0}
              value={min}
              onChange={(e) => setMin(e.target.value)}
              placeholder="0"
              className="input-fc mt-1 px-3 py-2"
            />
          </label>
          <label className="text-xs text-gray-500">
            Max (EGP)
            <input
              type="number"
              min={0}
              value={max}
              onChange={(e) => setMax(e.target.value)}
              placeholder="No limit"
              className="input-fc mt-1 px-3 py-2"
            />
          </label>
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          {priceChips.map((chip) => {
            const active = params.get("max") === chip.max && !params.get("min");
            return (
              <button
                key={chip.label}
                onClick={() => update({ min: null, max: active ? null : chip.max })}
                className={`rounded-full px-3 py-1.5 text-xs font-medium transition ${active ? "bg-green-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-green-50 hover:text-green-700"}`}
              >
                {chip.label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="border-t border-gray-100 pt-6">
        <CheckList
          title="Brands"
          items={brands}
          selected={selectedBrands}
          onToggle={(id) => toggle("brand", selectedBrands, id)}
        />
      </div>

      {hasFilters ? (
        <button
          onClick={() => {
            setSelectedCats([]);
            setSelectedBrands([]);
            update({ category: null, brand: null, min: null, max: null });
          }}
          className="w-full rounded-xl border border-red-100 py-2.5 text-sm font-semibold text-red-500 transition hover:bg-red-50"
        >
          Clear Filters
        </button>
      ) : null}
    </div>
  );
}
