"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import Loader from "@/components/Loader";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import SkateScroll from "@/components/SkateScroll";
import VideoReel from "@/components/VideoReel";
import About from "@/components/About";
import Gallery from "@/components/Gallery";
import Testimonials from "@/components/Testimonials";
import Newsletter from "@/components/Newsletter";
import Footer from "@/components/Footer";

export default function Home() {
  const [showLoader, setShowLoader] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const visited = sessionStorage.getItem("gh_visited");
    if (!visited) {
      setShowLoader(true);
    }
  }, []);

  const handleLoaderComplete = () => {
    sessionStorage.setItem("gh_visited", "1");
    setShowLoader(false);
  };

  // Prevent hydration mismatch by holding render until mounted
  if (!isMounted) {
    return <main style={{ minHeight: "100vh", backgroundColor: "#1C1C1C" }} />;
  }

  return (
    <>
      <AnimatePresence mode="wait">
        {showLoader ? (
          <Loader key="loader" onComplete={handleLoaderComplete} />
        ) : (
          <motion.main
            key="main"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] as const }}
          >
            <Navbar />
            <Hero />
            <SkateScroll />
            <VideoReel />
            <About />
            <Gallery />
            <Testimonials />
            <Newsletter />
            <Footer />
          </motion.main>
        )}
      </AnimatePresence>
    </>
  );
}
