export const kitPayPalUrl = "https://www.paypal.com/ncp/payment/2YC92HSRB5YHJ";

export function isSingleKit(lines: { slug: string; quantity: number }[]) {
  return lines.length === 1 && lines[0].slug === "clean-commute-kit" && lines[0].quantity === 1;
}
