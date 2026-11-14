"use client";

import Link from "next/link";
import { CheckoutButton } from "@/components/CheckoutButton";
import { useCart } from "@/components/CartProvider";
import { formatPrice, getProduct } from "@/lib/products";
import { seatCoverSource } from "@/lib/sourcing";

export default function CartPage() {
  const { lines, setQuantity, remove } = useCart();
  const detailed = lines.flatMap((line) => {
    const product = getProduct(line.slug);
    return product ? [{ ...line, product }] : [];
  });
  const total = detailed.reduce((sum, line) => sum + line.product.priceCents * line.quantity, 0);

  return (
    <main className="mx-auto w-full max-w-3xl px-4 py-12">
      <h1 className="text-5xl">Cart</h1>
      {detailed.length === 0 ? (
        <p className="mt-6 text-lg text-[var(--muted)]">
          Your cart is empty.{" "}
          <Link href="/products/clean-commute-kit" className="text-[var(--rust)] underline">
            Look at the kit
          </Link>
          .
        </p>
      ) : (
        <div className="mt-8 space-y-6">
          {detailed.map((line) => (
            <div key={line.slug} className="flex flex-wrap items-center justify-between gap-4 border-b border-[var(--line)] pb-4">
              <div>
                <Link href={`/products/${line.slug}`} className="text-2xl hover:text-[var(--rust)]">
                  {line.product.name}
                </Link>
                <p className="text-[var(--muted)]">{formatPrice(line.product.priceCents)}</p>
              </div>
              <div className="flex items-center gap-3">
                <label className="text-sm text-[var(--muted)]" htmlFor={`qty-${line.slug}`}>
                  Qty
                </label>
                <input
                  id={`qty-${line.slug}`}
                  type="number"
                  min={1}
                  max={5}
                  value={line.quantity}
                  onChange={(event) => setQuantity(line.slug, Number(event.target.value))}
                  className="w-16 rounded-lg border border-[var(--line)] bg-white px-2 py-1"
                />
                <button type="button" onClick={() => remove(line.slug)} className="text-sm underline">
                  Remove
                </button>
              </div>
            </div>
          ))}
          <div className="flex items-end justify-between gap-6">
            <p className="max-w-xs text-sm leading-6 text-[var(--muted)]">{seatCoverSource.headline}. Shipping is included.</p>
            <p className="text-3xl">{formatPrice(total)}</p>
          </div>
          <CheckoutButton lines={lines} />
        </div>
      )}
    </main>
  );
}
