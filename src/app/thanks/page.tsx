import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { ClearCart } from "@/components/ClearCart";

export const metadata: Metadata = { title: "Thank you" };

async function ThanksOrder({
  searchParams,
}: {
  searchParams: Promise<{ order?: string }>;
}) {
  const { order } = await searchParams;

  return (
    <>
      <ClearCart />
      <p className="mt-5 max-w-xl text-lg leading-8 text-[var(--muted)]">
        PayPal has this payment. The order id is {order ? order : "missing"}. Ships from the US,
        usually 3–7 business days, to the US address you confirmed in PayPal.
      </p>
    </>
  );
}

export default function ThanksPage({
  searchParams,
}: {
  searchParams: Promise<{ order?: string }>;
}) {
  return (
    <main className="mx-auto w-full max-w-3xl px-4 py-16">
      <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--rust)]">Paid</p>
      <h1 className="mt-3 text-5xl">Thank you</h1>
      <Suspense
        fallback={<p className="mt-5 text-lg text-[var(--muted)]">Confirming the PayPal payment…</p>}
      >
        <ThanksOrder searchParams={searchParams} />
      </Suspense>
      <Link href="/" className="mt-8 inline-flex rounded-full bg-[var(--rust)] px-6 py-3 font-semibold text-white">
        Back to CargoPup
      </Link>
    </main>
  );
}
