"use client";
import Image from "next/image";
import { motion } from "framer-motion";

const words1 = ["BORN", "FROM", "THE"];
const words2 = ["STREETS"];

const wordVariants = {
  hidden: { y: "110%", opacity: 0 },
  visible: (i: number) => ({
    y: 0, opacity: 1,
    transition: { delay: 0.5 + i * 0.1, duration: 0.6, ease: [0.76, 0, 0.24, 1] as const },
  }),
};

export default function Hero() {
  return (
    <section
      id="hero"
      style={{ position: "relative", height: "100vh", minHeight: 700, overflow: "hidden", backgroundColor: "#1C1C1C" }}
    >
      {/* Background — static, no parallax */}
      <div style={{ position: "absolute", inset: 0 }}>
        <Image
          src="/i_want_a_image_to_202605011527.jpeg"
          alt="Skater on the street"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[75%_center] md:object-center"
        />
      </div>

      {/* Gradient overlay — simple, no blend mode */}
      <div style={{
        position: "absolute", inset: 0, zIndex: 1,
        background: "linear-gradient(135deg, rgba(232,220,200,0.55) 0%, rgba(28,28,28,0.5) 40%, rgba(28,28,28,0.82) 100%)",
      }} />

      {/* Top shadow for Navbar visibility */}
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "15rem", background: "linear-gradient(to bottom, rgba(0,0,0,0.5) 0%, transparent 100%)", zIndex: 5, pointerEvents: "none" }} />

      {/* Content */}
      <div style={{
        position: "absolute",
        inset: 0,
        zIndex: 10,
        display: "flex", flexDirection: "column", justifyContent: "flex-end",
        padding: "5vw 6vw",
      }}>
        {/* Thin italic serif line */}
        <div style={{ overflow: "hidden", marginBottom: "0rem" }}>
          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", alignItems: "baseline" }}>
            {words1.map((word, i) => (
              <motion.span key={word} custom={i} initial="hidden" animate="visible" variants={wordVariants}
                style={{ 
                  fontFamily: "'Cormorant Garamond', serif", 
                  fontSize: "clamp(2.5rem, 6vw, 6rem)", 
                  fontWeight: 300, 
                  fontStyle: "italic",
                  color: "#E8DCC8", 
                  letterSpacing: "-0.02em", 
                  lineHeight: 1,
                  willChange: "transform, opacity"                }}>
                {word}
              </motion.span>
            ))}
          </div>
        </div>

        {/* Bold massive condensed line */}
        <div style={{ overflow: "hidden", marginTop: "-1rem" }}>
          {words2.map((word, i) => (
            <motion.span key={word} custom={words1.length + i} initial="hidden" animate="visible" variants={wordVariants}
              style={{ 
                fontFamily: "'Bebas Neue', sans-serif", 
                fontSize: "clamp(6rem, 18vw, 16rem)", 
                color: "#FAF7F2", 
                letterSpacing: "-0.03em", 
                lineHeight: 0.8, 
                display: "block",
                willChange: "transform, opacity"              }}>
              {word}
            </motion.span>
          ))}
        </div>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.0, duration: 0.6 }}
          style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.8rem", letterSpacing: "0.25em", color: "rgba(250,247,242,0.6)", marginTop: "2.5rem", textTransform: "uppercase" }}>
          Handcrafted for the pavement — Est. 2019
        </motion.p>

        {/* Scroll indicator */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }}
          style={{ position: "absolute", bottom: "2rem", right: "3rem", display: "flex", flexDirection: "column", alignItems: "center", gap: "0.4rem", color: "#B8A47A" }}>
          <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.6rem", letterSpacing: "0.3em", textTransform: "uppercase", writingMode: "vertical-rl" }}>Scroll</span>
          <motion.div
            animate={{ scaleY: [1, 1.6, 1] }}
            transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
            style={{ width: 1, height: "1.5rem", backgroundColor: "#B8A47A", transformOrigin: "top" }}
          />
          <svg width="16" height="10" viewBox="0 0 32 16" fill="none">
            <rect x="2" y="4" width="28" height="5" rx="2" fill="currentColor" opacity="0.8" />
            <circle cx="7" cy="13" r="3" fill="currentColor" />
            <circle cx="25" cy="13" r="3" fill="currentColor" />
          </svg>
        </motion.div>
      </div>
    </section>
  );
}
