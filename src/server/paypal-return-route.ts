// Kept for a Node host. The live PayPal buttons do not return through this route.
import { NextResponse } from "next/server";
import { capturePayPalOrder, readPayPalOrder, shippingCountry } from "@/lib/paypal";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const orderId = url.searchParams.get("token");
  if (!orderId) {
    return NextResponse.redirect(new URL("/cart?notice=payment", url.origin));
  }

  const order = await readPayPalOrder(orderId);
  if (!order?.id) {
    return NextResponse.redirect(new URL("/cart?notice=payment", url.origin));
  }

  if (order.status === "COMPLETED") {
    return NextResponse.redirect(new URL(`/thanks?order=${encodeURIComponent(order.id)}`, url.origin));
  }

  if (shippingCountry(order) !== "US") {
    return NextResponse.redirect(new URL("/cart?notice=us", url.origin));
  }

  const captured = await capturePayPalOrder(order.id);
  if (captured?.status !== "COMPLETED" || !captured.id) {
    return NextResponse.redirect(new URL("/cart?notice=payment", url.origin));
  }

  return NextResponse.redirect(new URL(`/thanks?order=${encodeURIComponent(captured.id)}`, url.origin));
}
