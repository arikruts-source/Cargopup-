import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { ThanksOrder } from "@/components/ThanksOrder";

export const metadata: Metadata = { title: "Thank you" };

export default function ThanksPage() {
  return (
    <main className="mx-auto w-full max-w-3xl px-4 py-16">
      <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--rust)]">Paid</p>
      <h1 className="mt-3 text-5xl">Thank you</h1>
      <Suspense
        fallback={<p className="mt-5 text-lg text-[var(--muted)]">Confirming the PayPal payment…</p>}
      >
        <ThanksOrder />
      </Suspense>
      <Link href="/" className="mt-8 inline-flex rounded-full bg-[var(--rust)] px-6 py-3 font-semibold text-white">
        Back to CargoPup
      </Link>
    </main>
  );
}
