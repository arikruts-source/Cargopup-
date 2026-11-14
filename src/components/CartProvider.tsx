"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { getProduct } from "@/lib/products";

export type CartLine = { slug: string; quantity: number };

type CartContextValue = {
  lines: CartLine[];
  count: number;
  add: (slug: string) => void;
  setQuantity: (slug: string, quantity: number) => void;
  remove: (slug: string) => void;
  clear: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);
const storageKey = "cargopup-cart";

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      if (saved) {
        const parsed = JSON.parse(saved) as CartLine[];
        setLines(
          parsed.filter(
            (line) => getProduct(line.slug) && line.quantity > 0 && line.quantity <= 5,
          ),
        );
      }
    } catch {
      localStorage.removeItem(storageKey);
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (ready) localStorage.setItem(storageKey, JSON.stringify(lines));
  }, [lines, ready]);

  const value = useMemo<CartContextValue>(() => {
    return {
      lines,
      count: lines.reduce((sum, line) => sum + line.quantity, 0),
      add: (slug) => {
        if (!getProduct(slug)) return;
        setLines((current) => {
          const existing = current.find((line) => line.slug === slug);
          if (!existing) return [...current, { slug, quantity: 1 }];
          return current.map((line) =>
            line.slug === slug
              ? { ...line, quantity: Math.min(5, line.quantity + 1) }
              : line,
          );
        });
      },
      setQuantity: (slug, quantity) => {
        setLines((current) =>
          current
            .map((line) =>
              line.slug === slug ? { ...line, quantity: Math.min(5, quantity) } : line,
            )
            .filter((line) => line.quantity > 0),
        );
      },
      remove: (slug) => {
        setLines((current) => current.filter((line) => line.slug !== slug));
      },
      clear: () => setLines([]),
    };
  }, [lines]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const value = useContext(CartContext);
  if (!value) throw new Error("useCart must be used inside CartProvider");
  return value;
}
