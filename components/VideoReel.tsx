"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

// Sample data for the reels
const REELS_DATA = [
  { id: "v1", type: "video", src: "/skate-reel.mp4", poster: "/images/reels/Skateboarder_under_bridge_202605021258.jpeg", title: "Midnight Session" },
  { id: "i1", type: "image", src: "/images/reels/Skater_doing_trick_mid-air_202605021302.jpeg", title: "Concrete Waves" },
  { id: "i2", type: "image", src: "/images/reels/Skateboard_leaning_rusty_fence_202605021252.jpeg", title: "Urban Drift" },
  { id: "i3", type: "image", src: "/images/reels/Skater_sitting_with_skateboard_202605021302.jpeg", title: "Flight Mode" },
  { id: "i4", type: "image", src: "/images/reels/Skateboard_grip_tape_texture_worn_202605021256.jpeg", title: "The Drop" },
  { id: "i5", type: "image", src: "/images/products/Skateboard_in_dark_studio_202605021308.jpeg", title: "Velocity" },
];

export default function VideoReel() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const [playingVideo, setPlayingVideo] = useState<string | null>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;
    const track = trackRef.current;

    if (!section || !track) return;

    // Calculate the total scrollable width
    const getScrollAmount = () => {
      let trackWidth = track.scrollWidth;
      return -(trackWidth - window.innerWidth);
    };

    const tween = gsap.to(track, {
      x: getScrollAmount,
      ease: "none",
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: () => `+=${getScrollAmount() * -1}`, // The scroll distance equals the horizontal scroll amount
        pin: true,
        scrub: 1, // Smooth scrubbing
        invalidateOnRefresh: true, // Recalculate on resize
      },
    });

    return () => {
      tween.kill();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  const handlePlayVideo = (id: string, index: number) => {
    const video = videoRefs.current[index];
    if (video) {
      if (playingVideo === id) {
        video.pause();
        setPlayingVideo(null);
      } else {
        // Pause currently playing if any (optional, but good for UX)
        videoRefs.current.forEach(v => v && v !== video && v.pause());
        video.play();
        setPlayingVideo(id);
      }
    }
  };

  return (
    <section
      ref={sectionRef}
      style={{
        backgroundColor: "var(--off-black)",
        overflow: "hidden",
        position: "relative",
      }}
      className="h-screen w-full flex flex-col justify-center"
    >
      {/* Background oversized heading */}
      <h2
        style={{
          fontFamily: "'Bebas Neue', sans-serif",
          fontSize: "15vw",
          color: "var(--cream)",
          opacity: 0.05,
          position: "absolute",
          top: "10%",
          left: "-2%",
          pointerEvents: "none",
          lineHeight: 1,
          letterSpacing: "-0.02em",
          userSelect: "none",
          whiteSpace: "nowrap",
        }}
      >
        THE REEL THE REEL
      </h2>

      {/* Section Header */}
      <div className="absolute top-[10%] left-[5%] z-10">
        <span
          className="text-[var(--gold)] text-[12px] font-bold tracking-[0.3em] uppercase mb-2 block"
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          Watch
        </span>
        <h2
          className="text-[clamp(3rem,6vw,5rem)] font-bebas text-[var(--cream)] leading-[1] tracking-[0.02em]"
        >
          THE REEL
        </h2>
      </div>

      {/* Horizontal Track */}
      <div
        ref={trackRef}
        className="flex gap-6 lg:gap-10 px-[5%] items-center mt-20"
        style={{ width: "max-content" }}
      >
        {REELS_DATA.map((item, index) => (
          <div
            key={item.id}
            className="relative group shrink-0"
            style={{
              width: "22vw",
              minWidth: "280px",
              aspectRatio: "9/16",
              borderRadius: "1rem",
              overflow: "hidden",
              backgroundColor: "var(--charcoal)",
              cursor: item.type === "video" ? "pointer" : "default",
            }}
            onClick={() => item.type === "video" && handlePlayVideo(item.id, index)}
          >
            {item.type === "video" ? (
              <>
                <video
                  ref={(el) => {
                    videoRefs.current[index] = el;
                  }}
                  className="w-full h-full object-cover"
                  loop
                  playsInline
                  poster={item.poster}
                >
                  <source src={item.src} type="video/mp4" />
                </video>
                
                {/* Play Button Overlay */}
                {playingVideo !== item.id && (
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center transition-opacity group-hover:bg-black/50">
                    <div className="w-16 h-16 rounded-full border border-[var(--cream)] flex items-center justify-center bg-black/20 backdrop-blur-sm transition-transform group-hover:scale-110">
                      <div className="w-0 h-0 border-t-[10px] border-t-transparent border-l-[16px] border-l-[var(--cream)] border-b-[10px] border-b-transparent ml-1"></div>
                    </div>
                  </div>
                )}
              </>
            ) : (
              <>
                <Image
                  src={item.src}
                  alt={item.title}
                  fill
                  sizes="(max-width: 768px) 300px, 400px"
                  className="object-cover filter brightness-[0.85] transition-transform duration-700 group-hover:scale-105"
                />
              </>
            )}

            {/* Reel Title Gradient Overlay */}
            <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-black/80 to-transparent pointer-events-none">
              <span className="text-[var(--gold)] text-[10px] font-bold tracking-[0.2em] uppercase mb-1 block font-dm">
                {String(index + 1).padStart(2, '0')} // Grindhaven
              </span>
              <h3 className="text-[var(--cream)] font-bebas text-2xl tracking-wider">
                {item.title}
              </h3>
            </div>
          </div>
        ))}

        {/* Show More Card */}
        <div
          className="relative shrink-0 flex items-center justify-center group cursor-pointer border border-[var(--charcoal)] hover:border-[var(--gold)] transition-colors"
          style={{
            width: "22vw",
            minWidth: "280px",
            aspectRatio: "9/16",
            borderRadius: "1rem",
            backgroundColor: "rgba(28,28,28,0.3)",
          }}
        >
          <div className="text-center flex flex-col items-center">
            <div className="w-16 h-16 rounded-full border border-[var(--gold)]/50 flex items-center justify-center mb-4 transition-transform group-hover:scale-110 group-hover:bg-[var(--gold)] group-hover:text-black text-[var(--gold)]">
              <span className="material-symbols-outlined text-3xl">add</span>
            </div>
            <h3 className="text-[var(--cream)] font-bebas text-3xl tracking-wider transition-colors group-hover:text-[var(--gold)]">
              SHOW MORE
            </h3>
            <span className="text-[var(--cream)]/50 text-[12px] font-dm tracking-widest uppercase mt-2">
              View Archive
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
