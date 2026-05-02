"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";

const paragraphs = [
  {
    num: "01", title: "The Origin",
    text: "SKATEBOARD & CO was born in a cracked parking lot in East LA, where a group of skaters decided that the pavement was their canvas. No sponsors, no rules — just the sound of wheels on concrete and the freedom to fall and get back up.",
  },
  {
    num: "02", title: "The Craft",
    text: "Every deck we press, every wheel we pour — it's done with obsessive attention to feel. We source seven-ply Canadian maple, heat-pressed to perfection, so you feel the board flex with you, not against you.",
  },
  {
    num: "03", title: "The Culture",
    text: "Skating is more than a sport. It's a language. A tribe. A way of seeing the city as a living, breathing obstacle course that belongs to whoever dares to ride it. SKATEBOARD & CO is the uniform of that life.",
  },
];

export default function About() {
  const pullQuoteRef = useRef<HTMLDivElement>(null);
  const isQuoteInView = useInView(pullQuoteRef, { once: true, amount: 0.5 });

  return (
    <section id="about" style={{ backgroundColor: "var(--light-cream)", position: "relative" }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", minHeight: "100vh" }}>

        {/* Left — Sticky Image wrapper must be relative for next/image fill */}
        <div style={{ position: "relative" }}>
          <div style={{ position: "sticky", top: 0, height: "100vh", overflow: "hidden", backgroundColor: "#d8cdb8" }}>
            <Image
              src="/images/products/Skater_POV_looking_at_board_202605021302.jpeg"
              alt="Skater about to ride"
              fill
              sizes="50vw"
              loading="lazy"
              style={{ objectFit: "cover", filter: "brightness(0.9) contrast(1.05)" }}
            />
            <div style={{ position: "absolute", bottom: "2rem", left: "2rem", fontFamily: "'Bebas Neue', sans-serif", fontSize: "0.85rem", letterSpacing: "0.3em", color: "rgba(250,247,242,0.8)" }}>
              SKATEBOARD & CO ©
            </div>
          </div>
        </div>

        {/* Right — Scrolling narrative */}
        <div style={{ padding: "8rem 4rem 8rem 5rem", backgroundColor: "var(--cream)" }}>
          <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }}
            style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.7rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "var(--gold)", marginBottom: "0.75rem" }}>
            Our Story
          </motion.p>
          <motion.h2 initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ delay: 0.1, duration: 0.5 }}
            style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(2.5rem, 5vw, 4.5rem)", color: "var(--charcoal)", marginBottom: "4rem", lineHeight: 0.95 }}>
            Built on Concrete Dreams
          </motion.h2>

          {paragraphs.map((p, i) => <ParagraphBlock key={p.num} para={p} index={i} />)}
        </div>
      </div>

      {/* Pull Quote */}
      <div ref={pullQuoteRef} style={{ backgroundColor: "var(--charcoal)", padding: "6rem 10vw", textAlign: "center", overflow: "hidden" }}>
        <motion.div
          initial={{ clipPath: "inset(0 100% 0 0)" }}
          animate={isQuoteInView ? { clipPath: "inset(0 0% 0 0)" } : {}}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
        >
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", fontSize: "clamp(1.4rem, 3vw, 2.8rem)", color: "var(--cream)", lineHeight: 1.45, maxWidth: 900, margin: "0 auto" }}>
            "The concrete doesn't care who you are. It just asks: are you ready to push?"
          </p>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.75rem", letterSpacing: "0.25em", color: "var(--gold)", marginTop: "1.5rem", textTransform: "uppercase" }}>
            — SKATEBOARD & CO Founder
          </p>
        </motion.div>
      </div>
    </section>
  );
}

function ParagraphBlock({ para, index }: { para: typeof paragraphs[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.25 });

  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 32 }} animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: index * 0.1 }}
      style={{ position: "relative", marginBottom: "4.5rem", paddingLeft: "1.5rem" }}>
      <span style={{ 
        position: "absolute", 
        top: "-2rem", 
        left: "-2.5rem", 
        fontFamily: "'Bebas Neue', sans-serif", 
        fontSize: "8rem", 
        color: "var(--gold)", 
        opacity: 0.07, 
        lineHeight: 1, 
        userSelect: "none", 
        pointerEvents: "none" 
      }}>
        {para.num}
      </span>
      <div style={{ position: "relative" }}>
        <h3 style={{ 
          fontFamily: "'Cormorant Garamond', serif", 
          fontSize: "1.75rem", 
          fontWeight: 500, 
          fontStyle: "italic",
          color: "var(--charcoal)", 
          marginBottom: "0.8rem",
          letterSpacing: "-0.01em"
        }}>
          {para.title}
        </h3>
        <p style={{ 
          fontFamily: "'DM Sans', sans-serif", 
          fontSize: "0.95rem", 
          lineHeight: 1.85, 
          color: "rgba(28,28,28,0.75)",
          maxWidth: "480px"
        }}>
          {para.text}
        </p>
      </div>
    </motion.div>
  );
}
