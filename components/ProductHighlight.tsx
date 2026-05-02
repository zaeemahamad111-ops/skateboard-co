"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";

const specs = [
  { label: "Width", value: '8.25"' },
  { label: "Length", value: '32.0"' },
  { label: "Material", value: "7-ply Canadian Maple" },
  { label: "Concave", value: "Medium" },
  { label: "Finish", value: "Matte UV-coated" },
  { label: "Weight", value: "1.1 kg" },
];

export default function ProductHighlight() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section
      id="highlight"
      ref={ref}
      style={{
        background: "linear-gradient(135deg, var(--cream) 0%, var(--sand) 100%)",
        padding: "7rem 6vw",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "4rem",
          alignItems: "center",
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        {/* Left — Image with simple float (no mouse tracking) */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
          style={{ position: "relative", display: "flex", justifyContent: "center", alignItems: "center", height: "500px" }}
        >
          <motion.div
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            style={{ position: "relative", width: "85%", height: "440px", borderRadius: "1.5rem", overflow: "hidden", boxShadow: "0 32px 64px rgba(28,28,28,0.18)", willChange: "transform" }}
          >
            <Image
              src="/generated/product_deck_premium_1777705804023.png"
              alt="Shadow Star Signature Deck"
              fill
              sizes="50vw"
              loading="lazy"
              style={{ objectFit: "cover" }}
            />
          </motion.div>
          <div style={{ position: "absolute", bottom: "1rem", right: "0", backgroundColor: "var(--gold)", padding: "0.5rem 1.1rem", borderRadius: "100px" }}>
            <p style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "0.85rem", color: "var(--charcoal)", letterSpacing: "0.1em" }}>Signature Edition</p>
          </div>
        </motion.div>

        {/* Right — Product Info */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
        >
          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "0.7rem",
              letterSpacing: "0.35em",
              textTransform: "uppercase",
              color: "var(--gold)",
              marginBottom: "0.75rem",
            }}
          >
            Featured Product
          </p>
          <h2
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: "clamp(3rem, 6vw, 5.5rem)",
              color: "var(--charcoal)",
              lineHeight: 0.9,
              letterSpacing: "0.02em",
              marginBottom: "1.25rem",
            }}
          >
            Shadow Star<br />
            <span style={{ color: "var(--gold)" }}>Signature Deck</span>
          </h2>

          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "0.9rem",
              lineHeight: 1.8,
              color: "rgba(28,28,28,0.7)",
              marginBottom: "2rem",
              maxWidth: "420px",
            }}
          >
            Our flagship deck. Cold-pressed with seven plies of Canadian maple, shaped for maximum pop and concave precision. The Shadow Star is built for skaters who demand performance without sacrificing feel.
          </p>

          {/* Specs Table */}
          <div
            style={{
              borderTop: "1px solid var(--sand)",
              marginBottom: "2rem",
            }}
          >
            {specs.map((spec, i) => (
              <motion.div
                key={spec.label}
                initial={{ opacity: 0, x: 20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.4 + i * 0.07 }}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "0.6rem 0",
                  borderBottom: "1px solid rgba(212,197,169,0.5)",
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "0.82rem",
                }}
              >
                <span style={{ color: "rgba(28,28,28,0.5)", letterSpacing: "0.05em" }}>
                  {spec.label}
                </span>
                <span style={{ color: "var(--charcoal)", fontWeight: 500 }}>{spec.value}</span>
              </motion.div>
            ))}
          </div>

          {/* Price + CTA */}
          <div style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}>
            <p
              style={{
                fontFamily: "'Courier New', monospace",
                fontSize: "1.8rem",
                fontWeight: "bold",
                color: "var(--charcoal)",
              }}
            >
              $89.00
            </p>
            <button
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.75rem",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "var(--charcoal)",
                backgroundColor: "transparent",
                border: "1.5px solid var(--charcoal)",
                padding: "0.85rem 2rem",
                transition: "all 0.35s cubic-bezier(0.4,0,0.2,1)",
                position: "relative",
                overflow: "hidden",
              }}
              onMouseEnter={(e) => {
                const btn = e.currentTarget;
                btn.style.backgroundColor = "var(--charcoal)";
                btn.style.color = "var(--cream)";
              }}
              onMouseLeave={(e) => {
                const btn = e.currentTarget;
                btn.style.backgroundColor = "transparent";
                btn.style.color = "var(--charcoal)";
              }}
            >
              Add to Cart
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
