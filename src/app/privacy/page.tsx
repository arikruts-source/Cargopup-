import type { Metadata } from "next";
import { PolicyLayout } from "@/components/PolicyLayout";

export const metadata: Metadata = { title: "Privacy" };

export default function PrivacyPage() {
  return (
    <PolicyLayout title="Privacy">
      <p>
        Checkout collects your name, email, phone, and shipping address so we can bill you and
        send the order to the US warehouse. Stripe processes the card. We never receive your card
        number.
      </p>
      <p>
        We use that information to fulfill the order, send the receipt and tracking note, and
        handle a return. We do not sell it. The cart on this site is stored in your browser only.
      </p>
      <p>
        Stripe is the payment processor. Their privacy policy covers card data. If you email us,
        we keep that thread long enough to answer you and to keep a record of refunds.
      </p>
      <p>
        This store sells to the United States. If you write to us from somewhere else, we still
        only use the message to reply.
      </p>
    </PolicyLayout>
  );
}
