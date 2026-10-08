"use server";
import { IReview } from "@/interface/review.interface";
import { apiRequest } from "@/Utilites/apiRequest";

export async function getProductReviews(productId: string): Promise<IReview[]> {
  try {
    const response = await fetch(
      `${process.env.BASE_URL}/products/${productId}/reviews?limit=50`,
      { signal: AbortSignal.timeout(10000),
      cache: "no-store" },
    );
    if (!response.ok) throw new Error("Error Occured!");
    const payload = await response.json();
    return payload.data ?? [];
  } catch {
    return [];
  }
}

export async function addReview(productId: string, review: string, rating: number) {
  return apiRequest<{ data: IReview }>(`/products/${productId}/reviews`, {
    method: "POST",
    body: { review, rating },
  });
}
