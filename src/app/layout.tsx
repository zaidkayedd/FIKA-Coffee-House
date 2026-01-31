/* eslint-disable @next/next/no-page-custom-font */
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import Image from 'next/image'
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FIKA Coffee House - Experience Exceptional Coffee",
  description: "FIKA Coffee House - Open 24/7 in Amman, Jordan. Discover our carefully crafted selection of beverages and food, made with the finest ingredients and lots of love.",
  keywords: ["FIKA", "Coffee", "Amman", "Jordan", "Coffee House", "Cafe", "Espresso", "Latte"],
  authors: [{ name: "FIKA Coffee House" }],
    icons: {
    icon: "/Logo.jpeg",
    shortcut: "/Logo.jpeg",
    apple: "/Logo.jpeg",
  },
  openGraph: {
    title: "FIKA Coffee House",
    description: "Experience exceptional coffee in the heart of Jordan. Open 24/7 for your perfect coffee moment.",
    type: "website",
      images: ["/Logo.jpeg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
<link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet"/>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >


        {children}
        <Toaster />
      </body>
    </html>
  );
}
