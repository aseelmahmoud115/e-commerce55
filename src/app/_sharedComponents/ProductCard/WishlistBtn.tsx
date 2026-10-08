"use client";
import { useWishlist } from "@/context/wishlistContext";
import { IProducts } from "@/interface/product.interface";
import { useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa6";

export default function WishlistBtn({ product }: { product: IProducts }) {
  const { isInWishlist, toggleWishlist } = useWishlist();
  const [pending, setPending] = useState(false);
  const active = isInWishlist(product._id);

  async function toggle() {
    if (pending) return;
    setPending(true);
    await toggleWishlist(product);
    setPending(false);
  }

  return (
    <button
      onClick={toggle}
      disabled={pending}
      aria-label={active ? "Remove from wishlist" : "Add to wishlist"}
      aria-pressed={active}
      className={`flex size-8 items-center justify-center rounded-full bg-white text-sm shadow-sm ring-1 ring-gray-100 transition hover:scale-110 disabled:opacity-60 ${active ? "text-red-500" : "text-gray-600 hover:text-red-500"}`}
    >
      {active ? <FaHeart className={pending ? "animate-pulse" : ""} /> : <FaRegHeart className={pending ? "animate-pulse" : ""} />}
    </button>
  );
}
