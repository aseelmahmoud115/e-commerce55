import AddBtn from "@/app/_sharedComponents/ProductCard/AddBtn";
import WishlistBtn from "@/app/_sharedComponents/ProductCard/WishlistBtn";
import Stars from "@/app/_sharedComponents/Stars/Stars";
import { IProducts } from "@/interface/product.interface";
import { discountPercent, formatPrice } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

export default function ProductRow({ product }: { product: IProducts }) {
  const off = discountPercent(product.price, product.priceAfterDiscount);
  const href = `/products/${product._id}`;
  return (
    <article className="group flex gap-4 rounded-xl border border-gray-200 bg-white p-4 transition hover:shadow-lg sm:gap-6">
      <Link href={href} className="relative size-28 shrink-0 overflow-hidden rounded-lg bg-gray-50 sm:size-36">
        {off > 0 && (
          <span className="absolute inset-s-1.5 top-1.5 z-10 rounded bg-red-500 px-1.5 py-0.5 text-[10px] font-bold text-white">-{off}%</span>
        )}
        <Image src={product.imageCover} alt={product.title} fill sizes="150px" className="object-contain transition duration-500 group-hover:scale-105" />
      </Link>
      <div className="flex min-w-0 flex-1 flex-col">
        <p className="text-xs text-gray-500">{product.category?.name} · {product.brand?.name}</p>
        <h3 className="mt-1 line-clamp-2 font-medium text-gray-900">
          <Link href={href} className="transition hover:text-green-600">{product.title}</Link>
        </h3>
        <div className="mt-1.5 flex items-center gap-1.5 text-xs text-gray-500">
          <Stars rating={product.ratingsAverage} size="text-xs" />
          {product.ratingsAverage} ({product.ratingsQuantity})
        </div>
        <p className="mt-2 hidden line-clamp-2 text-sm text-gray-500 sm:block">{product.description}</p>
        <div className="mt-auto flex items-end justify-between gap-3 pt-3">
          <div className="flex flex-wrap items-baseline gap-x-2">
            {off > 0 ? (
              <>
                <span className="text-lg font-bold text-green-600">{formatPrice(product.priceAfterDiscount)} EGP</span>
                <span className="text-xs text-gray-400 line-through">{formatPrice(product.price)} EGP</span>
              </>
            ) : (
              <span className="text-lg font-bold text-gray-900">{formatPrice(product.price)} EGP</span>
            )}
          </div>
          <div className="flex items-center gap-2">
            <WishlistBtn product={product} />
            <AddBtn product={product} />
          </div>
        </div>
      </div>
    </article>
  );
}
