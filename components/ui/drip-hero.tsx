"use client";

import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface DripHeroProps {
  brandLine1?: string;
  brandAmpersand?: string;
  brandLine2?: string;
  tagline?: string;
  subtitle?: string;
  established?: string;
  badge?: string;
  className?: string;
}

export function DripHero({
  brandLine1 = "DRIP",
  brandAmpersand = "&",
  brandLine2 = "GARLIC",
  tagline = "Wrapped tight. Dripping right.",
  subtitle = "The shawarma joint your city needed.",
  established = "Est. 2024 • NYC",
  badge = "OPEN LATE 🔥",
  className,
}: DripHeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const line1Ref = useRef<HTMLDivElement>(null);
  const ampersandRef = useRef<HTMLDivElement>(null);
  const line2Ref = useRef<HTMLDivElement>(null);
  const taglineRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const establishedRef = useRef<HTMLDivElement>(null);
  const grillGlowRef = useRef<HTMLDivElement>(null);
  const filmGrainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Set initial hidden states
      gsap.set(filmGrainRef.current, { opacity: 0 });
      gsap.set(grillGlowRef.current, { opacity: 0, scale: 0.7 });
      gsap.set(line1Ref.current, { y: -250, scale: 1.6, rotationX: 50, opacity: 0 });
      gsap.set(ampersandRef.current, { scale: 0, rotation: -200, opacity: 0 });
      gsap.set(line2Ref.current, { y: 250, scale: 1.6, rotationX: -50, opacity: 0 });
      gsap.set(taglineRef.current, { clipPath: "inset(0 100% 0 0)", opacity: 0 });
      gsap.set(subtitleRef.current, { y: 40, opacity: 0, filter: "blur(12px)" });
      gsap.set(badgeRef.current, { opacity: 0, scale: 0.7, y: -25 });
      gsap.set(establishedRef.current, { opacity: 0, y: 25 });

      const intro = gsap.timeline({
        defaults: { ease: "expo.out" },
        delay: 0.5,
      });

      // Film grain + glow
      intro.to(filmGrainRef.current, { opacity: 0.05, duration: 1.5 }, 0);
      intro.to(grillGlowRef.current, {
        opacity: 0.8, scale: 1, duration: 2, ease: "power2.out",
      }, 0.3);

      // "DRIP" drops first
      intro.to(line1Ref.current, {
        y: 0, scale: 1, rotationX: 0, opacity: 1,
        duration: 1.8, ease: "bounce.out",
      }, 0.8);

      // "&" spins in between
      intro.to(ampersandRef.current, {
        scale: 1, rotation: 0, opacity: 1,
        duration: 1.4, ease: "back.out(1.7)",
      }, 1.8);

      // "GARLIC" drops after &
      intro.to(line2Ref.current, {
        y: 0, scale: 1, rotationX: 0, opacity: 1,
        duration: 1.8, ease: "bounce.out",
      }, 2.4);

      // Tagline
      intro.to(taglineRef.current, {
        clipPath: "inset(0 0% 0 0)", opacity: 1,
        duration: 1.2, ease: "power3.out",
      }, 3.6);

      // Subtitle
      intro.to(subtitleRef.current, {
        y: 0, opacity: 1, filter: "blur(0px)",
        duration: 1, ease: "power2.out",
      }, 4.2);

      // Corner elements
      intro.to(badgeRef.current, {
        opacity: 1, scale: 1, y: 0,
        duration: 0.8, ease: "back.out(1.5)",
      }, 4.6);
      intro.to(establishedRef.current, {
        opacity: 1, y: 0, duration: 0.8,
      }, 4.7);

      // === SCROLL OUT ===
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: "+=1200",
        pin: true,
        scrub: 1.5,
        onUpdate: (self) => {
          const p = self.progress;
          if (contentRef.current) {
            gsap.set(contentRef.current, {
              scale: 1 + p * 0.12,
              filter: `blur(${p * 25}px)`,
              opacity: 1 - p * 1.2,
            });
          }
          if (grillGlowRef.current) {
            gsap.set(grillGlowRef.current, {
              opacity: Math.max(0, 0.8 - p * 1.5),
              scale: 1 + p * 0.2,
            });
          }
          if (badgeRef.current) gsap.set(badgeRef.current, { opacity: Math.max(0, 1 - p * 3) });
          if (establishedRef.current) gsap.set(establishedRef.current, { opacity: Math.max(0, 1 - p * 3) });
        },
        onEnterBack: () => {
          gsap.set(contentRef.current, { scale: 1, filter: "blur(0px)", opacity: 1 });
          gsap.set(grillGlowRef.current, { opacity: 0.8, scale: 1 });
          gsap.set(badgeRef.current, { opacity: 1 });
          gsap.set(establishedRef.current, { opacity: 1 });
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className={cn("relative w-full h-screen flex items-center justify-center overflow-hidden bg-[#0A0A0A]", className)}
      style={{ perspective: "1500px" }}
    >
      <style dangerouslySetInnerHTML={{
        __html: `
          .sauce-drip { position: relative; color: #E88D2A; filter: drop-shadow(0 0 25px rgba(232,141,42,0.5)); }
          .sauce-drip::after {
            content: ''; position: absolute; bottom: -10px; left: 50%; width: 7px; height: 0;
            background: #E88D2A; border-radius: 0 0 50% 50%; animation: drip 3s ease-in-out infinite;
          }
          @keyframes drip {
            0%,100% { height:0; opacity:0; }
            30% { height:22px; opacity:1; }
            60% { height:38px; opacity:1; }
            80% { height:44px; opacity:0.5; transform:translateY(12px); }
            90% { height:0; opacity:0; }
          }
          .grill-glow {
            background: radial-gradient(ellipse at center, rgba(232,141,42,0.18) 0%, rgba(200,80,20,0.08) 35%, transparent 70%);
            animation: ember 4s ease-in-out infinite;
          }
          @keyframes ember { 0%,100% { opacity:0.8; transform:scale(1); } 50% { opacity:1; transform:scale(1.06); } }
          .film-grain-warm {
            position:absolute; inset:0; pointer-events:none; z-index:50; mix-blend-mode:overlay;
            background: url('data:image/svg+xml;utf8,<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"><filter id="n"><feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="4" stitchTiles="stitch"/></filter><rect width="100%25" height="100%25" filter="url(%23n)"/></svg>');
          }
          .text-cream-bold {
            color: #FFF5E6;
            text-shadow: 0 6px 30px rgba(232,141,42,0.35), 0 2px 6px rgba(0,0,0,0.6);
          }
          .badge-glass {
            background: linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.03) 100%);
            backdrop-filter: blur(24px); -webkit-backdrop-filter: blur(24px);
            border: 1px solid rgba(255,255,255,0.1);
            box-shadow: 0 8px 32px rgba(0,0,0,0.5);
          }
        `,
      }} />

      <div ref={filmGrainRef} className="film-grain-warm" aria-hidden="true" />
      <div ref={grillGlowRef} className="grill-glow absolute inset-0 z-0" aria-hidden="true" />

      {/* Layout: DRIP → & → GARLIC in order on both mobile and desktop */}
      <div ref={contentRef} className="relative z-10 flex flex-col items-center text-center px-4" style={{ transformStyle: "preserve-3d", willChange: "transform, opacity, filter" }}>
        <div ref={line1Ref} className="text-cream-bold font-black tracking-tighter leading-none select-none" style={{ fontSize: "clamp(4.5rem, 16vw, 13rem)", fontFamily: "system-ui, -apple-system, sans-serif" }}>
          {brandLine1}
        </div>
        <div ref={ampersandRef} className="sauce-drip font-black leading-none select-none my-[-0.1em]" style={{ fontSize: "clamp(3.5rem, 11vw, 9rem)", fontFamily: "system-ui, -apple-system, sans-serif" }}>
          {brandAmpersand}
        </div>
        <div ref={line2Ref} className="text-cream-bold font-black tracking-tighter leading-none select-none" style={{ fontSize: "clamp(4.5rem, 16vw, 13rem)", fontFamily: "system-ui, -apple-system, sans-serif" }}>
          {brandLine2}
        </div>
        <div ref={taglineRef} className="mt-10 md:mt-14">
          <p className="text-[#A8A29E] font-light tracking-[0.3em] uppercase" style={{ fontSize: "clamp(0.7rem, 1.8vw, 1.05rem)" }}>{tagline}</p>
        </div>
        <div ref={subtitleRef} className="mt-5">
          <p className="text-[#6B6560] font-light" style={{ fontSize: "clamp(0.65rem, 1.3vw, 0.9rem)" }}>{subtitle}</p>
        </div>
      </div>

      <div ref={badgeRef} className="badge-glass absolute top-6 right-6 md:top-10 md:right-10 z-20 px-4 py-2 rounded-xl">
        <span className="text-[#FFF5E6] text-[10px] md:text-sm font-bold tracking-wider">{badge}</span>
      </div>
      <div ref={establishedRef} className="absolute bottom-6 left-6 md:bottom-10 md:left-10 z-20">
        <span className="text-[#4A4540] text-[10px] font-light tracking-[0.15em] uppercase">{established}</span>
      </div>
    </section>
  );
}