import { useEffect, useRef } from "react";
import gsap from "gsap";
import { modak } from "../fonts";

export default function StyledText({ text, color }: { text: string; color?: string }) {
  const layersRef = useRef<HTMLImageElement[]>([]);

  useEffect(() => {
    const layers = layersRef.current;
    if (!layers.length) return;

    let isMounted = true;
    let rafId: number | null = null;
    let ticking = false;
    let animation: gsap.core.Tween | null = null;

    const setWillChange = (value: string) => {
      layers.forEach(layer => layer && (layer.style.willChange = value));
    };

    const calculatePosition = (layerIndex: number, xRatio: number, yRatio: number) => {
      const depth = -(layerIndex + 1) * 1.5;
      const offset = (layerIndex + 1) * 0.5;
      return {
        x: offset + xRatio * depth,
        y: offset + yRatio * depth
      };
    };

    const initAnimation = () => {
      if (!isMounted || !layers.length) return;
      
      setWillChange("transform, opacity");

      animation = gsap.fromTo(
        layers,
        { opacity: 0 },
        { 
          opacity: 1, 
          duration: 1, 
          delay: 1, 
          stagger: 0.02, 
          ease: "elastic.out(1,0.5)",
          onComplete: () => {
            if (isMounted) setWillChange("transform");
          }
        }
      );
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (document.hidden || !isMounted || ticking) return;
      
      ticking = true;
      rafId = requestAnimationFrame(() => {
        if (!isMounted) {
          ticking = false;
          return;
        }

        const { clientX, clientY } = e;
        const { innerWidth, innerHeight } = window;
        const xRatio = (clientX / innerWidth - 0.5) * 4;
        const yRatio = (clientY / innerHeight - 0.5) * 4;
  
        layersRef.current.forEach((layer, i) => {
          if (!layer || !isMounted) return;
          const { x, y } = calculatePosition(i, xRatio, yRatio);
          layer.style.transform = `translate3d(${x}px, ${y}px, 0)`;
        });
  
        ticking = false;
      });
    };

    const handleLoad = () => {
      if (!isMounted) return;
      setTimeout(() => {
        if (isMounted) {
          initAnimation();
          window.addEventListener("mousemove", handleMouseMove);
        }
      }, 100);
    };

    if (document.readyState === "complete") {
      handleLoad();
    } else {
      window.addEventListener("load", handleLoad);
    }
    
    return () => {
      isMounted = false;
      rafId && cancelAnimationFrame(rafId);
      animation?.kill();
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("load", handleLoad);
      setWillChange("auto");
    };
  }, []);

  return (
    <span className="title-outline" style={{ fontFamily: modak.style.fontFamily }}>
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
