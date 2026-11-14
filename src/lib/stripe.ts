import Stripe from "stripe";

export function getStripe() {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) return null;
  return new Stripe(key);
}

export function paymentsMode(): "live" | "test" | "missing" {
  const key = process.env.STRIPE_SECRET_KEY ?? "";
  if (key.startsWith("sk_live_")) return "live";
  if (key.startsWith("sk_test_")) return "test";
  return "missing";
}

export function stripeKeyProblem() {
  const mode = paymentsMode();
  if (mode === "missing") {
    return "Add STRIPE_SECRET_KEY in Vercel. Use sk_test_... for a practice charge or sk_live_... for a real charge.";
  }
  return null;
}
