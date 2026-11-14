"use client";

import { useState } from "react";
import type { CartLine } from "./CartProvider";

export function CheckoutButton({ lines }: { lines: CartLine[] }) {
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  async function checkout() {
    setPending(true);
    setError(null);
    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items: lines }),
      });
      const data = (await response.json()) as { url?: string; error?: string };
      if (!response.ok || !data.url) {
        setError(data.error ?? "Checkout could not start.");
        setPending(false);
        return;
      }
      window.location.href = data.url;
    } catch {
      setError("Checkout could not start. Check your connection and try again.");
      setPending(false);
    }
  }

  return (
    <div>
      <button
        type="button"
        onClick={checkout}
        disabled={pending || lines.length === 0}
        className="w-full rounded-full bg-[var(--rust)] px-6 py-3 font-semibold text-white disabled:opacity-60"
      >
        {pending ? "Opening Stripe…" : "Checkout"}
      </button>
      {error ? <p className="mt-3 text-sm leading-6 text-[var(--rust)]">{error}</p> : null}
      <p className="mt-3 text-sm leading-6 text-[var(--muted)]">
        Stripe collects your name, email, phone, and US address. Card numbers stay on Stripe.
      </p>
    </div>
  );
}
