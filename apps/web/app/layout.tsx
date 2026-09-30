import type { Metadata } from "next";
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
  title: "Orchestrix",
  description:
    "Engineering work management and workflow automation — design system",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {children}
        <Toaster position="bottom-right" />
      </body>
    </html>
  );
}
