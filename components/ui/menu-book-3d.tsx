// components/menu-book-3d.tsx
"use client";

import React, { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface MenuItem { name: string; description: string; price: string; badge?: string; image?: string; }
interface MenuCategory { title: string; emoji?: string; items: MenuItem[]; }
interface MenuBook3DProps { categories?: MenuCategory[]; brandName?: string; className?: string; }

const defaultCategories: MenuCategory[] = [
  { title: "Classic Wraps", emoji: "🌯", items: [
    { name: "The O.G. Chicken Shawarma", description: "Marinated chicken, garlic sauce, pickled turnips", price: "$12", badge: "🔥 BEST SELLER", image: "https://images.unsplash.com/photo-1561758033-d89a9ad46330?w=400&q=80" },
    { name: "Beef Shawarma Drip", description: "Slow-roasted beef, tahini, sumac onions", price: "$14", badge: "🧄 EXTRA GARLIC", image: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=400&q=80" },
    { name: "Mixed Grill Wrap", description: "Chicken & beef combo, all sauces", price: "$16", badge: "💧 DRIP PICK", image: "https://images.unsplash.com/photo-1551782450-a2132b4ba21d?w=400&q=80" },
    { name: "Spicy Lamb Shawarma", description: "Spiced lamb, harissa mayo, peppers", price: "$15", badge: "🌶️ SPICY", image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400&q=80" },
  ]},
  { title: "Loaded Platters", emoji: "🍽️", items: [
    { name: "The Full Drip Platter", description: "Double shawarma, rice, hummus", price: "$22", badge: "🔥 FOR THE HUNGRY", image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&q=80" },
    { name: "Garlic Overload Bowl", description: "Rice, triple garlic sauce, chicken", price: "$18", badge: "🧄 3X GARLIC", image: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=400&q=80" },
    { name: "Mezze Board", description: "Hummus, baba ganoush, falafel, pita", price: "$20", badge: "🍽️ SHARE", image: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=400&q=80" },
    { name: "Beef Kafta Platter", description: "Kafta skewers, tomato, rice", price: "$21", badge: "🥩 GRILLED", image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&q=80" },
  ]},
  { title: "Sides & Sauces", emoji: "🍟", items: [
    { name: "Garlic Fries", description: "Fries drowned in garlic sauce", price: "$7", badge: "🧄 FAN FAVE", image: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=400&q=80" },
    { name: "Hummus & Pita", description: "Classic hummus, warm pita", price: "$6", badge: "🫓 CLASSIC", image: "https://images.unsplash.com/photo-1481931098730-318b6f776db0?w=400&q=80" },
    { name: "Drip Sauce™ Bottle", description: "Take it home", price: "$5", badge: "💧 ICONIC", image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=400&q=80" },
    { name: "Fattoush Salad", description: "Pita chips, veggies, dressing", price: "$9", badge: "🥗 FRESH", image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&q=80" },
  ]},
];

export function MenuBook3D({ categories = defaultCategories, brandName = "DRIP & GARLIC", className }: MenuBook3DProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const coverRef = useRef<HTMLDivElement>(null);
  const p1 = useRef<HTMLDivElement>(null);
  const p2 = useRef<HTMLDivElement>(null);
  const ff1 = useRef<(HTMLDivElement | null)[]>([]);
  const ff2 = useRef<(HTMLDivElement | null)[]>([]);
  const ff3 = useRef<(HTMLDivElement | null)[]>([]);
  const bl1 = useRef<(HTMLDivElement | null)[]>([]);
  const bl2 = useRef<(HTMLDivElement | null)[]>([]);
  const bl3 = useRef<(HTMLDivElement | null)[]>([]);
  const mi1 = useRef<(HTMLDivElement | null)[]>([]);
  const mi2 = useRef<(HTMLDivElement | null)[]>([]);
  const mi3 = useRef<(HTMLDivElement | null)[]>([]);
  const ct1 = useRef<HTMLDivElement>(null);
  const ct2 = useRef<HTMLDivElement>(null);
  const ct3 = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const c = () => setIsMobile(window.innerWidth < 768);
    c(); window.addEventListener("resize", c);
    return () => window.removeEventListener("resize", c);
  }, []);

  useEffect(() => {
    if (isMobile) return;
    let raf: number;
    const fn = (e: MouseEvent) => {
      if (!sceneRef.current || !menuRef.current) return;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const r = sceneRef.current!.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - 0.5;
        const y = (e.clientY - r.top) / r.height - 0.5;
        gsap.to(menuRef.current, { rotationY: x * 6, rotationX: -y * 6, duration: 0.8, ease: "power2.out", overwrite: "auto" });
      });
    };
    window.addEventListener("mousemove", fn);
    return () => { window.removeEventListener("mousemove", fn); cancelAnimationFrame(raf); };
  }, [isMobile]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const pos = isMobile ? [
        { x: -115, y: -155, z: 90, rY: -10, rX: 3, s: 0.82 },
        { x: 115, y: -135, z: 110, rY: 12, rX: -5, s: 0.9 },
        { x: -105, y: 150, z: 80, rY: -15, rX: 6, s: 0.78 },
        { x: 110, y: 140, z: 100, rY: 10, rX: -3, s: 0.85 },
      ] : [
        { x: -290, y: -150, z: 140, rY: -14, rX: 4, s: 1.0 },
        { x: 290, y: -130, z: 170, rY: 16, rX: -7, s: 1.08 },
        { x: -270, y: 150, z: 110, rY: -18, rX: 8, s: 0.95 },
        { x: 280, y: 140, z: 150, rY: 13, rX: -4, s: 1.02 },
      ];

      const imgSize = isMobile ? 120 : 190;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=6500",
          pin: true,
          scrub: 2,
          onEnterBack: () => {
            gsap.set(menuRef.current, { scale: isMobile ? 0.88 : 0.95, y: 0, filter: "blur(0px)", opacity: 1, rotationX: 0, rotationY: 0 });
            gsap.set(coverRef.current, { rotationY: 0 });
            gsap.set(p1.current, { rotationY: 0 });
            gsap.set(p2.current, { rotationY: 0 });
          },
        },
      });

      tl.fromTo(menuRef.current,
        { y: window.innerHeight + 300, rotationX: 15, rotationY: -6, scale: isMobile ? 0.88 : 0.95 },
        { y: 0, rotationX: 6, rotationY: -3, scale: isMobile ? 0.88 : 0.95, duration: 14, ease: "power3.out" },
        0
      );

      tl.to(menuRef.current, { rotationX: 0, rotationY: 0, duration: 10, ease: "power2.out" }, 14);
      tl.to(coverRef.current, { rotationY: -165, duration: 18, ease: "power2.inOut" }, 14);
      tl.fromTo(ct1.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 6 }, 28);

      categories[0]?.items.forEach((_, i) => {
        const el = ff1.current[i];
        if (!el) return;
        const p2 = pos[i];
        tl.fromTo(el,
          { scale: 0.08, z: 0, rotationX: 60, opacity: 0, x: 0, y: 0 },
          { scale: p2.s, z: p2.z, rotationX: p2.rX, rotationY: p2.rY, x: p2.x, y: p2.y, opacity: 1, duration: 9, ease: "back.out(1.4)" },
          30 + i * 2
        );
      });

      mi1.current.forEach((el, i) => {
        if (!el) return;
        tl.fromTo(el, { opacity: 0, x: -12 }, { opacity: 1, x: 0, duration: 4, ease: "power2.out" }, 33 + i * 1);
      });

      categories[0]?.items.forEach((_, i) => {
        const el = ff1.current[i];
        if (el) tl.to(el, { scale: 0.2, opacity: 0, z: -250, duration: 6 }, 52);
      });
      tl.to(ct1.current, { opacity: 0, y: -12, duration: 4 }, 52);
      mi1.current.forEach((el) => { if (el) tl.to(el, { opacity: 0, duration: 3 }, 52); });

      tl.to(p1.current, { rotationY: -165, duration: 12, ease: "power2.inOut" }, 54);
      tl.fromTo(ct2.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 6 }, 60);

      categories[1]?.items.forEach((_, i) => {
        const el = ff2.current[i];
        if (!el) return;
        const p2 = pos[i];
        tl.fromTo(el,
          { scale: 0.08, z: 0, rotationX: 60, opacity: 0, x: 0, y: 0 },
          { scale: p2.s, z: p2.z, rotationX: p2.rX, rotationY: p2.rY, x: p2.x, y: p2.y, opacity: 1, duration: 9, ease: "back.out(1.4)" },
          60 + i * 2
        );
      });

      mi2.current.forEach((el, i) => {
        if (!el) return;
        tl.fromTo(el, { opacity: 0, x: -12 }, { opacity: 1, x: 0, duration: 4, ease: "power2.out" }, 63 + i * 1);
      });

      categories[1]?.items.forEach((_, i) => {
        const el = ff2.current[i];
        if (el) tl.to(el, { scale: 0.2, opacity: 0, z: -250, duration: 6 }, 73);
      });
      tl.to(ct2.current, { opacity: 0, y: -12, duration: 4 }, 73);
      mi2.current.forEach((el) => { if (el) tl.to(el, { opacity: 0, duration: 3 }, 73); });

      tl.to(p2.current, { rotationY: -165, duration: 12, ease: "power2.inOut" }, 75);
      tl.fromTo(ct3.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 6 }, 80);

      categories[2]?.items.forEach((_, i) => {
        const el = ff3.current[i];
        if (!el) return;
        const p2 = pos[i];
        tl.fromTo(el,
          { scale: 0.08, z: 0, rotationX: 60, opacity: 0, x: 0, y: 0 },
          { scale: p2.s * 0.9, z: p2.z * 0.8, rotationX: p2.rX, rotationY: p2.rY, x: p2.x * 0.9, y: p2.y * 0.9, opacity: 1, duration: 9, ease: "back.out(1.4)" },
          80 + i * 2
        );
      });

      mi3.current.forEach((el, i) => {
        if (!el) return;
        tl.fromTo(el, { opacity: 0, x: -12 }, { opacity: 1, x: 0, duration: 4, ease: "power2.out" }, 83 + i * 1);
      });

      categories[2]?.items.forEach((_, i) => {
        const el = ff3.current[i];
        if (el) tl.to(el, { z: -400, opacity: 0, duration: 6 }, 90);
      });
      tl.to(ct3.current, { opacity: 0, duration: 3 }, 90);
      mi3.current.forEach((el) => { if (el) tl.to(el, { opacity: 0, duration: 2 }, 90); });

      tl.to(p2.current, { rotationY: 0, duration: 5, ease: "power2.in" }, 92);
      tl.to(p1.current, { rotationY: 0, duration: 5, ease: "power2.in" }, 93);
      tl.to(coverRef.current, { rotationY: 0, duration: 7, ease: "power2.inOut" }, 94);
      tl.to(menuRef.current, { scale: 0.65, y: -180, filter: "blur(15px)", opacity: 0, duration: 8, ease: "power3.in" }, 96);
    }, containerRef);

    return () => ctx.revert();
  }, [isMobile, categories]);

  const imgSize = isMobile ? 120 : 190;

  const renderMenu = (items: MenuItem[], refs: React.MutableRefObject<(HTMLDivElement | null)[]>) =>
    items.map((item, i) => (
      <div key={i} ref={(el) => { refs.current[i] = el; }} className="py-1.5" style={{ opacity: 0 }}>
        <div className="flex items-baseline justify-between gap-2">
          <span className="text-[#FFF5E6] font-bold text-[11px] md:text-sm leading-snug flex-1 line-clamp-1">{item.name}</span>
          <span className="text-[#E88D2A] font-extrabold text-[11px] md:text-sm flex-shrink-0">{item.price}</span>
        </div>
        <p className="text-[#78716C] text-[9px] md:text-xs mt-0.5 line-clamp-1">{item.description}</p>
      </div>
    ));

  const renderFlying = (items: MenuItem[], fRefs: React.MutableRefObject<(HTMLDivElement | null)[]>, _bRefs: React.MutableRefObject<(HTMLDivElement | null)[]>) =>
    items.map((item, i) => (
      <React.Fragment key={i}>
        <div ref={(el) => { fRefs.current[i] = el; }} className="absolute rounded-2xl overflow-visible" style={{ width: imgSize, height: imgSize + (item.badge ? 32 : 0), top: "50%", left: "50%", marginTop: -(imgSize + (item.badge ? 32 : 0)) / 2, marginLeft: -imgSize / 2, opacity: 0, willChange: "transform, opacity", transformStyle: "preserve-3d" }}>
          {/* Image container */}
          <div className="relative rounded-2xl overflow-hidden" style={{ width: imgSize, height: imgSize, boxShadow: "0 25px 60px -12px rgba(0,0,0,0.9), 0 0 20px rgba(232,141,42,0.1)", border: "2px solid rgba(232,141,42,0.15)" }}>
            <img src={item.image || ""} alt={item.name} className="w-full h-full object-cover" loading="lazy" />
          </div>
          {/* Badge below the image, outside overflow:hidden */}
          {item.badge && (
            <div className="w-full flex justify-center mt-1.5">
              <div className="px-3 py-1 rounded-full" style={{ background: "rgba(12,10,9,0.9)", border: "1px solid rgba(232,141,42,0.25)", backdropFilter: "blur(8px)" }}>
                <span className="text-[8px] md:text-[10px] font-bold text-[#E88D2A] tracking-wider whitespace-nowrap">{item.badge}</span>
              </div>
            </div>
          )}
        </div>
        <div ref={(el) => { _bRefs.current[i] = el; }} style={{ position: "absolute", top: "50%", left: "50%", opacity: 0, pointerEvents: "none", width: 0, height: 0 }} />
      </React.Fragment>
    ));

  return (
    <section ref={containerRef} data-section="menu" className={cn("relative w-full h-screen bg-[#0A0A0A] overflow-hidden", className)}>
      <style dangerouslySetInnerHTML={{ __html: `.mcov { background: linear-gradient(145deg, #1C1917 0%, #0C0A09 100%); box-shadow: 0 60px 120px -30px rgba(232,141,42,0.12), 0 30px 60px -15px rgba(0,0,0,0.9), inset 0 1px 2px rgba(255,255,255,0.05); border: 1px solid rgba(232,141,42,0.08); } .cstr { position:absolute; bottom:0; left:0; right:0; height:3px; background: linear-gradient(90deg, transparent, #E88D2A 30%, #E88D2A 70%, transparent); } .temb { background: linear-gradient(180deg, #F5A623 0%, #E88D2A 50%, #C76D1A 100%); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; filter: drop-shadow(0 2px 4px rgba(0,0,0,0.8)); } .mpd { background: linear-gradient(180deg, #1A1A1A 0%, #141414 100%); box-shadow: inset 2px 0 6px rgba(0,0,0,0.4); } .psp { position:absolute; left:0; top:5%; bottom:5%; width:2px; background: linear-gradient(180deg, transparent, rgba(232,141,42,0.2) 50%, transparent); }` }} />

      <div ref={sceneRef} className="relative w-full h-full flex items-center justify-center" style={{ perspective: isMobile ? "900px" : "1400px" }}>
        <div ref={menuRef} className="relative" style={{ width: isMobile ? 280 : 400, height: isMobile ? 380 : 540, transformStyle: "preserve-3d", willChange: "transform, opacity, filter" }}>
          <div className="absolute inset-0 mcov rounded-r-lg rounded-l-sm" style={{ transform: "translateZ(-6px)" }} />

          <div className="absolute inset-0 mpd rounded-r-lg overflow-hidden" style={{ transform: "translateZ(-4px)" }}>
            <div className="psp" />
            <div className="p-4 md:p-6 pt-5 md:pt-7">
              <div ref={ct3} className="mb-2 md:mb-3" style={{ opacity: 0 }}>
                <span className="text-base md:text-lg mr-1.5">{categories[2]?.emoji}</span>
                <span className="temb text-sm md:text-base font-black uppercase tracking-wide">{categories[2]?.title}</span>
              </div>
              {categories[2] && renderMenu(categories[2].items, mi3)}
            </div>
          </div>

          <div ref={p2} className="absolute inset-0 mpd rounded-r-lg overflow-hidden" style={{ transformOrigin: "left center", transformStyle: "preserve-3d", backfaceVisibility: "hidden", transform: "translateZ(-2px)" }}>
            <div className="psp" />
            <div className="p-4 md:p-6 pt-5 md:pt-7">
              <div ref={ct2} className="mb-2 md:mb-3" style={{ opacity: 0 }}>
                <span className="text-base md:text-lg mr-1.5">{categories[1]?.emoji}</span>
                <span className="temb text-sm md:text-base font-black uppercase tracking-wide">{categories[1]?.title}</span>
              </div>
              {categories[1] && renderMenu(categories[1].items, mi2)}
            </div>
          </div>

          <div ref={p1} className="absolute inset-0 mpd rounded-r-lg overflow-hidden" style={{ transformOrigin: "left center", transformStyle: "preserve-3d", backfaceVisibility: "hidden" }}>
            <div className="psp" />
            <div className="p-4 md:p-6 pt-5 md:pt-7">
              <div ref={ct1} className="mb-2 md:mb-3" style={{ opacity: 0 }}>
                <span className="text-base md:text-lg mr-1.5">{categories[0]?.emoji}</span>
                <span className="temb text-sm md:text-base font-black uppercase tracking-wide">{categories[0]?.title}</span>
              </div>
              {categories[0] && renderMenu(categories[0].items, mi1)}
            </div>
          </div>

          <div ref={coverRef} className="absolute inset-0 mcov rounded-r-lg rounded-l-sm flex flex-col items-center justify-center z-10" style={{ transformOrigin: "left center", transformStyle: "preserve-3d", backfaceVisibility: "hidden" }}>
            <div className="cstr" />
            <div className="text-center px-4">
              <div className="temb text-lg md:text-2xl font-black tracking-wider mb-1.5">{brandName}</div>
              <div className="text-[#78716C] text-[9px] md:text-xs tracking-[0.3em] uppercase font-light">Menu 🔥</div>
            </div>
          </div>

          <div className="absolute inset-0 pointer-events-none" style={{ transformStyle: "preserve-3d" }}>
            {categories[0] && renderFlying(categories[0].items, ff1, bl1)}
            {categories[1] && renderFlying(categories[1].items, ff2, bl2)}
            {categories[2] && renderFlying(categories[2].items, ff3, bl3)}
          </div>
        </div>
      </div>
    </section>
  );
}