import { IProducts } from "@/interface/product.interface";

export async function getProductDetails(
  ProductId: string,
): Promise<{ data: IProducts } | null> {
  try {
    const response = await fetch(
      `${process.env.BASE_URL}/products/${ProductId}`,
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
