"use client";

import React, { useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValue, useSpring, useTransform } from "motion/react";

interface LocationMapProps {
  location?: string;
  coordinates?: string;
  className?: string;
}

export function LocationMap({
  location = "Brooklyn, NY",
  coordinates = "40.6892° N, 73.9857° W",
  className,
}: LocationMapProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useTransform(mouseY, [-50, 50], [6, -6]);
  const rotateY = useTransform(mouseX, [-50, 50], [-6, 6]);
  const springRotateX = useSpring(rotateX, { stiffness: 300, damping: 30 });
  const springRotateY = useSpring(rotateY, { stiffness: 300, damping: 30 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left - rect.width / 2);
    mouseY.set(e.clientY - rect.top - rect.height / 2);
  };

  return (
    <motion.div
      ref={containerRef}
      className={`relative cursor-pointer select-none ${className || ""}`}
      style={{ perspective: 1000 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => { mouseX.set(0); mouseY.set(0); setIsHovered(false); }}
      onClick={() => setIsExpanded(!isExpanded)}
      role="button"
      tabIndex={0}
      aria-label={isExpanded ? "Collapse map" : "Expand map"}
      onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") setIsExpanded(!isExpanded); }}
    >
      <motion.div
        className="relative overflow-hidden rounded-2xl"
        style={{
          rotateX: springRotateX, rotateY: springRotateY,
          transformStyle: "preserve-3d",
          background: "linear-gradient(145deg, #1C1917 0%, #0C0A09 100%)",
          border: "1px solid rgba(232,141,42,0.1)",
          boxShadow: "0 20px 60px -15px rgba(0,0,0,0.7), 0 0 30px rgba(232,141,42,0.04)",
        }}
        animate={{ height: isExpanded ? 300 : 160 }}
        transition={{ type: "spring", stiffness: 350, damping: 30 }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-[#E88D2A]/5 via-transparent to-[#E88D2A]/3" />

        <AnimatePresence>
          {isExpanded && (
            <motion.div className="pointer-events-none absolute inset-0" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4, delay: 0.1 }}>
              <div className="absolute inset-0 bg-[#141414] rounded-2xl" />
              <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
                <motion.line x1="0%" y1="35%" x2="100%" y2="35%" stroke="rgba(232,141,42,0.2)" strokeWidth="4" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.8, delay: 0.2 }} />
                <motion.line x1="0%" y1="65%" x2="100%" y2="65%" stroke="rgba(232,141,42,0.2)" strokeWidth="4" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.8, delay: 0.3 }} />
                <motion.line x1="30%" y1="0%" x2="30%" y2="100%" stroke="rgba(232,141,42,0.15)" strokeWidth="3" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.6, delay: 0.4 }} />
                <motion.line x1="70%" y1="0%" x2="70%" y2="100%" stroke="rgba(232,141,42,0.15)" strokeWidth="3" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.6, delay: 0.5 }} />
                {[20, 50, 80].map((y, i) => (<motion.line key={`h${i}`} x1="0%" y1={`${y}%`} x2="100%" y2={`${y}%`} stroke="rgba(255,255,255,0.04)" strokeWidth="1.5" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.5, delay: 0.6 + i * 0.08 }} />))}
                {[15, 45, 55, 85].map((x, i) => (<motion.line key={`v${i}`} x1={`${x}%`} y1="0%" x2={`${x}%`} y2="100%" stroke="rgba(255,255,255,0.04)" strokeWidth="1.5" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.5, delay: 0.7 + i * 0.08 }} />))}
              </svg>
              {[{ t: "40%", l: "10%", h: "20%", w: "15%", d: 0.5 }, { t: "15%", l: "35%", h: "15%", w: "12%", d: 0.6 }, { t: "70%", l: "75%", h: "18%", w: "18%", d: 0.65 }, { t: "20%", l: "82%", h: "22%", w: "10%", d: 0.55 }, { t: "55%", l: "5%", h: "12%", w: "8%", d: 0.7 }].map((b, i) => (
                <motion.div key={i} className="absolute rounded-sm border border-white/5" style={{ top: b.t, left: b.l, height: b.h, width: b.w, background: `rgba(255,255,255,${0.025 + i * 0.005})` }} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.4, delay: b.d }} />
              ))}
              <motion.div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" initial={{ scale: 0, y: -20 }} animate={{ scale: 1, y: 0 }} transition={{ type: "spring", stiffness: 400, damping: 20, delay: 0.3 }}>
                <svg width="34" height="34" viewBox="0 0 24 24" fill="none" style={{ filter: "drop-shadow(0 0 12px rgba(232,141,42,0.6))" }}>
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" fill="#E88D2A" />
                  <circle cx="12" cy="9" r="2.5" fill="#0C0A09" />
                </svg>
              </motion.div>
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/50 via-transparent to-transparent" />
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div className="absolute inset-0 opacity-[0.03]" animate={{ opacity: isExpanded ? 0 : 0.03 }}>
          <svg width="100%" height="100%"><defs><pattern id="g" width="20" height="20" patternUnits="userSpaceOnUse"><path d="M 20 0 L 0 0 0 20" fill="none" stroke="#FFF5E6" strokeWidth="0.5" /></pattern></defs><rect width="100%" height="100%" fill="url(#g)" /></svg>
        </motion.div>

        <div className="relative z-10 flex h-full flex-col justify-between p-4">
          <div className="flex items-start justify-between">
            <motion.svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#E88D2A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" animate={{ opacity: isExpanded ? 0 : 1 }}>
              <polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21" /><line x1="9" x2="9" y1="3" y2="18" /><line x1="15" x2="15" y1="6" y2="21" />
            </motion.svg>
            <div className="flex items-center gap-1.5 rounded-full px-2 py-0.5" style={{ background: "rgba(255,255,255,0.05)" }}>
              <div className="w-1.5 h-1.5 rounded-full bg-[#22C55E] animate-pulse" />
              <span className="text-[#A8A29E] text-[9px] font-medium tracking-wide uppercase">Live</span>
            </div>
          </div>
          <div>
            <h3 className="text-[#FFF5E6] text-sm font-medium">{location}</h3>
            <AnimatePresence>
              {isExpanded && <motion.p className="text-[#A8A29E] font-mono text-[10px] mt-0.5" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}>{coordinates}</motion.p>}
            </AnimatePresence>
            <motion.div
              className="h-px mt-1"
              style={{
                background: "linear-gradient(to right, rgba(232,141,42,0.4), transparent)",
                transformOrigin: "left",
              }}
              animate={{ scaleX: isHovered || isExpanded ? 1 : 0.3 }}
            />
            <p className="text-[#57534E] text-[9px] mt-1.5">{isExpanded ? "Click to collapse" : "Tap to expand"}</p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}