import { Suspense } from "react";
import HeaderSlider from "./(components)/_HomePages/HeaderSlider/HeaderSlider";
import HomeFeatures from "./(components)/_HomePages/HomeFeatures/HomeFeatures";
import CategorySlider from "./(components)/_HomePages/CategorySlider/CategorySlider";
import PromoBanners from "./(components)/_HomePages/PromoBanners/PromoBanners";
import FeaturedProducts from "./(components)/_HomePages/FeaturedProducts/FeaturedProducts";
import Newsletter from "./(components)/_HomePages/Newsletter/Newsletter";

function CategoriesSkeleton() {
  return (
    <section className="container-fc py-14">
      <div className="mb-8 h-9 w-56 animate-pulse rounded-lg bg-gray-100" />
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
        {Array.from({ length: 6 }, (_, i) => (
          <div key={i} className="flex flex-col items-center gap-3 rounded-xl border border-gray-100 p-5">
            <div className="size-20 animate-pulse rounded-full bg-gray-100" />
            <div className="h-4 w-20 animate-pulse rounded bg-gray-100" />
          </div>
        ))}
      </div>
    </section>
  );
}

function ProductsSkeleton() {
  return (
    <section className="container-fc py-14">
      <div className="mb-8 h-9 w-64 animate-pulse rounded-lg bg-gray-100" />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {Array.from({ length: 10 }, (_, i) => (
          <div key={i} className="rounded-xl border border-gray-100 p-4">
            <div className="aspect-square animate-pulse rounded-lg bg-gray-100" />
            <div className="mt-4 h-3 w-1/3 animate-pulse rounded bg-gray-100" />
            <div className="mt-2 h-4 w-3/4 animate-pulse rounded bg-gray-100" />
            <div className="mt-4 h-6 w-1/2 animate-pulse rounded bg-gray-100" />
          </div>
        ))}
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <div className="bg-white">
      <HeaderSlider />
      <HomeFeatures />
      <Suspense fallback={<CategoriesSkeleton />}>
        <CategorySlider />
      </Suspense>
      <PromoBanners />
      <Suspense fallback={<ProductsSkeleton />}>
        <FeaturedProducts />
      </Suspense>
      <Newsletter />
    </div>
  );
}
