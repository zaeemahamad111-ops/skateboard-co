"use client";
import { useParams, useRouter } from "next/navigation";
import { products } from "@/lib/products";
import { useCart } from "@/lib/store";
import Image from "next/image";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function ProductPage() {
  const params = useParams();
  const router = useRouter();
  const product = products.find((p) => p.id === params.id);
  const { addItem } = useCart();

  if (!product) {
    return (
      <div style={{ height: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <h1>Product not found</h1>
      </div>
    );
  }

  return (
    <main style={{ backgroundColor: "var(--cream)", minHeight: "100vh" }}>
      <Navbar />
      
      <div style={{ padding: "10rem 6vw 6rem" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))", gap: "5rem" }}>
          
          {/* Product Image */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            style={{ position: "relative", aspectRatio: "1/1.1", backgroundColor: "var(--beige)", borderRadius: "1rem", overflow: "hidden" }}
          >
            <Image src={product.image} alt={product.name} fill style={{ objectFit: "cover" }} />
          </motion.div>

          {/* Product Info */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}
          >
            <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.8rem", letterSpacing: "0.4em", textTransform: "uppercase", color: "var(--gold)", marginBottom: "1rem" }}>
              {product.category}
            </span>
            <h1 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(3rem, 6vw, 5rem)", color: "var(--charcoal)", lineHeight: 0.9, marginBottom: "1.5rem" }}>
              {product.name}
            </h1>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "1.5rem", fontWeight: 600, color: "var(--charcoal)", marginBottom: "2rem" }}>
              ${product.price}
            </p>
            
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.2rem", fontStyle: "italic", lineHeight: 1.6, color: "rgba(28,28,28,0.7)", marginBottom: "2.5rem" }}>
              {product.fullDesc || product.desc}
            </p>

            {product.specs && (
              <ul style={{ listStyle: "none", padding: 0, marginBottom: "3rem" }}>
                {product.specs.map((spec, i) => (
                  <li key={i} style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "0.75rem", fontFamily: "'DM Sans', sans-serif", fontSize: "0.9rem", color: "var(--charcoal)" }}>
                    <span style={{ width: 6, height: 6, backgroundColor: "var(--gold)", borderRadius: "50%" }} />
                    {spec}
                  </li>
                ))}
              </ul>
            )}

            <div style={{ display: "flex", gap: "1.5rem" }}>
              <button 
                onClick={() => addItem({ id: product.id, name: product.name, price: product.price, image: product.image })}
                style={{
                  flex: 1,
                  padding: "1.25rem",
                  backgroundColor: "var(--charcoal)",
                  color: "var(--cream)",
                  border: "none",
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: "1.2rem",
                  letterSpacing: "0.1em",
                  transition: "background 0.3s"
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "var(--gold)"}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "var(--charcoal)"}
              >
                ADD TO BAG
              </button>
              <button 
                onClick={() => {
                  addItem({ id: product.id, name: product.name, price: product.price, image: product.image });
                  router.push("/checkout");
                }}
                style={{
                  flex: 1,
                  padding: "1.25rem",
                  backgroundColor: "transparent",
                  color: "var(--charcoal)",
                  border: "2px solid var(--charcoal)",
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: "1.2rem",
                  letterSpacing: "0.1em",
                  
                }}
              >
                BUY IT NOW
              </button>
            </div>
          </motion.div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
