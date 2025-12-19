"use client";
import StyledText from "./StyledText";

export default function MainTitle() {
  return (
    <h1 id="main-title">
      <StyledText text="EXPO" />
      <br />
      <span className="pl-[clamp(0px,10vw,10rem)]">
        <StyledText text="SHOW" color="gray" />
      </span>
    </h1>
  );
}

