import Link from "next/link";
import { paymentsMode } from "@/lib/stripe";

export function TestModeBanner() {
  const mode = paymentsMode();
  if (mode === "live") return null;

  const message =
    mode === "test"
      ? "Checkout is in test mode. A test card does not create a real order."
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
