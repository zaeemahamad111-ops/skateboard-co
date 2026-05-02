"use client";
import dynamic from "next/dynamic";

const Navbar          = dynamic(() => import("@/components/Navbar"),           { ssr: false });
const ProductCarousel = dynamic(() => import("@/components/ProductCarousel"),  { ssr: false });
const ProductHighlight= dynamic(() => import("@/components/ProductHighlight"), { ssr: false });
const Newsletter      = dynamic(() => import("@/components/Newsletter"),       { ssr: false });
const Footer          = dynamic(() => import("@/components/Footer"),           { ssr: false });

export default function Shop() {
  return (
    <main>
      <Navbar />
      
      <div style={{ paddingTop: "100px", backgroundColor: "var(--cream)", minHeight: "100vh" }}>


        <ProductCarousel />
        <ProductHighlight />
        <Newsletter />
        <Footer />
      </div>
    </main>
  );
}
