"use client";
import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [isHovered, setIsHovered] = useState(false);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth springs for high performance cursor follow
  const springConfig = { damping: 20, stiffness: 250, mass: 0.5 };
  const dotX = useSpring(mouseX, springConfig);
  const dotY = useSpring(mouseY, springConfig);
  
  const ringX = useSpring(mouseX, { damping: 25, stiffness: 150 });
  const ringY = useSpring(mouseY, { damping: 25, stiffness: 150 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest("a, button") || target.style.cursor === "pointer") {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [mouseX, mouseY]);

  return (
    <>
      <motion.div
        className="cursor-dot"
        style={{
          x: dotX,
          y: dotY,
          position: "fixed",
          top: 0,
          left: 0,
          pointerEvents: "none",
          zIndex: 99999,
          // Offset to center
          marginLeft: -4,
          marginTop: -4
        }}
      />
      <motion.div
        className="cursor-ring"
        style={{
          x: ringX,
          y: ringY,
          position: "fixed",
          top: 0,
          left: 0,
          pointerEvents: "none",
          zIndex: 99998,
          // Offset to center
          marginLeft: -16,
          marginTop: -16,
          width: isHovered ? 50 : 32,
          height: isHovered ? 50 : 32,
          borderColor: isHovered ? "var(--gold)" : "rgba(28,28,28,0.5)",
          transition: "width 0.25s, height 0.25s, border-color 0.25s"
        }}
      />
    </>
  );
}
