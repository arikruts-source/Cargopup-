/**
 * Public checks made on 14 Nov 2026. This is not a trademark opinion,
 * a tax opinion, or a paid supplier quote.
 */
export const brand = {
  name: "CargoPup",
  domain: {
    host: "cargopup.com",
    available: false,
    detail:
      "RDAP shows cargopup.com registered through Squarespace Domains on 12 Oct 2019, expiring 12 Oct 2027, with client hold. DNS does not resolve, and no public pet store was found on it. Pick a different domain.",
  },
  trademark:
    "A public web search found no CargoPup pet-product brand. That is not a USPTO clearance. cargo-pup is also a Rust developer tool, and an unused Bluesky handle uses the same word.",
} as const;

/**
 * Seat-cover listing used for size and shipping copy.
 * Order it on AliExpress, choosing a listing that ships from the United States.
 * The wholesale price is not confirmed.
 */
export const seatCoverSource = {
  supplier: "AliExpress",
  sku: "Black 600D oxford rear seat cover, about 80.9 × 64.6 inches",
  shipsFrom: "United States",
  processing: "about 2 business days (recent orders averaged under 1)",
  transitEstimate: "1–7 days",
  recentDelivery: "about 5 business days",
  headline: "Ships from the US, usually 3–7 business days",
  url: "https://www.aliexpress.com",
} as const;

export const marginCheck = {
  kitPriceUsd: 99,
  landedTargetUsd: 35,
  landedConfirmed: false,
  detail:
    "AliExpress prices change by seller and shipping option. A past US-warehouse listing implied a seat-cover cost near $49. Four pieces at $99 do not clear a $35 landed cost on that hint. Do not buy ads until one AliExpress listing confirms item plus US shipping at $35 or less, in one parcel.",
} as const;

export const sampleCheck = {
  ordered: false,
  detail:
    "No sample was purchased in this build. It needs a paid order on AliExpress. Live card charges stay off until that sample is in hand and the fabric matches this page.",
} as const;
