import { useEffect, useRef, useState } from "react";

export default function BackgroundImages() {
  const imagesRef = useRef<(HTMLImageElement | null)[]>([]);
  const positionsRef = useRef<Array<{ x: number; y: number }>>([]);
  const [rotations, setRotations] = useState<number[]>([]);

  useEffect(() => {
    const layers = imagesRef.current.filter(Boolean);
    if (layers.length === 0) return;
    
    if (rotations.length !== imagesRef.current.length) {
      setRotations([...Array(imagesRef.current.length)].map(() => Math.floor(Math.random() * 40) - 20));
      return;
    }

    const radius = 210; // cursor size                  px
    const minScale = 1; // initial scale                 x
    const maxScale = 20; // on closer hover              x
    const estimatedSize = 260; //                       px
    const padding = -100; //                            px
    const paddingTop = 2; //                            px
    const minDistance = 100; // min images distance     px

    const minX = padding + estimatedSize / 2;
    const maxX = window.innerWidth - padding - estimatedSize / 2;
    const minY = paddingTop + estimatedSize / 2;
    const maxY = window.innerHeight - padding - estimatedSize / 2;

    const positions: Array<{ x: number; y: number }> = [];
    
    const isTooClose = (x: number, y: number, existingPositions: Array<{ x: number; y: number }>) => {
      return existingPositions.some(pos => {
        const distance = Math.hypot(x - pos.x, y - pos.y);
        return distance < minDistance;
      });
    };

    imagesRef.current.forEach((img, index) => {
      if (!img) {
        positions[index] = { x: 0, y: 0 };
        return;
      }

      let attempts = 0;
      let x: number, y: number;
      do {
        x = Math.random() * (maxX - minX) + minX;
        y = Math.random() * (maxY - minY) + minY;
        attempts++;
      } while (isTooClose(x, y, positions) && attempts < 100);

      positions[index] = { x, y };
    });

    positionsRef.current = positions;

    layers.forEach((img) => {
      if (!img) return;
      const layerIndex = imagesRef.current.indexOf(img);
      const { x, y } = positions[layerIndex];
      img.style.transform = `translate(${x}px, ${y}px)`;
      img.dataset.rotate = rotations[layerIndex].toString();
    });

    const handleMove = (e: MouseEvent) => {
      imagesRef.current.forEach((img, i) => {
        if (!img || !positionsRef.current[i]) return;

        let tx = positionsRef.current[i].x;
        let ty = positionsRef.current[i].y;
        const right = tx + estimatedSize / 2;
        const left = tx - estimatedSize / 2;
        const bottom = ty + estimatedSize / 2;
        const top = ty - estimatedSize / 2;
        if (left < padding) tx += padding - left;
        if (right > window.innerWidth - padding) tx -= right - (window.innerWidth - padding);
        if (top < paddingTop) ty += paddingTop - top;
        if (bottom > window.innerHeight - padding) ty -= bottom - (window.innerHeight - padding);
        const rect = img.getBoundingClientRect();
        const dx = e.clientX - (rect.left + rect.width / 2);
        const dy = e.clientY - (rect.top + rect.height / 2);
        const dist = Math.hypot(dx, dy);

        const intensity = Math.max(0, 1 - dist / radius);
        const invIntensity = 1 - intensity;

        const grayscale = invIntensity;
        const zIndex = Math.round(intensity * 5);
        const baseRotate = parseFloat(img.dataset.rotate || "0");
        const rotate = baseRotate * invIntensity;
        const scale = minScale + intensity * (maxScale - minScale);

        img.style.transform = `
        translate(${tx}px, ${ty}px)
        scale(${scale})
        rotate(${rotate}deg)
        `;
        img.style.filter = `grayscale(${grayscale})`;
        img.style.zIndex = zIndex.toString();
      });
    };

    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, [rotations]);

  return (
    <div
      className="bg-images"
    >
      {[...Array(24)].map((_, i) => (
        <img
          key={i}
          ref={(el) => {
            imagesRef.current[i] = el as HTMLImageElement;
          }}
          src="/img/landing/image.png"
        />
      ))}
    </div>
  );
}
