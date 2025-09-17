import type { Metadata } from "next";
import localFont from 'next/font/local'
import "./ui/globals.css";


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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body
        className={`${fliegeMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
