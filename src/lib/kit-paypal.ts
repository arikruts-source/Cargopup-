const paypalLinks: Record<string, string> = {
  "clean-commute-kit": "https://www.paypal.com/ncp/payment/2YC92HSRB5YHJ",
  "seat-cover": "https://www.paypal.com/ncp/payment/CTHJSKJY35QSW",
  "trunk-liner": "https://www.paypal.com/ncp/payment/F2XFJWASQGT9E",
};

export function paypalUrlFor(slug: string) {
  return paypalLinks[slug];
}

export function paypalUrlForCart(lines: { slug: string; quantity: number }[]) {
  if (lines.length !== 1 || lines[0].quantity !== 1) return undefined;
  return paypalLinks[lines[0].slug];
}
