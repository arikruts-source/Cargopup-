import type { Metadata } from "next";
import { PolicyLayout } from "@/components/PolicyLayout";
import { brand, marginCheck, sampleCheck, seatCoverSource } from "@/lib/sourcing";

export const metadata: Metadata = {
  title: "Owner notes",
  robots: { index: false, follow: false },
};

export default function OwnerPage() {
  return (
    <PolicyLayout title="Owner notes">
      <p>
        These notes are for you, not for ads. Customers can still open this page from the footer.
      </p>
      <p>
        <strong>{brand.name}.</strong> {brand.domain.detail} {brand.trademark}
      </p>
      <p>
        Seat cover to order: {seatCoverSource.supplier}, item {seatCoverSource.sku}.{" "}
        {seatCoverSource.headline}. Packing: {seatCoverSource.processing}. Transit estimate:{" "}
        {seatCoverSource.transitEstimate}. Recent deliveries: {seatCoverSource.recentDelivery}.
      </p>
      <p>
        Money check: the kit is ${marginCheck.kitPriceUsd}. Landed cost needs to be about $
        {marginCheck.landedTargetUsd} or less. Confirmed: {marginCheck.landedConfirmed ? "yes" : "no"}.{" "}
        {marginCheck.detail}
      </p>
      <p>
        Sample ordered: {sampleCheck.ordered ? "yes" : "no"}. {sampleCheck.detail}
      </p>
      <p>
        Checkout uses PayPal. Put the live app credentials in Vercel as PAYPAL_CLIENT_ID and
        PAYPAL_CLIENT_SECRET. Set PAYPAL_ENV=sandbox only for a practice payment. A real payment
        shows in PayPal Activity. Put the contact details you want customers to see in
        NEXT_PUBLIC_CONTACT_EMAIL and NEXT_PUBLIC_CONTACT_PHONE. Those stay out of the public
        repository. Fulfill by hand. Do not automate the supplier yet.
      </p>
    </PolicyLayout>
  );
}
