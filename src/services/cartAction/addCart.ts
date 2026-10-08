"use server";
import { CartResponse } from "@/interface/cart.interface";
import { apiRequest } from "@/Utilites/apiRequest";

export async function AddProductToCart(productId: string) {
  return apiRequest<CartResponse>("/cart", {
    method: "POST",
    body: { productId },
  });
}
