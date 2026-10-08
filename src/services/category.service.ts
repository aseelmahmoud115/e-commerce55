import { Category, SubCategory } from "@/interface/category.interface";
import {
  CategoryResponse,
  SubCategoryResponse,
} from "@/interface/response.type";
import { NavCategory } from "@/lib/navLinks";


export async function getCategory(): Promise<CategoryResponse | null> {
  try {
    const response = await fetch(`${process.env.BASE_URL}/categories`, {
      signal: AbortSignal.timeout(10000),
      next: { revalidate: 3600 },
    });
    if (!response.ok) {
      throw new Error(`Error Occured!`);
    }
    return await response.json();
  } catch {
    return null;
  }
}

export async function getSpecificCategory(
  id: string,
): Promise<{ data: Category } | null> {
  try {
    const response = await fetch(`${process.env.BASE_URL}/categories/${id}`, {
      signal: AbortSignal.timeout(10000),
      next: { revalidate: 3600 },
    });
    if (!response.ok) throw new Error(`Error Occured!`);
    return await response.json();
  } catch {
    return null;
  }
}

export async function getCategorySubCategories(
  id: string,
): Promise<SubCategoryResponse | null> {
  try {
    const response = await fetch(
      `${process.env.BASE_URL}/categories/${id}/subcategories`,
      { signal: AbortSignal.timeout(10000),
      next: { revalidate: 3600 } },
    );
    if (!response.ok) throw new Error(`Error Occured!`);
    return await response.json();
  } catch {
    return null;
  }
}

export async function getSpecificSubCategory(
  id: string,
): Promise<{ data: SubCategory } | null> {
  try {
    const response = await fetch(`${process.env.BASE_URL}/subcategories/${id}`, {
      signal: AbortSignal.timeout(10000),
      next: { revalidate: 3600 },
    });
    if (!response.ok) throw new Error(`Error Occured!`);
    return await response.json();
  } catch {
    return null;
  }
}

const featuredNames = ["Electronics", "Women's Fashion", "Men's Fashion", "Beauty & Health"];

export async function getFeaturedCategories(): Promise<NavCategory[]> {
  const response = await getCategory();
  const all = response?.data ?? [];
  return featuredNames
    .map((name) => {
      const found = all.find((c) => c.name.trim().toLowerCase() === name.toLowerCase());
      return found ? { name, id: found._id } : null;
    })
    .filter((c): c is NavCategory => c !== null);
}
