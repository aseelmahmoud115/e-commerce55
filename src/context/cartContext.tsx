"use client";
import { toast } from "@/components/ui/toast";
import { CartItem, CartResponse } from "@/interface/cart.interface";
import { IProducts } from "@/interface/product.interface";
import {
  clearGuest,
  GUEST_CART_KEY,
  readGuest,
  writeGuest,
} from "@/lib/guestStorage";
import { AddProductToCart } from "@/services/cartAction/addCart";
import { getCart } from "@/services/cartAction/getLogedCart";
import { ClearProducts } from "@/services/cartAction/RemoveCart";
import { DeleteCartItem } from "@/services/cartAction/removeCartItem";
import { UpdateProductCart } from "@/services/cartAction/updateCart";
import { useSession } from "next-auth/react";
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

export type CartableProduct = Pick<
  IProducts,
  "_id" | "title" | "imageCover" | "price" | "quantity" | "category"
> &
  Partial<Pick<IProducts, "priceAfterDiscount" | "brand" | "id">>;

type contextType = {
  cartNumber: number;
  setCartNumber: React.Dispatch<React.SetStateAction<number>>;
  items: CartItem[];
  totalPrice: number;
  cartId: string | null;
  loading: boolean;
  isGuest: boolean;
  isInCart: (productId: string) => boolean;
  addToCart: (product: CartableProduct, count?: number) => Promise<boolean>;
  updateCount: (productId: string, count: number) => Promise<boolean>;
  removeItem: (productId: string) => Promise<boolean>;
  clearCart: () => Promise<boolean>;
  refreshCart: () => Promise<void>;
};

export const cartContext = createContext<contextType>({} as contextType);
export const useCart = () => useContext(cartContext);

function toGuestItem(product: CartableProduct, count: number): CartItem {
  return {
    count,
    price: product.priceAfterDiscount ?? product.price,
    product: {
      _id: product._id,
      id: product._id,
      title: product.title,
      imageCover: product.imageCover,
      quantity: product.quantity,
      category: product.category,
      brand: product.brand,
    },
  };
}

export function CartContextProvider({ children }: { children: ReactNode }) {
  const { status } = useSession();
  const isGuest = status === "unauthenticated";

  const [items, setItems] = useState<CartItem[]>([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [cartNumber, setCartNumber] = useState(0);
  const [cartId, setCartId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const syncing = useRef(false);

  const applyCart = useCallback((cart: CartResponse | null) => {
    const products = cart?.data?.products ?? [];
    const populated = products.filter((p) => typeof p.product === "object");
    setItems(populated);
    setTotalPrice(cart?.data?.totalCartPrice ?? 0);
    setCartNumber(cart?.numOfCartItems ?? products.length);
    setCartId(cart?.cartId ?? cart?.data?._id ?? null);
  }, []);

  const applyGuest = useCallback((list: CartItem[]) => {
    writeGuest(GUEST_CART_KEY, list);
    setItems(list);
    setTotalPrice(list.reduce((sum, i) => sum + i.price * i.count, 0));
    setCartNumber(list.length);
    setCartId(null);
  }, []);

  const refreshCart = useCallback(async () => {
    if (status === "unauthenticated") {
      applyGuest(readGuest<CartItem[]>(GUEST_CART_KEY, []));
      setLoading(false);
      return;
    }
    if (status !== "authenticated") return;
    const response = await getCart();
    applyCart(response.ok ? response.data : null);
    setLoading(false);
  }, [status, applyCart, applyGuest]);

  const syncGuestCart = useCallback(async () => {
    const guestItems = readGuest<CartItem[]>(GUEST_CART_KEY, []);
    if (!guestItems.length || syncing.current) return;
    syncing.current = true;
    for (const item of guestItems) {
      const added = await AddProductToCart(item.product._id);
      if (added.ok && item.count > 1) {
        const current = added.data?.data.products.find((p) =>
          typeof p.product === "string"
            ? p.product === item.product._id
            : p.product._id === item.product._id,
        );
        const newCount = Math.max(current?.count ?? 1, item.count);
        if (newCount > 1) await UpdateProductCart(newCount, item.product._id);
      }
    }
    clearGuest(GUEST_CART_KEY);
    syncing.current = false;
  }, []);

  useEffect(() => {
    (async () => {
      if (status === "authenticated") await syncGuestCart();
      await refreshCart();
    })();
  }, [status, refreshCart, syncGuestCart]);

  const isInCart = useCallback(
    (productId: string) => items.some((i) => i.product._id === productId),
    [items],
  );

  const addToCart = useCallback(
    async (product: CartableProduct, count = 1) => {
      if (status === "loading") return false;

      if (isGuest) {
        const list = [...readGuest<CartItem[]>(GUEST_CART_KEY, [])];
        const existing = list.find((i) => i.product._id === product._id);
        if (existing) existing.count += count;
        else list.push(toGuestItem(product, count));
        applyGuest(list);
        return true;
      }

      const response = await AddProductToCart(product._id);
      if (!response.ok) {
        return false;
      }
      if (count > 1) {
        const line = response.data?.data.products.find((p) =>
          typeof p.product === "string"
            ? p.product === product._id
            : p.product._id === product._id,
        );
        const target = (line?.count ?? 1) - 1 + count;
        const updated = await UpdateProductCart(target, product._id);
        if (updated.ok) applyCart(updated.data);
      }
      setCartNumber(response.data?.numOfCartItems ?? cartNumber);
      await refreshCart();
      return true;
    },
    [status, isGuest, applyGuest, applyCart, refreshCart, cartNumber],
  );

  const removeItem = useCallback(
    async (productId: string) => {
      if (isGuest) {
        applyGuest(
          readGuest<CartItem[]>(GUEST_CART_KEY, []).filter(
            (i) => i.product._id !== productId,
          ),
        );
        return true;
      }
      const response = await DeleteCartItem(productId);
      if (!response.ok) {
        return false;
      }
      applyCart(response.data);
      return true;
    },
    [isGuest, applyGuest, applyCart],
  );

  const updateCount = useCallback(
    async (productId: string, count: number) => {
      if (count < 1) return removeItem(productId);
      if (isGuest) {
        applyGuest(
          readGuest<CartItem[]>(GUEST_CART_KEY, []).map((i) =>
            i.product._id === productId ? { ...i, count } : i,
          ),
        );
        return true;
      }
      const response = await UpdateProductCart(count, productId);
      if (!response.ok) {
        toast.add({ title: "Error", description: response.message, type: "error" });
        return false;
      }
      applyCart(response.data);
      return true;
    },
    [isGuest, applyGuest, applyCart, removeItem],
  );

  const clearCart = useCallback(async () => {
    if (isGuest) {
      applyGuest([]);
      return true;
    }
    const response = await ClearProducts();
    if (!response.ok) {
      return false;
    }
    applyCart(null);
    return true;
  }, [isGuest, applyGuest, applyCart]);

  const value = useMemo(
    () => ({
      cartNumber,
      setCartNumber,
      items,
      totalPrice,
      cartId,
      loading,
      isGuest,
      isInCart,
      addToCart,
      updateCount,
      removeItem,
      clearCart,
      refreshCart,
    }),
    [cartNumber, items, totalPrice, cartId, loading, isGuest, isInCart, addToCart, updateCount, removeItem, clearCart, refreshCart],
  );

  return <cartContext.Provider value={value}>{children}</cartContext.Provider>;
}
