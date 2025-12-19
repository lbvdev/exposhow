import localFont from "next/font/local";
import { Modak } from "next/font/google";

export const fliegeMono = localFont({
  src: [
    {
      path: "../../public/fonts/FliegeMono-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/FliegeMono-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/fonts/FliegeMono-SemiBold.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "../../public/fonts/FliegeMono-Black.woff2",
      weight: "900",
      style: "normal",
    },
  ],
  variable: "--font-fliege-mono",
});

export const modak = Modak({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-modak",
});