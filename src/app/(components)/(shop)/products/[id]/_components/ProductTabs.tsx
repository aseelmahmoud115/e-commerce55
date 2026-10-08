"use client";
import Stars from "@/app/_sharedComponents/Stars/Stars";
import { toast } from "@/components/ui/toast";
import { IProducts } from "@/interface/product.interface";
import { IReview } from "@/interface/review.interface";
import { formatDate } from "@/lib/utils";
import { addReview } from "@/services/review.service";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { FormEvent, useState } from "react";
import {
  FaBox,
  FaCheck,
  FaRegStar,
  FaRotateLeft,
  FaShieldHalved,
  FaStar,
  FaTruck,
  FaRegCircleUser,
} from "react-icons/fa6";
import { ImSpinner2 } from "react-icons/im";

type Tab = "details" | "reviews" | "shipping";

export default function ProductTabs({
  product,
  initialReviews,
}: {
  product: IProducts;
  initialReviews: IReview[];
}) {
  const [tab, setTab] = useState<Tab>("details");
  const [reviews, setReviews] = useState(initialReviews);
  const reviewCount = Math.max(product.ratingsQuantity, reviews.length);

  const tabs: { id: Tab; label: string; icon: React.ReactNode }[] = [
    { id: "details", label: "Product Details", icon: <FaBox /> },
    { id: "reviews", label: `Reviews (${reviewCount})`, icon: <FaStar /> },
    { id: "shipping", label: "Shipping & Returns", icon: <FaTruck /> },
  ];

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
      <div role="tablist" className="flex overflow-x-auto border-b border-gray-100">
        {tabs.map((t) => (
          <button
            key={t.id}
            role="tab"
            aria-selected={tab === t.id}
            onClick={() => setTab(t.id)}
            className={`flex shrink-0 items-center gap-2 border-b-2 px-5 py-4 text-sm font-medium transition sm:px-7 ${tab === t.id ? "border-green-600 bg-green-50/50 text-green-600" : "border-transparent text-gray-600 hover:text-green-600"}`}
          >
            {t.icon} {t.label}
          </button>
        ))}
      </div>

      <div className="p-5 sm:p-7">
        {tab === "details" && <DetailsTab product={product} />}
        {tab === "reviews" && (
          <ReviewsTab product={product} reviews={reviews} onAdded={(r) => setReviews((prev) => [r, ...prev])} />
        )}
        {tab === "shipping" && <ShippingTab />}
      </div>
    </div>
  );
}

