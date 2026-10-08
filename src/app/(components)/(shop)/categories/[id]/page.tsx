import EmptyState from "@/app/_sharedComponents/EmptyState/EmptyState";
import PageHero from "@/app/_sharedComponents/PageHero/PageHero";
import {
  getCategorySubCategories,
  getSpecificCategory,
} from "@/services/category.service";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FaArrowLeft, FaArrowRight, FaFolderOpen } from "react-icons/fa6";

type Props = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const category = await getSpecificCategory(id);
  return { title: category?.data.name ?? "Category" };
}

export default async function CategoryDetails({ params }: Props) {
  const { id } = await params;
  const [category, subs] = await Promise.all([
    getSpecificCategory(id),
    getCategorySubCategories(id),
  ]);
  if (!category?.data) notFound();

  const subcategories = subs?.data ?? [];
  const name = category.data.name;

  return (
    <>
      <PageHero
        title={name}
        subtitle="Choose a subcategory to browse products"
        icon={<Image src={category.data.image} alt="" width={64} height={64} className="size-full object-cover" />}
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Categories", href: "/categories" },
          { label: name },
        ]}
      />

      <section className="container-fc py-8 sm:py-10">
        <Link href="/categories" className="group inline-flex items-center gap-2 text-sm text-gray-600 transition hover:text-green-600">
          <FaArrowLeft className="transition-transform group-hover:-translate-x-1" /> Back to Categories
        </Link>

        <h2 className="mb-5 mt-5 font-bold text-gray-900">
          {subcategories.length} Subcategor{subcategories.length === 1 ? "y" : "ies"} in {name}
        </h2>

        {subcategories.length === 0 ? (
          <EmptyState
            className="rounded-2xl border border-gray-100 bg-white"
            icon={<FaFolderOpen />}
            title="No Subcategories"
            text={`${name} has no subcategories yet. You can still browse all of its products.`}
            action={{ href: `/products?category=${id}`, label: `Browse ${name}` }}
          />
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {subcategories.map((sub, i) => (
              <Link
                key={sub._id}
                href={`/products?subcategory=${sub._id}`}
                style={{ animationDelay: `${i * 60}ms` }}
                className="group flex animate-fade-up flex-col gap-5 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-green-200 hover:shadow-lg hover:shadow-green-900/10"
              >
                <span className="flex size-11 items-center justify-center rounded-xl bg-green-50 text-lg text-green-600 transition group-hover:bg-green-600 group-hover:text-white">
                  <FaFolderOpen />
                </span>
                <div className="flex items-center justify-between gap-2">
                  <h3 className="font-bold text-gray-900 transition group-hover:text-green-600">{sub.name}</h3>
                  <FaArrowRight className="text-sm text-green-600 opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100" />
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </>
  );
}
