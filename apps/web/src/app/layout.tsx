import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import localFont from "next/font/local";

import { Toaster } from "@repo/ui/components/base/sonner";

import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  title: { default: "Orchestrix", template: "%s · Orchestrix" },
  description:
    "Plan engineering work, automate what happens next, and see exactly what every automation did.",
};

// Matches the dark page background; browser chrome can't read CSS tokens.
export const viewport: Viewport = {
  themeColor: "#0b0c0e",
};

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: Readonly<RootLayoutProps>) {
  return (
    <html
      lang="en"
      className="dark motion-safe:scroll-smooth"
      data-scroll-behavior="smooth"
    >
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {children}
        <Toaster position="bottom-right" />
      </body>
    </html>
  );
}
