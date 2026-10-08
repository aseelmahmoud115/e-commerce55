"use client";
import ConfirmDialog from "@/app/_sharedComponents/ConfirmDialog/ConfirmDialog";
import EmptyState from "@/app/_sharedComponents/EmptyState/EmptyState";
import { Breadcrumb } from "@/app/_sharedComponents/PageHero/PageHero";
import { useCart } from "@/context/cartContext";
import Link from "next/link";
import { useState } from "react";
import { FaArrowLeft, FaCartShopping, FaTrash } from "react-icons/fa6";
import { ImSpinner2 } from "react-icons/im";
import CartItemCard from "./_components/CartItemCard";
import OrderSummary from "./_components/OrderSummary";

export default function Cart() {
  const { items, loading, clearCart, isGuest } = useCart();
  const [clearing, setClearing] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const itemsCount = items.reduce((sum, i) => sum + i.count, 0);

  async function handleClear() {
    setConfirmOpen(false);
    setClearing(true);
    await clearCart();
    setClearing(false);
  }

  return (
    <div className="container-fc py-8">
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Shopping Cart" }]} />
      <div className="mb-8">
        <h1 className="flex items-center gap-3 text-3xl font-bold text-gray-900">
          <span className="flex size-12 items-center justify-center rounded-xl bg-green-600 text-xl text-white">
            <FaCartShopping />
          </span>
          Shopping Cart
        </h1>
        {!loading && items.length > 0 && (
          <p className="mt-2 text-gray-500">
            You have <span className="font-semibold text-green-600">{itemsCount} items</span> in your cart
          </p>
        )}
      </div>

      {loading ? (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_380px]">
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-40 animate-pulse rounded-2xl bg-white ring-1 ring-gray-100" />
            ))}
          </div>
          <div className="h-80 animate-pulse rounded-2xl bg-white ring-1 ring-gray-100" />
        </div>
      ) : items.length === 0 ? (
        <EmptyState
          className="rounded-2xl border border-gray-100 bg-white"
          icon={<FaCartShopping />}
          title="Your cart is empty"
          text="Looks like you haven't added anything to your cart yet. Start exploring our products!"
          action={{ href: "/products", label: "Start Shopping" }}
        />
      ) : (
        <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-[1fr_380px]">
          <div>
            <div className="space-y-4">
              {items.map((item) => (
                <CartItemCard key={item.product._id} item={item} showMeta={!isGuest} />
              ))}
            </div>
            <div className="mt-6 flex items-center justify-between border-t border-gray-200 pt-5">
              <Link href="/" className="group flex items-center gap-2 font-medium text-green-600 transition hover:text-green-700">
                <FaArrowLeft className="transition-transform group-hover:-translate-x-1" /> Continue Shopping
              </Link>
              <button
                onClick={() => setConfirmOpen(true)}
                disabled={clearing}
                className="flex items-center gap-2 text-sm font-medium text-gray-500 transition hover:text-red-600 disabled:opacity-50"
              >
                {clearing ? <ImSpinner2 className="animate-spin" /> : <FaTrash />} Clear all items
              </button>
            </div>
          </div>
          <aside className="lg:sticky lg:top-24">
            <OrderSummary itemsCount={itemsCount} />
          </aside>
        </div>
      )}
      <ConfirmDialog
        open={confirmOpen}
        icon={<FaCartShopping />}
        title="Clear Your Cart?"
        description="All items will be removed from your cart. This action cannot be undone."
        cancelLabel="Keep Shopping"
        confirmLabel="Yes, Clear All"
        onCancel={() => setConfirmOpen(false)}
        onConfirm={handleClear}
      />
    </div>
  );
}
