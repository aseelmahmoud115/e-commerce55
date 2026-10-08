import Stars from "@/app/_sharedComponents/Stars/Stars";
import { discountPercent, formatPrice } from "@/lib/utils";
import { getProducts } from "@/services/product.service";
import { getProductDetails } from "@/services/productDetails.service";
import { getProductReviews } from "@/services/review.service";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FaChevronRight, FaHouse, FaRotateLeft, FaShieldHalved, FaTruck } from "react-icons/fa6";
import ProductActions from "./_components/ProductActions";
import ProductGallery from "./_components/ProductGallery";
import ProductTabs from "./_components/ProductTabs";
import RelatedProducts from "./_components/RelatedProducts";

type Props = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const product = await getProductDetails(id);
  return { title: product?.data.title ?? "Product" };
}

export default async function ProductDetails({ params }: Props) {
  const { id } = await params;
  const response = await getProductDetails(id);
  if (!response?.data) notFound();
  const data = response.data;

  const [related, reviews] = await Promise.all([
    getProducts({ category: data.category._id, limit: 12 }),
    getProductReviews(id),
  ]);
  const relatedProducts = (related?.data ?? []).filter((p) => p._id !== data._id);

  const off = discountPercent(data.price, data.priceAfterDiscount);
  const sub = data.subcategory?.[0];

  return (
    <div className="container-fc py-6 sm:py-8">
      {/* breadcrumb */}
      <nav aria-label="Breadcrumb" className="mb-6 text-sm">
        <ol className="flex flex-wrap items-center gap-2 text-gray-500">
          <li>
            <Link href="/" className="flex items-center gap-1.5 transition hover:text-green-600">
              <FaHouse className="text-xs" /> Home
            </Link>
          </li>
          <FaChevronRight className="text-[10px] text-gray-300" />
          <li>
            <Link href={`/products?category=${data.category._id}`} className="transition hover:text-green-600">
              {data.category.name}
            </Link>
          </li>
          {sub && (
            <>
              <FaChevronRight className="text-[10px] text-gray-300" />
              <li>
                <Link href={`/products?subcategory=${sub._id}`} className="transition hover:text-green-600">
                  {sub.name}
                </Link>
              </li>
            </>
          )}
          <FaChevronRight className="text-[10px] text-gray-300" />
          <li className="line-clamp-1 font-medium text-gray-900" aria-current="page">
            {data.title}
          </li>
        </ol>
      </nav>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-8">
        <div className="min-w-0 lg:sticky lg:top-24 lg:self-start">
          <ProductGallery images={data.images?.length ? data.images : [data.imageCover]} title={data.title} />
        </div>

        <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:p-7">
          <div className="flex flex-wrap gap-2">
            <Link href={`/products?category=${data.category._id}`} className="rounded-full bg-green-50 px-3 py-1 text-xs font-medium text-green-700 transition hover:bg-green-100">
              {data.category.name}
            </Link>
            {data.brand && (
              <Link href={`/products?brand=${data.brand._id}`} className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700 transition hover:bg-gray-200">
                {data.brand.name}
              </Link>
            )}
          </div>

          <h1 className="mt-4 text-2xl font-bold text-gray-900 sm:text-3xl">{data.title}</h1>

          <div className="mt-3 flex items-center gap-2 text-sm text-gray-500">
            <Stars rating={data.ratingsAverage} />
            <span>
              {data.ratingsAverage} ({data.ratingsQuantity} reviews)
            </span>
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-3">
            {off > 0 ? (
              <>
                <span className="text-3xl font-bold text-green-600">{formatPrice(data.priceAfterDiscount)} EGP</span>
                <span className="text-lg text-gray-400 line-through">{formatPrice(data.price)} EGP</span>
                <span className="rounded-full bg-red-500 px-2.5 py-1 text-xs font-bold text-white">Save {off}%</span>
              </>
            ) : (
              <span className="text-3xl font-bold text-gray-900">{formatPrice(data.price)} EGP</span>
            )}
          </div>

          <div className="mt-4">
            {data.quantity > 0 ? (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-green-50 px-3 py-1 text-xs font-medium text-green-700">
                <span className="size-1.5 rounded-full bg-green-600" /> In Stock
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-red-50 px-3 py-1 text-xs font-medium text-red-600">
                <span className="size-1.5 rounded-full bg-red-500" /> Out of Stock
              </span>
            )}
          </div>

          <p className="mt-5 border-t border-gray-100 pt-5 leading-relaxed text-gray-600">{data.description}</p>

          <div className="mt-6">
            <ProductActions product={data} />
          </div>

          <div className="mt-6 grid gap-4 border-t border-gray-100 pt-6 sm:grid-cols-3">
            {[
              { icon: FaTruck, title: "Free Delivery", text: "Orders over 500 EGP" },
              { icon: FaRotateLeft, title: "30 Days Return", text: "Money back" },
              { icon: FaShieldHalved, title: "Secure Payment", text: "100% Protected" },
            ].map(({ icon: Icon, title, text }) => (
              <div key={title} className="flex items-center gap-3">
                <span className="flex size-10 items-center justify-center rounded-full bg-green-50 text-green-600"><Icon /></span>
                <div>
                  <p className="text-sm font-semibold text-gray-900">{title}</p>
                  <p className="text-xs text-gray-500">{text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-10">
        <ProductTabs product={data} initialReviews={reviews} />
      </div>

      <RelatedProducts products={relatedProducts} />
    </div>
  );
}
