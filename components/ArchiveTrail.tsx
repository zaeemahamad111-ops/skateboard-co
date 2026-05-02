"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import ImageTrail from "./ImageTrail";

const archiveImages = [
  "/i_want_a_image_to_202605011527.jpeg",
  "/Man_starting_to_skate_202605012004.jpeg",
  "/Skateboard_on_right_end_202605012004.jpeg",
  "/Skateboard_on_right_end_202605012004 (1).jpeg",
  "/i_want_a_image_to_202605011527.jpeg",
  "/Man_starting_to_skate_202605012004.jpeg",
  "/Skateboard_on_right_end_202605012004.jpeg",
  "/Skateboard_on_right_end_202605012004 (1).jpeg",
];

export default function ArchiveTrail() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section ref={ref} id="archive" style={{ backgroundColor: "var(--cream)", padding: "10rem 5vw", position: "relative", overflow: "hidden" }}>
      <div style={{ textAlign: "center", marginBottom: "4rem", position: "relative", zIndex: 10 }}>
        <motion.p initial={{ opacity: 0, y: 16 }} animate={isInView ? { opacity: 1, y: 0 } : {}}
          style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.7rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "var(--gold)", marginBottom: "0.4rem" }}>
          Move your cursor
        </motion.p>
        <motion.h2 initial={{ opacity: 0, y: 24 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.1, duration: 0.5 }}
          style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(4rem, 10vw, 8rem)", color: "var(--charcoal)", lineHeight: 0.9 }}>
          The Archive
        </motion.h2>
      </div>

      {/* Interactive area */}
      <div style={{ height: "60vh", position: "relative", borderRadius: "1rem", overflow: "hidden", backgroundColor: "var(--light-cream)", border: "1px solid var(--beige)" }}>
        <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", opacity: 0.3, pointerEvents: "none" }}>
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "2rem", color: "var(--charcoal)", fontStyle: "italic" }}>
            Drag to reveal
          </p>
        </div>
        <ImageTrail items={archiveImages} />
      </div>
    </section>
  );
}
