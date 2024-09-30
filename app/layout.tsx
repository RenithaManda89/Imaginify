import type { Metadata } from "next";
import {IBM_Plex_Sans} from "next/font/google";
import { cn } from "@/lib/utils";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";

const IBMPlex = IBM_Plex_Sans({
  //src: "./fonts/IBM_Plex_Sans.woff",
  subsets: ["latin"],
  variable: "--font-ibm-plex",
  weight:['400','500','600','700'],
});
// const geistMono = IBM_Plex_Sans({
//   //src: "./fonts/IBM_Ples_Sans.woff",
//   variable: "--font-ibm-plex",
//   weight:['400','500','600','700'],
// });

export const metadata: Metadata = {
  title: "Imaginify",
  description: "AI -powered image generator",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider >
    <html lang="en">
      <body
        className={cn("font-IBMPlex antialiased", IBMPlex.variable)}>
        {children}
      </body>
    </html>
    </ClerkProvider>
  );
}
