import { seatCoverSource } from "./sourcing";

export type Product = {
  slug: string;
  name: string;
  priceCents: number;
  eyebrow: string;
  summary: string;
  includes: string[];
  specs: { label: string; value: string }[];
  notes: string[];
  faq: { question: string; answer: string }[];
};

export const products: Product[] = [
  {
    slug: "clean-commute-kit",
    name: "Clean Commute Kit",
    priceCents: 9900,
    eyebrow: "The one to get",
    summary:
      "A rear-bench cover plus the three things you reach for after the ride: gap fillers, a travel bowl, and a lint roller.",
    includes: [
      "Rear bench cover with mesh window, headrest straps, and two door straps",
      "Two front-seat gap fillers",
      "Collapsible travel bowl",
      "Lint roller for the seats after you unload",
    ],
    specs: [
      { label: "Cover, open", value: "80.9 × 64.6 inches" },
      { label: "Cover fabric", value: "Black 600D oxford, PP plate, cotton padding" },
      { label: "Cover load", value: "Up to 440 lb on the bench" },
      { label: "Cover weight", value: "About 6.6 lb" },
      { label: "Ships from", value: seatCoverSource.shipsFrom },
    ],
    notes: [
      "Cover measurements come from the US-warehouse listing we fulfill against. Measure your rear bench before you buy.",
      "The cover needs headrest posts. It is a bench protector, not a crash-tested restraint. Use a harness or a crate as well.",
      "Gap fillers, the bowl, and the roller are packed for the same US ship window. Exact accessory dimensions are on the packing slip.",
    ],
    faq: [
      {
        question: "Will it smell?",
        answer:
          "New coated fabric can have a factory smell. Air it outside for a few hours before the first ride. We do not add fragrance.",
      },
      {
        question: "How do I clean the cover?",
        answer:
          "Vacuum it, wipe it with a damp cloth, or rinse mud off. Air dry. Do not tumble-dry the stiff plate.",
      },
      {
        question: "Which cars does the cover fit?",
        answer:
          "A rear bench with headrest posts: most sedans, small SUVs, and crew-cab trucks. The cover opens to 80.9 inches wide and 64.6 inches deep. It is not a pickup-bed mat and not a front bucket without posts.",
      },
      {
        question: "What if I only want the cover?",
        answer: "The seat cover is sold on its own for $59.",
      },
    ],
  },
  {
    slug: "seat-cover",
    name: "Rear seat cover",
    priceCents: 5900,
    eyebrow: "Cover only",
    summary:
      "The same rear-bench cover as the kit, without the gap fillers, bowl, or lint roller.",
    includes: [
      "Rear bench cover with mesh window",
      "Headrest straps and two door straps",
    ],
    specs: [
      { label: "Open size", value: "80.9 × 64.6 inches" },
      { label: "Material", value: "Black 600D oxford, PP plate, cotton padding" },
      { label: "Load", value: "Up to 440 lb" },
      { label: "Weight", value: "About 6.6 lb" },
      { label: "Ships from", value: seatCoverSource.shipsFrom },
    ],
    notes: [
      "These measurements are from the seat-cover listing. Check them against your bench.",
      "The cover keeps hair and mud off the upholstery. It does not replace a harness or a crate.",
    ],
    faq: [
      {
        question: "How do I clean it?",
        answer:
          "Vacuum, wipe with a damp cloth, or rinse. Air dry. Do not tumble-dry the plate.",
      },
      {
        question: "Does it stop my dog sliding into the front?",
        answer:
          "The side flaps and headrest straps hold the cover on the bench. They are not a seatbelt. Clip your dog in with a harness.",
      },
    ],
  },
  {
    slug: "trunk-liner",
    name: "Trunk liner",
    priceCents: 3900,
    eyebrow: "Add-on",
    summary:
      "A waterproof liner for the cargo floor, for wet paws after the trailhead or the park.",
    includes: ["One flat waterproof trunk liner"],
    specs: [
      { label: "Use", value: "Car or small SUV cargo floor" },
      { label: "Not for", value: "Open pickup beds" },
      { label: "Ships from", value: seatCoverSource.shipsFrom },
    ],
    notes: [
      "Lay it flat in the trunk. It is not a hammock and it does not cover the rear bench.",
      "Packed size is printed on the slip in the box. Order it with the kit if the cargo floor gets as dirty as the seats.",
    ],
    faq: [
      {
        question: "Will it fit my car?",
        answer:
          "It is meant to lie on a standard car or small SUV cargo floor. It will not cover a pickup bed. If your trunk is unusually short, email us before ordering.",
      },
      {
        question: "How do I clean it?",
        answer: "Shake it out, wipe it, and let it dry before you fold it back up.",
      },
    ],
  },
];

export function getProduct(slug: string) {
  return products.find((product) => product.slug === slug);
}

export function formatPrice(cents: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(cents / 100);
}
