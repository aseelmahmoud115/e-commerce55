"use server";
import { WishlistMutationResponse } from "@/interface/wishlist.interface";
import { apiRequest } from "@/Utilites/apiRequest";

export async function AddToWishlist(productId: string) {
  return apiRequest<WishlistMutationResponse>("/wishlist", {
    method: "POST",
    body: { productId },
  });
}
