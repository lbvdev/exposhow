"use client";
import Image from "next/image";
import Link from "next/link";

import { useEffect } from "react";
import { gsap } from "gsap";
import { SplitText } from "gsap/all";
import { ScrollSmoother } from "gsap/ScrollSmoother";

import Header from "./ui/header";

export default function Home() {
      
    useEffect(() => {
        const split = SplitText.create(".split", {
            type: "chars",
            autoSplit: true
        });
    
        gsap.set(split.chars, {
            y: 2,
            x: -50,
            rotationY: 90,
            opacity: 0
        });
        gsap.to(split.chars, {
            duration: 1,
            y: 0,
            x: 0,
            rotationY: 0,
            opacity: 1,
            ease: "elastic.out(1,0.95)",
            stagger: 0.1,
        });

    }, []);
    return (
        <>
        <Header />
        <main>
            <div className="landing-page bg-bg-color p-2">
                <h1 id="main-title" className="split">EXPO<br/><span className="pl-[clamp(0px,10vw,10rem)]">SHOW</span></h1>
            </div>

            <div data-speed="1.6" id="story-page" className="flex flex-col p-2 scroll-horizontal bg-red-gradient text-white">
                <div data-speed="0.7" className="bg-red-gradient-image"></div>
                <h1 className="font-black large-title styled" data-text="История">История</h1>
                <div className="flex gap-12">
                    <div className="date-item active max-w-[476px]">
                        <div>image wrapper</div>
                        <h3 className="text-shadow-effect" data-text="1995">1995</h3>
                        <p>EXPO SHOW была основана группой энтузиастов выставочного бизнеса с видением создания лучшей выставочной компании в России.</p>
                    </div>
                    <div className="max-w-[476px]">
                        <div>image wrapper</div>
                        <h3 className="text-shadow-effect" data-text="2005">2005</h3>
                        <p>Организация первой крупной международной выставки промышленного оборудования с участием более 200 компаний из 15 стран.</p>
                    </div>
                </div>
            </div>
        </main>
        </>
    );
}