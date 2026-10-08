import EmptyState from "@/app/_sharedComponents/EmptyState/EmptyState";
import PageHero, { Crumb } from "@/app/_sharedComponents/PageHero/PageHero";
import Pagination from "@/app/_sharedComponents/Pagination/Pagination";
import ProductGrid from "@/app/_sharedComponents/ProductGrid/ProductGrid";
import { getSpecificBrand } from "@/services/brand.service";
import {
  getSpecificCategory,
  getSpecificSubCategory,
} from "@/services/category.service";
import { getProducts } from "@/services/product.service";
import type { Metadata } from "next";
import Image from "next/image";
import { FaBoxOpen, FaLayerGroup, FaTag } from "react-icons/fa6";
import ActiveFilters, { FilterChip } from "../_components/ActiveFilters";

type SearchParams = Promise<{
  category?: string;
  subcategory?: string;
  brand?: string;
  page?: string;
}>;

export const metadata: Metadata = { title: "All Products" };

export default async function Products({ searchParams }: { searchParams: SearchParams }) {
  const params = await searchParams;
  const page = Number(params.page) || 1;

  const [response, category, subcategory, brand] = await Promise.all([
    getProducts({
      page: params.subcategory ? undefined : page,
      limit: params.subcategory ? 200 : undefined,
      category: params.category,
      subcategory: params.subcategory,
      brand: params.brand,
    }),
    params.category ? getSpecificCategory(params.category) : null,
    params.subcategory ? getSpecificSubCategory(params.subcategory) : null,
    params.brand ? getSpecificBrand(params.brand) : null,
  ]);


  const products =
    response && params.subcategory
      ? {
          ...response,
          data: response.data.filter((p) =>
            p.subcategory?.some((s) => s._id === params.subcategory),
          ),
          metadata: { ...response.metadata, numberOfPages: 1 },
        }
      : response;

  const parentCategory =
    subcategory && !category
      ? await getSpecificCategory(subcategory.data.category)
      : category;

  // ----- hero -----
  let title = "All Products";
  let subtitle = "Explore our complete product collection";
  let icon: React.ReactNode = <FaBoxOpen />;
  const crumbs: Crumb[] = [{ label: "Home", href: "/" }];

  if (subcategory) {
    title = subcategory.data.name;
    subtitle = `Browse products in ${subcategory.data.name}`;
    crumbs.push({ label: "Categories", href: "/categories" });
    if (parentCategory) {
      crumbs.push({ label: parentCategory.data.name, href: `/categories/${parentCategory.data._id}` });
      icon = <Image src={parentCategory.data.image} alt="" width={64} height={64} className="size-full object-cover" />;
    }
    crumbs.push({ label: subcategory.data.name });
  } else if (category) {
    title = category.data.name;
    subtitle = `Browse products in ${category.data.name}`;
    icon = <Image src={category.data.image} alt="" width={64} height={64} className="size-full object-cover" />;
    crumbs.push({ label: "Categories", href: "/categories" }, { label: category.data.name });
  } else if (brand) {
    title = brand.data.name;
    subtitle = `Shop ${brand.data.name} products`;
    icon = (
      <span className="flex size-full items-center justify-center bg-white p-1.5">
        <Image src={brand.data.image} alt="" width={64} height={64} className="size-full object-contain" />
      </span>
    );
    crumbs.push({ label: "Brands", href: "/brands" }, { label: brand.data.name });
  } else {
    crumbs.push({ label: "All Products" });
  }

  // ----- active filter chips -----
  const chips: FilterChip[] = [];
  if (category) chips.push({ label: category.data.name, icon: <FaLayerGroup />, removeHref: "/products" });
  if (subcategory) chips.push({ label: subcategory.data.name, icon: <FaLayerGroup />, removeHref: "/products" });
  if (brand) chips.push({ label: brand.data.name, icon: <FaTag />, removeHref: "/products", tone: "purple" });
  const hasFilters = !!(params.category || params.subcategory || params.brand);

  const list = products?.data ?? [];

  return (
    <>
      <PageHero title={title} subtitle={subtitle} icon={icon} crumbs={crumbs} />

      <section className="container-fc py-8 sm:py-10">
        {hasFilters && (
          <div className="mb-4">
            <ActiveFilters chips={chips} />
          </div>
        )}
        <p className="mb-6 text-sm text-gray-500">
          Showing <span className="font-semibold text-gray-900">{list.length}</span> products
          {products && products.metadata?.numberOfPages > 1 && (
            <> (page {page} of {products.metadata.numberOfPages})</>
          )}
        </p>

        {!products ? (
          <EmptyState
            icon={<FaBoxOpen />}
            title="Couldn't load products"
            text="Something went wrong while loading products. Please try again."
            action={{ href: "/products", label: "Try Again" }}
          />
        ) : list.length === 0 ? (
          <EmptyState
            icon={<FaBoxOpen />}
            title="No Products Found"
            text="No products match your current filters."
            action={{ href: "/products", label: "View All Products" }}
          />
        ) : (
          <>
            <ProductGrid products={list} />
            <Pagination
              current={page}
              total={products.metadata?.numberOfPages ?? 1}
              basePath="/products"
              params={params}
            />
          </>
        )}
      </section>
    </>
  );
}
