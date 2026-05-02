"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";

const footerLinks = {
  Shop: ["Decks", "Trucks", "Wheels", "Apparel", "Completes"],
  Company: ["About", "Careers", "Press", "Contact", "Stockists"],
};

function SocialIcon({ type }: { type: string }) {
  const paths: Record<string, string> = {
    instagram: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z",
    twitter: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.259 5.635zm-1.161 17.52h1.833L7.084 4.126H5.117z",
    youtube: "M23.495 6.205a3.007 3.007 0 0 0-2.088-2.088c-1.87-.501-9.396-.501-9.396-.501s-7.507-.01-9.396.501A3.007 3.007 0 0 0 .527 6.205a31.247 31.247 0 0 0-.522 5.805 31.247 31.247 0 0 0 .522 5.783 3.007 3.007 0 0 0 2.088 2.088c1.868.502 9.396.502 9.396.502s7.506 0 9.396-.502a3.007 3.007 0 0 0 2.088-2.088 31.247 31.247 0 0 0 .5-5.783 31.247 31.247 0 0 0-.5-5.805zM9.609 15.601V8.408l6.264 3.602z",
  };
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: 18, height: 18 }}>
      <path d={paths[type]} />
    </svg>
  );
}

export default function Footer() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <footer ref={ref} style={{ backgroundColor: "var(--off-black)", position: "relative" }}>
      {/* Animated SVG Wave Divider */}
      <div style={{ lineHeight: 0, backgroundColor: "var(--charcoal)" }}>
        <motion.svg
          viewBox="0 0 1440 80"
          preserveAspectRatio="none"
          style={{ display: "block", width: "100%", height: "80px" }}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8 }}
        >
          <motion.path
            d="M0,40 C180,80 360,0 540,40 C720,80 900,0 1080,40 C1260,80 1350,20 1440,40 L1440,80 L0,80 Z"
            fill="var(--off-black)"
            initial={{ pathLength: 0 }}
            animate={isInView ? { pathLength: 1 } : {}}
            transition={{ duration: 1.2, ease: "easeInOut" }}
          />
        </motion.svg>
      </div>

      {/* Video Background Section */}
      <div style={{ position: "relative", overflow: "hidden" }}>
        {/* Video Element */}
        <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
          <video 
            autoPlay 
            loop 
            muted 
            playsInline 
            style={{ width: "100%", height: "100%", objectFit: "cover", transform: "scale(1.15)" }}
          >
            <source src="/footer-video.mp4" type="video/mp4" />
          </video>
          {/* Dark overlay for text readability and smooth transition from wave */}
          <div style={{ 
            position: "absolute", 
            inset: 0, 
            background: "linear-gradient(to bottom, var(--off-black) 0%, rgba(17,17,17,0.85) 15%, rgba(17,17,17,0.95) 100%)" 
          }}></div>
        </div>

        {/* Content Wrapper */}
        <div style={{ position: "relative", zIndex: 1 }}>
          {/* Main Footer Content */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "2fr 1fr 1fr",
              gap: "4rem",
              padding: "4rem 6vw 3rem",
              borderBottom: "1px solid rgba(250,247,242,0.06)",
            }}
          >
            {/* Col 1 — Logo + Tagline */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              <Image
                src="/images/brand/logo_white.png"
                alt="SKATEBOARD & CO"
                width={180}
                height={60}
                style={{ objectFit: "contain", marginBottom: "1rem" }}
              />
              <p
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontStyle: "italic",
                  fontSize: "0.95rem",
                  color: "var(--gold)",
                  marginBottom: "1.5rem",
                  lineHeight: 1.6,
                }}
              >
                Born from the streets.<br />Built for the grind.
              </p>
              <p
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "0.8rem",
                  lineHeight: 1.8,
                  color: "rgba(250,247,242,0.4)",
                  maxWidth: "300px",
                }}
              >
                Premium skateboarding gear crafted for those who live on the pavement. Est. 2019, East LA.
              </p>
  
              {/* Social icons */}
              <div style={{ display: "flex", gap: "1rem", marginTop: "1.5rem" }}>
                {["instagram", "twitter", "youtube"].map((s) => (
                  <motion.a
                    key={s}
                    href="#"
                    whileHover={{ y: -3, color: "var(--gold)" }}
                    style={{
                      color: "rgba(250,247,242,0.4)",
                      transition: "color 0.3s",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: 36,
                      height: 36,
                      border: "1px solid rgba(250,247,242,0.1)",
                      borderRadius: "50%",
                    }}
                  >
                    <SocialIcon type={s} />
                  </motion.a>
                ))}
              </div>
            </motion.div>
  
            {/* Col 2 & 3 — Links */}
            {Object.entries(footerLinks).map(([title, links], colIdx) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.15 * (colIdx + 1), duration: 0.6 }}
              >
                <p
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "0.65rem",
                    letterSpacing: "0.3em",
                    textTransform: "uppercase",
                    color: "var(--gold)",
                    marginBottom: "1.25rem",
                  }}
                >
                  {title}
                </p>
                <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.7rem" }}>
                  {links.map((link) => (
                    <li key={link}>
                      <Link
                        href="#"
                        className="link-underline"
                        style={{
                          fontFamily: "'DM Sans', sans-serif",
                          fontSize: "0.85rem",
                          color: "rgba(250,247,242,0.5)",
                          textDecoration: "none",
                          transition: "color 0.3s",
                        }}
                        onMouseEnter={(e) => ((e.target as HTMLAnchorElement).style.color = "var(--cream)")}
                        onMouseLeave={(e) => ((e.target as HTMLAnchorElement).style.color = "rgba(250,247,242,0.5)")}
                      >
                        {link}
                      </Link>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
  
          {/* Bottom bar */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.5, duration: 0.6 }}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "1.25rem 6vw",
            }}
          >
            <p
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.7rem",
                letterSpacing: "0.1em",
                color: "rgba(250,247,242,0.25)",
              }}
            >
              © 2026 SKATEBOARD & CO. All rights reserved.
            </p>
            <p
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontStyle: "italic",
                fontSize: "0.75rem",
                color: "var(--gold)",
                opacity: 0.6,
              }}
            >
              Handcrafted for the streets.
            </p>
          </motion.div>
        </div>
      </div>
    </footer>
  );
}
