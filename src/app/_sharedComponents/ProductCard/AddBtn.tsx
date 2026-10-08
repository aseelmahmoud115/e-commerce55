"use client";
import { CartableProduct, useCart } from "@/context/cartContext";
import { useEffect, useState } from "react";
import { FaCheck, FaPlus } from "react-icons/fa6";
import { ImSpinner2 } from "react-icons/im";

export default function AddBtn({ product }: { product: CartableProduct }) {
  const { addToCart } = useCart();
  const [pending, setPending] = useState(false);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    if (!added) return;
    const t = setTimeout(() => setAdded(false), 1500);
    return () => clearTimeout(t);
  }, [added]);

  async function AddToCart() {
    if (pending) return;
    setPending(true);
    const ok = await addToCart(product);
    setPending(false);
    if (ok) setAdded(true);
  }

  return (
    <button
      onClick={AddToCart}
      disabled={pending}
      aria-label="Add to cart"
      className="flex size-10 shrink-0 items-center justify-center rounded-full bg-green-600 text-white shadow-md shadow-green-600/25 transition hover:scale-105 hover:bg-green-700 disabled:opacity-70"
    >
      {pending ? <ImSpinner2 className="animate-spin" /> : added ? <FaCheck /> : <FaPlus />}
    </button>
  );
}
