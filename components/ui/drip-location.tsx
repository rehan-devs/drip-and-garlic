// components/drip-location.tsx
"use client";

import React, { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";
import { LocationMap } from "./location-map";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface DripLocationProps {
  heading?: string;
  address?: string;
  phone?: string;
  instagram?: string;
  hours?: { days: string; time: string }[];
  mapLocation?: string;
  mapCoordinates?: string;
  className?: string;
}

const defaultHours = [
  { days: "Mon–Thu", time: "11AM – 12AM" },
  { days: "Fri–Sat", time: "11AM – 3AM" },
  { days: "Sunday", time: "12PM – 11PM" },
];

export function DripLocation({
  heading = "Find the drip.",
  address = "420 Pita Lane, Brooklyn, NY 11201",
  phone = "(718) 555-DRIP",
  instagram = "@dripandgarlic",
  hours = defaultHours,
  mapLocation = "Brooklyn, NY",
  mapCoordinates = "40.6892° N, 73.9857° W",
  className,
}: DripLocationProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const c = () => setIsMobile(window.innerWidth < 768);
    c(); window.addEventListener("resize", c);
    return () => window.removeEventListener("resize", c);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(contentRef.current, { opacity: 0, y: 60 });

      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top 60%",
        onEnter: () => {
          gsap.to(contentRef.current, {
            opacity: 1, y: 0,
            duration: 1.2, ease: "expo.out",
          });
        },
        onLeaveBack: () => {
          gsap.to(contentRef.current, {
            opacity: 0, y: 60,
            duration: 0.6, ease: "power2.in",
          });
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "auto" });
  };

  const scrollToMenu = () => {
    const overlay = document.createElement("div");
    overlay.style.cssText = `
      position: fixed; inset: 0; z-index: 9998;
      background: #0A0A0A; opacity: 0;
      transition: opacity 0.4s ease-in;
      pointer-events: all;
    `;
    document.body.appendChild(overlay);

    requestAnimationFrame(() => {
      overlay.style.opacity = "1";
    });

    setTimeout(() => {
      const allTriggers = ScrollTrigger.getAll();
      const menuTrigger = allTriggers.find(st => {
        const trigger = st.trigger as HTMLElement | null;
        return trigger && trigger.getAttribute("data-section") === "menu";
      });

      if (menuTrigger) {
        // The menu timeline: progress 0 = book off-screen entering
        // We want to land where the book is centered and cover is closed
        // That's roughly 14/100 of the timeline (after the entrance tween)
        // scrollTo = start + (end - start) * targetProgress
        const totalScroll = menuTrigger.end - menuTrigger.start;
        const targetProgress = 0.14; // Book has arrived, cover still closed
        const targetScroll = menuTrigger.start + (totalScroll * targetProgress);
        
        window.scrollTo({ top: targetScroll, behavior: "auto" });
        ScrollTrigger.update();
      } else {
        const menuSection = document.querySelector('[data-section="menu"]');
        if (menuSection) {
          const pinSpacer = menuSection.closest(".pin-spacer");
          if (pinSpacer) {
            const spacerTop = (pinSpacer as HTMLElement).offsetTop;
            // Offset past the entrance animation
            window.scrollTo({ top: spacerTop + window.innerHeight, behavior: "auto" });
          } else {
            menuSection.scrollIntoView({ behavior: "auto", block: "start" });
          }
          ScrollTrigger.update();
        }
      }

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          overlay.style.transition = "opacity 0.5s ease-out";
          overlay.style.opacity = "0";
          overlay.style.pointerEvents = "none";

          setTimeout(() => {
            overlay.remove();
          }, 550);
        });
      });
    }, 450);
  };

  return (
    <section
      ref={containerRef}
      id="location-section"
      className={cn("relative w-full bg-[#0A0A0A] py-16 md:py-20", className)}
    >
      <style dangerouslySetInnerHTML={{
        __html: `.btn-sauce { background: linear-gradient(180deg, #F5A623, #E88D2A 50%, #C76D1A); color: #0C0A09; font-weight: 800; border: none; cursor: pointer; box-shadow: 0 4px 15px rgba(232,141,42,0.3); transition: all 0.3s ease; } .btn-sauce:hover { transform: translateY(-2px); box-shadow: 0 8px 25px rgba(232,141,42,0.4); } .btn-charcoal { background: linear-gradient(180deg, #27272A, #18181B); color: #FFF5E6; font-weight: 700; border: none; cursor: pointer; box-shadow: 0 4px 15px rgba(0,0,0,0.4); transition: all 0.3s ease; } .btn-charcoal:hover { transform: translateY(-2px); background: linear-gradient(180deg, #3F3F46, #27272A); } .hours-card { background: linear-gradient(145deg, #1C1917, #0C0A09); border: 1px solid rgba(255,255,255,0.04); border-left: 3px solid #E88D2A; box-shadow: 0 12px 40px -10px rgba(0,0,0,0.6); border-radius: 14px; } .btt { padding: 0.7em 1.4em; border: none; border-radius: 5px; font-weight: bold; letter-spacing: 3px; text-transform: uppercase; cursor: pointer; color: #E88D2A; font-size: 11px; position: relative; overflow: hidden; outline: 2px solid #E88D2A; background: transparent; transition: all 500ms; } .btt:hover { color: #0C0A09; transform: scale(1.05); outline-color: #F5A623; box-shadow: 4px 5px 17px -4px #E88D2A; } .btt::before { content: ""; position: absolute; left: -50px; top: 0; width: 0; height: 100%; background: #E88D2A; transform: skewX(45deg); z-index: -1; transition: width 500ms; } .btt:hover::before { width: 250%; }`,
      }} />

      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at center, rgba(232,141,42,0.02), transparent 50%)" }} aria-hidden="true" />

      <div ref={contentRef} className="relative z-10 max-w-4xl mx-auto px-5 md:px-8">
        <h2 className="text-center mb-2" style={{ color: "#FFF5E6", fontSize: "clamp(1.8rem, 5vw, 3.5rem)", fontWeight: 900, textShadow: "0 4px 16px rgba(232,141,42,0.2)" }}>
          {heading}
        </h2>
        <p className="text-[#A8A29E] text-xs md:text-sm mb-8 text-center">{address}</p>

        <div className={cn("flex gap-5 mb-8", isMobile ? "flex-col" : "flex-row items-start")}>
          <div className={cn("flex-1", isMobile ? "w-full" : "")}>
            <LocationMap location={mapLocation} coordinates={mapCoordinates} />
          </div>
          <div className={cn("hours-card p-5 flex-shrink-0", isMobile ? "w-full" : "w-56")}>
            <h3 className="text-[#FFF5E6] font-bold text-sm mb-3">Hours</h3>
            <div className="space-y-2.5">
              {hours.map((h, i) => (
                <div key={i} className="flex justify-between"><span className="text-[#A8A29E] text-xs">{h.days}</span><span className="text-[#FFF5E6] text-xs font-bold">{h.time}</span></div>
              ))}
            </div>
            <div className="mt-4 pt-3 border-t border-white/5 flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[#22C55E] animate-pulse" />
              <span className="text-[#22C55E] text-[10px] font-bold tracking-wider uppercase">Open Now</span>
            </div>
          </div>
        </div>

        <div className="flex justify-center gap-4 mb-8 flex-wrap">
          <button
            className="btn-sauce px-6 py-3 rounded-xl text-xs tracking-wider uppercase min-w-[160px]"
            onClick={() => {
              window.open(
                "https://www.google.com/maps/search/?api=1&query=420+Pita+Lane+Brooklyn+NY+11201",
                "_blank",
                "noopener,noreferrer"
              );
            }}
          >
            Order Now
          </button>
          <button
            className="btn-charcoal px-6 py-3 rounded-xl text-xs tracking-wider uppercase min-w-[160px]"
            onClick={scrollToMenu}
          >
            View Menu
          </button>
        </div>

        <div className="flex justify-center items-center gap-6 mb-8 flex-wrap">
          <a href={`https://instagram.com/${instagram.replace("@", "")}`} target="_blank" rel="noopener noreferrer" className="text-[#A8A29E] hover:text-[#E88D2A] transition-colors text-xs flex items-center gap-2">
            📸 {instagram}
          </a>
          <a href={`tel:${phone.replace(/[^0-9+]/g, "")}`} className="text-[#A8A29E] hover:text-[#E88D2A] transition-colors text-xs flex items-center gap-2">
            📞 {phone}
          </a>
        </div>

        <div className="flex justify-center mb-8">
          <button className="btt" onClick={scrollToTop}>↑ Back to Top</button>
        </div>

        <p className="text-[#4A4540] text-[10px] tracking-wider text-center">© 2024 Drip & Garlic. Sauce is life.</p>
      </div>
    </section>
  );
}