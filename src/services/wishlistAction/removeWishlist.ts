"use server";
import { WishlistMutationResponse } from "@/interface/wishlist.interface";
import { apiRequest } from "@/Utilites/apiRequest";

export async function RemoveFromWishlist(productId: string) {
  return apiRequest<WishlistMutationResponse>(`/wishlist/${productId}`, {
    method: "DELETE",
  });
}
