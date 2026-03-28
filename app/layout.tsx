import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Expo Home — Multi-Brand Furniture Store",
  description:
    "Multi-brand furniture showroom in Tbilisi, Georgia. Curated collections from leading contemporary designers.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-white text-neutral-900 antialiased">{children}</body>
    </html>
  );
}
