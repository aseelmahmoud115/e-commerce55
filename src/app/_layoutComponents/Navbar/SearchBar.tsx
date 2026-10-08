"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, useState } from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";

export default function SearchBar({ onSearch, variant = "bar" }: { onSearch?: () => void; variant?: "bar" | "menu" }) {
  const router = useRouter();
  const params = useSearchParams();
  const [value, setValue] = useState(params.get("q") ?? "");

  const q = params.get("q") ?? "";
  const [prevQ, setPrevQ] = useState(q);
  if (q !== prevQ) {
    setPrevQ(q);
    setValue(q);
  }

  function submit(e: FormEvent) {
    e.preventDefault();
    const q = value.trim();
    router.push(q ? `/search?q=${encodeURIComponent(q)}` : "/search");
    onSearch?.();
  }

  return (
    <form onSubmit={submit} role="search" className="relative w-full">
      <input
        type="search"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={variant === "menu" ? "Search products..." : "Search for products, brands and more..."}
        aria-label="Search products"
        className={`w-full border border-gray-200 bg-gray-50/60 pe-14 ${variant === "menu" ? "h-12 rounded-xl ps-4" : "h-11 rounded-full ps-5"} text-sm text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-green-600 focus:bg-white focus:ring-2 focus:ring-green-600/15`}
      />
      <button
        type="submit"
        aria-label="Search"
        className={`absolute inset-e-1.5 top-1/2 flex -translate-y-1/2 items-center justify-center bg-green-600 ${variant === "menu" ? "size-9 rounded-lg" : "size-8 rounded-full"} text-sm text-white transition hover:bg-green-700`}
      >
        <FaMagnifyingGlass />
      </button>
    </form>
  );
}
