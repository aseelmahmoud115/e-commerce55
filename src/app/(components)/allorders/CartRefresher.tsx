"use client";
import { useCart } from "@/context/cartContext";
import { useEffect } from "react";

export default function CartRefresher() {
  const { refreshCart } = useCart();
  useEffect(() => {
    refreshCart();
  }, [refreshCart]);
  return null;
}
