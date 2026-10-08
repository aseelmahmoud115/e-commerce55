"use server";
import { CartResponse } from "@/interface/cart.interface";
import { apiRequest } from "@/Utilites/apiRequest";

export async function getCart() {
  return apiRequest<CartResponse>("/cart");
}
