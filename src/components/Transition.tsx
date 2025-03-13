"use client";

import { motion } from "framer-motion";
import { useEffect } from "react";
import { gsap } from "gsap";

export default function Transition({ onComplete }: { onComplete: () => void }) {
  useEffect(() => {
    gsap.fromTo(
      ".transition-overlay",
      { scale: 0, opacity: 0 },
      { scale: 1.5, opacity: 1, duration: 1 }
    );

    setTimeout(() => {
      gsap.to(".transition-overlay", {
        scale: 0,
        opacity: 0,
        duration: 1,
        onComplete,
      });
    }, 2500);
  }, []);

  return (
    <motion.div
      className="fixed top-0 left-0 w-full h-full transition-overlay"
      style={{
        background: "radial-gradient(circle, rgba(0,0,0,0.9) 30%, rgba(0,0,0,0) 100%)",
        zIndex: 9999,
      }}
    />
  );
}
