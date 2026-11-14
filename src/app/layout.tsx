import type { Metadata } from "next";
import { Fraunces, Outfit } from "next/font/google";
import { CartProvider } from "@/components/CartProvider";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { TestModeBanner } from "@/components/TestModeBanner";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "CargoPup",
    template: "%s · CargoPup",
  },
  description:
    "Rear-seat protection for people who drive with their dog. Ships from the US, usually in 3–7 business days.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${outfit.variable} ${fraunces.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col">
        <CartProvider>
          <TestModeBanner />
          <Header />
          {children}
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
