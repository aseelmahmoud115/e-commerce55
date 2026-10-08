"use server";
import { CheckOut } from "@/interface/checkout.interface";
import { apiRequest } from "@/Utilites/apiRequest";

export async function CheckOutSession(
  cartId: string,
  formData: CheckOut,
  origin?: string,
) {
  const domain = process.env.DOMAIN || origin || "http://localhost:3000";
  return apiRequest<{ status: string; session: { url: string } }>(
    `/orders/checkout-session/${cartId}?url=${encodeURIComponent(domain)}`,
    { method: "POST", body: { shippingAddress: formData } },
  );
}
