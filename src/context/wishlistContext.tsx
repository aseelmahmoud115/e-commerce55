"use client";
import { IProducts } from "@/interface/product.interface";
import {
  clearGuest,
  GUEST_WISHLIST_KEY,
  readGuest,
  writeGuest,
} from "@/lib/guestStorage";
import { AddToWishlist } from "@/services/wishlistAction/addWishlist";
import { getWishlist } from "@/services/wishlistAction/getWishlist";
import { RemoveFromWishlist } from "@/services/wishlistAction/removeWishlist";
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

type contextType = {
  products: IProducts[];
  count: number;
  loading: boolean;
  isInWishlist: (productId: string) => boolean;
  toggleWishlist: (product: IProducts) => Promise<boolean>;
  removeFromWishlist: (productId: string) => Promise<boolean>;
};

export const wishlistContext = createContext<contextType>({} as contextType);
export const useWishlist = () => useContext(wishlistContext);

export function WishlistContextProvider({ children }: { children: ReactNode }) {
  const { status } = useSession();
  const isGuest = status === "unauthenticated";
  const [products, setProducts] = useState<IProducts[]>([]);
  const [loading, setLoading] = useState(true);
  const syncing = useRef(false);

  const load = useCallback(async () => {
    if (status === "unauthenticated") {
      setProducts(readGuest<IProducts[]>(GUEST_WISHLIST_KEY, []));
      setLoading(false);
      return;
    }
    if (status !== "authenticated") return;

    const guest = readGuest<IProducts[]>(GUEST_WISHLIST_KEY, []);
    if (guest.length && !syncing.current) {
      syncing.current = true;
      for (const p of guest) await AddToWishlist(p._id);
      clearGuest(GUEST_WISHLIST_KEY);
      syncing.current = false;
    }
    const response = await getWishlist();
    setProducts(response.ok ? (response.data?.data ?? []) : []);
    setLoading(false);
  }, [status]);

  useEffect(() => {
    (async () => {
      await load();
    })();
  }, [load]);

  const isInWishlist = useCallback(
    (productId: string) => products.some((p) => p._id === productId),
    [products],
  );

  const removeFromWishlist = useCallback(
    async (productId: string) => {
      if (isGuest) {
        const next = products.filter((p) => p._id !== productId);
        writeGuest(GUEST_WISHLIST_KEY, next);
        setProducts(next);
        return true;
      }
      const response = await RemoveFromWishlist(productId);
      if (!response.ok) {
        return false;
      }
      setProducts((prev) => prev.filter((p) => p._id !== productId));
      return true;
    },
    [isGuest, products],
  );

  const toggleWishlist = useCallback(
    async (product: IProducts) => {
      if (status === "loading") return false;
      if (isInWishlist(product._id)) return removeFromWishlist(product._id);

      if (isGuest) {
        const next = [...products, product];
        writeGuest(GUEST_WISHLIST_KEY, next);
        setProducts(next);
        return true;
      }
      const response = await AddToWishlist(product._id);
      if (!response.ok) {
        return false;
      }
      setProducts((prev) => [...prev, product]);
      return true;
    },
    [status, isGuest, products, isInWishlist, removeFromWishlist],
  );

  const value = useMemo(
    () => ({
      products,
      count: products.length,
      loading,
      isInWishlist,
      toggleWishlist,
      removeFromWishlist,
    }),
    [products, loading, isInWishlist, toggleWishlist, removeFromWishlist],
  );

  return <wishlistContext.Provider value={value}>{children}</wishlistContext.Provider>;
}
