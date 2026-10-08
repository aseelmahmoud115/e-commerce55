import Stars from "@/app/_sharedComponents/Stars/Stars";
import { IProducts } from "@/interface/product.interface";
import { discountPercent, formatPrice } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { FaArrowsRotate, FaRegEye } from "react-icons/fa6";
import AddBtn from "./AddBtn";
import WishlistBtn from "./WishlistBtn";

interface ProductCardProps {
  product: IProducts;
  priority?: boolean;
}

export default function ProductCard({ product, priority = false }: ProductCardProps) {
  const off = discountPercent(product.price, product.priceAfterDiscount);
  const href = `/products/${product._id}`;

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-xl border border-gray-200 bg-white transition duration-300 hover:-translate-y-1 hover:border-green-100 hover:shadow-xl hover:shadow-gray-900/8">
      {off > 0 && (
        <span className="absolute inset-s-3 top-3 z-10 rounded-md bg-red-500 px-2 py-0.5 text-xs font-bold text-white">
          -{off}%
        </span>
      )}

      <div className="absolute inset-e-3 top-3 z-10 flex flex-col gap-2">
        <WishlistBtn product={product} />
        <button
          type="button"
          aria-label="Compare"
          title="Compare"
          className="flex size-8 items-center justify-center rounded-full bg-white text-sm text-gray-600 shadow-sm ring-1 ring-gray-100 transition hover:scale-110 hover:text-green-600"
        >
          <FaArrowsRotate />
        </button>
        <Link
          href={href}
          aria-label={`Quick view ${product.title}`}
          className="flex size-8 items-center justify-center rounded-full bg-white text-sm text-gray-600 shadow-sm ring-1 ring-gray-100 transition hover:scale-110 hover:text-green-600"
        >
          <FaRegEye />
        </Link>
      </div>

      <Link href={href} className="block overflow-hidden px-6 pt-6">
        <div className="relative aspect-4/3 sm:aspect-square">
          <Image
            src={product.imageCover}
            alt={product.title}
            fill
            priority={priority}
            sizes="(min-width:1280px) 20vw, (min-width:768px) 30vw, 90vw"
            className="object-contain transition duration-500 group-hover:scale-105"
          />
        </div>
      </Link>

      <div className="flex flex-1 flex-col p-4 pt-3">
        <p className="text-xs text-gray-500">{product.category?.name}</p>
        <h3 className="mt-1 line-clamp-2 min-h-10 text-sm font-medium leading-5 text-gray-800">
          <Link href={href} className="transition hover:text-green-600">
            {product.title}
          </Link>
        </h3>
        <div className="mt-2 flex items-center gap-1.5 text-xs text-gray-500">
          <Stars rating={product.ratingsAverage} size="text-xs" />
          <span>
            {product.ratingsAverage} ({product.ratingsQuantity})
          </span>
        </div>

        <div className="mt-auto flex items-end justify-between gap-2 pt-3">
          <div className="flex flex-wrap items-baseline gap-x-2">
            {off > 0 ? (
              <>
                <span className="text-lg font-bold text-green-600">
                  {formatPrice(product.priceAfterDiscount)} EGP
                </span>
                <span className="text-xs text-gray-400 line-through">
                  {formatPrice(product.price)} EGP
                </span>
              </>
            ) : (
              <span className="text-lg font-bold text-gray-900">
                {formatPrice(product.price)} EGP
              </span>
            )}
          </div>
          <AddBtn product={product} />
        </div>
      </div>
    </article>
  );
}
