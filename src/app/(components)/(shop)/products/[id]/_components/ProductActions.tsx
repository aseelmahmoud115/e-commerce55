"use client";
import { useCart } from "@/context/cartContext";
import { useWishlist } from "@/context/wishlistContext";
import { toast } from "@/components/ui/toast";
import { IProducts } from "@/interface/product.interface";
import { formatPrice } from "@/lib/utils";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  FaBolt,
  FaCartShopping,
  FaHeart,
  FaMinus,
  FaPlus,
  FaRegHeart,
  FaShareNodes,
} from "react-icons/fa6";
import { ImSpinner2 } from "react-icons/im";

export default function ProductActions({ product }: { product: IProducts }) {
  const router = useRouter();
  const { status } = useSession();
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const [count, setCount] = useState(1);
  const [pending, setPending] = useState<"cart" | "buy" | "wish" | null>(null);

  const stock = product.quantity;
  const outOfStock = stock <= 0;
  const unitPrice = product.priceAfterDiscount ?? product.price;
  const inWishlist = isInWishlist(product._id);

  const changeCount = (value: number) => setCount(Math.min(Math.max(1, value || 1), Math.max(stock, 1)));

  async function handleAdd(buyNow = false) {
    setPending(buyNow ? "buy" : "cart");
    const ok = await addToCart(product, count);
    setPending(null);
    if (ok && buyNow) router.push(status === "authenticated" ? "/checkout" : "/cart");
  }

  async function handleWishlist() {
    setPending("wish");
    await toggleWishlist(product);
    setPending(null);
  }

  async function share() {
    const url = window.location.href;
    try {
      if (navigator.share) {
        await navigator.share({ title: product.title, url });
        return;
      }
      await navigator.clipboard.writeText(url);
      toast.add({ title: "Link copied", description: "Product link copied to clipboard", type: "success" });
    } catch {
    }
  }

  return (
    <div>
      <label htmlFor="quantity" className="mb-2 block text-sm font-medium text-gray-700">
        Quantity
      </label>
      <div className="flex items-center gap-4">
        <div className="flex items-center overflow-hidden rounded-xl border border-gray-200 bg-white">
          <button
            onClick={() => changeCount(count - 1)}
            disabled={count <= 1 || outOfStock}
            aria-label="Decrease quantity"
            className="flex size-11 items-center justify-center text-gray-600 transition hover:bg-gray-50 hover:text-green-600 disabled:text-gray-300"
          >
            <FaMinus className="text-xs" />
          </button>
          <input
            id="quantity"
            type="number"
            min={1}
            max={stock}
            value={count}
            disabled={outOfStock}
            onChange={(e) => changeCount(Number(e.target.value))}
            className="h-11 w-14 border-x border-gray-200 text-center font-semibold text-gray-900 outline-none"
          />
          <button
            onClick={() => changeCount(count + 1)}
            disabled={count >= stock || outOfStock}
            aria-label="Increase quantity"
            className="flex size-11 items-center justify-center text-gray-600 transition hover:bg-gray-50 hover:text-green-600 disabled:text-gray-300"
          >
            <FaPlus className="text-xs" />
          </button>
        </div>
        <span className="text-sm text-gray-500">{stock} available</span>
      </div>

      <div className="mt-5 flex items-center justify-between rounded-xl bg-gray-50 px-4 py-4">
        <span className="text-sm text-gray-600">Total Price:</span>
        <span className="text-2xl font-bold text-green-600">
          {(unitPrice * count).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} EGP
        </span>
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        <button
          onClick={() => handleAdd(false)}
          disabled={outOfStock || pending !== null}
          className="flex h-12 items-center justify-center gap-2 rounded-xl bg-green-600 font-semibold text-white shadow-lg shadow-green-600/20 transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {pending === "cart" ? <ImSpinner2 className="animate-spin" /> : <FaCartShopping />}
          {outOfStock ? "Out of Stock" : "Add to Cart"}
        </button>
        <button
          onClick={() => handleAdd(true)}
          disabled={outOfStock || pending !== null}
          className="flex h-12 items-center justify-center gap-2 rounded-xl bg-navy font-semibold text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {pending === "buy" ? <ImSpinner2 className="animate-spin" /> : <FaBolt />}
          Buy Now
        </button>
      </div>

      <div className="mt-3 flex gap-3">
        <button
          onClick={handleWishlist}
          disabled={pending === "wish"}
          className={`flex h-12 flex-1 items-center justify-center gap-2 rounded-xl border font-medium transition ${inWishlist ? "border-red-200 bg-red-50 text-red-500 hover:bg-red-100" : "border-gray-200 bg-white text-gray-700 hover:border-green-600 hover:text-green-600"}`}
        >
          {pending === "wish" ? <ImSpinner2 className="animate-spin" /> : inWishlist ? <FaHeart /> : <FaRegHeart />}
          {inWishlist ? "Remove from Wishlist" : "Add to Wishlist"}
        </button>
        <button
          onClick={share}
          aria-label="Share product"
          className="flex size-12 items-center justify-center rounded-xl border border-gray-200 bg-white text-gray-700 transition hover:border-green-600 hover:text-green-600"
        >
          <FaShareNodes />
        </button>
      </div>

      <p className="sr-only" aria-live="polite">
        Total {formatPrice(unitPrice * count)} EGP
      </p>
    </div>
  );
}
