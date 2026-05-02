import type { Metadata } from "next";
import "./globals.css";
import LenisProvider from "@/components/LenisProvider";
import BubbleMenu from "@/components/BubbleMenu";
import CartOverlay from "@/components/CartOverlay";

export const metadata: Metadata = {
  title: "SKATEBOARD & CO — Skate Culture & Street Art",
  description: "SKATEBOARD & CO is a premium skateboarding brand rooted in street culture, craftsmanship, and the pure love of the grind. Decks, apparel, and more.",
  keywords: ["skateboarding", "skate brand", "street culture", "decks", "apparel"],
  openGraph: {
    title: "SKATEBOARD & CO — Skate Culture & Street Art",
    description: "Born from the streets. Built for the grind.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0" rel="stylesheet" />
      </head>
      <body>
        <LenisProvider>
          {children}
          <CartOverlay />
        </LenisProvider>
      </body>
    </html>
  );
}
