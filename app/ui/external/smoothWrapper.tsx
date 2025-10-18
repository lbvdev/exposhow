"use client";

import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { initAnims } from "../anims";

export const applyScrollEffects = (callback: (scroller: any) => void) => {
  const checkScroller = () => {
    if ((window as any).scroller) {
      callback((window as any).scroller);
    } else {
      requestAnimationFrame(checkScroller);
    }
  };
  checkScroller();
};

export default function ScrollSmootherWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger, ScrollSmoother);
    
    let scroller = ScrollSmoother.create({
      smooth: 1,
      effects: true,
      smoothTouch: 0.1,
    });

    (window as any).scroller = scroller;
    
    initAnims();
  }, []);

  return (
    <div id="smooth-content">
      {children}
    </div>
  );
}