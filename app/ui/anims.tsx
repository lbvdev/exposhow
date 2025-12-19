import { gsap } from "gsap";
import { SplitText } from "gsap/all";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { applyScrollEffects } from "./external/SmoothWrapper";

export const initAnims = () => {
  if (typeof window === "undefined") return;
  gsap.registerPlugin(ScrollTrigger);

  const split = SplitText.create(".split", {
    type: "chars, lines",
    autoSplit: true,
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

  const headerLinks = gsap.utils.toArray(
    "#header-start-links a"
  ) as HTMLElement[];
  
  if (headerLinks.length > 0) {
    const firstLink = headerLinks[0] as HTMLElement;
    const firstRect = firstLink.getBoundingClientRect();
    const baseY = firstRect.top;
    
    let currentX = 0;
    const positions = headerLinks.map((link) => {
      const rect = (link as HTMLElement).getBoundingClientRect();
      const x = currentX;
      currentX += rect.width + 8;
      return x;
    });
    
    const totalWidth = currentX - 8;
    
    headerLinks.forEach((link, index) => {
      const rect = (link as HTMLElement).getBoundingClientRect();
      const offsetY = rect.top - baseY - 8;
      
      gsap.to(link, {
        x: positions[index] - totalWidth / 2,
        y: -offsetY,
        scrollTrigger: {
          scrub: true,
          trigger: "#header-start-links",
          start: "top top",
          end: "top+=200px top",
        },
      });
    });
  }

  const frameOutline = document.querySelector("#frame-outline") as HTMLElement;
  if (frameOutline) {
    gsap.fromTo(frameOutline, {
      top: 0,
    }, {
      top: 70,
      duration: 2,
      scrollTrigger: {
        scrub: true,
        trigger: "#frame-outline",
        start: "top top",
        end: "top+=750px top",
      },
    });
  }

  const header = document.querySelector("header") as HTMLElement;
  if (header) {
    gsap.fromTo(header, {
      height: 120,
      padding: "25px 48px",
    }, {
      height: 74,
      padding: "16px 48px",
      duration: 2,
      scrollTrigger: {
        scrub: true,
        trigger: "header",
        start: "top top",
        end: "top+=750px top",
      },
    });
  }

  gsap.fromTo(
    "body",
    {
      background: "#ECE8E3",
    },
    {
      background: "#A92C2D",
      duration: 2,
      scrollTrigger: {
        scrub: true,
        trigger: "#story-page",
        start: "top-=250px top",
        end: "top top",
      },
    }
  );

  gsap.fromTo(
    "header",
    {},
    {
      filter: "invert(1) saturate(0) brightness(2)",
      duration: 2,
      scrollTrigger: {
        scrub: true,
        trigger: "#story-page",
        start: "top-=250px top",
        end: "top top",
      },
    }
  );

  // horizontal scroll story-page
  const storyPage = document.querySelector("#scroll-horizontal") as HTMLElement;
  if (storyPage) {
    gsap.to("#scroll-horizontal", {
      x: () => (storyPage.scrollWidth - window.innerWidth) * 10 - 500,
      ease: "none",
      scrollTrigger: {
        trigger: "#story-page",
        start: "top top",
        end: () => `+=${storyPage.scrollWidth}`,
        scrub: 1,
        pin: true,
      },
    });
  }

  applyScrollEffects((scroller) => {
    for (let i = 0; i < split.lines.length; i++) {
      const line = split.lines[i];
      scroller.effects(line, { speed: 0.8 + i * 0.2 });
    }
  });

  const mainTitle = document.querySelector("#main-title") as HTMLElement;
  const logoButton = document.querySelector(".logo-button") as HTMLElement;
  const landingPage = document.querySelector(".landing-page") as HTMLElement;

  if (!mainTitle || !logoButton || !landingPage) return;

  const placeholder = document.querySelector("#main-title-placeholder") as HTMLElement;
  const sourceElement = placeholder || mainTitle;
  const sourceRect = sourceElement.getBoundingClientRect();
  
  const initialPos = {
    x: sourceRect.left + 40,
    y: sourceRect.top,
    width: sourceRect.width,
  };

  const getTargetPos = () => {
    const rect = logoButton.getBoundingClientRect();
    return { x: rect.left, y: rect.top, width: 96 };
  };

  const targetPos = getTargetPos();
  const scaleRatio = targetPos.width / initialPos.width;
  const scrollDistance = landingPage.offsetHeight * 0.7;

  gsap.set(mainTitle, {
    position: "fixed",
    top: 8,
    left: 0,
    width: initialPos.width,
    zIndex: 1000,
    margin: 0,
    padding: 0,
    transformOrigin: "top left",
    overflow: "visible",
  });

  gsap.fromTo(
    mainTitle,
    {
      x: initialPos.x,
      y: initialPos.y,
      scale: 1,
    },
    {
      x: targetPos.x,
      y: targetPos.y,
      scale: scaleRatio,
      scrollTrigger: {
        trigger: landingPage,
        start: "top top",
        end: () => `top+=${scrollDistance} top`,
        scrub: 1,
        onRefresh: () => {
          gsap.set(mainTitle, {
            width: initialPos.width,
            x: initialPos.x,
            y: initialPos.y,
            scale: 1,
          });
        },
      },
    }
  );
};



// example

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
