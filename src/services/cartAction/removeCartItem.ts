"use server";
import { CartResponse } from "@/interface/cart.interface";
import { apiRequest } from "@/Utilites/apiRequest";

export async function DeleteCartItem(productId: string) {
  return apiRequest<CartResponse>(`/cart/${productId}`, { method: "DELETE" });
}
