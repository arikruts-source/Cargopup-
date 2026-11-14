import { NextResponse } from "next/server";
import { getProduct } from "@/lib/products";
import { seatCoverSource } from "@/lib/sourcing";
import { getStripe, stripeKeyProblem } from "@/lib/stripe";

type Item = { slug?: string; quantity?: number };

export async function POST(request: Request) {
  const problem = stripeKeyProblem();
  if (problem) {
    return NextResponse.json({ error: problem }, { status: 503 });
  }

  const stripe = getStripe();
  if (!stripe) {
    return NextResponse.json({ error: "Stripe is not configured." }, { status: 503 });
  }

  let items: Item[] = [];
  try {
    const body = (await request.json()) as { items?: Item[] };
    items = Array.isArray(body.items) ? body.items : [];
  } catch {
    return NextResponse.json({ error: "Send the cart as JSON." }, { status: 400 });
  }

  const lineItems = [];
  const summary: string[] = [];
  for (const item of items) {
    const product = item.slug ? getProduct(item.slug) : undefined;
    const quantity = Number(item.quantity);
    if (!product || !Number.isInteger(quantity) || quantity < 1 || quantity > 5) {
      return NextResponse.json({ error: "That cart has a product we do not sell." }, { status: 400 });
    }
    summary.push(`${quantity} × ${product.name}`);
    lineItems.push({
      quantity,
      price_data: {
        currency: "usd",
        unit_amount: product.priceCents,
        product_data: {
          name: product.name,
          description: product.summary,
        },
      },
    });
  }

  if (lineItems.length === 0) {
    return NextResponse.json({ error: "Your cart is empty." }, { status: 400 });
  }

  const host = request.headers.get("x-forwarded-host") ?? request.headers.get("host");
  const proto = request.headers.get("x-forwarded-proto") ?? "http";
  if (!host) {
    return NextResponse.json({ error: "Missing host." }, { status: 400 });
  }
  const origin = `${proto}://${host}`;

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    customer_creation: "always",
    billing_address_collection: "required",
    shipping_address_collection: { allowed_countries: ["US"] },
    phone_number_collection: { enabled: true },
    line_items: lineItems,
    shipping_options: [
      {
        shipping_rate_data: {
          type: "fixed_amount",
          fixed_amount: { amount: 0, currency: "usd" },
          display_name: "US warehouse shipping",
          delivery_estimate: {
            minimum: { unit: "business_day", value: 3 },
            maximum: { unit: "business_day", value: 7 },
          },
        },
      },
    ],
    metadata: { summary: summary.join("; ") },
    success_url: `${origin}/thanks?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${origin}/cart`,
  });

  return NextResponse.json({ url: session.url });
}
