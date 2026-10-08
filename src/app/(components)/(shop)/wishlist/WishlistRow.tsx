"use client";
import { useCart } from "@/context/cartContext";
import { useWishlist } from "@/context/wishlistContext";
import { IProducts } from "@/interface/product.interface";
import { discountPercent, formatPrice } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FaCartShopping, FaCheck, FaTrash } from "react-icons/fa6";
import { ImSpinner2 } from "react-icons/im";

export default function WishlistRow({ product }: { product: IProducts }) {
  const { isInCart, addToCart } = useCart();
  const { removeFromWishlist } = useWishlist();
  const [pending, setPending] = useState<"cart" | "remove" | null>(null);
  const inCart = isInCart(product._id);
  const off = discountPercent(product.price, product.priceAfterDiscount);
  const href = `/products/${product._id}`;

  async function add() {
    setPending("cart");
    await addToCart(product);
    setPending(null);
  }
  async function remove() {
    setPending("remove");
    await removeFromWishlist(product._id);
    setPending(null);
  }

  const status = inCart ? (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-green-50 px-3 py-1 text-xs font-medium text-green-700">
      <FaCartShopping className="text-[10px]" /> In Cart
    </span>
  ) : product.quantity > 0 ? (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-green-50 px-3 py-1 text-xs font-medium text-green-700">
      <span className="size-1.5 rounded-full bg-green-600" /> In Stock
    </span>
  ) : (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-red-50 px-3 py-1 text-xs font-medium text-red-600">
      <span className="size-1.5 rounded-full bg-red-500" /> Out of Stock
    </span>
  );

  const action = inCart ? (
    <Link
      href="/cart"
      className="inline-flex h-10 items-center gap-2 rounded-xl bg-gray-100 px-4 text-sm font-medium text-gray-700 transition hover:bg-gray-200"
    >
      <FaCheck className="text-xs" /> View Cart
    </Link>
  ) : (
    <button
      onClick={add}
      disabled={pending !== null || product.quantity <= 0}
      className="inline-flex h-10 items-center gap-2 rounded-xl bg-green-600 px-4 text-sm font-semibold text-white transition hover:bg-green-700 disabled:opacity-60"
    >
      {pending === "cart" ? <ImSpinner2 className="animate-spin" /> : <FaCartShopping className="text-xs" />} Add to Cart
    </button>
  );

  const removeBtn = (
    <button
      onClick={remove}
      disabled={pending !== null}
      aria-label={`Remove ${product.title} from wishlist`}
      className="flex size-10 items-center justify-center rounded-xl border border-gray-200 text-gray-500 transition hover:border-red-200 hover:bg-red-50 hover:text-red-500 disabled:opacity-50"
    >
      {pending === "remove" ? <ImSpinner2 className="animate-spin" /> : <FaTrash className="text-sm" />}
    </button>
  );

  return (
    <div className={`grid grid-cols-[auto_1fr] items-center gap-4 border-b border-gray-100 p-4 last:border-0 sm:p-5 md:grid-cols-[minmax(0,1fr)_140px_140px_200px] ${pending === "remove" ? "opacity-50" : ""}`}>
      <div className="contents md:flex md:items-center md:gap-4">
        <Link href={href} className="relative size-16 shrink-0 overflow-hidden rounded-xl border border-gray-100 bg-gray-50 md:size-16">
          <Image src={product.imageCover} alt={product.title} fill sizes="64px" className="object-contain p-1" />
        </Link>
        <div className="min-w-0">
          <Link href={href} className="line-clamp-2 font-medium text-gray-900 transition hover:text-green-600">
            {product.title}
          </Link>
          <p className="text-sm text-gray-400">{product.category?.name}</p>
          {/* mobile details */}
          <div className="mt-2 flex flex-wrap items-center gap-3 md:hidden">
            <span className="font-bold text-gray-900">{formatPrice(product.priceAfterDiscount ?? product.price)} EGP</span>
            {status}
          </div>
        </div>
      </div>

      <div className="col-span-2 flex items-center justify-end gap-2 md:hidden">
        {action}
        {removeBtn}
      </div>

      <div className="hidden text-center md:block">
        <p className="font-bold text-gray-900">{formatPrice(product.priceAfterDiscount ?? product.price)} EGP</p>
        {off > 0 && <p className="text-xs text-gray-400 line-through">{formatPrice(product.price)} EGP</p>}
      </div>
      <div className="hidden text-center md:block">{status}</div>
      <div className="hidden items-center justify-center gap-2 md:flex">
        {action}
        {removeBtn}
      </div>
    </div>
  );
}
