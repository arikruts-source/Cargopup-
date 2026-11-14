import Stripe from "stripe";

export function getStripe() {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) return null;
  return new Stripe(key);
}

export function stripeKeyProblem() {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) {
    return "Add STRIPE_SECRET_KEY=sk_test_... to .env.local. Live charges stay off until a warehouse sample is checked.";
  }
  if (!key.startsWith("sk_test_")) {
    return "Live Stripe keys are refused. Use an sk_test_ key until the warehouse sample is in hand.";
  }
  return null;
}
