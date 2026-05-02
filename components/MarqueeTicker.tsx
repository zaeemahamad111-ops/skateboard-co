"use client";
import { useRef, useState } from "react";

const ticker = "SKATE • GRIND • FLOW • PUSH • TRICK • CULTURE • STREETS • CONCRETE • WHEELS • GRIND • SKATE • FLOW • PUSH • TRICK •";

export default function MarqueeTicker() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div style={{ overflow: "hidden", position: "relative" }}>
      {/* Stripe 1 — Cream bg, charcoal text */}
      <div
        style={{
          backgroundColor: "var(--cream)",
          borderTop: "1px solid var(--sand)",
          borderBottom: "1px solid var(--sand)",
          padding: "1.1rem 0",
          overflow: "hidden",
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className={`marquee-track ${isHovered ? "slow" : ""}`}>
          {[...Array(2)].map((_, idx) => (
            <span
              key={idx}
              style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: "clamp(1.5rem, 3vw, 2.5rem)",
                color: "var(--charcoal)",
                letterSpacing: "0.06em",
                whiteSpace: "nowrap",
                paddingRight: "3rem",
              }}
            >
              {ticker}
            </span>
          ))}
        </div>
      </div>

      {/* Stripe 2 — Charcoal bg, cream text */}
      <div
        style={{
          backgroundColor: "var(--charcoal)",
          padding: "1.1rem 0",
          overflow: "hidden",
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div
          className={`marquee-track ${isHovered ? "slow" : ""}`}
          style={{ animationDirection: "reverse" }}
        >
          {[...Array(2)].map((_, idx) => (
            <span
              key={idx}
              style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: "clamp(1.5rem, 3vw, 2.5rem)",
                color: "var(--gold)",
                letterSpacing: "0.06em",
                whiteSpace: "nowrap",
                paddingRight: "3rem",
              }}
            >
              {ticker}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
