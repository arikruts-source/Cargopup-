import Link from "next/link";
import { KitPhoto } from "@/components/KitPhoto";
import { formatPrice, products } from "@/lib/products";
import { seatCoverSource } from "@/lib/sourcing";

const kit = products[0];
const others = products.slice(1);

export default function Home() {
  return (
    <main>
      <section className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-12 md:grid-cols-2 md:py-20">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--rust)]">
            For the drive with your dog
          </p>
          <h1 className="mt-3 max-w-xl text-5xl leading-[1.05] text-[var(--ink)] md:text-6xl">
            Keep the back seat. Lose the hair.
          </h1>
          <p className="mt-5 max-w-md text-lg leading-8 text-[var(--muted)]">
            One kit for the rear bench: a cover, gap fillers, a travel bowl, and a lint roller.
            {` ${seatCoverSource.headline}.`}
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link
              href="/products/clean-commute-kit"
              className="rounded-full bg-[var(--rust)] px-6 py-3 font-semibold text-white"
            >
              See the {formatPrice(kit.priceCents)} kit
            </Link>
            <p className="text-sm text-[var(--muted)]">
              Listed in US dollars. PayPal can charge you in your currency. No invented reviews.
            </p>
          </div>
        </div>
        <KitPhoto />
      </section>

      <section className="border-y border-[var(--line)] bg-white/40">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 md:grid-cols-3">
          {[
            ["Hair in the seams", "The cover sits over the bench so shedding stays on the fabric, not in the stitching."],
            ["Mud on the way home", "Coated oxford wipes clean. Rinse the worst of it and let it air dry."],
            ["A dog that slides", "Headrest straps and side flaps hold the cover. Still clip a harness. This is not a seatbelt."],
          ].map(([title, copy]) => (
            <div key={title}>
              <h2 className="text-2xl text-[var(--ink)]">{title}</h2>
              <p className="mt-2 leading-7 text-[var(--muted)]">{copy}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14">
        <div className="grid gap-8 rounded-3xl bg-[var(--pine)] p-6 text-[var(--paper)] md:grid-cols-[1.2fr_0.8fr] md:p-10">
          <div>
            <p className="text-sm uppercase tracking-[0.16em] text-[#e7b8a2]">In the box</p>
            <h2 className="mt-2 text-4xl">Clean Commute Kit</h2>
            <ul className="mt-5 space-y-2 text-lg">
              {kit.includes.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div className="flex flex-col justify-between rounded-2xl bg-[#17332b] p-6">
            <p className="text-5xl">{formatPrice(kit.priceCents)}</p>
            <p className="mt-4 leading-7 text-[#e7d7c3]">{seatCoverSource.headline}.</p>
            <Link
              href="/products/clean-commute-kit"
              className="mt-6 inline-flex justify-center rounded-full bg-[var(--paper)] px-5 py-3 font-semibold text-[var(--ink)]"
            >
              Open the kit
            </Link>
          </div>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {others.map((product) => (
            <Link
              key={product.slug}
              href={`/products/${product.slug}`}
              className="rounded-2xl border border-[var(--line)] p-5 hover:border-[var(--ink)]"
            >
              <p className="text-sm text-[var(--rust)]">{product.eyebrow}</p>
              <h3 className="mt-1 text-2xl">{product.name}</h3>
              <p className="mt-2 text-[var(--muted)]">{product.summary}</p>
              <p className="mt-4 font-semibold">{formatPrice(product.priceCents)}</p>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
