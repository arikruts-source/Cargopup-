type PayPalLink = { href?: string; rel?: string };
type PayPalOrder = {
  id?: string;
  status?: string;
  links?: PayPalLink[];
  purchase_units?: {
    shipping?: { address?: { country_code?: string } };
  }[];
};

export type PayPalItem = {
  name: string;
  quantity: number;
  unitAmountCents: number;
};

export function paypalMode(): "live" | "sandbox" | "missing" {
  if (!process.env.PAYPAL_CLIENT_ID || !process.env.PAYPAL_CLIENT_SECRET) return "missing";
  return process.env.PAYPAL_ENV === "sandbox" ? "sandbox" : "live";
}

function apiBase() {
  return paypalMode() === "sandbox"
    ? "https://api-m.sandbox.paypal.com"
    : "https://api-m.paypal.com";
}

function money(cents: number) {
  return (cents / 100).toFixed(2);
}

async function accessToken() {
  const id = process.env.PAYPAL_CLIENT_ID;
  const secret = process.env.PAYPAL_CLIENT_SECRET;
  if (!id || !secret) return null;
  const response = await fetch(`${apiBase()}/v1/oauth2/token`, {
    method: "POST",
    headers: {
      Authorization: `Basic ${Buffer.from(`${id}:${secret}`).toString("base64")}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: "grant_type=client_credentials",
  });
  if (!response.ok) return null;
  const data = (await response.json()) as { access_token?: string };
  return data.access_token ?? null;
}

async function paypalFetch(path: string, init?: RequestInit) {
  const token = await accessToken();
  if (!token) return null;
  const response = await fetch(`${apiBase()}${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      ...(init?.headers ?? {}),
    },
  });
  return response;
}

export async function createPayPalOrder(items: PayPalItem[], returnUrl: string, cancelUrl: string) {
  const itemTotal = items.reduce((sum, item) => sum + item.unitAmountCents * item.quantity, 0);
  const response = await paypalFetch("/v2/checkout/orders", {
    method: "POST",
    body: JSON.stringify({
      intent: "CAPTURE",
      purchase_units: [
        {
          amount: {
            currency_code: "USD",
            value: money(itemTotal),
            breakdown: {
              item_total: { currency_code: "USD", value: money(itemTotal) },
            },
          },
          items: items.map((item) => ({
            name: item.name.slice(0, 127),
            quantity: String(item.quantity),
            category: "PHYSICAL_GOODS",
            unit_amount: { currency_code: "USD", value: money(item.unitAmountCents) },
          })),
        },
      ],
      application_context: {
        return_url: returnUrl,
        cancel_url: cancelUrl,
        shipping_preference: "GET_FROM_FILE",
        user_action: "PAY_NOW",
        brand_name: "CargoPup",
      },
    }),
  });
  if (!response?.ok) return { error: "PayPal could not start checkout." };
  const order = (await response.json()) as PayPalOrder;
  const url = order.links?.find((link) => link.rel === "payer-action" || link.rel === "approve")?.href;
  if (!url) return { error: "PayPal did not return a checkout link." };
  return { url };
}

export async function readPayPalOrder(orderId: string) {
  const response = await paypalFetch(`/v2/checkout/orders/${encodeURIComponent(orderId)}`);
  if (!response?.ok) return null;
  return (await response.json()) as PayPalOrder;
}

export function shippingCountry(order: PayPalOrder) {
  return order.purchase_units?.[0]?.shipping?.address?.country_code?.toUpperCase() ?? "";
}

export async function capturePayPalOrder(orderId: string) {
  const response = await paypalFetch(`/v2/checkout/orders/${encodeURIComponent(orderId)}/capture`, {
    method: "POST",
  });
  if (!response?.ok) return null;
  return (await response.json()) as PayPalOrder;
}
