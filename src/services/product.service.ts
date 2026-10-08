import { ProductResponse } from "@/interface/response.type";

export interface ProductQuery {
  page?: number | string;
  limit?: number | string;
  sort?: string;
  keyword?: string;
  category?: string | string[];
  subcategory?: string;
  brand?: string | string[];
  priceGte?: number | string;
  priceLte?: number | string;
}

function buildQuery(q: ProductQuery) {
  const params = new URLSearchParams();
  if (q.page) params.set("page", String(q.page));
  if (q.limit) params.set("limit", String(q.limit));
  if (q.sort) params.set("sort", q.sort);
  if (q.keyword) params.set("keyword", q.keyword);
  const cats = ([] as string[]).concat(q.category ?? []).filter(Boolean);
  cats.forEach((c) => params.append("category[in]", c));
  if (q.subcategory) params.set("subcategory", q.subcategory);
  const brands = ([] as string[]).concat(q.brand ?? []).filter(Boolean);
  if (brands.length === 1) params.set("brand", brands[0]);
  else brands.forEach((b) => params.append("brand[in]", b));
  if (q.priceGte !== undefined && q.priceGte !== "") params.set("price[gte]", String(q.priceGte));
  if (q.priceLte !== undefined && q.priceLte !== "") params.set("price[lte]", String(q.priceLte));
  const s = params.toString();
  return s ? `?${s}` : "";
}

export async function getProducts(query: ProductQuery = {}): Promise<ProductResponse | null> {
  try {
    const response = await fetch(
      `${process.env.BASE_URL}/products${buildQuery(query)}`,
      { signal: AbortSignal.timeout(10000),
      next: { revalidate: 300 } },
    );
    if (!response.ok) {
      throw new Error(`Error Occured!`);
    }
    return await response.json();
  } catch {
    return null;
  }
}
