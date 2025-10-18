import { useEffect, useRef } from "react";

export default function BackgroundImages() {
  const imagesRef = useRef<(HTMLImageElement | null)[]>([]);

  useEffect(() => {
    const radius = 140; // cursor size          px
    const minScale = 1; // initial scale         x
    const maxScale = 24; // on closer hover      x
    const estimatedSize = 260; //               px
    const paddingTop = 200; //                  px
    const initialRotation = 40; //             deg

    const positions = imagesRef.current.map(() => ({
      x: Math.random() * (window.innerWidth - estimatedSize),
      y:
        Math.random() * (window.innerHeight - estimatedSize - paddingTop) +
        paddingTop,
    }));

    imagesRef.current.forEach((img, i) => {
      if (!img) return;
      const { x, y } = positions[i];
      img.style.transform = `translate(${x}px, ${y}px)`;
    });

    const handleMove = (e: MouseEvent) => {
      imagesRef.current.forEach((img, i) => {
        if (!img) return;

        let tx = positions[i].x;
        let ty = positions[i].y;
        const right = tx + estimatedSize / 2;
        const left = tx - estimatedSize / 2;
        const bottom = ty + estimatedSize / 2;
        const top = ty - estimatedSize / 2;
        if (left < 0) tx += -left;
        if (right > window.innerWidth) tx -= right - window.innerWidth;
        if (top < 0) ty += -top;
        if (bottom > window.innerHeight) ty -= bottom - window.innerHeight;
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
  }, []);

  return (
    <div
      className="bg-images"
      style={{ position: "fixed", inset: 0, overflow: "hidden" }}
    >
      {[...Array(32)].map((_, i) => {
        const rotate = Math.floor(Math.random() * 40) - 20;
        return (
          <img
            key={i}
            ref={(el) => {
              imagesRef.current[i] = el as HTMLImageElement;
            }}
            src="/img/landing/image.png"
            data-rotate={rotate}
          />
        );
      })}
    </div>
  );
}
