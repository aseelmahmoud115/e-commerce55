"use client";
import EmptyState from "@/app/_sharedComponents/EmptyState/EmptyState";
import { Breadcrumb } from "@/app/_sharedComponents/PageHero/PageHero";
import { toast } from "@/components/ui/toast";
import { useCart } from "@/context/cartContext";
import { IAddress } from "@/interface/address.interface";
import { formatPrice } from "@/lib/utils";
import { CheckoutForm, CheckoutSchema } from "@/schema/checkout.schema";
import { getAddresses } from "@/services/addressAction/addresses";
import { CashOrderSession } from "@/services/cashOrder.service";
import { CheckOutSession } from "@/services/checkout.service";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  FaArrowLeft,
  FaBagShopping,
  FaBookmark,
  FaBuilding,
  FaCartShopping,
  FaCheck,
  FaCircleInfo,
  FaCreditCard,
  FaHouse,
  FaLocationDot,
  FaMoneyBill1,
  FaPhone,
  FaPlus,
  FaReceipt,
  FaRotateLeft,
  FaShieldHalved,
  FaTruck,
  FaTruckFast,
  FaWallet,
} from "react-icons/fa6";
import { FaCcMastercard, FaCcVisa, FaCcAmex } from "react-icons/fa";
import { ImSpinner2 } from "react-icons/im";

type Method = "cash" | "card";

function SectionCard({ icon, title, subtitle, children }: { icon: ReactNode; title: string; subtitle: string; children: ReactNode }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
      <div className="bg-linear-to-r from-green-600 to-green-700 px-6 py-4 text-white">
        <h2 className="flex items-center gap-2 text-lg font-bold">{icon} {title}</h2>
        <p className="text-sm text-white/80">{subtitle}</p>
      </div>
      <div className="p-5 sm:p-6">{children}</div>
    </div>
  );
}

