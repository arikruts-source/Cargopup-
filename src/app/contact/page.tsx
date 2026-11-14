import type { Metadata } from "next";
import { PolicyLayout } from "@/components/PolicyLayout";

export const metadata: Metadata = { title: "Contact" };

export default function ContactPage() {
  const email = process.env.NEXT_PUBLIC_CONTACT_EMAIL;

  return (
    <PolicyLayout title="Contact">
      <p>Write about an order, a fit question, or a return. Include the order number if you have one.</p>
      {email ? (
        <p>
          Email{" "}
          <a className="underline" href={`mailto:${email}`}>
            {email}
          </a>
          .
        </p>
      ) : (
        <p>
          Set NEXT_PUBLIC_CONTACT_EMAIL before launch. Until then, the Stripe receipt is the
          email path for a test payment, and owner notes explain how new orders are saved.
        </p>
      )}
      <p>We answer in English. We do not take phone orders.</p>
    </PolicyLayout>
  );
}
