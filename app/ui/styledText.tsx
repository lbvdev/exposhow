import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function StyledText({ text, color }: { text: string; color?: string }) {
  const layersRef = useRef<HTMLImageElement[]>([]);

  useEffect(() => {
    const layers = layersRef.current;
    const shadowIntensity = 2;
    if (!layers.length) return;

    gsap.fromTo(
      layers,
      { opacity: 0 },
      { opacity: 1, duration: 1, delay: 1, stagger: 0.02, ease: "elastic.out(1,0.5)" }
    );
    gsap.set(layers, { opacity: 1 });
    
    let ticking = false;

    const handleMouseMove = (e: MouseEvent) => {
      if (document.hidden) return;
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(() => {
          const { clientX, clientY } = e;
          const { innerWidth, innerHeight } = window;
          const xRatio = (clientX / innerWidth - 0.5) * 4;
          const yRatio = (clientY / innerHeight - 0.5) * 4;
  
          layersRef.current.forEach((layer, i) => {
            const depth = -(i + 1) * 1.5;
            const x = (i + 1) * 0.5 + xRatio * depth;
            const y = (i + 1) * 0.5 + yRatio * depth;
            layer.style.transform = `translate3d(${x}px, ${y}px, 0)`;
          });
  
          ticking = false;
        });
      }
    };
  
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <span className="title-outline">
      <span className="title-outline__elem">{text}
      <img
          className={`title-outline__elem up`}
          src={`/img/styled-text/${text}-white.svg`}
          ></img>
      {[...Array(24)].map((_, i) => (
        <img
          key={i}
          ref={(el) => {
            if (el) layersRef.current[i] = el;
          }}
          className={`title-outline__elem ${color ?? ""}`}
          src={`/img/styled-text/${text}.svg`}
          ></img>
      ))}
      </span>

    </span>
  );
}
