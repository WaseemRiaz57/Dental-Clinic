import type { Metadata } from "next";
import { Suspense } from "react";
import Navbar from "./components/Navbar";
import ScrollRevealObserver from "../components/ScrollRevealObserver";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Elite Dental Solutions",
    template: "%s",
  },
  description:
    "Experience world-class dental solutions with a touch of editorial elegance. We combine clinical precision with patient-centric comfort.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,500;12..96,600;12..96,700&family=Figtree:wght@400;500;600;700&display=swap"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
        />
      </head>
      <body className="bg-porcelain text-ink antialiased">
        <ScrollRevealObserver />
        <div className="min-h-screen flex flex-col">
          <Suspense fallback={null}>
            <Navbar />
          </Suspense>
          <main className="flex-1">{children}</main>
        </div>
      </body>
    </html>
  );
}
