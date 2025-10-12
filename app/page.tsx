"use client";
import Image from "next/image";
import Link from "next/link";

import { useEffect } from "react";
import { gsap } from "gsap";
import { SplitText } from "gsap/all";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { applyScrollEffects } from "./lib/scrollSmootherWrapper";

export default function Home() {
      
    useEffect(() => {
        if (typeof window === 'undefined') return;
        gsap.registerPlugin(ScrollTrigger);
        
        const split = SplitText.create(".split", {
            type: "chars, lines",
            autoSplit: true
        });
        
        gsap.fromTo(
            split.chars,
            {
                y: 2,
                x: -50,
                rotationY: 90,
                opacity: 0,
            },
            {
                duration: 1,
                y: 0,
                x: 0,
                rotationY: 0,
                opacity: 1,
                ease: "elastic.out(1,0.95)",
                stagger: 0.1,
            }
        );


        gsap.fromTo('#main-title', {
            autoAlpha: 1,
        }, {
            autoAlpha: 0,
            duration: 2,
            scrollTrigger: {
                scrub: true,
                trigger: '#main-title',
                start: 'bottom 40%',
                end: 'bottom 10%',
                //markers: true
            }
        });

        // let tl = gsap.timeline({
        //     scrollTrigger: {
        //         trigger: '.landing-page',
        //         pin: true, // pin the trigger element while active
        //         start: 'top top', // when the top of the trigger hits the top of the viewport
        //         end: '+=500', // end after scrolling 500px beyond the start
        //         scrub: 1, // smooth scrubbing, takes 1 second to "catch up" to the scrollbar
        //         snap: {
        //             snapTo: 'start', // snap to the closest label in the timeline
        //             duration: { min: 0.2, max: 3 }, // the snap animation should be at least 0.2 seconds, but no more than 3 seconds (determined by velocity)
        //             delay: 0.2, // wait 0.2 seconds from the last scroll event before doing the snapping
        //             ease: 'power1.inOut' // the ease of the snap animation ("power3" by default)
        //         }
        //     }
        // });
        // add animations and labels to the timeline
        // tl.addLabel('start')
        //     .from('.split', { scale: 0.3, rotation: 45, autoAlpha: 0 })
        //     .addLabel('color')

        applyScrollEffects((scroller) => {
            for (let i = 0; i < split.lines.length; i++) {
                const line = split.lines[i];
                scroller.effects(line, {speed: 0.8 + (i * 0.2)});
            }
        });

    }, []);

    let storyEvents = [
        {
            date: "1995",
            title: "EXPO SHOW была основана группой энтузиастов выставочного бизнеса с видением создания лучшей выставочной компании в России.",
            images: [

            ],
        },
        
        {
            date: "2005",
            title: "Организация первой крупной международной выставки промышленного оборудования с участием более 200 компаний из 15 стран.",
            images: [
            ],
        },
    ];
    return (
        <>
        <main>
            <div className="landing-page bg-bg-color p-2">
                <h1 id="main-title" className="split">Expo<br/><span className="pl-[clamp(0px,10vw,10rem)]">Show</span></h1>
            </div>

            <div data-speed="1.6" id="story-page" className="flex flex-col p-2 scroll-horizontal bg-red-gradient text-white">
                <div data-speed="0.7" className="bg-red-gradient-image"></div>
                <h1 className="font-black large-title styled" data-text="История">История</h1>
                <div className="flex gap-12">
                    {storyEvents.map((event, index) => (
                        <div key={index} className="date-item active max-w-[476px]">
                            <div className="image-wrapper flex">
                                {event.images.map((image, index) => (
                                    <Image key={index} src={image} width={216} height={216} alt={event.title} />
                                ))}
                            </div>
                            <h3 className="text-shadow-effect" data-text={event.date}>{event.date}</h3>
                            <p>{event.title}</p>
                        </div>
                    ))}
                </div>
            </div>
        </main>
        </>
    );
}