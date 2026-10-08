"use client";
import { useCart } from "@/context/cartContext";
import { CartItem } from "@/interface/cart.interface";
import { formatPrice } from "@/lib/utils";
import ConfirmDialog from "@/app/_sharedComponents/ConfirmDialog/ConfirmDialog";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FaCheck, FaMinus, FaPlus, FaTrash, FaTrashCan } from "react-icons/fa6";
import { ImSpinner2 } from "react-icons/im";

export default function CartItemCard({ item, showMeta }: { item: CartItem; showMeta: boolean }) {
  const { updateCount, removeItem } = useCart();
  const [pending, setPending] = useState<"count" | "remove" | null>(null);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const { product } = item;
  const href = `/products/${product._id}`;
  const maxQty = product.quantity || 999;

  async function change(count: number) {
    setPending("count");
    await updateCount(product._id, count);
    setPending(null);
  }

  async function remove() {
    setConfirmOpen(false);
    setPending("remove");
    await removeItem(product._id);
    setPending(null);
  }

  return (
    <article className={`group rounded-2xl border border-gray-100 bg-white p-4 shadow-sm transition hover:shadow-md sm:p-5 ${pending === "remove" ? "opacity-50" : ""}`}>
      <div className="flex gap-4 sm:gap-5">
        <div className="flex shrink-0 flex-col items-center gap-2">
          <Link href={href} className="relative block size-24 overflow-hidden rounded-xl border border-gray-100 bg-gray-50 sm:size-28">
            <Image
              src={product.imageCover}
              alt={product.title}
              fill
              sizes="112px"
              className="object-contain p-2 transition duration-300 group-hover:scale-110"
            />
          </Link>
          {showMeta && product.quantity > 0 && (
            <span className="flex items-center gap-1 rounded-full bg-green-500 px-2 py-0.5 text-[10px] font-semibold text-white">
              <FaCheck className="text-[8px]" /> In Stock
            </span>
          )}
        </div>

        <div className="flex min-w-0 flex-1 flex-col">
          <h3 className="line-clamp-2 text-base font-semibold text-gray-900 sm:text-lg">
            <Link href={href} className="transition hover:text-green-700">
              {product.title}
            </Link>
          </h3>
          <div className="mt-1.5 flex flex-wrap items-center gap-2 text-xs">
            <span className="rounded-full bg-green-50 px-2.5 py-1 font-medium text-green-700">{product.category?.name}</span>
            {showMeta && <span className="text-gray-400">· SKU: {product._id.slice(-6).toUpperCase()}</span>}
          </div>
          <p className="mt-2 font-bold text-green-600">
            {formatPrice(item.price)} EGP {showMeta && <span className="text-xs font-normal text-gray-400">per unit</span>}
          </p>

          <div className="mt-auto flex flex-wrap items-end justify-between gap-3 pt-3">
            <div className="flex items-center gap-1 rounded-xl border border-gray-200 bg-gray-50 p-1">
              <button
                onClick={() => change(item.count - 1)}
                disabled={pending !== null || item.count <= 1}
                aria-label="Decrease quantity"
                className="flex size-8 items-center justify-center rounded-lg text-gray-500 transition hover:bg-white hover:text-gray-900 disabled:cursor-not-allowed disabled:text-gray-300 disabled:hover:bg-transparent"
              >
                <FaMinus className="text-xs" />
              </button>
              <span className="flex w-9 justify-center font-semibold text-gray-900" aria-live="polite">
                {pending === "count" ? <ImSpinner2 className="animate-spin text-green-600" /> : item.count}
              </span>
              <button
                onClick={() => change(item.count + 1)}
                disabled={pending !== null || item.count >= maxQty}
                aria-label="Increase quantity"
                className="flex size-8 items-center justify-center rounded-lg bg-green-600 text-white transition hover:bg-green-800 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <FaPlus className="text-xs" />
              </button>
            </div>

            <div className="flex items-center gap-3">
              <div className="text-end">
                <p className="text-xs text-gray-400">Total</p>
                <p className="text-xl font-bold text-gray-900">
                  {formatPrice(item.price * item.count)} <span className="text-xs font-normal text-gray-400">EGP</span>
                </p>
              </div>
              <button
                onClick={() => setConfirmOpen(true)}
                disabled={pending !== null}
                aria-label={`Remove ${product.title}`}
                className="flex size-10 items-center justify-center rounded-xl border border-red-100 bg-red-50 text-red-500 transition hover:border-red-700 hover:bg-red-700 hover:text-white disabled:opacity-50"
              >
                {pending === "remove" ? <ImSpinner2 className="animate-spin" /> : <FaTrash className="text-sm" />}
              </button>
            </div>
          </div>
        </div>
      </div>
      <ConfirmDialog
        open={confirmOpen}
        icon={<FaTrashCan />}
        title="Remove Item?"
        description={<>Remove <span className="font-semibold text-gray-900">{product.title}</span> from your cart?</>}
        cancelLabel="Cancel"
        confirmLabel="Remove"
        onCancel={() => setConfirmOpen(false)}
        onConfirm={remove}
      />
    </article>
  );
}
