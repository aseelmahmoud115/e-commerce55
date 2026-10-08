import EmptyState from "@/app/_sharedComponents/EmptyState/EmptyState";
import PageHero from "@/app/_sharedComponents/PageHero/PageHero";
import { getBrands } from "@/services/brand.service";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { FaArrowRight, FaTags } from "react-icons/fa6";

export const metadata: Metadata = { title: "Top Brands" };

export default async function Brands() {
  const data = await getBrands();
  const brands = data?.data ?? [];

  return (
    <>
      <PageHero
        variant="purple"
        title="Top Brands"
        subtitle="Shop from your favorite brands"
        icon={<FaTags />}
        crumbs={[{ label: "Home", href: "/" }, { label: "Brands" }]}
      />
      <section className="container-fc py-10">
        {brands.length === 0 ? (
          <EmptyState
            icon={<FaTags />}
            title="No brands found"
            text="We couldn't load brands right now. Please try again later."
            action={{ href: "/", label: "Go to Homepage" }}
          />
        ) : (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
            {brands.map((brand) => (
              <Link
                key={brand._id}
                href={`/products?brand=${brand._id}`}
                className="group flex flex-col rounded-2xl border border-gray-100 bg-white p-3 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-violet-200 hover:shadow-xl hover:shadow-violet-900/10 sm:p-4"
              >
                <div className="flex aspect-square items-center justify-center rounded-xl bg-gray-50 p-3">
                  <div className="relative size-full overflow-hidden rounded-lg bg-white">
                    <Image
                      src={brand.image}
                      alt={brand.name}
                      fill
                      sizes="(min-width:1280px) 14vw, (min-width:768px) 22vw, 45vw"
                      className="object-contain p-2 transition duration-500 group-hover:scale-105"
                    />
                  </div>
                </div>
                <div className="flex h-14 flex-col items-center justify-center text-center">
                  <h2 className="text-sm font-semibold text-gray-900 transition group-hover:text-violet-600">{brand.name}</h2>
                  <span className="mt-1 flex max-h-0 items-center gap-1 overflow-hidden text-xs font-medium text-violet-600 opacity-0 transition-all duration-300 group-hover:max-h-6 group-hover:opacity-100">
                    View Products <FaArrowRight className="text-[10px]" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </>
  );
}
