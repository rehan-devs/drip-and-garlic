"use client";

import React, { useState, useEffect } from "react";
import { Loader } from "./loader";
import { DripHero } from "./drip-hero";
import { MenuBook3D } from "./menu-book-3d";
import { ItemShowcase } from "./item-showcase";
import { DripLocation } from "./drip-location";

export function DripLanding() {
  const [isLoading, setIsLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    if (!isLoading) {
      requestAnimationFrame(() => setShowContent(true));
    }
  }, [isLoading]);

  const handleOrderClick = () => {
    // Open Google Maps directly
    window.open(
      "https://www.google.com/maps/search/?api=1&query=420+Pita+Lane+Brooklyn+NY+11201",
      "_blank",
      "noopener,noreferrer"
    );
  };

  return (
    <>
      <Loader onComplete={() => setIsLoading(false)} />
      <div
        className={`overflow-x-hidden w-full bg-[#0A0A0A] transition-opacity duration-700 ${showContent ? "opacity-100" : "opacity-0"}`}
        style={{ visibility: showContent ? "visible" : "hidden" }}
      >
        <DripHero />
        <MenuBook3D />
        <ItemShowcase onOrderClick={handleOrderClick} />
        <DripLocation />
      </div>
    </>
  );
}