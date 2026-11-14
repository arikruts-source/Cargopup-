import { NextResponse } from "next/server";
import { createPayPalOrder, paypalMode } from "@/lib/paypal";
import { getProduct } from "@/lib/products";

type Item = { slug?: string; quantity?: number };

export async function POST(request: Request) {
  if (paypalMode() === "missing") {
    return NextResponse.json(
      { error: "Add PAYPAL_CLIENT_ID and PAYPAL_CLIENT_SECRET in Vercel." },
      { status: 503 },
    );
  }

  let items: Item[] = [];
  try {
    const body = (await request.json()) as { items?: Item[] };
    items = Array.isArray(body.items) ? body.items : [];
  } catch {
    return NextResponse.json({ error: "Send the cart as JSON." }, { status: 400 });
  }

  const paypalItems = [];
  for (const item of items) {
    const product = item.slug ? getProduct(item.slug) : undefined;
    const quantity = Number(item.quantity);
    if (!product || !Number.isInteger(quantity) || quantity < 1 || quantity > 5) {
      return NextResponse.json({ error: "That cart has a product we do not sell." }, { status: 400 });
    }
    paypalItems.push({
      name: product.name,
      quantity,
      unitAmountCents: product.priceCents,
    });
  }

  if (paypalItems.length === 0) {
    return NextResponse.json({ error: "Your cart is empty." }, { status: 400 });
  }

  const host = request.headers.get("x-forwarded-host") ?? request.headers.get("host");
  const proto = request.headers.get("x-forwarded-proto") ?? "http";
  if (!host) {
    return NextResponse.json({ error: "Missing host." }, { status: 400 });
  }
  const origin = `${proto}://${host}`;

  const created = await createPayPalOrder(
    paypalItems,
    `${origin}/api/paypal/return`,
    `${origin}/cart`,
  );
  if ("error" in created) {
    return NextResponse.json({ error: created.error }, { status: 502 });
  }
  return NextResponse.json({ url: created.url });
}
