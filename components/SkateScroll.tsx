"use client";

import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function SkateScroll() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const frameCount = 49;
  const images = useRef<HTMLImageElement[]>([]);

  // Current frame index based on scroll progress (1 to 49)
  const frameIndex = useTransform(scrollYProgress, [0, 1], [1, frameCount]);

  // Text Animations based on scroll ranges
  const opacity1 = useTransform(scrollYProgress, [0.05, 0.2, 0.4, 0.45], [0, 1, 1, 0]);
  const y1 = useTransform(scrollYProgress, [0.05, 0.2, 0.4, 0.45], [50, 0, 0, -50]);

  const opacity2 = useTransform(scrollYProgress, [0.55, 0.7, 0.9, 0.95], [0, 1, 1, 0]);
  const y2 = useTransform(scrollYProgress, [0.55, 0.7, 0.9, 0.95], [50, 0, 0, -50]);

  useEffect(() => {
    // Generate valid frame numbers (1 to 50, skipping 4)
    const validIndices: number[] = [];
    for (let i = 1; i <= 50; i++) {
      if (i !== 4) validIndices.push(i);
    }

    // Preload first image immediately for initial render
    const firstImg = new Image();
    firstImg.src = `/frames/ezgif-frame-001.png`;
    firstImg.onload = () => {
      images.current[1] = firstImg;
      render(1);
    };

    // Preload the rest lazily to avoid blocking hydration
    setTimeout(() => {
      validIndices.slice(1).forEach((frameNum, index) => {
        const img = new Image();
        const frameStr = frameNum.toString().padStart(3, "0");
        img.src = `/frames/ezgif-frame-${frameStr}.png`;
        images.current[index + 2] = img; // index + 2 because we sliced 1 and array is 1-indexed
      });
    }, 100);

    const render = (index: number) => {
      const canvas = canvasRef.current;
      const ctx = canvas?.getContext("2d");
      const img = images.current[index];

      if (canvas && ctx && img && img.complete) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Calculate aspect ratio for object-cover behavior
        const canvasRatio = canvas.width / canvas.height;
        const imgRatio = img.width / img.height;
        
        let drawWidth = canvas.width;
        let drawHeight = canvas.height;
        let offsetX = 0;
        let offsetY = 0;

        if (canvasRatio > imgRatio) {
           drawHeight = canvas.width / imgRatio;
           offsetY = (canvas.height - drawHeight) / 2;
        } else {
           drawWidth = canvas.height * imgRatio;
           offsetX = (canvas.width - drawWidth) / 2;
        }

        ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
      }
    };

    const handleResize = () => {
      if (canvasRef.current && containerRef.current) {
        // Cap DPR at 1.5 for performance — 3x is overkill for a background sequence
        const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
        const logicalWidth = window.innerWidth;
        const logicalHeight = window.innerHeight;

        canvasRef.current.width = logicalWidth * dpr;
        canvasRef.current.height = logicalHeight * dpr;
        
        // CSS display size
        canvasRef.current.style.width = `${logicalWidth}px`;
        canvasRef.current.style.height = `${logicalHeight}px`;
        
        render(Math.round(frameIndex.get()));
      }
    };

    // Initialize canvas sizing
    handleResize();

    // Try to draw initial frame if it was already loaded synchronously
    if (images.current[1]) {
      render(1);
    }

    // Subscribe to framer-motion scroll updates
    const unsubscribe = frameIndex.on("change", (latest) => {
      render(Math.round(latest));
    });

    let resizeTimer: NodeJS.Timeout;
    const debouncedResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(handleResize, 150);
    };

    window.addEventListener("resize", debouncedResize);

    return () => {
      unsubscribe();
      window.removeEventListener("resize", debouncedResize);
      clearTimeout(resizeTimer);
    };
  }, [frameIndex]);

  return (
    // 270vh increases the scrubbing speed by 10%
    <section ref={containerRef} className="h-[270vh] relative bg-[#000]">
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
        <canvas
          ref={canvasRef}
          className="absolute inset-0 block"
        />

        {/* Overlay Text 1 */}
        <motion.div
          style={{ opacity: opacity1, y: y1, willChange: "opacity, transform" }}
          className="absolute top-[40%] left-[8%] z-10 pointer-events-none"
        >
          <span className="text-[var(--gold)] text-[12px] font-bold tracking-[0.4em] uppercase mb-[1rem] block font-dm">
            01 // Engineering
          </span>
          <h2 className="font-bebas text-[clamp(3rem,8vw,7rem)] text-[var(--charcoal)] leading-[0.85] mb-[1.5rem]">
            CRAFTED FOR<br/>THE GRIND
          </h2>
          <p className="text-[rgba(28,28,28,0.8)] text-[14px] max-w-[320px] leading-[1.6] font-dm">
            Every frame captures the raw physics of the pavement. 
            Cold-pressed maple meets precision-engineered hardware.
          </p>
        </motion.div>

        {/* Overlay Text 2 */}
        <motion.div
          style={{ opacity: opacity2, y: y2, willChange: "opacity, transform" }}
          className="absolute bottom-[30%] right-[8%] z-10 text-right pointer-events-none"
        >
          <span className="text-[var(--gold)] text-[12px] font-bold tracking-[0.4em] uppercase mb-[1rem] block font-dm">
            02 // Performance
          </span>
          <h2 className="font-bebas text-[clamp(3rem,8vw,7rem)] text-[var(--charcoal)] leading-[0.85] mb-[1.5rem]">
            UNMATCHED<br/>DYNAMICS
          </h2>
          <p className="text-[rgba(28,28,28,0.8)] text-[14px] max-w-[320px] leading-[1.6] font-dm ml-auto">
            Experience the response of 7-ply Canadian maple. 
            Designed for those who push the limits of street culture.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
