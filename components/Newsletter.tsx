"use client";
import { useRef, useState } from "react";
import MagnetLines from "./MagnetLines";
import { motion, useInView } from "framer-motion";

function FloatingSkate({ style }: { style: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 80 30" fill="none" style={{ position: "absolute", opacity: 0.12, ...style }}>
      <rect x="4" y="8" width="72" height="10" rx="4" fill="var(--cream)" />
      <circle cx="16" cy="24" r="5" fill="var(--cream)" />
      <circle cx="64" cy="24" r="5" fill="var(--cream)" />
    </svg>
  );
}

function SplitText({ text }: { text: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.4 });
  const half = Math.ceil(text.length / 2);
  return (
    <div ref={ref} style={{ display: "flex", justifyContent: "center", overflow: "hidden" }}>
      <motion.span
        initial={{ x: 80, opacity: 0 }}
        animate={isInView ? { x: 0, opacity: 1 } : {}}
        transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
        style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(3rem, 10vw, 10rem)", color: "var(--cream)", lineHeight: 0.9 }}
      >
        {text.slice(0, half)}
      </motion.span>
      <motion.span
        initial={{ x: -80, opacity: 0 }}
        animate={isInView ? { x: 0, opacity: 1 } : {}}
        transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
        style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(3rem, 10vw, 10rem)", color: "var(--gold)", lineHeight: 0.9 }}
      >
        {text.slice(half)}
      </motion.span>
    </div>
  );
}

export default function Newsletter() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) setSubmitted(true);
  };

  return (
    <section id="newsletter" ref={ref} style={{ backgroundColor: "var(--charcoal)", padding: "8rem 5vw", textAlign: "center", position: "relative", overflow: "hidden" }}>

      {/* MagnetLines background */}
      <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", opacity: 0.15 }}>
        <MagnetLines
          rows={11}
          columns={25}
          containerSize="120vw"
          lineColor="var(--gold)"
          lineWidth="0.4vw"
          lineHeight="3vw"
          baseAngle={45}
        />
      </div>

      <div style={{ position: "relative", zIndex: 1 }}>
        <SplitText text="SKATE OR LEAVE" />
        <motion.p initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.5 }}
          style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", fontSize: "1.1rem", color: "rgba(250,247,242,0.55)", margin: "1.5rem 0 3rem", letterSpacing: "0.05em" }}>
          Join the crew. No spam. Only the good stuff.
        </motion.p>
        <motion.form initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.7 }}
          onSubmit={handleSubmit} style={{ display: "flex", justifyContent: "center", maxWidth: "480px", margin: "0 auto" }}>
          {!submitted ? (
            <>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="your@email.com" required
                style={{ flex: 1, padding: "0.9rem 1.5rem", backgroundColor: "transparent", border: "1px solid rgba(250,247,242,0.25)", borderRight: "none", color: "var(--cream)", fontFamily: "'DM Sans', sans-serif", fontSize: "0.85rem", outline: "none" }} />
              <button type="submit"
                style={{ padding: "0.9rem 1.8rem", backgroundColor: "transparent", border: "1px solid var(--gold)", color: "var(--gold)", fontFamily: "'DM Sans', sans-serif", fontSize: "0.75rem", letterSpacing: "0.2em", textTransform: "uppercase", transition: "all 0.3s" }}
                onMouseEnter={(e) => { (e.currentTarget).style.cssText += "background-color:var(--gold);color:var(--charcoal);" }}
                onMouseLeave={(e) => { (e.currentTarget).style.backgroundColor = "transparent"; (e.currentTarget).style.color = "var(--gold)"; }}>
                Subscribe
              </button>
            </>
          ) : (
            <motion.p initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
              style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", fontSize: "1.2rem", color: "var(--gold)" }}>
              ✓ You're in. Welcome to the crew.
            </motion.p>
          )}
        </motion.form>
        <motion.p initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}} transition={{ delay: 0.9 }}
          style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.65rem", letterSpacing: "0.15em", color: "rgba(250,247,242,0.25)", marginTop: "1.5rem", textTransform: "uppercase" }}>
          No spam ever. Unsubscribe anytime.
        </motion.p>
      </div>
    </section>
  );
}
