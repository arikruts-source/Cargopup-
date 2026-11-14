"use client";

import { kitPayPalUrl } from "@/lib/kit-paypal";
import { formatPrice } from "@/lib/products";
import { seatCoverSource } from "@/lib/sourcing";
import { AddToCart } from "./AddToCart";

export function StickyBuy({ slug, priceCents }: { slug: string; priceCents: number }) {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-[var(--line)] bg-[var(--paper)] px-4 py-3 md:hidden">
      <div className="mx-auto flex max-w-6xl items-center gap-3">
        <div className="min-w-0 flex-1">
          <p className="text-lg font-semibold text-[var(--ink)]">{formatPrice(priceCents)}</p>
          <p className="truncate text-xs text-[var(--muted)]">{seatCoverSource.headline}</p>
        </div>
        {slug === "clean-commute-kit" ? (
          <a
            href={kitPayPalUrl}
            className="shrink-0 rounded-full bg-[var(--rust)] px-5 py-3 text-sm font-semibold text-white"
          >
            Pay with PayPal
          </a>
        ) : (
          <AddToCart
            slug={slug}
            className="shrink-0 rounded-full bg-[var(--rust)] px-5 py-3 text-sm font-semibold text-white"
          />
        )}
      </div>
    </div>
  );
}
