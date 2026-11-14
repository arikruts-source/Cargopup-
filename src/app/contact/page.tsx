import type { Metadata } from "next";
import { PolicyLayout } from "@/components/PolicyLayout";

export const metadata: Metadata = { title: "Contact" };

export default function ContactPage() {
  const email = process.env.NEXT_PUBLIC_CONTACT_EMAIL;
  const phone = process.env.NEXT_PUBLIC_CONTACT_PHONE;

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
        <p>The email on your PayPal receipt is the way to reach us about that order.</p>
      )}
      {phone ? (
        <p>
          Phone{" "}
          <a className="underline" href={`tel:${phone.replace(/[^\d+]/g, "")}`}>
            {phone}
          </a>
          .
        </p>
      ) : null}
      <p>We answer in English.</p>
    </PolicyLayout>
  );
}
