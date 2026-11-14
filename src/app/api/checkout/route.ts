import { NextResponse } from "next/server";
import { isSingleKit, kitPayPalUrl } from "@/lib/kit-paypal";
import { getProduct } from "@/lib/products";

type Item = { slug?: string; quantity?: number };

export async function POST(request: Request) {
  let items: Item[] = [];
  try {
    const body = (await request.json()) as { items?: Item[] };
    items = Array.isArray(body.items) ? body.items : [];
  } catch {
    return NextResponse.json({ error: "Send the cart as JSON." }, { status: 400 });
  }

  const lines = [];
  for (const item of items) {
    const product = item.slug ? getProduct(item.slug) : undefined;
    const quantity = Number(item.quantity);
    if (!product || !Number.isInteger(quantity) || quantity < 1 || quantity > 5) {
      return NextResponse.json({ error: "That cart has a product we do not sell." }, { status: 400 });
    }
    lines.push({ slug: product.slug, quantity });
  }

  if (!isSingleKit(lines)) {
    return NextResponse.json(
      { error: "Only one Clean Commute Kit can be paid right now. The cover and liner need their own PayPal links." },
      { status: 400 },
    );
  }

  return NextResponse.json({ url: kitPayPalUrl });
}
