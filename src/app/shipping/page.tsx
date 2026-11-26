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
      <p>PayPal asks for the address. The box is shipped there.</p>
      <p>{seatCoverSource.headline}.</p>
      <p>
        Orders ship from a US warehouse to the address entered in PayPal. Packing is usually{" "}
        {seatCoverSource.processing}. Inside the US, the supplier lists transit at{" "}
        {seatCoverSource.transitEstimate}. Recent US orders for the seat cover we use arrived in{" "}
        {seatCoverSource.recentDelivery}. Other countries take longer.
      </p>
      <p>
        Shipping is included in the price. You get a tracking note by email after the warehouse
        hands the box to the carrier. A busy week or a carrier delay can push a delivery past 7
        business days. We will not pretend it is overnight.
      </p>
      <p>
        We do not ship to PO boxes if the carrier for that order refuses them. Buyers outside the
        US may have to pay customs or local tax when the package arrives. That charge comes from
        their country, not from CargoPup.
      </p>
    </PolicyLayout>
  );
}