function DetailsTab({ product }: { product: IProducts }) {
  const info = [
    { label: "Category", value: product.category?.name },
    { label: "Subcategory", value: product.subcategory?.map((s) => s.name).join(", ") || "-" },
    { label: "Brand", value: product.brand?.name ?? "-" },
    { label: "Items Sold", value: `${Number(product.sold ?? 0).toLocaleString("en-US", { maximumFractionDigits: 0 })}+ sold` },
  ];
  const features = ["Premium Quality Product", "100% Authentic Guarantee", "Fast & Secure Packaging", "Quality Tested"];

  return (
    <div>
      <h3 className="font-semibold text-gray-900">About this Product</h3>
      <p className="mt-2 leading-relaxed text-gray-600">{product.description}</p>
      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <div className="rounded-xl bg-gray-50 p-5">
          <h4 className="mb-3 font-semibold text-gray-900">Product Information</h4>
          <dl className="space-y-2.5 text-sm">
            {info.map((i) => (
              <div key={i.label} className="flex justify-between gap-4">
                <dt className="text-gray-500">{i.label}</dt>
                <dd className="text-end font-medium text-gray-900">{i.value}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="rounded-xl bg-gray-50 p-5">
          <h4 className="mb-3 font-semibold text-gray-900">Key Features</h4>
          <ul className="space-y-2.5 text-sm text-gray-700">
            {features.map((f) => (
              <li key={f} className="flex items-center gap-2.5">
                <FaCheck className="text-green-600" /> {f}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

function ReviewsTab({
  product,
  reviews,
  onAdded,
}: {
  product: IProducts;
  reviews: IReview[];
  onAdded: (r: IReview) => void;
}) {
  const { status, data: session } = useSession();
  const [showForm, setShowForm] = useState(false);
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [text, setText] = useState("");
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  const total = reviews.length;
  const distribution = [5, 4, 3, 2, 1].map((star) => {
    const n = reviews.filter((r) => Math.round(r.rating) === star).length;
    return { star, percent: total ? Math.round((n / total) * 100) : 0 };
  });
  const average = total
    ? reviews.reduce((s, r) => s + r.rating, 0) / total
    : product.ratingsAverage;

  async function submit(e: FormEvent) {
    e.preventDefault();
    if (!rating) return setError("Please choose a rating");
    if (text.trim().length < 3) return setError("Please write a short review");
    setError("");
    setPending(true);
    const response = await addReview(product._id, text.trim(), rating);
    setPending(false);
    if (!response.ok) {
      toast.add({ title: "Error", description: response.message, type: "error" });
      return;
    }
    onAdded(
      response.data?.data ?? {
        _id: String(Date.now()),
        review: text.trim(),
        rating,
        product: product._id,
        user: { _id: session?.user.id ?? "", name: session?.user.name ?? "You" },
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    );
    toast.add({ title: "Thank you!", description: "Your review was added", type: "success" });
    setText("");
    setRating(0);
    setShowForm(false);
  }

  return (
    <div>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-[220px_1fr]">
        <div className="text-center md:text-start">
          <p className="text-5xl font-bold text-gray-900">{average.toFixed(1)}</p>
          <div className="mt-2 flex justify-center md:justify-start">
            <Stars rating={average} size="text-lg" />
          </div>
          <p className="mt-2 text-sm text-gray-500">
            Based on {Math.max(product.ratingsQuantity, total)} reviews
          </p>
        </div>
        <div className="space-y-2.5">
          {distribution.map((d) => (
            <div key={d.star} className="flex items-center gap-3 text-sm">
              <span className="w-12 text-gray-600">{d.star} star</span>
              <div className="h-2.5 flex-1 overflow-hidden rounded-full bg-gray-100">
                <div className="h-full rounded-full bg-yellow-400 transition-all" style={{ width: `${d.percent}%` }} />
              </div>
              <span className="w-10 text-end text-gray-500">{d.percent}%</span>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8 border-t border-gray-100 pt-6">
        {reviews.length === 0 && !showForm && (
          <div className="py-6 text-center">
            <FaRegStar className="mx-auto text-4xl text-gray-300" />
            <p className="mt-3 text-gray-500">Customer reviews will be displayed here.</p>
          </div>
        )}

        {!showForm && (
          <div className="text-center">
            {status === "authenticated" ? (
              <button onClick={() => setShowForm(true)} className="font-medium text-green-600 transition hover:text-green-700 hover:underline">
                Write a Review
              </button>
            ) : (
              <Link href="/login" className="font-medium text-green-600 transition hover:text-green-700 hover:underline">
                Write a Review
              </Link>
            )}
          </div>
        )}

        {showForm && (
          <form onSubmit={submit} className="mx-auto max-w-xl space-y-4 rounded-xl bg-gray-50 p-5">
            <div>
              <p className="mb-2 text-sm font-medium text-gray-700">Your rating</p>
              <div className="flex gap-1 text-2xl text-yellow-400" onMouseLeave={() => setHover(0)}>
                {[1, 2, 3, 4, 5].map((s) => (
                  <button
                    type="button"
                    key={s}
                    aria-label={`${s} stars`}
                    onMouseEnter={() => setHover(s)}
                    onClick={() => setRating(s)}
                    className="transition hover:scale-110"
                  >
                    {(hover || rating) >= s ? <FaStar /> : <FaRegStar />}
                  </button>
                ))}
              </div>
            </div>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              rows={4}
              placeholder="Share your experience with this product..."
              className="input-fc resize-none"
            />
            {error && <p className="text-sm text-red-500">* {error}</p>}
            <div className="flex gap-3">
              <button type="submit" disabled={pending} className="btn-green">
                {pending && <ImSpinner2 className="animate-spin" />} Submit Review
              </button>
              <button type="button" onClick={() => setShowForm(false)} className="rounded-xl bg-white px-5 py-3 text-sm font-semibold text-gray-700 ring-1 ring-gray-200 transition hover:bg-gray-100">
                Cancel
              </button>
            </div>
          </form>
        )}

        {reviews.length > 0 && (
          <ul className="mt-6 space-y-4">
            {reviews.map((r) => (
              <li key={r._id} className="rounded-xl border border-gray-100 p-4">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <FaRegCircleUser className="text-3xl text-gray-300" />
                    <div>
                      <p className="font-semibold text-gray-900">{r.user?.name ?? "Customer"}</p>
                      <p className="text-xs text-gray-400">{formatDate(r.createdAt)}</p>
                    </div>
                  </div>
                  <Stars rating={r.rating} />
                </div>
                <p className="mt-3 text-sm text-gray-600">{r.review}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

function ShippingTab() {
  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-xl bg-green-50 p-5">
          <h4 className="flex items-center gap-2 font-semibold text-gray-900">
            <span className="flex size-9 items-center justify-center rounded-full bg-green-600 text-sm text-white"><FaTruck /></span>
            Shipping Information
          </h4>
          <ul className="mt-4 space-y-2.5 text-sm text-gray-700">
            {["Free shipping on orders over 500 EGP", "Standard delivery: 3-5 business days", "Express delivery available (1-2 business days)", "Track your order in real-time"].map((t) => (
              <li key={t} className="flex items-center gap-2.5"><FaCheck className="text-green-600" /> {t}</li>
            ))}
          </ul>
        </div>
        <div className="rounded-xl bg-green-50 p-5">
          <h4 className="flex items-center gap-2 font-semibold text-gray-900">
            <span className="flex size-9 items-center justify-center rounded-full bg-green-600 text-sm text-white"><FaRotateLeft /></span>
            Returns & Refunds
          </h4>
          <ul className="mt-4 space-y-2.5 text-sm text-gray-700">
            {["14-day hassle-free returns", "Full refund or exchange available", "Free return shipping on defective items", "Easy online return process"].map((t) => (
              <li key={t} className="flex items-center gap-2.5"><FaCheck className="text-green-600" /> {t}</li>
            ))}
          </ul>
        </div>
      </div>
      <div className="flex items-center gap-4 rounded-xl bg-gray-50 p-5">
        <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-gray-200 text-lg text-gray-600"><FaShieldHalved /></span>
        <div>
          <h4 className="font-semibold text-gray-900">Buyer Protection Guarantee</h4>
          <p className="text-sm text-gray-500">Get a full refund if your order doesn&apos;t arrive or isn&apos;t as described. We ensure your shopping experience is safe and secure.</p>
        </div>
      </div>
    </div>
  );
}
