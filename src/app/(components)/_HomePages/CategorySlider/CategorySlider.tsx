import { getCategory } from "@/services/category.service";
import SectionTitle from "@/app/_sharedComponents/SectionTitle/sectionTitle";
import Image from "next/image";
import Link from "next/link";

export default async function CategorySlider() {
  const data = await getCategory();
  const categories = data?.data ?? [];
  if (!categories.length) return null;

  return (
    <section className="container-fc py-14">
      <SectionTitle
        subTitle="Shop By"
        title="Category"
        link={{ href: "/categories", label: "View All Categories" }}
      />
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
        {categories.map((category) => (
          <Link
            key={category._id}
            href={`/categories/${category._id}`}
            className="group flex flex-col items-center gap-3 rounded-xl border border-gray-100 bg-white p-5 text-center transition duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-gray-900/10"
          >
            <span className="relative size-20 overflow-hidden rounded-full bg-gray-100">
              <Image
                src={category.image}
                alt={category.name}
                fill
                sizes="80px"
                className="object-cover transition duration-500 group-hover:scale-110"
              />
            </span>
            <span className="text-sm font-medium text-gray-700 transition group-hover:text-green-600">
              {category.name}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
