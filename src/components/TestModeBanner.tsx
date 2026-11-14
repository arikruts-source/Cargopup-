import Link from "next/link";
import { paypalMode } from "@/lib/paypal";

export function TestModeBanner() {
  const mode = paypalMode();
  if (mode === "live") return null;

  const message =
    mode === "sandbox"
      ? "Checkout is in PayPal sandbox mode. A test payment does not create a real order."
      : "Checkout is not open yet.";

  return (
    <p className="bg-[var(--ink)] px-4 py-2 text-center text-sm text-[var(--paper)]">
      {message}{" "}
      <Link href="/owner" className="underline">
        Why
      </Link>
    </p>
  );
}
