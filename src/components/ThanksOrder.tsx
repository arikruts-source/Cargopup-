"use client";

import { useSearchParams } from "next/navigation";
import { ClearCart } from "@/components/ClearCart";

export function ThanksOrder() {
  const order = useSearchParams().get("order");

  return (
    <>
      <ClearCart />
      <p className="mt-5 max-w-xl text-lg leading-8 text-[var(--muted)]">
        PayPal has this payment. The order id is {order ? order : "missing"}. It ships from the US
        to the address you confirmed in PayPal. US delivery is usually 3–7 business days. Other
        countries take longer.
      </p>
    </>
  );
}
