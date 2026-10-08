"use client";
import EmptyState from "@/app/_sharedComponents/EmptyState/EmptyState";
import { Breadcrumb } from "@/app/_sharedComponents/PageHero/PageHero";
import { useWishlist } from "@/context/wishlistContext";
import Link from "next/link";
import { FaArrowLeft, FaHeart, FaRegHeart } from "react-icons/fa6";
import WishlistRow from "./WishlistRow";

export default function Wishlist() {
  const { products, loading } = useWishlist();

  return (
    <>
      <section className="border-b border-gray-100 bg-white">
        <div className="container-fc py-6">
          <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Wishlist" }]} />
          <div className="flex items-center gap-3">
            <span className="flex size-12 items-center justify-center rounded-xl bg-red-50 text-xl text-red-500">
              <FaHeart />
            </span>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">My Wishlist</h1>
              <p className="text-sm text-gray-500">
                {products.length} item{products.length === 1 ? "" : "s"} saved
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="container-fc py-8">
        {loading ? (
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-24 animate-pulse rounded-2xl bg-white ring-1 ring-gray-100" />
            ))}
          </div>
        ) : products.length === 0 ? (
          <EmptyState
            className="rounded-2xl border border-gray-100 bg-white"
            icon={<FaRegHeart />}
            title="Your wishlist is empty"
            text="Save the products you love by tapping the heart icon, and they'll show up here."
            action={{ href: "/products", label: "Browse Products" }}
          />
        ) : (
          <>
            <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
              <div className="hidden grid-cols-[minmax(0,1fr)_140px_140px_200px] gap-4 border-b border-gray-100 bg-gray-50/60 px-5 py-3.5 text-sm font-medium text-gray-500 md:grid">
                <span>Product</span>
                <span className="text-center">Price</span>
                <span className="text-center">Status</span>
                <span className="text-center">Actions</span>
              </div>
              {products.map((product) => (
                <WishlistRow key={product._id} product={product} />
              ))}
            </div>
            <Link href="/products" className="group mt-6 inline-flex items-center gap-2 text-sm text-gray-600 transition hover:text-green-600">
              <FaArrowLeft className="transition-transform group-hover:-translate-x-1" /> Continue Shopping
            </Link>
          </>
        )}
      </section>
    </>
  );
}
