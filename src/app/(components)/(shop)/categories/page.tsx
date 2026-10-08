import EmptyState from "@/app/_sharedComponents/EmptyState/EmptyState";
import PageHero from "@/app/_sharedComponents/PageHero/PageHero";
import { getCategory } from "@/services/category.service";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { FaArrowRight, FaLayerGroup } from "react-icons/fa6";

export const metadata: Metadata = { title: "All Categories" };

export default async function Categories() {
  const data = await getCategory();
  const categories = data?.data ?? [];

  return (
    <>
      <PageHero
        title="All Categories"
        subtitle="Browse our wide range of product categories"
        icon={<FaLayerGroup />}
        crumbs={[{ label: "Home", href: "/" }, { label: "Categories" }]}
      />
      <section className="container-fc py-10">
        {categories.length === 0 ? (
          <EmptyState
            icon={<FaLayerGroup />}
            title="No categories found"
            text="We couldn't load categories right now. Please try again later."
            action={{ href: "/", label: "Go to Homepage" }}
          />
        ) : (
          <div className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {categories.map((category, i) => (
              <Link
                key={category._id}
                href={`/categories/${category._id}`}
                style={{ animationDelay: `${i * 50}ms` }}
                className="group flex animate-fade-up flex-col rounded-2xl border border-gray-100 bg-white p-3 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-green-200 hover:shadow-xl hover:shadow-green-900/10 sm:p-4"
              >
                <div className="relative aspect-square overflow-hidden rounded-xl bg-gray-50">
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    sizes="(min-width:1280px) 18vw, (min-width:768px) 30vw, 45vw"
                    className="object-cover transition duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="flex h-16 flex-col items-center justify-center text-center">
                  <h2 className="font-bold text-gray-900 transition group-hover:text-green-600">{category.name}</h2>
                  <span className="mt-1 flex max-h-0 items-center gap-1 overflow-hidden text-xs font-medium text-green-600 opacity-0 transition-all duration-300 group-hover:max-h-6 group-hover:opacity-100">
                    View Subcategories <FaArrowRight className="text-[10px]" />
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
