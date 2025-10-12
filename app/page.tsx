"use client";
import Image from "next/image";
import Link from "next/link";

import { useEffect } from "react";

export default function Home() {
      
    useEffect(() => {


    }, []);


    return (
        <main>
            <div className="landing-page bg-bg-color p-2">
                <h1 id="main-title" className="split">EXPO<br/><span className="pl-[clamp(0px,10vw,10rem)]">SHOW</span></h1>
            </div>

            <div data-speed="1.6" id="story-page" className="flex flex-col p-2 scroll-horizontal bg-red-gradient text-white">
                <div data-speed="0.7" className="bg-red-gradient-image"></div>
                <h1 className="font-black large-title styled" data-text="История">История</h1>
                
                <StoryEvents/>

            </div>
        </main>
    );
}

export function StoryEvents() {
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

    return(
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
    )
}