import { gsap } from "gsap";

export const initAnims = () => {
    gsap.from("#main-title", {
        duration: 1,
        y: -50,
        opacity: 0,
        ease: "power2.out"
    });
    
    gsap.from("#main-title span", {
        duration: 0.8,
        x: -100,
        opacity: 0,
        ease: "power2.out",
        delay: 0.5
    });
};
