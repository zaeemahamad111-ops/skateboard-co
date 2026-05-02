"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { products } from "@/lib/products";
import { useCart } from "@/lib/store";
// Products moved to @/lib/products

function ProductCard({ product, index }: { product: typeof products[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const { addItem } = useCart();

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.1, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="group relative"
      style={{  }}
    >
      {/* Image Container */}
      <Link href={`/product/${product.id}`} style={{ textDecoration: "none" }}>
        <div 
          style={{ 
            position: "relative", 
            aspectRatio: "1/1.2", 
            overflow: "hidden", 
            backgroundColor: "#F5F5F0",
            borderRadius: "0.5rem"
          }}
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            style={{ position: "absolute", inset: 0 }}
          >
            <Image
              src={product.image}
              alt={product.name}
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              loading="lazy"
              style={{ objectFit: "cover" }}
            />
          </motion.div>

          {/* Quick Add Overlay */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundColor: "rgba(17,17,17,0.0)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {/* View Button */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileHover={{ opacity: 1, scale: 1 }}
              style={{
                backgroundColor: "var(--cream)",
                color: "var(--charcoal)",
                padding: "0.8rem 1.6rem",
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.7rem",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                borderRadius: "100px",
                pointerEvents: "none"
              }}
            >
              View Details
            </motion.div>
          </div>
        </div>
      </Link>

      {/* Info Section */}
      <div style={{ marginTop: "1.25rem", textAlign: "left" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
          <Link href={`/product/${product.id}`} style={{ textDecoration: "none" }}>
            <h3 
              style={{ 
                fontFamily: "'Cormorant Garamond', serif", 
                fontSize: "1.35rem", 
                fontWeight: 500, 
                color: "var(--charcoal)",
                letterSpacing: "-0.01em"
              }}
            >
              {product.name}
            </h3>
          </Link>
          <span 
            style={{ 
              fontFamily: "'DM Sans', sans-serif", 
              fontSize: "0.9rem", 
              fontWeight: 500,
              color: "var(--gold)" 
            }}
          >
            ${product.price}
          </span>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "0.25rem" }}>
          <p 
            style={{ 
              fontFamily: "'DM Sans', sans-serif", 
              fontSize: "0.75rem", 
              color: "rgba(28,28,28,0.5)", 
              textTransform: "uppercase", 
              letterSpacing: "0.15em",
            }}
          >
            {product.category}
          </p>
          <button
            onClick={() => addItem({ id: product.id, name: product.name, price: product.price, image: product.image })}
            style={{
              background: "none",
              border: "none",
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "0.7rem",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "var(--charcoal)",
              textDecoration: "underline",
              padding: 0
            }}
          >
            Add to Bag
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export default function ProductCarousel() {
  const titleRef = useRef<HTMLDivElement>(null);
  const isTitleInView = useInView(titleRef, { once: true, amount: 0.3 });

  return (
    <section
      id="products"
      style={{
        backgroundColor: "var(--light-cream)",
        padding: "10rem 6vw",
        position: "relative",
      }}
    >
      {/* Background large text */}
      <div 
        style={{ 
          position: "absolute", 
          top: "4rem", 
          left: "50%", 
          transform: "translateX(-50%)", 
          opacity: 0.03, 
          fontFamily: "'Bebas Neue', sans-serif", 
          fontSize: "20vw", 
          color: "var(--charcoal)", 
          whiteSpace: "nowrap",
          pointerEvents: "none",
          userSelect: "none"
        }}
      >
        HARDWARE SHOP
      </div>

      {/* Section Header */}
      <div
        ref={titleRef}
        style={{
          marginBottom: "5rem",
          textAlign: "center",
          position: "relative",
          zIndex: 1
        }}
      >

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isTitleInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1, duration: 0.6 }}
          style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: "clamp(3.5rem, 8vw, 8rem)",
            color: "var(--charcoal)",
            lineHeight: 0.9,
          }}
        >
          STREET ARMOR
        </motion.h2>
      </div>

      {/* Product Grid */}
      <div 
        style={{ 
          display: "grid", 
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", 
          gap: "4rem 2rem",
          position: "relative",
          zIndex: 1
        }}
      >
        {products.map((p, i) => (
          <ProductCard key={p.id} product={p} index={i} />
        ))}
      </div>

      {/* View All CTA */}
      <div style={{ marginTop: "6rem", textAlign: "center" }}>
        <button
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "0.7rem",
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            padding: "1.2rem 3rem",
            backgroundColor: "var(--charcoal)",
            color: "var(--cream)",
            border: "none",
            borderRadius: "100px",
            transition: "all 0.3s"
          }}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "var(--gold)"}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "var(--charcoal)"}
        >
          Explore All Gear
        </button>
      </div>
    </section>
  );
}

