import type { Metadata } from "next";
import { PolicyLayout } from "@/components/PolicyLayout";

export const metadata: Metadata = { title: "Returns" };

export default function ReturnsPage() {
  return (
    <PolicyLayout title="Returns">
      <p>
        You can ask for a refund within 30 days of delivery. Email us before you send anything
        back, and include your order number.
      </p>
      <p>
        If the item arrives damaged, stained, or is the wrong product, we refund the product
        price and the return postage is on us. Photos of the damage help us stop shipping that
        unit.
      </p>
      <p>
        If you changed your mind, the item needs to come back unused and clean. You pay the
        return postage. We refund the product price after the warehouse checks it in. We do not
        refund the original outbound shipping, because that shipping was already included and
        already spent.
      </p>
      <p>
        A seat cover that has been used on a trip, washed, or cut to fit is not unused. Write
        first if you are unsure.
      </p>
    </PolicyLayout>
  );
}
