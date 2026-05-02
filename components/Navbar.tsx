"use client";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import FlowingMenu from "./FlowingMenu";
import { useCart } from "@/lib/store";

const exploreItems = [
  { link: '/shop', text: 'Street Decks', image: '/images/products/Skateboard_deck_with_wheels_202605021306.jpeg' },
  { link: '/shop', text: 'Hardware', image: '/images/products/Hand_holding_skateboard_wheel_202605021302.jpeg' },
  { link: '/shop', text: 'Apparel', image: '/images/products/Person_holding_skateboard_walking_202605021308.jpeg' },
  { link: '/shop', text: 'Accessories', image: '/images/products/Skateboard_on_urban_sidewalk_fence_202605021306.jpeg' }
];

const navLinks = [
  { label: "Shop", href: "/shop" },
  { label: "The Reel", href: "/#reel" },
  { label: "About", href: "/#about" },
  { label: "Gallery", href: "/#gallery" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [exploreOpen, setExploreOpen] = useState(false);
  const { items, openCart } = useCart();
  const pathname = usePathname();
  const isLightPage = pathname !== "/";
  const isSolid = scrolled || exploreOpen;
  const showDarkNavbar = isSolid || isLightPage;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.3, ease: [0.4, 0, 0.2, 1] as const }}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 9993,
          padding: isSolid ? "0.3rem 1.25rem" : "0.5rem 1.25rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          backgroundColor: isSolid ? "rgba(250,247,242,0.92)" : "transparent",
          backdropFilter: isSolid ? "blur(16px)" : "none",
          borderBottom: isSolid ? "1px solid rgba(184,164,122,0.2)" : "none",
          transition: "all 0.4s cubic-bezier(0.4,0,0.2,1)",
        }}
      >
        {/* Adjusted padding for mobile (1.25rem instead of 2rem) and removed fixed gap to allow space-between to work */}
        <Link href="/" style={{ textDecoration: "none", display: "flex", alignItems: "center" }}>
          <Image
            src={showDarkNavbar ? "/images/brand/logo_black.png" : "/images/brand/logo_white.png"}
            alt="SKATEBOARD & CO"
            width={140}
            height={39}
            style={{ objectFit: "contain", transition: "all 0.4s" }}
          />
        </Link>

        {/* Desktop Links */}
        <div className="desktop-only" style={{ gap: "2.5rem", alignItems: "center" }}>
          <button
            onClick={openCart}
            className="link-underline"
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "0.8rem",
              letterSpacing: "0.15em",
              color: showDarkNavbar ? "var(--charcoal)" : "var(--cream)",
              background: "none",
              border: "none",
              textTransform: "uppercase",
              padding: 0,
              display: "flex",
              alignItems: "center",
              gap: "0.5rem"
            }}
          >
            Cart ({items.length})
          </button>
          <button
            onClick={() => setExploreOpen(!exploreOpen)}
            className="link-underline"
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "0.8rem",
              letterSpacing: "0.15em",
              color: showDarkNavbar ? "var(--charcoal)" : "var(--cream)",
              background: "none",
              border: "none",
              textTransform: "uppercase",
              padding: 0,
            }}
          >
            {exploreOpen ? "Close" : "Explore"}
          </button>
          <Link
            href="/shop"
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "0.75rem",
              letterSpacing: "0.2em",
              color: "var(--cream)",
              backgroundColor: "var(--charcoal)",
              padding: "0.6rem 1.4rem",
              textDecoration: "none",
              textTransform: "uppercase",
              transition: "background 0.3s, color 0.3s",
              border: "1px solid var(--charcoal)",
            }}
            onMouseEnter={(e) => {
              (e.target as HTMLAnchorElement).style.backgroundColor = "var(--gold)";
              (e.target as HTMLAnchorElement).style.borderColor = "var(--gold)";
            }}
            onMouseLeave={(e) => {
              (e.target as HTMLAnchorElement).style.backgroundColor = "var(--charcoal)";
              (e.target as HTMLAnchorElement).style.borderColor = "var(--charcoal)";
            }}
          >
            Shop Now
          </Link>
        </div>

        {/* Mobile Actions (Cart + Menu) */}
        <div className="mobile-only" style={{ alignItems: "center", gap: "1.25rem" }}>
          <button
            onClick={openCart}
            style={{
              background: "none",
              border: "none",
              color: showDarkNavbar ? "var(--charcoal)" : "var(--cream)",
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "0.8rem",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
            }}
          >
            CART ({items.length})
          </button>
          
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
            style={{
              background: "none",
              border: "none",
              display: "flex",
              flexDirection: "column",
              gap: "5px",
              padding: "5px",
              marginRight: "-5px"
            }}
          >
            <motion.span 
              animate={menuOpen ? { rotate: 45, y: 6.5 } : { rotate: 0, y: 0 }}
              style={{ display: "block", width: 24, height: 1.5, background: showDarkNavbar ? "var(--charcoal)" : "var(--cream)", originX: "50%" }} 
            />
            <motion.span 
              animate={menuOpen ? { opacity: 0, x: -10 } : { opacity: 1, x: 0 }}
              style={{ display: "block", width: 24, height: 1.5, background: showDarkNavbar ? "var(--charcoal)" : "var(--cream)" }} 
            />
            <motion.span 
              animate={menuOpen ? { rotate: -45, y: -6.5 } : { rotate: 0, y: 0 }}
              style={{ display: "block", width: 24, height: 1.5, background: showDarkNavbar ? "var(--charcoal)" : "var(--cream)", originX: "50%" }} 
            />
          </button>
        </div>
      </motion.nav>

      {/* Explore Dropdown / Overlay */}
      <AnimatePresence>
        {exploreOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] as const }}
            style={{
              position: "fixed",
              top: isSolid ? "3.5rem" : "4.2rem",
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: "var(--charcoal)",
              zIndex: 9992,
              overflowY: "auto",
              transition: "top 0.4s ease",
            }}
          >
            <div onClick={() => setExploreOpen(false)} style={{ height: "100%" }}>
               <FlowingMenu items={exploreItems} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] as const }}
            style={{
              position: "fixed",
              inset: 0,
              backgroundColor: "var(--charcoal)",
              zIndex: 9989,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: "2rem",
            }}
          >
            <button 
              onClick={() => { setExploreOpen(true); setMenuOpen(false); }}
              style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: "clamp(2rem, 8vw, 4rem)",
                color: "var(--cream)",
                background: "none",
                border: "none",
                letterSpacing: "0.1em",
              }}
            >
              EXPLORE
            </button>
            {navLinks.map((link, i) => (
              <motion.div
                key={link.label}
                initial={{ opacity: 0, x: -40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + i * 0.08 }}
              >
                <Link
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  style={{
                    fontFamily: "'Bebas Neue', sans-serif",
                    fontSize: "clamp(2rem, 8vw, 4rem)",
                    color: "var(--cream)",
                    textDecoration: "none",
                    letterSpacing: "0.1em",
                  }}
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
