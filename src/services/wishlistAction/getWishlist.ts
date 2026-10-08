"use server";
import { WishlistResponse } from "@/interface/wishlist.interface";
import { apiRequest } from "@/Utilites/apiRequest";

export async function getWishlist() {
  return apiRequest<WishlistResponse>("/wishlist");
}
