"use client";
import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Image from "next/image";

const testimonials = [
  {
    id: 1,
    quote: "SKATEBOARD & CO decks have the perfect pop. I've been riding their 8.25 for six months and it still feels brand new.",
    name: "MARCUS VELO",
    role: "Pro Street Skater",
    avatar: "/images/gallery/Shadow_of_skater_doing_trick_202605021302.jpeg",
  },
  {
    id: 2,
    quote: "The craftsmanship is unreal. You can feel every layer of maple when you ollie. This is how decks should be made.",
    name: "KEIKO TANAKA",
    role: "Vert Rider",
    avatar: "/images/gallery/Skateboarder_riding_deck_motion_…_202605021306.jpeg",
  },
  {
    id: 3,
    quote: "Been skating 15 years. SKATEBOARD & CO is the only brand I trust when it comes to quality and street authenticity.",
    name: "DARIO REYES",
    role: "Street Photographer",
    avatar: "/images/gallery/Skater_riding_fast_past_camera_202605021256.jpeg",
  },
  {
    id: 4,
    quote: "The Gold Rush wheels are a game-changer on rough pavement. Smooth ride, insane grip. Wouldn't swap them for anything.",
    name: "ZARA OKAFOR",
    role: "Freestyle Skater",
    avatar: "/images/reels/Skater_doing_trick_mid-air_202605021302.jpeg",
  },
];

export default function Testimonials() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const [active, setActive] = useState(1);

  const prev = () => setActive((a) => (a - 1 + testimonials.length) % testimonials.length);
  const next = () => setActive((a) => (a + 1) % testimonials.length);

  return (
    <section
      id="testimonials"
      style={{
        backgroundColor: "var(--cream)",
        padding: "7rem 5vw",
        overflow: "hidden",
        position: "relative",
      }}
    >
      {/* Header */}
      <div ref={ref} style={{ textAlign: "center", marginBottom: "4rem" }}>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "0.75rem",
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            color: "var(--gold)",
            marginBottom: "0.5rem",
          }}
        >
          Community
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1, duration: 0.6 }}
          style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: "clamp(2.5rem, 6vw, 5rem)",
            color: "var(--charcoal)",
            letterSpacing: "0.03em",
            lineHeight: 0.9,
          }}
        >
          What the Streets Say
        </motion.h2>
      </div>

      {/* 3D Carousel Container */}
      <div
        style={{
          position: "relative",
          perspective: "1200px",
          height: "400px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {testimonials.map((t, i) => {
          const offset = i - active;
          const isActive = i === active;
          const absOffset = Math.abs(offset);

          return (
            <motion.div
              key={t.id}
              onClick={() => setActive(i)}
              animate={{
                rotateY: offset * 38,
                translateX: offset * 300,
                scale: isActive ? 1 : 0.82,
                opacity: absOffset > 1 ? 0 : isActive ? 1 : 0.55,
                zIndex: isActive ? 10 : 10 - absOffset,
              }}
              transition={{ type: "spring", stiffness: 60, damping: 20 }}
              style={{
                position: "absolute",
                width: "min(380px, 85vw)",
                backgroundColor: "var(--light-cream)",
                borderRadius: "1.5rem",
                padding: "2.5rem",
                boxShadow: isActive ? "0 24px 60px rgba(28,28,28,0.15)" : "0 8px 24px rgba(28,28,28,0.06)",
                border: "1px solid rgba(184,164,122,0.15)",
                willChange: "transform, opacity",
              }}
            >
              {/* Gold quote mark */}
              <div
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "5rem",
                  color: "var(--gold)",
                  lineHeight: 0.8,
                  marginBottom: "0.5rem",
                  opacity: 0.5,
                }}
              >
                "
              </div>

              <p
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontStyle: "italic",
                  fontSize: "1.05rem",
                  lineHeight: 1.7,
                  color: "var(--charcoal)",
                  marginBottom: "2rem",
                }}
              >
                {t.quote}
              </p>

              <div style={{ display: "flex", alignItems: "center", gap: "0.9rem" }}>
                <div
                  style={{
                    width: "46px",
                    height: "46px",
                    borderRadius: "50%",
                    overflow: "hidden",
                    backgroundColor: "var(--beige)",
                    flexShrink: 0,
                    position: "relative",
                  }}
                >
                  <Image
                    src={t.avatar}
                    alt={t.name}
                    fill
                    sizes="46px"
                    style={{ objectFit: "cover" }}
                  />
                </div>
                <div>
                  <p
                    style={{
                      fontFamily: "'Bebas Neue', sans-serif",
                      fontSize: "1rem",
                      color: "var(--charcoal)",
                      letterSpacing: "0.08em",
                    }}
                  >
                    {t.name}
                  </p>
                  <p
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "0.7rem",
                      color: "var(--gold)",
                      letterSpacing: "0.15em",
                    }}
                  >
                    {t.role}
                  </p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Controls */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "1rem",
          marginTop: "3rem",
          alignItems: "center",
        }}
      >
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={prev}
          style={{
            background: "none",
            border: "1px solid var(--sand)",
            width: "44px",
            height: "44px",
            borderRadius: "50%",
            color: "var(--charcoal)",
            fontSize: "1rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "border-color 0.3s",
          }}
        >
          ←
        </motion.button>

        {/* Dots */}
        <div style={{ display: "flex", gap: "0.4rem" }}>
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              style={{
                width: i === active ? "24px" : "6px",
                height: "6px",
                borderRadius: "3px",
                backgroundColor: i === active ? "var(--gold)" : "var(--sand)",
                border: "none",
                transition: "all 0.3s",
              }}
            />
          ))}
        </div>

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={next}
          style={{
            background: "none",
            border: "1px solid var(--sand)",
            width: "44px",
            height: "44px",
            borderRadius: "50%",
            color: "var(--charcoal)",
            fontSize: "1rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          →
        </motion.button>
      </div>
    </section>
  );
}
