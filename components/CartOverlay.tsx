"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/lib/store";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";

export default function CartOverlay() {
  const { items, isOpen, closeCart, removeItem, updateQuantity, getTotal } = useCart();

  // Prevent scroll when cart is open
  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "auto";
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            style={{
              position: "fixed", inset: 0, zIndex: 99998,
              backgroundColor: "rgba(0,0,0,0.4)",
              backdropFilter: "blur(4px)"
            }}
          />

          {/* Side Panel */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            style={{
              position: "fixed", top: 0, right: 0, bottom: 0, width: "100%", maxWidth: "450px",
              backgroundColor: "var(--cream)", zIndex: 99999,
              boxShadow: "-10px 0 30px rgba(0,0,0,0.1)",
              display: "flex", flexDirection: "column"
            }}
          >
            {/* Header */}
            <div style={{ padding: "2rem", borderBottom: "1px solid rgba(28,28,28,0.06)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "2rem", color: "var(--charcoal)", letterSpacing: "0.05em" }}>
                YOUR BAG ({items.length})
              </h2>
              <button onClick={closeCart} style={{ background: "none", border: "none", fontSize: "1.5rem", color: "var(--charcoal)" }}>
                ✕
              </button>
            </div>

            {/* Items */}
            <div style={{ flex: 1, overflowY: "auto", padding: "2rem" }}>
              {items.length === 0 ? (
                <div style={{ textAlign: "center", marginTop: "4rem" }}>
                  <p style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", fontSize: "1.2rem", opacity: 0.5 }}>
                    Your cart is currently empty.
                  </p>
                  <Link href="/shop" onClick={closeCart} style={{ 
                    display: "inline-block", marginTop: "1.5rem", 
                    padding: "0.75rem 2rem", backgroundColor: "var(--charcoal)", color: "var(--cream)",
                    textDecoration: "none", fontFamily: "'DM Sans', sans-serif", fontSize: "0.8rem", letterSpacing: "0.1em", textTransform: "uppercase"
                  }}>
                    Go Shopping
                  </Link>
                </div>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                  {items.map((item) => (
                    <div key={item.id} style={{ display: "flex", gap: "1.25rem", borderBottom: "1px solid rgba(28,28,28,0.04)", paddingBottom: "1.5rem" }}>
                      <div style={{ position: "relative", width: 100, height: 100, backgroundColor: "var(--beige)", borderRadius: 4, overflow: "hidden" }}>
                        <Image src={item.image} alt={item.name} fill style={{ objectFit: "cover" }} />
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem" }}>
                          <h3 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "1.2rem", letterSpacing: "0.05em" }}>{item.name}</h3>
                          <span style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 500 }}>${item.price}</span>
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                          <div style={{ display: "flex", alignItems: "center", border: "1px solid rgba(28,28,28,0.1)", padding: "0.2rem 0.6rem", borderRadius: 4 }}>
                            <button onClick={() => updateQuantity(item.id, -1)} style={{ background: "none", border: "none", padding: "0 0.5rem" }}>-</button>
                            <span style={{ fontSize: "0.85rem", width: "2rem", textAlign: "center" }}>{item.quantity}</span>
                            <button onClick={() => updateQuantity(item.id, 1)} style={{ background: "none", border: "none", padding: "0 0.5rem" }}>+</button>
                          </div>
                          <button onClick={() => removeItem(item.id)} style={{ background: "none", border: "none", fontSize: "0.7rem", textDecoration: "underline", opacity: 0.5 }}>
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div style={{ padding: "2rem", borderTop: "1px solid rgba(28,28,28,0.1)", backgroundColor: "#fff" }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "1.5rem" }}>
                  <span style={{ fontFamily: "'DM Sans', sans-serif", letterSpacing: "0.1em", textTransform: "uppercase", fontSize: "0.8rem", opacity: 0.6 }}>Subtotal</span>
                  <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "1.2rem", fontWeight: 600 }}>${getTotal()}</span>
                </div>
                <Link href="/checkout" onClick={closeCart} style={{ 
                  display: "block", textAlign: "center", padding: "1.25rem", backgroundColor: "var(--charcoal)", color: "var(--cream)",
                  textDecoration: "none", fontFamily: "'Bebas Neue', sans-serif", fontSize: "1.2rem", letterSpacing: "0.1em", transition: "background 0.3s"
                }} onMouseEnter={(e) => (e.target as HTMLElement).style.backgroundColor = "var(--gold)"} onMouseLeave={(e) => (e.target as HTMLElement).style.backgroundColor = "var(--charcoal)"}>
                  CHECKOUT NOW
                </Link>
                <p style={{ textAlign: "center", marginTop: "1rem", fontSize: "0.65rem", color: "rgba(28,28,28,0.4)", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                  Shipping & taxes calculated at checkout.
                </p>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
