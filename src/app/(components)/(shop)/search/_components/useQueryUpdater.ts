"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useTransition } from "react";

export function useQueryUpdater() {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const update = useCallback(
    (changes: Record<string, string | string[] | null>) => {
      const sp = new URLSearchParams(params.toString());
      Object.entries(changes).forEach(([key, value]) => {
        sp.delete(key);
        if (value === null || value === "") return;
        ([] as string[]).concat(value).forEach((v) => sp.append(key, v));
      });
      sp.delete("page"); 
      const s = sp.toString();
      startTransition(() => router.replace(s ? `${pathname}?${s}` : pathname, { scroll: false }));
    },
    [params, pathname, router],
  );

  return { update, params, isPending };
}