export default function Checkout() {
  const router = useRouter();
  const { items, totalPrice, cartId, loading, refreshCart } = useCart();
  const [method, setMethod] = useState<Method>("cash");
  const [addresses, setAddresses] = useState<IAddress[]>([]);
  const [selected, setSelected] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const { control, handleSubmit, reset } = useForm<CheckoutForm>({
    defaultValues: { city: "", details: "", phone: "" },
    resolver: zodResolver(CheckoutSchema),
    mode: "onTouched",
  });

  useEffect(() => {
    getAddresses().then((res) => {
      if (!res.ok) return;
      const list = res.data?.data ?? [];
      setAddresses(list);
      if (list[0]) {
        setSelected(list[0]._id);
        reset({ city: list[0].city, details: list[0].details, phone: list[0].phone });
      }
    });
  }, [reset]);

  function chooseAddress(address: IAddress | null) {
    setSelected(address?._id ?? null);
    reset(
      address
        ? { city: address.city, details: address.details, phone: address.phone }
        : { city: "", details: "", phone: "" },
    );
  }

  async function handelPayment(values: CheckoutForm) {
    if (!cartId) {
      toast.add({ title: "Error", description: "Your cart is empty", type: "error" });
      return;
    }
    setSubmitting(true);

    if (method === "cash") {
      const response = await CashOrderSession(cartId, values);
      if (response.ok) {
        await refreshCart();
        router.push("/allorders");
      } else {
        toast.add({ title: "Error", description: response.message, type: "error" });
        setSubmitting(false);
      }
      return;
    }

    const response = await CheckOutSession(cartId, values, window.location.origin);
    if (response.ok && response.data?.session?.url) {
      window.location.assign(response.data.session.url);
    } else {
      toast.add({ title: "Error", description: response.message, type: "error" });
      setSubmitting(false);
    }
  }

  if (!loading && items.length === 0 && !submitting) {
    return (
      <div className="container-fc py-10">
        <EmptyState
          className="rounded-2xl border border-gray-100 bg-white"
          icon={<FaCartShopping />}
          title="Your cart is empty"
          text="Add some products to your cart before checking out."
          action={{ href: "/products", label: "Start Shopping" }}
        />
      </div>
    );
  }

  const itemsCount = items.reduce((s, i) => s + i.count, 0);
  const fieldIcon = "pointer-events-none absolute start-3 flex size-7 items-center justify-center rounded-lg bg-gray-100 text-xs text-gray-500";

  return (
    <div className="container-fc py-8">
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Cart", href: "/cart" }, { label: "Checkout" }]} />
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="flex items-center gap-3 text-3xl font-bold text-gray-900">
            <span className="flex size-12 items-center justify-center rounded-xl bg-green-600 text-xl text-white">
              <FaReceipt />
            </span>
            Complete Your Order
          </h1>
          <p className="mt-2 text-gray-500">Review your items and complete your purchase</p>
        </div>
        <Link href="/cart" className="group flex items-center gap-2 font-medium text-green-600 transition hover:text-green-700">
          <FaArrowLeft className="transition-transform group-hover:-translate-x-1" /> Back to Cart
        </Link>
      </div>

      <form onSubmit={handleSubmit(handelPayment)} noValidate className="grid grid-cols-1 items-start gap-6 lg:grid-cols-[1fr_380px]">
        <div className="space-y-6">
          <SectionCard icon={<FaHouse />} title="Shipping Address" subtitle="Where should we deliver your order?">
            {addresses.length > 0 && (
              <div className="mb-6">
                <h3 className="flex items-center gap-2 font-semibold text-gray-900">
                  <FaBookmark className="text-green-600" /> Saved Addresses
                </h3>
                <p className="mb-3 text-sm text-gray-500">Select a saved address or enter a new one below</p>
                <div className="space-y-3">
                  {addresses.map((a) => (
                    <button
                      type="button"
                      key={a._id}
                      onClick={() => chooseAddress(a)}
                      className={`flex w-full items-start gap-3 rounded-xl border-2 p-4 text-start transition ${selected === a._id ? "border-green-600 bg-green-50" : "border-gray-100 hover:border-green-200"}`}
                    >
                      <span className={`flex size-9 shrink-0 items-center justify-center rounded-lg ${selected === a._id ? "bg-green-600 text-white" : "bg-gray-100 text-gray-500"}`}>
                        <FaLocationDot />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block font-semibold text-gray-900">{a.name}</span>
                        <span className="block text-sm text-gray-500">{a.details}</span>
                        <span className="mt-1 flex flex-wrap gap-4 text-xs text-gray-500">
                          <span className="flex items-center gap-1"><FaPhone /> {a.phone}</span>
                          <span className="flex items-center gap-1"><FaBuilding /> {a.city}</span>
                        </span>
                      </span>
                      {selected === a._id && (
                        <span className="flex size-6 items-center justify-center rounded-full bg-green-600 text-xs text-white"><FaCheck /></span>
                      )}
                    </button>
                  ))}
                  <button
                    type="button"
                    onClick={() => chooseAddress(null)}
                    className={`flex w-full items-center gap-3 rounded-xl border-2 border-dashed p-4 text-start transition ${selected === null ? "border-green-500 bg-green-50" : "border-gray-200 hover:border-green-300"}`}
                  >
                    <span className="flex size-9 items-center justify-center rounded-lg bg-green-600 text-white"><FaPlus /></span>
                    <span>
                      <span className="block font-semibold text-green-700">Use a different address</span>
                      <span className="block text-xs text-gray-500">Enter a new shipping address manually</span>
                    </span>
                  </button>
                </div>
              </div>
            )}

            <div className="mb-5 flex items-start gap-3 rounded-xl border border-blue-100 bg-blue-50 p-4">
              <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-600"><FaCircleInfo /></span>
              <div>
                <p className="text-sm font-medium text-blue-900">Delivery Information</p>
                <p className="text-xs text-blue-700">Please ensure your address is accurate for smooth delivery</p>
              </div>
            </div>

            <div className="space-y-5">
              <Controller
                name="city"
                control={control}
                render={({ field, fieldState }) => (
                  <div>
                    <label htmlFor="city" className="mb-1.5 block text-sm font-medium text-gray-700">City <span className="text-red-500">*</span></label>
                    <div className="relative flex items-center">
                      <span className={fieldIcon}><FaBuilding /></span>
                      <input {...field} id="city" aria-invalid={fieldState.invalid} placeholder="e.g. Cairo, Alexandria, Giza" className="input-fc ps-12" />
                    </div>
                    {fieldState.error && <p className="mt-1.5 text-xs text-red-500">* {fieldState.error.message}</p>}
                  </div>
                )}
              />
              <Controller
                name="details"
                control={control}
                render={({ field, fieldState }) => (
                  <div>
                    <label htmlFor="details" className="mb-1.5 block text-sm font-medium text-gray-700">Street Address <span className="text-red-500">*</span></label>
                    <div className="relative flex">
                      <span className={`${fieldIcon} top-3`}><FaLocationDot /></span>
                      <textarea {...field} id="details" rows={3} aria-invalid={fieldState.invalid} placeholder="Street name, building number, floor, apartment..." className="input-fc resize-none ps-12" />
                    </div>
                    {fieldState.error && <p className="mt-1.5 text-xs text-red-500">* {fieldState.error.message}</p>}
                  </div>
                )}
              />
              <Controller
                name="phone"
                control={control}
                render={({ field, fieldState }) => (
                  <div>
                    <label htmlFor="phone" className="mb-1.5 block text-sm font-medium text-gray-700">Phone Number <span className="text-red-500">*</span></label>
                    <div className="relative flex items-center">
                      <span className={fieldIcon}><FaPhone /></span>
                      <input {...field} id="phone" type="tel" inputMode="numeric" aria-invalid={fieldState.invalid} placeholder="01xxxxxxxxx" className="input-fc pe-36 ps-12" />
                      <span className="pointer-events-none absolute inset-e-4 hidden text-xs text-gray-400 sm:block">Egyptian numbers only</span>
                    </div>
                    {fieldState.error && <p className="mt-1.5 text-xs text-red-500">* {fieldState.error.message}</p>}
                  </div>
                )}
              />
            </div>
          </SectionCard>

          <SectionCard icon={<FaWallet />} title="Payment Method" subtitle="Choose how you'd like to pay">
            <div className="space-y-3" role="radiogroup" aria-label="Payment method">
              {([
                { id: "cash", title: "Cash on Delivery", text: "Pay when your order arrives at your doorstep", icon: <FaMoneyBill1 /> },
                { id: "card", title: "Pay Online", text: "Secure payment with Credit/Debit Card via Stripe", icon: <FaCreditCard /> },
              ] as const).map((m) => {
                const active = method === m.id;
                return (
                  <button
                    type="button"
                    role="radio"
                    aria-checked={active}
                    key={m.id}
                    onClick={() => setMethod(m.id)}
                    className={`flex w-full items-center gap-4 rounded-xl border-2 p-4 text-start transition ${active ? "border-green-500 bg-linear-to-r from-green-50 to-emerald-50" : "border-gray-100 hover:border-green-200"}`}
                  >
                    <span className={`flex size-12 shrink-0 items-center justify-center rounded-xl text-lg ${active ? "bg-linear-to-br from-green-500 to-green-700 text-white" : "bg-gray-100 text-gray-500"}`}>
                      {m.icon}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className={`block font-semibold ${active ? "text-green-700" : "text-gray-900"}`}>{m.title}</span>
                      <span className="block text-sm text-gray-500">{m.text}</span>
                      {m.id === "card" && (
                        <span className="mt-1.5 flex gap-1.5 text-xl">
                          <FaCcVisa className="text-blue-700" />
                          <FaCcMastercard className="text-orange-500" />
                          <FaCcAmex className="text-sky-500" />
                        </span>
                      )}
                    </span>
                    <span className={`flex size-6 shrink-0 items-center justify-center rounded-full border-2 text-xs ${active ? "border-green-600 bg-green-600 text-white" : "border-gray-300"}`}>
                      {active && <FaCheck />}
                    </span>
                  </button>
                );
              })}
            </div>
            <div className="mt-4 flex items-center gap-3 rounded-xl bg-green-50 p-4">
              <span className="flex size-9 items-center justify-center rounded-full bg-green-100 text-green-600"><FaShieldHalved /></span>
              <div>
                <p className="text-sm font-medium text-green-800">Secure &amp; Encrypted</p>
                <p className="text-xs text-green-700">Your payment info is protected with 256-bit SSL encryption</p>
              </div>
            </div>
          </SectionCard>
        </div>

        <aside className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm lg:sticky lg:top-24">
          <div className="bg-linear-to-r from-green-600 to-green-700 px-6 py-4 text-white">
            <h2 className="flex items-center gap-2 text-lg font-bold"><FaBagShopping /> Order Summary</h2>
            <p className="text-sm text-white/80">{itemsCount} items</p>
          </div>
          <div className="p-5">
            <ul className="scroll-thin max-h-64 space-y-3 overflow-y-auto pe-1">
              {loading
                ? [1, 2, 3].map((i) => <li key={i} className="h-16 animate-pulse rounded-xl bg-gray-100" />)
                : items.map((item) => (
                    <li key={item.product._id} className="flex items-center gap-3 rounded-xl bg-gray-50 p-3">
                      <span className="relative size-12 shrink-0 overflow-hidden rounded-lg bg-white">
                        <Image src={item.product.imageCover} alt={item.product.title} fill sizes="48px" className="object-contain p-1" />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="line-clamp-1 text-sm font-medium text-gray-900">{item.product.title}</span>
                        <span className="text-xs text-gray-500">{item.count} × {formatPrice(item.price)} EGP</span>
                      </span>
                      <span className="text-sm font-bold text-gray-900">{formatPrice(item.price * item.count)}</span>
                    </li>
                  ))}
            </ul>
            <div className="mt-4 space-y-3 border-t border-gray-100 pt-4 text-sm">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span className="text-gray-900">{formatPrice(totalPrice)} EGP</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span className="flex items-center gap-2"><FaTruck className="text-gray-400" /> Shipping</span>
                <span className="font-semibold text-green-600">FREE</span>
              </div>
              <div className="flex items-baseline justify-between border-t border-gray-100 pt-3">
                <span className="text-base font-bold text-gray-900">Total</span>
                <span className="text-2xl font-bold text-green-600">
                  {formatPrice(totalPrice)} <span className="text-sm font-normal text-gray-500">EGP</span>
                </span>
              </div>
            </div>
            <button
              type="submit"
              disabled={submitting || loading}
              className="mt-5 flex h-13 w-full items-center justify-center gap-2 rounded-xl bg-linear-to-r from-green-600 to-green-700 font-semibold text-white shadow-lg shadow-green-600/25 transition hover:-translate-y-0.5 hover:from-green-700 hover:to-green-800 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {submitting ? (
                <><ImSpinner2 className="animate-spin" /> Processing...</>
              ) : method === "cash" ? (
                <><FaBagShopping /> Place Order</>
              ) : (
                <><FaShieldHalved /> Proceed to Payment</>
              )}
            </button>
            <div className="mt-4 flex items-center justify-center gap-3 text-xs text-gray-500">
              <span className="flex items-center gap-1"><FaShieldHalved className="text-green-600" /> Secure</span>
              <span className="h-3 w-px bg-gray-200" />
              <span className="flex items-center gap-1"><FaTruckFast className="text-blue-500" /> Fast Delivery</span>
              <span className="h-3 w-px bg-gray-200" />
              <span className="flex items-center gap-1"><FaRotateLeft className="text-orange-500" /> Easy Returns</span>
            </div>
          </div>
        </aside>
      </form>
    </div>
  );
}
