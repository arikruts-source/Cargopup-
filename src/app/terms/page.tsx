import type { Metadata } from "next";
import { PolicyLayout } from "@/components/PolicyLayout";
import { seatCoverSource } from "@/lib/sourcing";

export const metadata: Metadata = { title: "Terms" };

export default function TermsPage() {
  return (
    <PolicyLayout title="Terms">
      <p>
        CargoPup sells physical car gear to customers in the United States. Prices are in US
        dollars and include shipping to a US address. Placing an order means you can receive
        packages at that address.
      </p>
      <p>
        {seatCoverSource.headline}. That window is an estimate from the warehouse, not a
        guaranteed delivery date.
      </p>
      <p>
        The seat cover protects upholstery. It is not a crash-tested dog restraint and it is not
        a child seat. Use a harness or a crate, and follow your local rules for animals in cars.
      </p>
      <p>
        This build only runs Stripe test payments. A test charge is not a real order and nothing
        will ship. Live payments stay off until a warehouse sample has been checked.
      </p>
      <p>
        The kit photo shows a dog on a black bench cover. The cover we ship is black 600D oxford in
        the size listed on the product page.
      </p>
    </PolicyLayout>
  );
}
