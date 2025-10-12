import { gsap } from "gsap";
import { SplitText } from "gsap/all";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { applyScrollEffects } from "../lib/smoothWrapper";

export const initAnims = () => {
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
};
