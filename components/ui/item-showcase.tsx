"use client";

import React, { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface SpotlightItem {
  name: string;
  fullName: string;
  description: string;
  price: string;
  badge?: string;
  image: string;
  bgAccent?: string;
}

interface ItemShowcaseProps {
  items?: SpotlightItem[];
  onOrderClick?: () => void;
  className?: string;
}

const defaultItems: SpotlightItem[] = [
  { name: "The O.G.", fullName: "Original Chicken Shawarma", description: "The one that started it all. Juicy marinated chicken thigh, our legendary garlic sauce, pickled turnips, fresh tomato — all wrapped in house-made saj bread.", price: "$12", badge: "🔥 #1 SELLER", image: "https://images.unsplash.com/photo-1561758033-d89a9ad46330?w=800&q=80", bgAccent: "rgba(232,141,42,0.08)" },
  { name: "The Drip.", fullName: "Beef Shawarma Drip", description: "Slow-roasted beef stacked high, tahini drizzle cascading down, sumac onions, fresh parsley, house pickles. This is the one that drips.", price: "$14", badge: "💧 SIGNATURE", image: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=800&q=80", bgAccent: "rgba(200,80,20,0.08)" },
  { name: "Full Send.", fullName: "The Full Drip Platter", description: "Double chicken shawarma over saffron rice, hummus, tabbouleh, warm pita, all four sauces. This isn't a meal — it's a commitment.", price: "$22", badge: "🍽️ GO BIG", image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&q=80", bgAccent: "rgba(180,120,40,0.08)" },
  { name: "Garlic Everything.", fullName: "Garlic Overload Fries", description: "Crispy fries absolutely drowned in our signature garlic sauce. Sumac dust on top because we're fancy like that.", price: "$7", badge: "🧄 UNHINGED", image: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=800&q=80", bgAccent: "rgba(220,180,60,0.06)" },
];

export function ItemShowcase({ items = defaultItems, onOrderClick, className }: ItemShowcaseProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);
  const textRefs = useRef<(HTMLDivElement | null)[]>([]);
  const spotlightRefs = useRef<(HTMLDivElement | null)[]>([]);

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const c = () => setIsMobile(window.innerWidth < 768);
    c(); window.addEventListener("resize", c);
    return () => window.removeEventListener("resize", c);
  }, []);

  // NO tilt effect — removed completely to prevent flip/rotation glitches
  useEffect(() => {
    // No mouse movement effects
  }, [isMobile]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hide all
      itemRefs.current.forEach((el) => { if (el) gsap.set(el, { autoAlpha: 0 }); });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=5000",
          pin: true,
          scrub: 2,
          onEnterBack: () => {
            // Reset last item visible
            const last = items.length - 1;
            if (itemRefs.current[last]) gsap.set(itemRefs.current[last], { autoAlpha: 1 });
            // Reset all images to normal — no compression, no rotation
            imageRefs.current.forEach((el) => {
              if (el) gsap.set(el, { x: 0, y: 0, scale: 1, opacity: 1, rotation: 0, rotationX: 0, rotationY: 0, filter: "blur(0px)" });
            });
            textRefs.current.forEach((el) => {
              if (el) gsap.set(el, { y: 0, opacity: 1, filter: "blur(0px)" });
            });
          },
        },
      });

      const seg = 100 / items.length;

      items.forEach((_, i) => {
        const s = i * seg;

        // Fade in container
        tl.to(itemRefs.current[i], { autoAlpha: 1, duration: 2 }, s);

        // Spotlight glow
        tl.fromTo(spotlightRefs.current[i],
          { opacity: 0, scale: 0.8 },
          { opacity: 1, scale: 1, duration: 8 },
          s
        );

        // Image — ONLY fade + slide, NO rotation at all
        tl.fromTo(imageRefs.current[i],
          { x: isMobile ? 0 : 200, y: isMobile ? 50 : 0, scale: isMobile ? 0.8 : 0.6, opacity: 0 },
          { x: 0, y: 0, scale: 1, opacity: 1, duration: 12, ease: "expo.out" },
          s
        );

        // Text block
        tl.fromTo(textRefs.current[i],
          { y: 50, opacity: 0, filter: "blur(6px)" },
          { y: 0, opacity: 1, filter: "blur(0px)", duration: 10, ease: "expo.out" },
          s + 3
        );

        // Exit (not last)
        if (i < items.length - 1) {
          const exitStart = s + seg * 0.75;

          // Exit — ONLY fade + slide, NO rotation
          tl.to(imageRefs.current[i], {
            x: isMobile ? 0 : -120,
            y: isMobile ? -40 : 0,
            scale: 0.85,
            opacity: 0,
            duration: 8,
            ease: "power2.in",
          }, exitStart);

          tl.to(textRefs.current[i], {
            y: -30, opacity: 0,
            duration: 6, ease: "power2.in",
          }, exitStart);

          tl.to(spotlightRefs.current[i], { opacity: 0, duration: 5 }, exitStart);
          tl.to(itemRefs.current[i], { autoAlpha: 0, duration: 2 }, exitStart + 6);
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, [items, isMobile]);

  return (
    <section ref={containerRef} className={cn("relative w-full h-screen bg-[#0A0A0A] overflow-hidden", className)} style={{ perspective: isMobile ? "800px" : "1400px" }}>
      <style dangerouslySetInnerHTML={{
        __html: `
          .item-name-hero {
            color: #FFF5E6;
            font-size: clamp(2rem, 5.5vw, 4.5rem);
            font-weight: 900;
            line-height: 1.05;
            text-shadow: 0 4px 20px rgba(232,141,42,0.2);
            overflow-wrap: break-word;
            word-break: break-word;
          }
          .food-img-spot {
            border-radius: 18px; overflow: hidden;
            box-shadow: 0 25px 70px -12px rgba(0,0,0,0.8), 0 0 30px rgba(232,141,42,0.06);
            border: 1px solid rgba(255,255,255,0.03);
          }
          .badge-chip {
            display: inline-flex; align-items: center;
            padding: 4px 10px; border-radius: 100px;
            background: rgba(232,141,42,0.1); border: 1px solid rgba(232,141,42,0.18);
            color: #E88D2A; font-size: 10px; font-weight: 700;
            letter-spacing: 0.05em; text-transform: uppercase;
          }
          .order-btn-item {
            background: linear-gradient(180deg, #F5A623 0%, #E88D2A 50%, #C76D1A 100%);
            color: #0C0A09; font-weight: 700; padding: 10px 24px; border-radius: 12px;
            font-size: 11px; letter-spacing: 0.12em; text-transform: uppercase;
            border: none; cursor: pointer; box-shadow: 0 4px 15px rgba(232,141,42,0.3);
            transition: all 0.3s ease;
          }
          .order-btn-item:hover { transform: translateY(-2px); box-shadow: 0 8px 25px rgba(232,141,42,0.4); }
        `,
      }} />

      {items.map((item, i) => (
        <div
          key={i}
          ref={(el) => { itemRefs.current[i] = el; }}
          className={cn("absolute inset-0 flex items-center justify-center px-5 md:px-12 lg:px-20 invisible", isMobile ? "flex-col gap-5" : "flex-row gap-10 lg:gap-16")}
        >
          {/* Spotlight */}
          <div ref={(el) => { spotlightRefs.current[i] = el; }} className="absolute pointer-events-none" style={{ background: `radial-gradient(ellipse, ${item.bgAccent || "rgba(232,141,42,0.05)"} 0%, transparent 60%)`, width: "500px", height: "500px", left: isMobile ? "50%" : "25%", top: "50%", transform: "translate(-50%,-50%)", filter: "blur(60px)" }} aria-hidden="true" />

          {/* Image — NO transform-style for 3D */}
          <div
            ref={(el) => { imageRefs.current[i] = el; }}
            className={cn("food-img-spot relative flex-shrink-0", isMobile ? "w-[220px] h-[220px]" : "w-[300px] h-[300px] lg:w-[380px] lg:h-[380px]")}
            style={{ willChange: "transform, opacity" }}
          >
            <img src={item.image} alt={item.fullName} className="w-full h-full object-cover" loading="lazy" />
          </div>

          {/* Text group */}
          <div
            ref={(el) => { textRefs.current[i] = el; }}
            className={cn("relative z-10 flex flex-col", isMobile ? "items-center text-center max-w-[320px]" : "items-start max-w-md")}
            style={{ willChange: "transform, opacity, filter" }}
          >
            {item.badge && <div className="badge-chip mb-2 md:mb-3">{item.badge}</div>}
            <h3 className="item-name-hero mb-1 md:mb-2">{item.name}</h3>
            <p className="text-[#E88D2A] text-[10px] md:text-xs font-bold tracking-wider uppercase mb-2 md:mb-3">{item.fullName}</p>
            <p className="text-[#A8A29E] text-xs md:text-sm leading-relaxed mb-3 md:mb-5">{item.description}</p>
            <p className="text-[#FFF5E6] text-xl md:text-2xl font-black mb-4" style={{ textShadow: "0 0 12px rgba(232,141,42,0.2)" }}>{item.price}</p>
            <button className="order-btn-item" onClick={onOrderClick}>Order Now</button>
          </div>
        </div>
      ))}
    </section>
  );
}