"use client";
import { FormEvent, useState } from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { useQueryUpdater } from "./useQueryUpdater";

export default function SearchInput() {
  const { update, params } = useQueryUpdater();
  const [value, setValue] = useState(params.get("q") ?? "");

  const q = params.get("q") ?? "";
  const [prevQ, setPrevQ] = useState(q);
  if (q !== prevQ) {
    setPrevQ(q);
    setValue(q);
  }

  function submit(e: FormEvent) {
    e.preventDefault();
    update({ q: value.trim() || null });
  }

  return (
    <form onSubmit={submit} role="search" className="relative max-w-xl">
      <FaMagnifyingGlass className="pointer-events-none absolute inset-s-4 top-1/2 -translate-y-1/2 text-gray-400" />
      <input
        type="search"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Search for products..."
        aria-label="Search for products"
        className="input-fc h-12 ps-11"
      />
    </form>
  );
}
