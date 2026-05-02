"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Pure CSS skateboard — zero WebGL, zero Three.js
function CSSSkateBoard() {
  return (
    <div style={{ position: "relative", width: 220, height: 90 }}>
      {/* Deck */}
      <motion.div
        animate={{ rotateZ: [0, 2, -2, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        style={{
          position: "absolute",
          top: 20,
          left: 0,
          width: 220,
          height: 28,
          borderRadius: 14,
          background: "linear-gradient(90deg, #D4C5A9 0%, #E8DCC8 50%, #D4C5A9 100%)",
          boxShadow: "0 4px 20px rgba(28,28,28,0.2)",
        }}
      >
        {/* Grip tape */}
        <div style={{
          position: "absolute", inset: "4px 10px",
          borderRadius: 10,
          background: "repeating-linear-gradient(45deg, rgba(28,28,28,0.15) 0px, rgba(28,28,28,0.15) 1px, transparent 1px, transparent 4px)",
        }} />
      </motion.div>
      {/* Front truck */}
      <div style={{ position: "absolute", top: 44, left: 30, width: 40, height: 10, background: "#888", borderRadius: 4 }} />
      {/* Rear truck */}
      <div style={{ position: "absolute", top: 44, left: 150, width: 40, height: 10, background: "#888", borderRadius: 4 }} />
      {/* Wheels */}
      {[22, 46, 152, 176].map((left, i) => (
        <motion.div
          key={i}
          animate={{ rotate: 360 }}
          transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
          style={{
            position: "absolute", top: 50, left,
            width: 20, height: 20, borderRadius: "50%",
            background: "radial-gradient(circle at 35% 35%, #C8B890, #B8A47A)",
            boxShadow: "inset 0 0 4px rgba(0,0,0,0.3)",
          }}
        >
          <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 6, height: 6, borderRadius: "50%", background: "#888" }} />
        </motion.div>
      ))}
    </div>
  );
}

const BRAND = "SKATEBOARD & CO";

export default function Loader({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(p => {
        const next = p + Math.random() * 5 + 2;
        if (next >= 100) { clearInterval(timer); setTimeout(() => setDone(true), 300); return 100; }
        return next;
      });
    }, 50);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (done) setTimeout(onComplete, 700);
  }, [done, onComplete]);

  const letterVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.05, duration: 0.4, ease: [0.4, 0, 0.2, 1] } }),
  };

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.6 } }}
          style={{
            position: "fixed", inset: 0, zIndex: 99997,
            backgroundColor: "#F0EAD6",
            display: "flex", flexDirection: "column",
            alignItems: "center", justifyContent: "center",
          }}
        >
          {/* Skateboard */}
          <CSSSkateBoard />

          {/* Brand name */}
          <div style={{ display: "flex", gap: 1, marginTop: "2rem" }}>
            {BRAND.split("").map((l, i) => (
              <motion.span key={i} custom={i} initial="hidden" animate="visible" variants={letterVariants}
                style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(2.5rem, 7vw, 5rem)", color: "#1C1C1C", letterSpacing: "0.06em", lineHeight: 1 }}>
                {l}
              </motion.span>
            ))}
          </div>

          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }}
            style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", fontSize: "0.9rem", color: "#B8A47A", marginTop: "0.4rem", letterSpacing: "0.2em" }}>
            born from the streets
          </motion.p>

          {/* Progress bar */}
          <div style={{ position: "absolute", bottom: "2.5rem", left: "10%", right: "10%", height: 2, backgroundColor: "#D4C5A9", borderRadius: 2 }}>
            <div style={{ height: "100%", backgroundColor: "#B8A47A", width: `${Math.min(progress, 100)}%`, borderRadius: 2, transition: "width 0.15s linear" }} />
          </div>
          <p style={{ position: "absolute", bottom: "1.2rem", fontFamily: "'DM Sans', sans-serif", fontSize: "0.65rem", letterSpacing: "0.3em", color: "#B8A47A" }}>
            {Math.min(Math.round(progress), 100)}%
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
