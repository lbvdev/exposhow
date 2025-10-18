"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Home() {
  return (
    <main>
      <div className="landing-page p-2">
        <h1 id="main-title">
          <StyledText text="EXPO" />
          <br />
          <span className="pl-[clamp(0px,10vw,10rem)]">
            <StyledText text="SHOW" color="gray" />
          </span>
        </h1>
      </div>
      <div
        data-speed="1.6"
        id="story-page"
        className="flex flex-col justify-between p-10 h-[100vh] bg-red-gradient text-white"
      >
        <div data-speed="0.7" className="bg-red-gradient-image"></div>
        <h1 className="font-black large-title styled" data-text="История">
          История
        </h1>
        <div id="scroll-horizontal"></div>
      </div>
      <div className="landing-page p-2 bg-bg-color">
        <h1 id="main-title">
          <br />
          <span className="pl-[clamp(0px,10vw,10rem)]">SHOW</span>
        </h1>
      </div>
    </main>
  );
}

export function StyledText({ text, color }: { text: string; color?: string }) {
    const layersRef = useRef([]);

  useEffect(() => {
    const layers = layersRef.current;

    const shadowIntensity = 0;

    gsap.fromTo(
      layers,
      { x: 0, y: 0, opacity: 0 },
      {
        x: (i) => (i + 1) * 2,
        y: (i) => (i + 1) * 2,
        filter: (i) => `brightness(${(1 - i / shadowIntensity / 24) * 1})`,
        zIndex: (i) => 1 - i,
        opacity: 1,
        duration: 1,
        delay: 1,
        ease: "elastic.out(1, 0.5)",
        stagger: 0.02,
      }
    );

    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      const xRatio = (clientX / innerWidth - 0.5) * 4;
      const yRatio = (clientY / innerHeight - 0.5) * 4;

      layers.forEach((layer, i) => {
        const depth = -(i + 1) * 1.5;
        gsap.to(layer, {
          x: (i + 1) * 0.5 + xRatio * depth,
          y: (i + 1) * 0.5 + yRatio * depth,

          duration: 0.8,
          ease: "power2.out",
        });
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <span className="title-outline">
      <span className="title-outline__elem white">{text}</span>

      {[...Array(24)].map((_, i) => (
        <span
          key={i}
          ref={(el) => (layersRef.current[i] = el)}
          className={`title-outline__elem ${color}`}
        >
          {text}
        </span>
      ))}
    </span>
  );
}
