import type { Metadata } from "next";
import localFont from 'next/font/local'
import "./ui/globals.css";
import "./ui/blocks.css";
import ScrollSmootherWrapper from "./lib/scrollSmootherWrapper";
import PixelTrail from "./lib/pixelTrail";

const fliegeMono = localFont({
  src: [
    {
      path: '../public/fonts/FliegeMono-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../public/fonts/FliegeMono-Medium.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../public/fonts/FliegeMono-SemiBold.woff2',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../public/fonts/FliegeMono-Black.woff2',
      weight: '900',
      style: 'normal',
    }
  ],
  variable: '--font-fliege-mono',
})

export const metadata: Metadata = {
  title: "ExpoShow",
  description: "ExpoShow",
  icons: {
    icon: [
      { url: '/favicon/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon/favicon-96x96.png', sizes: '96x96', type: 'image/png' },
    ],
    apple: [
      { url: '/favicon/apple-touch-icon-57x57.png', sizes: '57x57' },
      { url: '/favicon/apple-touch-icon-72x72.png', sizes: '72x72' },
      { url: '/favicon/apple-touch-icon-76x76.png', sizes: '76x76' },
      { url: '/favicon/apple-touch-icon-114x114.png', sizes: '114x114' },
      { url: '/favicon/apple-touch-icon-120x120.png', sizes: '120x120' },
      { url: '/favicon/apple-touch-icon-144x144.png', sizes: '144x144' },
      { url: '/favicon/apple-touch-icon-152x152.png', sizes: '152x152' },
      { url: '/favicon/apple-touch-icon-180x180.png', sizes: '180x180' },
    ],
    other: [
      { url: '/favicon/favicon.ico', sizes: 'any' },
    ],
  },
};



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body className={`${fliegeMono.variable} antialiased`}>
        <PixelTrail
          gridSize={50}
          trailSize={0.1}
          maxAge={250}
          interpolate={5}
          color="red"
          opacity={0.2}
          gooeyFilter={{ id: "custom-goo-filter", strength: 5 }}
        />
        <div id="smooth-wrapper">
          <ScrollSmootherWrapper>
            {children}
          </ScrollSmootherWrapper>
        </div>
      </body>
    </html>
  );
}
