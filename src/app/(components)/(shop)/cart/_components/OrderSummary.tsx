"use client";
import { toast } from "@/components/ui/toast";
import { useCart } from "@/context/cartContext";
import { formatPrice } from "@/lib/utils";
import { ApplyCoupon } from "@/services/cartAction/applyCoupon";
import Link from "next/link";
import { FormEvent, useState } from "react";
import {
  FaArrowLeft,
  FaBagShopping,
  FaLock,
  FaShieldHalved,
  FaTag,
  FaTruck,
  FaTruckFast,
  FaUser,
} from "react-icons/fa6";
import { ImSpinner2 } from "react-icons/im";

export default function OrderSummary({ itemsCount }: { itemsCount: number }) {
  const { totalPrice, isGuest } = useCart();
  const [promoOpen, setPromoOpen] = useState(false);
  const [code, setCode] = useState("");
  const [applying, setApplying] = useState(false);
  const [discounted, setDiscounted] = useState<number | null>(null);

  async function applyCoupon(e: FormEvent) {
    e.preventDefault();
    if (!code.trim()) return;
    setApplying(true);
    const response = await ApplyCoupon(code.trim());
    setApplying(false);
    if (!response.ok) {
      toast.add({ title: "Invalid code", description: response.message, type: "error" });
      return;
    }
    setDiscounted(response.data?.data.totalAfterDiscount ?? null);
    toast.add({ title: "Coupon applied", description: `${code.toUpperCase()} was applied to your cart`, type: "success" });
  }

  if (isGuest) {
    return (
      <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
        <div className="bg-navy px-6 py-5">
          <h2 className="text-lg font-bold text-white">Order Summary</h2>
        </div>
        <div className="space-y-4 p-6">
          <div className="flex justify-between text-gray-600">
            <span>Subtotal ({itemsCount} items)</span>
            <span className="font-medium text-gray-900">{formatPrice(totalPrice)} EGP</span>
          </div>
          <div className="flex justify-between text-gray-600">
            <span>Shipping</span>
            <span className="font-medium text-green-600">Calculated at checkout</span>
          </div>
          <div className="flex justify-between border-t border-gray-100 pt-4 text-lg font-bold">
            <span className="text-gray-900">Estimated Total</span>
            <span className="text-green-600">{formatPrice(totalPrice)} EGP</span>
          </div>
          <Link
            href="/login?callbackUrl=/cart"
            className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-green-600 font-semibold text-white shadow-lg shadow-green-600/20 transition hover:bg-green-700"
          >
            <FaUser /> Login to Checkout
          </Link>
          <p className="text-center text-sm text-gray-500">
            Don&apos;t have an account? {" "}
            <Link href="/signup" className="font-medium text-green-600 hover:underline">
              Sign up
            </Link>
          </p>
          <ul className="space-y-1.5 border-t border-gray-100 pt-4 text-xs text-gray-500">
            <li>✓ Your cart items will be saved</li>
            <li>✓ Track your orders easily</li>
            <li>✓ Access exclusive member deals</li>
          </ul>
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
      <div className="bg-linear-to-r from-green-600 to-green-700 px-6 py-5 text-white">
        <h2 className="flex items-center gap-2 text-lg font-bold">
          <FaBagShopping /> Order Summary
        </h2>
        <p className="text-sm text-white/80">{itemsCount} items in your cart</p>
      </div>
      <div className="space-y-4 p-6">
        <div className="flex items-center gap-3 rounded-xl bg-green-50 p-4">
          <span className="flex size-10 items-center justify-center rounded-full bg-green-100 text-green-600">
            <FaTruck />
          </span>
          <div>
            <p className="font-semibold text-green-700">Free Shipping!</p>
            <p className="text-sm text-green-600">You qualify for free delivery</p>
          </div>
        </div>

        <div className="flex justify-between text-gray-600">
          <span>Subtotal</span>
          <span className="font-medium text-gray-900">{formatPrice(totalPrice)} EGP</span>
        </div>
        <div className="flex justify-between text-gray-600">
          <span>Shipping</span>
          <span className="font-semibold text-green-600">FREE</span>
        </div>
        {discounted !== null && (
          <div className="flex justify-between text-gray-600">
            <span>Discount ({code.toUpperCase()})</span>
            <span className="font-semibold text-red-500">-{formatPrice(totalPrice - discounted)} EGP</span>
          </div>
        )}
        <div className="flex items-baseline justify-between border-t border-dashed border-gray-200 pt-4">
          <span className="font-semibold text-gray-900">Total</span>
          <span className="text-2xl font-bold text-gray-900">
            {formatPrice(discounted ?? totalPrice)} <span className="text-sm font-normal text-gray-500">EGP</span>
          </span>
        </div>

        {promoOpen ? (
          <form onSubmit={applyCoupon} className="flex gap-2">
            <input
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="Enter promo code"
              aria-label="Promo code"
              className="input-fc py-2.5"
            />
            <button type="submit" disabled={applying} className="btn-green px-4 py-2.5">
              {applying ? <ImSpinner2 className="animate-spin" /> : "Apply"}
            </button>
          </form>
        ) : (
          <button
            onClick={() => setPromoOpen(true)}
            className="flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-gray-300 py-3 text-sm text-gray-600 transition hover:border-green-600 hover:text-green-600"
          >
            <FaTag /> Apply Promo Code
          </button>
        )}

        <Link
          href="/checkout"
          className="flex h-13 w-full items-center justify-center gap-2 rounded-xl bg-linear-to-r from-green-600 to-green-700 font-semibold text-white shadow-lg shadow-green-600/25 transition hover:-translate-y-0.5 hover:from-green-700 hover:to-green-800"
        >
          <FaLock /> Secure Checkout
        </Link>

        <div className="flex items-center justify-center gap-4 text-xs text-gray-500">
          <span className="flex items-center gap-1.5"><FaShieldHalved className="text-green-600" /> Secure Payment</span>
          <span className="h-3 w-px bg-gray-200" />
          <span className="flex items-center gap-1.5"><FaTruckFast className="text-blue-500" /> Fast Delivery</span>
        </div>
        <Link href="/" className="flex items-center justify-center gap-2 text-sm text-green-600 transition hover:text-green-700">
          <FaArrowLeft /> Continue Shopping
        </Link>
      </div>
    </div>
  );
}
