"use client";

import Link from "next/link";
import { useCart } from "./CartProvider";

export function Header() {
  const { count } = useCart();

  return (
    <header className="border-b border-[var(--line)]">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4">
        <Link href="/" className="font-serif text-2xl tracking-tight text-[var(--ink)]">
          CargoPup
        </Link>
        <nav className="flex items-center gap-4 text-sm text-[var(--ink)]">
          <Link href="/products/clean-commute-kit" className="hover:text-[var(--rust)]">
            The kit
          </Link>
          <Link href="/shipping" className="hidden hover:text-[var(--rust)] sm:inline">
            Shipping
          </Link>
          <Link href="/cart" className="rounded-full border border-[var(--line)] px-3 py-1.5 hover:border-[var(--ink)]">
            Cart{count > 0 ? ` (${count})` : ""}
          </Link>
        </nav>
      </div>
    </header>
  );
}
