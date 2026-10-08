import EmptyState from "@/app/_sharedComponents/EmptyState/EmptyState";
import { Breadcrumb } from "@/app/_sharedComponents/PageHero/PageHero";
import Pagination from "@/app/_sharedComponents/Pagination/Pagination";
import ProductGrid from "@/app/_sharedComponents/ProductGrid/ProductGrid";
import { getBrands } from "@/services/brand.service";
import { getCategory } from "@/services/category.service";
import { getProducts } from "@/services/product.service";
import type { Metadata } from "next";
import { Suspense } from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";
import ProductRow from "./_components/ProductRow";
import SearchFilters from "./_components/SearchFilters";
import SearchInput from "./_components/SearchInput";
import SearchToolbar from "./_components/SearchToolbar";

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

export const metadata: Metadata = { title: "Search Results" };

const one = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v) ?? "";

export default async function SearchPage({ searchParams }: { searchParams: SearchParams }) {
  const params = await searchParams;
  const q = one(params.q).trim();
  const page = Number(one(params.page)) || 1;

  const [products, categories, brands] = await Promise.all([
    getProducts({
      keyword: q || undefined,
      category: params.category,
      brand: params.brand,
      priceGte: one(params.min),
      priceLte: one(params.max),
      sort: one(params.sort) || undefined,
      page,
    }),
    getCategory(),
    getBrands(),
  ]);

  const list = products?.data ?? [];
  const view = one(params.view) === "list" ? "list" : "grid";

  return (
    <>
      <section className="border-b border-gray-100 bg-white">
        <div className="container-fc py-6">
          <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Search Results" }]} />
          <Suspense>
            <SearchInput />
          </Suspense>
        </div>
      </section>

      <section className="container-fc grid grid-cols-1 gap-6 py-8 lg:grid-cols-[250px_1fr]">
        <aside className="hidden h-fit rounded-2xl border border-gray-100 bg-white p-5 shadow-sm lg:sticky lg:top-24 lg:block">
          <Suspense>
            <SearchFilters categories={categories?.data ?? []} brands={brands?.data ?? []} />
          </Suspense>
        </aside>

        <div className="min-w-0">
          <Suspense>
            <SearchToolbar categories={categories?.data ?? []} brands={brands?.data ?? []} />
          </Suspense>

          <p className="mb-5 text-sm text-gray-500">
            {q ? (
              <>
                Found <b className="text-gray-900">{products?.results ?? list.length}</b> results for{" "}
                <b className="text-gray-900">&quot;{q}&quot;</b>
              </>
            ) : (
              <>
                Showing <b className="text-gray-900">{list.length}</b> of{" "}
                <b className="text-gray-900">{products?.results ?? list.length}</b> products
              </>
            )}
          </p>

          {list.length === 0 ? (
            <EmptyState
              className="rounded-2xl border border-gray-100 bg-white"
              icon={<FaMagnifyingGlass />}
              title="No Products Found"
              text={q ? `We couldn't find anything for "${q}". Try a different keyword or remove some filters.` : "No products match your current filters."}
              action={{ href: "/products", label: "View All Products" }}
            />
          ) : view === "list" ? (
            <div className="space-y-4">
              {list.map((p) => (
                <ProductRow key={p._id} product={p} />
              ))}
            </div>
          ) : (
            <ProductGrid products={list} columns="narrow" />
          )}

          <Pagination
            current={page}
            total={products?.metadata?.numberOfPages ?? 1}
            basePath="/search"
            params={params}
          />
        </div>
      </section>
    </>
  );
}
