import { Suspense } from "react";
import { CartView } from "@/components/CartView";

export default function CartPage() {
  return (
    <Suspense
      fallback={
        <main className="mx-auto w-full max-w-3xl px-4 py-12">
          <h1 className="text-5xl">Cart</h1>
        </main>
      }
    >
      <CartView />
    </Suspense>
  );
}
