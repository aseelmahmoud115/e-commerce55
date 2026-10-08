"use server";
import { CashOrder } from "@/interface/cashorder.interface";
import { IOrder } from "@/interface/order.interface";
import { apiRequest } from "@/Utilites/apiRequest";

export async function CashOrderSession(cartId: string, formData: CashOrder) {
  return apiRequest<{ status: string; data: IOrder }>(`/orders/${cartId}`, {
    method: "POST",
    body: { shippingAddress: formData },
  });
}
