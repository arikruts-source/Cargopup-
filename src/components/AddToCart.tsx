"use client";

import { useState } from "react";
import { useCart } from "./CartProvider";

export function AddToCart({
  slug,
  label = "Add to cart",
  className = "",
}: {
  slug: string;
  label?: string;
  className?: string;
}) {
  const { add } = useCart();
  const [added, setAdded] = useState(false);

  return (
    <button
      type="button"
      className={className}
      onClick={() => {
        add(slug);
        setAdded(true);
        window.setTimeout(() => setAdded(false), 1600);
      }}
    >
      {added ? "Added" : label}
    </button>
  );
}
