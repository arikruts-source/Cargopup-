"use client";

import { useState } from "react";
import { isSingleKit, kitPayPalUrl } from "@/lib/kit-paypal";
import type { CartLine } from "./CartProvider";

export function CheckoutButton({ lines }: { lines: CartLine[] }) {
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  function checkout() {
    setError(null);
    if (!isSingleKit(lines)) {
      setError("Only one Clean Commute Kit can be paid right now. The cover and liner need their own PayPal links.");
      return;
    }
    setPending(true);
    window.location.href = kitPayPalUrl;
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
        The price is in US dollars. PayPal can charge your card in your currency. Card numbers stay on PayPal.
      </p>
    </div>
  );
}
