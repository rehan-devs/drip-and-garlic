// components/loader.tsx
"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

export function Loader({ onComplete }: { onComplete?: () => void }) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(() => onComplete?.(), 500);
    }, 2400);
    return () => clearTimeout(timer);
  }, [onComplete]);

  const letters = ["L", "O", "A", "D", "I", "N", "G"];

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#0A0A0A]"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          <div className="flex items-end justify-center h-24 md:h-32 overflow-visible">
            {letters.map((letter, i) => (
              <motion.span
                key={i}
                className="inline-block text-[#E88D2A] font-black text-4xl md:text-6xl"
                style={{ willChange: "transform, opacity" }}
                initial={{ y: 60, opacity: 0 }}
                animate={{ 
                  y: [60, 0, -8, 0],
                  opacity: [0, 1, 1, 1]
                }}
                transition={{
                  duration: 0.6,
                  delay: i * 0.08,
                  ease: [0.22, 1, 0.36, 1],
                  times: [0, 0.6, 0.8, 1]
                }}
              >
                {letter}
              </motion.span>
            ))}
          </div>

          <motion.p
            className="mt-6 text-[#57534E] text-xs tracking-[0.2em] uppercase"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            Drip & Garlic
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}