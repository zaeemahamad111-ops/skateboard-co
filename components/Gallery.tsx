"use client";
import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Image from "next/image";

const galleryItems = [
  { id: 1, src: "/images/products/Hand_holding_skateboard_wheel_202605021302.jpeg", alt: "Skate detail", title: "Pure Motion", style: { gridRow: "span 2" } },
  { id: 2, src: "/images/gallery/Empty_skate_park_sunrise_202605021302.jpeg",        alt: "Skater pushing off",         title: "The Dawn",   style: {} },
  { id: 3, src: "/images/gallery/Skateboard_trucks_and_wheels_202605021307.jpeg",      alt: "Board close up",             title: "Hardware",   style: {} },
  { id: 4, src: "/images/gallery/Shadow_of_skater_doing_trick_202605021302.jpeg",  alt: "Shadow of trick",            title: "The Form",  style: { gridColumn: "span 2" } },
  { id: 5, src: "/images/gallery/Skateboarder_riding_deck_motion_…_202605021306.jpeg",        alt: "Skater in motion",           title: "In Motion",  style: {} },
  { id: 6, src: "/images/gallery/Skater_riding_fast_past_camera_202605021256.jpeg",            alt: "Skate culture",              title: "Velocity",    style: {} },
];

export default function Gallery() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const [lightbox, setLightbox] = useState<typeof galleryItems[0] | null>(null);
  const [lightboxIdx, setLightboxIdx] = useState(0);

  const navigate = (dir: 1 | -1) => {
    const i = (lightboxIdx + dir + galleryItems.length) % galleryItems.length;
    setLightboxIdx(i);
    setLightbox(galleryItems[i]);
  };

  return (
    <section id="gallery" style={{ backgroundColor: "var(--beige)", padding: "6rem 5vw" }}>
      <div ref={ref} style={{ marginBottom: "3rem" }}>
        <motion.p initial={{ opacity: 0, y: 16 }} animate={isInView ? { opacity: 1, y: 0 } : {}}
          style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.7rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "var(--gold)", marginBottom: "0.4rem" }}>
          Visual Archive
        </motion.p>
        <motion.h2 initial={{ opacity: 0, y: 24 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.1, duration: 0.5 }}
          style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(3rem, 7vw, 6rem)", color: "var(--charcoal)", lineHeight: 0.9 }}>
          Gallery
        </motion.h2>
      </div>

      {/* Masonry Grid — no mix-blend-mode on images */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gridAutoRows: "280px", gap: "0.75rem" }}>
        {galleryItems.map((item, idx) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ delay: idx * 0.06, duration: 0.45 }}
            onClick={() => { setLightbox(item); setLightboxIdx(idx); }}
            whileHover="hover"
            style={{ ...item.style, position: "relative", borderRadius: "0.75rem", overflow: "hidden", backgroundColor: "var(--sand)",  }}
          >
            <motion.div style={{ position: "absolute", inset: 0 }} variants={{ hover: { scale: 1.05 } }} transition={{ duration: 0.4 }}>
              <Image src={item.src} alt={item.alt} fill sizes="33vw" loading="lazy" style={{ objectFit: "cover" }} />
            </motion.div>
            <motion.div initial={{ opacity: 0 }} variants={{ hover: { opacity: 1 } }} transition={{ duration: 0.25 }}
              style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(28,28,28,0.7) 0%, transparent 55%)", display: "flex", alignItems: "flex-end", padding: "1.1rem" }}>
              <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1rem", color: "var(--cream)" }}>{item.title}</p>
            </motion.div>
          </motion.div>
        ))}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div key="lightbox" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setLightbox(null)}
            style={{ position: "fixed", inset: 0, backgroundColor: "rgba(17,17,17,0.93)", backdropFilter: "blur(12px)", zIndex: 10000, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <motion.div initial={{ scale: 0.92, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.92, opacity: 0 }}
              onClick={e => e.stopPropagation()}
              style={{ position: "relative", width: "min(80vw, 900px)", aspectRatio: "16/10", borderRadius: "1rem", overflow: "hidden" }}>
              <Image src={lightbox.src} alt={lightbox.alt} fill style={{ objectFit: "cover" }} />
              <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "1.5rem", background: "linear-gradient(to top, rgba(17,17,17,0.75), transparent)" }}>
                <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.4rem", color: "var(--cream)" }}>{lightbox.title}</p>
              </div>
            </motion.div>
            <button onClick={() => setLightbox(null)} style={{ position: "fixed", top: "1.5rem", right: "2rem", background: "none", border: "1px solid rgba(250,247,242,0.4)", color: "var(--cream)", width: 38, height: 38, borderRadius: "50%", fontSize: "1rem", display: "flex", alignItems: "center", justifyContent: "center" }}>✕</button>
            {(["←", "→"] as const).map((arrow, i) => (
              <motion.button key={arrow} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
                onClick={e => { e.stopPropagation(); navigate(i === 0 ? -1 : 1); }}
                style={{ position: "fixed", [i === 0 ? "left" : "right"]: "1.5rem", background: "none", border: "1px solid rgba(250,247,242,0.25)", color: "var(--cream)", width: 46, height: 46, borderRadius: "50%", fontSize: "1.1rem", display: "flex", alignItems: "center", justifyContent: "center" }}>
                {arrow}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
