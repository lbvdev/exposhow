"use client";
import Image from "next/image";
import Link from "next/link";
import BackgroundImages from "./ui/components/BgImages";
import StyledText from "./ui/components/StyledText";

export default function Home() {
  return (
    <main>
      <section className="landing-page p-2">
        <BackgroundImages />
        <div id="main-title-placeholder" aria-hidden="true" style={{ visibility: 'hidden', pointerEvents: 'none' }}>
          <StyledText text="EXPO" />
          <br />
          <span className="pl-[clamp(0px,10vw,10rem)]">
            <StyledText text="SHOW" color="gray" />
          </span>
        </div>
      </section>

      <section data-speed="1.6" id="story-page" className="flex flex-col justify-between p-10 h-[100vh] bg-red-gradient text-white">
        <div data-speed="0.7" className="bg-red-gradient-image"></div>
        <h1 className="font-black large-title styled" data-text="История">
          История
        </h1>
        <div id="scroll-horizontal">
          <StoryEvents />
        </div>
      </section>

      <div className="landing-page p-2 bg-bg-color">
      </div>
    </main>
  );
}

export function StoryEvents() {
  let storyEvents = [
    {
      date: "1995",
      title:
        "EXPO SHOW была основана группой энтузиастов выставочного бизнеса с видением создания лучшей выставочной компании в России.",
      images: [],
    },
    {
      date: "2005",
      title:
        "Организация первой крупной международной выставки промышленного оборудования с участием более 200 компаний из 15 стран.",
      images: [],
    },
    {
      date: "2005",
      title:
        "Организация первой крупной международной выставки промышленного оборудования с участием более 200 компаний из 15 стран.",
      images: [],
    },
    {
      date: "2005",
      title:
        "Организация первой крупной международной выставки промышленного оборудования с участием более 200 компаний из 15 стран.",
      images: [],
    },
    {
      date: "2005",
      title:
        "Организация первой крупной международной выставки промышленного оборудования с участием более 200 компаний из 15 стран.",
      images: [],
    },
    {
      date: "2005",
      title:
        "Организация первой крупной международной выставки промышленного оборудования с участием более 200 компаний из 15 стран.",
      images: [],
    },
    {
      date: "2005",
      title:
        "Организация первой крупной международной выставки промышленного оборудования с участием более 200 компаний из 15 стран.",
      images: [],
    },
  ];

  return (
    <div className="flex gap-12 scrollable-block">
      {storyEvents.map((event, index) => (
        <div key={index} className="date-item active max-w-[640px]">
          <div className="image-wrapper flex">
            {event.images.map((image, index) => (
              <Image
                key={index}
                src={image}
                width={216}
                height={216}
                alt={event.title}
              />
            ))}
          </div>
          <div className="flex flex-col gap-8">
            <img
              className="date-img"
              src={`img/dates/${event.date}.svg`}
              alt={event.date}
              height={54}
            />
            <p>{event.title}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
