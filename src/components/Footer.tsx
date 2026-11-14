import Link from "next/link";
import { seatCoverSource } from "@/lib/sourcing";

const links = [
  ["Shipping", "/shipping"],
  ["Returns", "/returns"],
  ["Privacy", "/privacy"],
  ["Terms", "/terms"],
  ["Contact", "/contact"],
  ["Owner notes", "/owner"],
];

export function Footer() {
  return (
    <footer className="mt-auto border-t border-[var(--line)]">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-8 text-sm text-[var(--muted)] sm:flex-row sm:items-center sm:justify-between">
        <p>{seatCoverSource.headline}. US addresses only.</p>
        <nav className="flex flex-wrap gap-x-4 gap-y-2">
          {links.map(([label, href]) => (
            <Link key={href} href={href} className="hover:text-[var(--ink)]">
              {label}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
}
