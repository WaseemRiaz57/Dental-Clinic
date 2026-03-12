import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Suspense } from "react";
import Navbar from "./components/Navbar";
import BottomNav from "./components/BottomNav";
import WhatsAppButton from "./components/WhatsAppButton";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Premium Services — Book Now",
  description:
    "Experience top-notch professional services with a commitment to excellence.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap"
        />
      </head>
      <body className={`${inter.variable} font-sans antialiased`}>
        <div className="min-h-screen flex flex-col">
          <Suspense fallback={null}>
            <Navbar />
          </Suspense>
          <main className="flex-1">{children}</main>
          <Suspense fallback={null}>
            <BottomNav />
          </Suspense>
          <Suspense fallback={null}>
            <WhatsAppButton />
          </Suspense>
        </div>
      </body>
    </html>
  );
}
