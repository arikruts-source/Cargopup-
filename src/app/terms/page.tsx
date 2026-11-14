import type { Metadata } from "next";
import { PolicyLayout } from "@/components/PolicyLayout";
import { seatCoverSource } from "@/lib/sourcing";

export const metadata: Metadata = { title: "Terms" };

export default function TermsPage() {
  return (
    <PolicyLayout title="Terms">
      <p>
        CargoPup sells physical car gear worldwide. Prices are listed in US dollars and include
        shipping. PayPal may charge you in your own currency and show the conversion before you
        pay. Placing an order means you can receive packages at the address you enter.
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
        A successful PayPal payment for the kit is a real order. We ship to the address confirmed
        in PayPal. Customs or local tax outside the US is the buyer’s cost. The cover and the
        trunk liner cannot be paid until they have their own PayPal links.
      </p>
      <p>
        The kit photo shows a dog on a black bench cover. The cover we ship is black 600D oxford in
        the size listed on the product page.
      </p>
    </PolicyLayout>
  );
}
