"use client";
import { IOrder } from "@/interface/order.interface";
import { formatDate, formatPrice } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
  FaBox,
  FaCalendar,
  FaChevronDown,
  FaChevronUp,
  FaCircleCheck,
  FaClock,
  FaCreditCard,
  FaHashtag,
  FaLocationDot,
  FaMoneyBill1,
  FaPhone,
  FaReceipt,
  FaTruck,
} from "react-icons/fa6";

function statusOf(order: IOrder) {
  if (order.isDelivered)
    return { label: "Delivered", icon: <FaCircleCheck />, cls: "bg-green-100 text-green-700" };
  if (order.isPaid)
    return { label: "On the way", icon: <FaTruck />, cls: "bg-blue-100 text-blue-700" };
  return { label: "Processing", icon: <FaClock />, cls: "bg-amber-100 text-amber-700" };
}

export default function OrderCard({ order, defaultOpen = false }: { order: IOrder; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  const status = statusOf(order);
  const first = order.cartItems[0]?.product;
  const itemsCount = order.cartItems.reduce((s, i) => s + i.count, 0);
  const subtotal = order.cartItems.reduce((s, i) => s + i.price * i.count, 0);
  const isCard = order.paymentMethodType === "card";

  return (
    <article className={`overflow-hidden rounded-2xl border bg-white shadow-sm transition ${open ? "border-green-200 shadow-md" : "border-gray-100 hover:shadow-md"}`}>
      <div className="flex gap-4 p-4 sm:p-5">
        <div className="relative shrink-0">
          <div className="relative size-20 overflow-hidden rounded-xl border border-gray-100 bg-gray-50 sm:size-24">
            {first && <Image src={first.imageCover} alt={first.title} fill sizes="96px" className="object-contain p-2" />}
          </div>
          {order.cartItems.length > 1 && (
            <span className="absolute -inset-e-2 -top-2 flex size-7 items-center justify-center rounded-full bg-navy text-xs font-bold text-white ring-2 ring-white">
              +{order.cartItems.length - 1}
            </span>
          )}
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-3">
            <div>
              <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${status.cls}`}>
                {status.icon} {status.label}
              </span>
              <h2 className="mt-1.5 flex items-center gap-1.5 text-lg font-bold text-gray-900">
                <FaHashtag className="text-sm text-gray-400" /> {order.id}
              </h2>
            </div>
            <span
              title={isCard ? "Paid by card" : "Cash on delivery"}
              className={`flex size-10 shrink-0 items-center justify-center rounded-xl ${isCard ? "bg-purple-50 text-purple-600" : "bg-gray-100 text-gray-600"}`}
            >
              {isCard ? <FaCreditCard /> : <FaMoneyBill1 />}
            </span>
          </div>

          <div className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-gray-500">
            <span className="flex items-center gap-1.5"><FaCalendar className="text-xs" /> {formatDate(order.createdAt)}</span>
            <span className="size-1 rounded-full bg-gray-300" />
            <span className="flex items-center gap-1.5"><FaBox className="text-xs" /> {itemsCount} items</span>
            {order.shippingAddress?.city && (
              <>
                <span className="size-1 rounded-full bg-gray-300" />
                <span className="flex items-center gap-1.5"><FaLocationDot className="text-xs" /> {order.shippingAddress.city}</span>
              </>
            )}
          </div>

          <div className="mt-3 flex items-end justify-between gap-3">
            <p className="text-2xl font-bold text-gray-900">
              {formatPrice(order.totalOrderPrice)} <span className="text-sm font-normal text-gray-400">EGP</span>
            </p>
            <button
              onClick={() => setOpen((o) => !o)}
              aria-expanded={open}
              className={`flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold transition ${open ? "bg-green-600 text-white shadow-md shadow-green-600/25 hover:bg-green-700" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}
            >
              {open ? <>Hide <FaChevronUp className="text-xs" /></> : <>Details <FaChevronDown className="text-xs" /></>}
            </button>
          </div>
        </div>
      </div>

      {open && (
        <div className="border-t border-gray-100 bg-gray-50/60 p-4 animate-in fade-in-0 slide-in-from-top-2 sm:p-5">
          <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold text-gray-900">
            <span className="flex size-6 items-center justify-center rounded-md bg-green-100 text-xs text-green-600"><FaReceipt /></span>
            Order Items
          </h3>
          <ul className="space-y-2.5">
            {order.cartItems.map((item) => (
              <li key={item._id} className="flex items-center gap-3 rounded-xl border border-gray-100 bg-white p-3">
                <Link href={`/products/${item.product._id}`} className="relative size-12 shrink-0 overflow-hidden rounded-lg bg-gray-50">
                  <Image src={item.product.imageCover} alt={item.product.title} fill sizes="48px" className="object-contain p-1" />
                </Link>
                <div className="min-w-0 flex-1">
                  <Link href={`/products/${item.product._id}`} className="line-clamp-1 text-sm font-medium text-gray-900 transition hover:text-green-600">
                    {item.product.title}
                  </Link>
                  <p className="text-xs text-gray-500">{item.count} × {formatPrice(item.price)} EGP</p>
                </div>
                <p className="text-end font-bold text-gray-900">
                  {formatPrice(item.price * item.count)}
                  <span className="block text-[10px] font-normal text-gray-400">EGP</span>
                </p>
              </li>
            ))}
          </ul>

          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <div className="rounded-xl border border-gray-100 bg-white p-4">
              <h4 className="mb-2 flex items-center gap-2 text-sm font-semibold text-gray-900">
                <span className="flex size-6 items-center justify-center rounded-md bg-blue-100 text-xs text-blue-600"><FaLocationDot /></span>
                Delivery Address
              </h4>
              <p className="font-semibold text-gray-900">{order.shippingAddress?.city ?? "-"}</p>
              <p className="text-sm text-gray-500">{order.shippingAddress?.details}</p>
              {order.shippingAddress?.phone && (
                <p className="mt-2 flex items-center gap-2 text-sm text-gray-500"><FaPhone className="text-xs" /> {order.shippingAddress.phone}</p>
              )}
            </div>
            <div className="rounded-xl border border-amber-200 bg-amber-50 p-4">
              <h4 className="mb-2 flex items-center gap-2 text-sm font-semibold text-gray-900">
                <span className="flex size-6 items-center justify-center rounded-md bg-amber-400 text-xs text-white"><FaClock /></span>
                Order Summary
              </h4>
              <dl className="space-y-1.5 text-sm">
                <div className="flex justify-between text-gray-600"><dt>Subtotal</dt><dd>{formatPrice(subtotal)} EGP</dd></div>
                <div className="flex justify-between text-gray-600"><dt>Shipping</dt><dd>{order.shippingPrice ? `${formatPrice(order.shippingPrice)} EGP` : "Free"}</dd></div>
                {order.taxPrice > 0 && (
                  <div className="flex justify-between text-gray-600"><dt>Tax</dt><dd>{formatPrice(order.taxPrice)} EGP</dd></div>
                )}
                <div className="flex justify-between border-t border-amber-200 pt-2 font-bold text-gray-900">
                  <dt>Total</dt><dd>{formatPrice(order.totalOrderPrice)} EGP</dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      )}
    </article>
  );
}
