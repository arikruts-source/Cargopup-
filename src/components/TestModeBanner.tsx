import Link from "next/link";

export function TestModeBanner() {
  return (
    <p className="bg-[var(--ink)] px-4 py-2 text-center text-sm text-[var(--paper)]">
      Checkout is in test mode. CargoPup is not taking live payments until a warehouse sample is checked.{" "}
      <Link href="/owner" className="underline">
        Why
      </Link>
    </p>
  );
}
