"use client";
import Image from "next/image";
import { useEffect } from "react";
import { gsap } from "gsap";

export default function Home() {
    useEffect(() => {
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
    }, []);

    return (
        <div className="bg-bg-color">
            <h1 id="main-title">EXPO<br></br><span className="pl-[clamp(0px,10vw,10rem)]">SHOW</span></h1>
        </div>
    );
}