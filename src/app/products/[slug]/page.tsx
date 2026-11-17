import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AddToCart } from "@/components/AddToCart";
import { KitPhotos } from "@/components/KitPhoto";
import { StickyBuy } from "@/components/StickyBuy";
import { paypalUrlFor } from "@/lib/kit-paypal";
import { publicSrc } from "@/lib/public-src";
import { formatPrice, getProduct, products } from "@/lib/products";
import { seatCoverSource } from "@/lib/sourcing";

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return { title: "Product" };
  return { title: product.name, description: product.summary };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const addOns = products.filter((item) => item.slug !== product.slug);

  return (
    <main className="pb-24 md:pb-0">
      <article className="mx-auto grid max-w-6xl gap-10 px-4 py-10 md:grid-cols-2 md:py-16">
        {product.slug === "trunk-liner" ? (
          <img
            src={publicSrc("/trunk-liner.jpg")}
            alt="A black waterproof liner lying flat on a car cargo floor"
            className="aspect-[4/3] w-full rounded-[28px] object-cover"
          />
        ) : (
          <KitPhotos />
        )}
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--rust)]">
            {product.eyebrow}
          </p>
          <h1 className="mt-2 text-5xl text-[var(--ink)]">{product.name}</h1>
          <p className="mt-4 text-4xl">{formatPrice(product.priceCents)}</p>
          <p className="mt-3 text-lg leading-8 text-[var(--muted)]">{product.summary}</p>
          <p className="mt-3 text-sm text-[var(--pine)]">{seatCoverSource.headline}.</p>
          <div className="mt-6 hidden items-center gap-3 md:flex">
            {paypalUrlFor(product.slug) ? (
              <a
                href={paypalUrlFor(product.slug)}
                className="rounded-full bg-[var(--rust)] px-6 py-3 font-semibold text-white"
              >
                Pay with PayPal
              </a>
            ) : null}
            <AddToCart
              slug={product.slug}
              className="rounded-full border border-[var(--ink)] px-6 py-3 font-semibold text-[var(--ink)]"
            />
          </div>
          <h2 className="mt-10 text-2xl">What arrives</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 leading-7">
            {product.includes.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </article>

      <section className="border-y border-[var(--line)]">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-10 md:grid-cols-2">
          <div>
            <h2 className="text-3xl">Details</h2>
            <dl className="mt-4 divide-y divide-[var(--line)]">
              {product.specs.map((spec) => (
                <div key={spec.label} className="grid grid-cols-[8rem_1fr] gap-3 py-3">
                  <dt className="text-[var(--muted)]">{spec.label}</dt>
                  <dd>{spec.value}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div>
            <h2 className="text-3xl">Before you buy</h2>
            <ul className="mt-4 space-y-3 leading-7 text-[var(--muted)]">
              {product.notes.map((note) => (
                <li key={note}>{note}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12">
        <h2 className="text-3xl">Questions</h2>
        <div className="mt-4 divide-y divide-[var(--line)]">
          {product.faq.map((item) => (
            <details key={item.question} className="py-4">
              <summary className="cursor-pointer text-lg">{item.question}</summary>
              <p className="mt-2 max-w-2xl leading-7 text-[var(--muted)]">{item.answer}</p>
            </details>
          ))}
          <details className="py-4">
            <summary className="cursor-pointer text-lg">How long does shipping take?</summary>
            <p className="mt-2 max-w-2xl leading-7 text-[var(--muted)]">
              {seatCoverSource.headline}. Packing is usually {seatCoverSource.processing}. The
              listing estimates transit at {seatCoverSource.transitEstimate}, and recent orders
              for this seat cover arrived in {seatCoverSource.recentDelivery}. Addresses outside the US take longer.
            </p>
          </details>
        </div>

        <h2 className="mt-12 text-3xl">Also in the shop</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          {addOns.map((item) => (
            <Link
              key={item.slug}
              href={`/products/${item.slug}`}
              className="rounded-2xl border border-[var(--line)] p-5 hover:border-[var(--ink)]"
            >
              <p className="text-sm text-[var(--rust)]">{item.eyebrow}</p>
              <p className="mt-1 text-2xl">{item.name}</p>
              <p className="mt-2 font-semibold">{formatPrice(item.priceCents)}</p>
            </Link>
          ))}
        </div>
      </section>
      <StickyBuy slug={product.slug} priceCents={product.priceCents} />
    </main>
  );
}
