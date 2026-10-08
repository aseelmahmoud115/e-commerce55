"use server";
import { apiRequest } from "@/Utilites/apiRequest";

export async function ClearProducts() {
  return apiRequest<{ message: string }>("/cart", { method: "DELETE" });
}
