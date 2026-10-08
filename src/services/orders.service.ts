"use server";
import { IOrder } from "@/interface/order.interface";
import { getMyUserId } from "@/Utilites/getMyToken.utilites";

export async function getUserOrders(): Promise<IOrder[] | null> {
  const userId = await getMyUserId();
  if (!userId) return null;
  try {
    const response = await fetch(
      `${process.env.BASE_URL}/orders/user/${userId}`,
      { signal: AbortSignal.timeout(10000),
      cache: "no-store" },
    );
    if (!response.ok) throw new Error("Error Occured!");
    const payload = await response.json();
    return Array.isArray(payload) ? payload : (payload.data ?? []);
  } catch {
    return null;
  }
}
