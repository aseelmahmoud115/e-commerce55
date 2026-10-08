"use server";
import { apiRequest } from "@/Utilites/apiRequest";

type CouponResponse = {
  status: string;
  numOfCartItems: number;
  data: { totalCartPrice: number; totalAfterDiscount?: number };
};

export async function ApplyCoupon(couponName: string) {
  return apiRequest<CouponResponse>("/cart/applyCoupon", {
    method: "PUT",
    body: { couponName },
    version: "v2",
  });
}
