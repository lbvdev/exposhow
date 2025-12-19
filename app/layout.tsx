import "./ui/styles/blocks.scss";
import "./ui/styles/globals.css";
import { fliegeMono, modak } from "./ui/fonts";
import type { Metadata, Viewport } from "next";
import Header from "./ui/header";
import FrameOutline from "./ui/components/FrameOutline";
import ScrollSmootherWrapper from "./ui/external/SmoothWrapper";
import PixelTrail from "./ui/external/PixelTrail";
import MainTitle from "./ui/components/MainTitle";

export const metadata: Metadata = {
  title: "ExpoShow",
  description: "ExpoShow",
  icons: {
    icon: [
      { url: "/favicon/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon/favicon-96x96.png", sizes: "96x96", type: "image/png" },
    ],
    apple: [
      { url: "/favicon/apple-touch-icon-57x57.png", sizes: "57x57" },
      { url: "/favicon/apple-touch-icon-72x72.png", sizes: "72x72" },
      { url: "/favicon/apple-touch-icon-76x76.png", sizes: "76x76" },
      { url: "/favicon/apple-touch-icon-114x114.png", sizes: "114x114" },
      { url: "/favicon/apple-touch-icon-120x120.png", sizes: "120x120" },
      { url: "/favicon/apple-touch-icon-144x144.png", sizes: "144x144" },
      { url: "/favicon/apple-touch-icon-152x152.png", sizes: "152x152" },
      { url: "/favicon/apple-touch-icon-180x180.png", sizes: "180x180" },
    ],
    other: [{ url: "/favicon/favicon.ico", sizes: "any" }],
  },
};

export const viewport: Viewport = {
  themeColor: '#A92C2D',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body className={`${fliegeMono.variable} ${modak.variable} antialiased`}>
        <MainTitle />
        <div id="smooth-wrapper">
          <Header />
          <FrameOutline></FrameOutline>
          <ScrollSmootherWrapper>{children}</ScrollSmootherWrapper>
          <PixelTrail
            gridSize={50}
            trailSize={0.1}
            maxAge={250}
            interpolate={5}
            color="red"
            opacity={0.2}
            gooeyFilter={{ id: "custom-goo-filter", strength: 5 }}
          />
        </div>
      </body>
    </html>
  );
}
