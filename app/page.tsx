"use client";
import { useEffect } from "react";
import { initAnims } from "./ui/anims";

export default function Home() {
    useEffect(() => {
        initAnims();
    }, []);

    return (
        <div className="bg-bg-color">
            <h1 id="main-title">EXPO<br></br><span className="pl-[clamp(0px,10vw,10rem)]">SHOW</span></h1>
        </div>
    );
}