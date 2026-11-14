export function SeatIllustration({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 640 480"
      role="img"
      aria-label="Illustration of a rear bench with a seat cover and a dog sitting on it"
      className={className}
    >
      <rect width="640" height="480" rx="28" fill="#1E3D34" />
      <path d="M48 360c40-90 120-140 220-140h120c90 0 160 40 204 140v48H48v-48z" fill="#14302A" />
      <path
        d="M86 168c18-46 70-78 132-78h188c78 0 140 48 156 112v28H92v-20c0-16-2-30-6-42z"
        fill="#F3ECDF"
      />
      <path d="M118 214h390c18 0 28 16 22 32l-28 78H132l-36-78c-6-16 4-32 22-32z" fill="#C6521A" />
      <path d="M150 246h330" stroke="#F3ECDF" strokeWidth="8" strokeLinecap="round" opacity="0.55" />
      <circle cx="430" cy="168" r="46" fill="#F3ECDF" />
      <circle cx="414" cy="160" r="8" fill="#1A1714" />
      <circle cx="448" cy="160" r="8" fill="#1A1714" />
      <path d="M418 184c8 8 22 8 32 0" stroke="#1A1714" strokeWidth="4" fill="none" strokeLinecap="round" />
      <path d="M392 140c8-28 18-40 28-36" stroke="#F3ECDF" strokeWidth="14" strokeLinecap="round" />
      <path d="M468 140c-6-30 10-44 24-36" stroke="#F3ECDF" strokeWidth="14" strokeLinecap="round" />
      <path d="M168 292c28 18 70 18 98 0" stroke="#1A1714" strokeWidth="6" fill="none" opacity="0.25" />
      <text x="48" y="64" fill="#F3ECDF" fontFamily="Georgia, serif" fontSize="28">
        Rear bench
      </text>
      <text x="48" y="96" fill="#E7D7C3" fontFamily="Arial, sans-serif" fontSize="16">
        Illustration, not a product photo
      </text>
    </svg>
  );
}
