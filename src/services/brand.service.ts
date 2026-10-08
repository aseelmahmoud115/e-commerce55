import { IBrand } from "@/interface/brand.interface";
import { BrandResponse } from "@/interface/response.type";

export async function getBrands(): Promise<BrandResponse | null> {
  try {
    const response = await fetch(`${process.env.BASE_URL}/brands?limit=100`, {
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

export async function getSpecificBrand(
  id: string,
): Promise<{ data: IBrand } | null> {
  try {
    const response = await fetch(`${process.env.BASE_URL}/brands/${id}`, {
      signal: AbortSignal.timeout(10000),
      next: { revalidate: 3600 },
    });
    if (!response.ok) throw new Error(`Error Occured!`);
    return await response.json();
  } catch {
    return null;
  }
}
