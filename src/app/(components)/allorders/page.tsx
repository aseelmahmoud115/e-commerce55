import EmptyState from "@/app/_sharedComponents/EmptyState/EmptyState";
import { Breadcrumb } from "@/app/_sharedComponents/PageHero/PageHero";
import { getUserOrders } from "@/services/orders.service";
import type { Metadata } from "next";
import Link from "next/link";
import { FaBagShopping, FaBoxOpen } from "react-icons/fa6";
import CartRefresher from "./CartRefresher";
import OrderCard from "./OrderCard";

export const metadata: Metadata = { title: "My Orders" };
export const dynamic = "force-dynamic";

export default async function AllOrders() {
  const orders = await getUserOrders();
  // newest first
  const list = [...(orders ?? [])].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );

  return (
    <div className="container-fc py-8">
      <CartRefresher />
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "My Orders" }]} />
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div className="flex items-center gap-4">
          <span className="flex size-14 items-center justify-center rounded-2xl bg-linear-to-br from-green-500 to-green-700 text-2xl text-white shadow-lg shadow-green-600/25">
            <FaBoxOpen />
          </span>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">My Orders</h1>
            <p className="text-sm text-gray-500">
              Track and manage your {list.length} order{list.length === 1 ? "" : "s"}
            </p>
          </div>
        </div>
        <Link href="/products" className="flex items-center gap-2 text-sm font-medium text-green-600 transition hover:text-green-700">
          <FaBagShopping /> Continue Shopping
        </Link>
      </div>

      {orders === null ? (
        <EmptyState
          className="rounded-2xl border border-gray-100 bg-white"
          icon={<FaBoxOpen />}
          title="Couldn't load your orders"
          text="Something went wrong while loading your orders. Please refresh the page."
          action={{ href: "/allorders", label: "Try Again" }}
        />
      ) : list.length === 0 ? (
        <EmptyState
          className="rounded-2xl border border-gray-100 bg-white"
          icon={<FaBoxOpen />}
          title="No orders yet"
          text="When you place an order it will show up here so you can track it."
          action={{ href: "/products", label: "Start Shopping" }}
        />
      ) : (
        <div className="space-y-4">
          {list.map((order, i) => (
            <OrderCard key={order._id} order={order} defaultOpen={i === 0} />
          ))}
        </div>
      )}
    </div>
  );
}
