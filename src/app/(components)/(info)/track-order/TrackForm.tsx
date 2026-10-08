"use client";
import { IOrder } from "@/interface/order.interface";
import { formatDate, formatPrice } from "@/lib/utils";
import { getUserOrders } from "@/services/orders.service";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { FormEvent, useState } from "react";
import {
  FaBoxOpen,
  FaCircleCheck,
  FaCircleExclamation,
  FaClock,
  FaMagnifyingGlass,
  FaTruck,
} from "react-icons/fa6";
import { ImSpinner2 } from "react-icons/im";

const steps = [
  { label: "Processing", icon: FaClock },
  { label: "On the way", icon: FaTruck },
  { label: "Delivered", icon: FaCircleCheck },
];

const stepOf = (o: IOrder) => (o.isDelivered ? 2 : o.isPaid ? 1 : 0);

export default function TrackForm() {
  const { status } = useSession();
  const [value, setValue] = useState("");
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);
  const [order, setOrder] = useState<IOrder | null>(null);

  async function submit(e: FormEvent) {
    e.preventDefault();
    setOrder(null);
    const number = value.trim().replace(/^#/, "");
    if (!/^\d+$/.test(number)) {
      setError("Please enter a valid order number");
      return;
    }
    if (status !== "authenticated") {
      setError("Please sign in to track your orders");
      return;
    }
    setError("");
    setPending(true);
    const orders = await getUserOrders();
    setPending(false);
    const found = orders?.find((o) => String(o.id) === number);
    if (!found) {
      setError(`We couldn't find order #${number} in your account`);
      return;
    }
    setOrder(found);
  }

  const current = order ? stepOf(order) : -1;

  return (
    <div className="space-y-4">
      <form onSubmit={submit} noValidate className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
        <label htmlFor="order" className="font-bold text-gray-900">Order Number</label>
        <p className="mb-3 text-sm text-gray-500">You can find it in your order confirmation or on the My Orders page.</p>
        <div className="flex flex-col gap-3 sm:flex-row">
          <input
            id="order"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            inputMode="numeric"
            placeholder="e.g. 8140"
            aria-invalid={!!error}
            className="input-fc"
          />
          <button type="submit" disabled={pending} className="btn-green shrink-0">
            {pending ? <ImSpinner2 className="animate-spin" /> : <FaMagnifyingGlass />} Track Order
          </button>
        </div>
        {error && (
          <p className="mt-3 flex items-center gap-2 text-sm text-red-500">
            <FaCircleExclamation /> {error}
            {status !== "authenticated" && (
              <Link href="/login?callbackUrl=/track-order" className="font-semibold text-green-600 hover:underline">
                Sign In
              </Link>
            )}
          </p>
        )}
      </form>

      {order && (
        <div className="animate-fade-up rounded-2xl border border-green-200 bg-white p-6 shadow-md">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <p className="text-sm text-gray-500">Order</p>
              <h3 className="text-2xl font-bold text-gray-900">#{order.id}</h3>
              <p className="text-sm text-gray-500">
                Placed on {formatDate(order.createdAt)} · {order.cartItems.length} items ·{" "}
                {order.paymentMethodType === "card" ? "Paid by card" : "Cash on delivery"}
              </p>
            </div>
            <p className="text-2xl font-bold text-green-600">
              {formatPrice(order.totalOrderPrice)} <span className="text-sm font-normal text-gray-400">EGP</span>
            </p>
          </div>

          <ol className="mt-6 grid grid-cols-3">
            {steps.map(({ label, icon: Icon }, i) => {
              const done = i <= current;
              return (
                <li key={label} className="relative flex flex-col items-center text-center">
                  {i > 0 && (
                    <span
                      className={`absolute inset-e-1/2 top-5 h-1 w-full -translate-y-1/2 ${i <= current ? "bg-green-600" : "bg-gray-200"}`}
                    />
                  )}
                  <span className={`relative z-10 flex size-10 items-center justify-center rounded-full ${done ? "bg-green-600 text-white" : "bg-gray-100 text-gray-400"} ${i === current ? "ring-4 ring-green-100" : ""}`}>
                    <Icon />
                  </span>
                  <span className={`mt-2 text-xs font-medium sm:text-sm ${done ? "text-green-700" : "text-gray-400"}`}>{label}</span>
                </li>
              );
            })}
          </ol>

          <Link href="/allorders" className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-green-600 hover:underline">
            <FaBoxOpen /> View full order details
          </Link>
        </div>
      )}
    </div>
  );
}
