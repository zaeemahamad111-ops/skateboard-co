"use client";
import { useCart } from "@/lib/store";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import Link from "next/link";

export default function CheckoutPage() {
  const { items, getTotal, clearCart } = useCart();

  const handlePlaceOrder = () => {
    alert("Order placed successfully! (Demo Only)");
    clearCart();
    window.location.href = "/";
  };

  return (
    <main style={{ backgroundColor: "var(--cream)", minHeight: "100vh" }}>
      <Navbar />
      
      <div style={{ padding: "10rem 6vw 6rem" }}>
        <h1 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "4rem", marginBottom: "3rem", color: "var(--charcoal)" }}>
          CHECKOUT
        </h1>

        {items.length === 0 ? (
          <div style={{ textAlign: "center", padding: "4rem" }}>
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", fontSize: "1.5rem", marginBottom: "2rem" }}>
              Your bag is empty.
            </p>
            <Link href="/#products" style={{ 
              padding: "1rem 2.5rem", backgroundColor: "var(--charcoal)", color: "var(--cream)", 
              textDecoration: "none", fontFamily: "'Bebas Neue', sans-serif", fontSize: "1.2rem", letterSpacing: "0.1em"
            }}>
              Return to Shop
            </Link>
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr", gap: "4rem" }}>
            
            {/* Form Section */}
            <div style={{ display: "flex", flexDirection: "column", gap: "2.5rem" }}>
              <div style={{ padding: "2rem", backgroundColor: "#fff", borderRadius: "0.5rem", boxShadow: "0 4px 20px rgba(0,0,0,0.03)" }}>
                <h3 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "1.5rem", marginBottom: "1.5rem", letterSpacing: "0.05em" }}>SHIPPING INFORMATION</h3>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }}>
                  <Input label="First Name" />
                  <Input label="Last Name" />
                  <div style={{ gridColumn: "span 2" }}>
                    <Input label="Address" />
                  </div>
                  <Input label="City" />
                  <Input label="Postal Code" />
                </div>
              </div>

              <div style={{ padding: "2rem", backgroundColor: "#fff", borderRadius: "0.5rem", boxShadow: "0 4px 20px rgba(0,0,0,0.03)" }}>
                <h3 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "1.5rem", marginBottom: "1.5rem", letterSpacing: "0.05em" }}>PAYMENT METHOD</h3>
                <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                  <div style={{ border: "1px solid var(--gold)", padding: "1rem", borderRadius: "0.4rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontWeight: 500 }}>Credit / Debit Card</span>
                    <div style={{ display: "flex", gap: "0.5rem" }}>
                       <div style={{ width: 30, height: 20, backgroundColor: "#ddd", borderRadius: 2 }} />
                       <div style={{ width: 30, height: 20, backgroundColor: "#ddd", borderRadius: 2 }} />
                    </div>
                  </div>
                  <Input label="Card Number" />
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }}>
                    <Input label="Expiry Date" />
                    <Input label="CVV" />
                  </div>
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div>
              <div style={{ padding: "2rem", backgroundColor: "#fff", borderRadius: "0.5rem", boxShadow: "0 4px 20px rgba(0,0,0,0.03)", position: "sticky", top: "10rem" }}>
                <h3 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "1.5rem", marginBottom: "1.5rem", letterSpacing: "0.05em" }}>ORDER SUMMARY</h3>
                
                <div style={{ display: "flex", flexDirection: "column", gap: "1rem", marginBottom: "2rem" }}>
                  {items.map(item => (
                    <div key={item.id} style={{ display: "flex", justifyContent: "space-between", fontSize: "0.9rem" }}>
                      <span>{item.name} x{item.quantity}</span>
                      <span>${item.price * item.quantity}</span>
                    </div>
                  ))}
                </div>

                <div style={{ borderTop: "1px solid #eee", paddingTop: "1.5rem", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.85rem", opacity: 0.6 }}>
                    <span>Shipping</span>
                    <span>Calculated at next step</span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "1.25rem", fontWeight: 600, marginTop: "0.5rem" }}>
                    <span>Total</span>
                    <span>${getTotal()}</span>
                  </div>
                </div>

                <button 
                  onClick={handlePlaceOrder}
                  style={{
                    width: "100%",
                    marginTop: "2.5rem",
                    padding: "1.25rem",
                    backgroundColor: "var(--charcoal)",
                    color: "var(--cream)",
                    border: "none",
                    fontFamily: "'Bebas Neue', sans-serif",
                    fontSize: "1.2rem",
                    letterSpacing: "0.15em",
                    transition: "all 0.3s"
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "var(--gold)"}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "var(--charcoal)"}
                >
                  PLACE ORDER
                </button>
              </div>
            </div>

          </div>
        )}
      </div>

      <Footer />
    </main>
  );
}

function Input({ label }: { label: string }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
      <label style={{ fontSize: "0.7rem", textTransform: "uppercase", letterSpacing: "0.1em", fontWeight: 600, color: "rgba(0,0,0,0.5)" }}>{label}</label>
      <input type="text" style={{ padding: "0.8rem", border: "1px solid #eee", borderRadius: "0.3rem", backgroundColor: "#fafafa", outline: "none" }} />
    </div>
  );
}
