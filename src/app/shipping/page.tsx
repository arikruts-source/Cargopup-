import type { Metadata } from "next";
import { PolicyLayout } from "@/components/PolicyLayout";
import { seatCoverSource } from "@/lib/sourcing";

export const metadata: Metadata = {
  title: "Shipping",
  description: seatCoverSource.headline,
};

export default function ShippingPage() {
  return (
    <PolicyLayout title="Shipping">
      <p>{seatCoverSource.headline}.</p>
      <p>
        Orders ship from a US warehouse to US addresses only. Packing is usually{" "}
        {seatCoverSource.processing}. The supplier lists transit at {seatCoverSource.transitEstimate}.
        Recent orders for the seat cover we use arrived in {seatCoverSource.recentDelivery}.
      </p>
      <p>
        Shipping is included in the price. You get a tracking note by email after the warehouse
        hands the box to the carrier. A busy week or a carrier delay can push a delivery past 7
        business days. We will not pretend it is overnight.
      </p>
      <p>
        We do not ship to PO boxes if the carrier for that order refuses them, and we do not ship
        outside the United States. UK and EU checkout is not open, because those orders can need
        VAT from the first sale.
      </p>
    </PolicyLayout>
  );
}
