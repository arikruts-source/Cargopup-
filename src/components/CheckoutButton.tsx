"use client";

import { useState } from "react";
import { paypalUrlForCart } from "@/lib/kit-paypal";
import type { CartLine } from "./CartProvider";

export function CheckoutButton({ lines }: { lines: CartLine[] }) {
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  function checkout() {
    setError(null);
    const url = paypalUrlForCart(lines);
    if (!url) {
      setError("PayPal links are for one item at a time. Remove the extra products or lower the quantity to 1.");
      return;
    }
    setPending(true);
    window.location.href = url;
  }

  return (
    <div>
      <button
        type="button"
        onClick={checkout}
        disabled={pending || lines.length === 0}
        className="w-full rounded-full bg-[var(--rust)] px-6 py-3 font-semibold text-white disabled:opacity-60"
      >
        {pending ? "Opening PayPal…" : "Checkout"}
      </button>
      {error ? <p className="mt-3 text-sm leading-6 text-[var(--rust)]">{error}</p> : null}
      <p className="mt-3 text-sm leading-6 text-[var(--muted)]">
        PayPal asks for the address. The box is shipped there. The price is in US dollars. PayPal
        can charge your card in your currency. Card numbers stay on PayPal.
      </p>
    </div>
  );
}
