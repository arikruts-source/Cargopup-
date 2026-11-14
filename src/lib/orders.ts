import { mkdir, appendFile } from "fs/promises";
import path from "path";

export type OrderNotice = {
  id: string;
  email: string | null;
  amountCents: number | null;
  summary: string;
  shippingName: string | null;
  shippingLine: string | null;
};

export function orderText(order: OrderNotice) {
  return [
    `CargoPup order ${order.id}`,
    `Email: ${order.email ?? "not collected"}`,
    `Total: ${order.amountCents === null ? "unknown" : `$${(order.amountCents / 100).toFixed(2)}`}`,
    `Ship to: ${order.shippingName ?? "unknown"}`,
    order.shippingLine ?? "",
    order.summary,
    "Place this by hand with the US warehouse. Do not mark it shipped until you have tracking.",
  ]
    .filter(Boolean)
    .join("\n");
}

export async function saveOrder(order: OrderNotice) {
  const dir = path.join(process.cwd(), "data");
  await mkdir(dir, { recursive: true });
  const line = JSON.stringify({ ...order, savedAt: new Date().toISOString() });
  await appendFile(path.join(dir, "orders.jsonl"), `${line}\n`, "utf8");
}

export async function emailOrder(order: OrderNotice) {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.ORDER_NOTIFY_EMAIL;
  if (!apiKey || !to) {
    return { sent: false as const, reason: "RESEND_API_KEY or ORDER_NOTIFY_EMAIL is unset" };
  }

  const from = process.env.ORDER_FROM_EMAIL || "CargoPup <onboarding@resend.dev>";
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [to],
      subject: `New CargoPup order ${order.id}`,
      text: orderText(order),
    }),
  });

  if (!response.ok) {
    const body = await response.text();
    return { sent: false as const, reason: body.slice(0, 300) };
  }

  return { sent: true as const };
}
