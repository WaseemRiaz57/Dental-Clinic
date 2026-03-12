"use client";

import { useSearchParams, usePathname } from "next/navigation";
import DynamicLink from "./DynamicLink";

export default function Navbar() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const client = searchParams.get("client") || "Modern Clinic";
  const category = searchParams.get("category") || "Healthcare";

  const categoryIcons: Record<string, string> = {
    dental: "dentistry",
    healthcare: "local_hospital",
    fitness: "fitness_center",
    spa: "spa",
    salon: "content_cut",
  };

  const icon =
    categoryIcons[category.toLowerCase()] || "local_hospital";

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-slate-200 dark:border-slate-800 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <DynamicLink href="/" className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-3xl">
              {icon}
            </span>
            <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
              {client}
            </span>
          </DynamicLink>

          {/* Desktop Nav */}
          <div className="hidden md:flex space-x-6 items-center">
            {[
              { href: "/", label: "Home" },
              { href: "/services", label: "Services" },
              { href: "/contact", label: "Contact" },
            ].map((link) => (
              <DynamicLink
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors ${
                  pathname === link.href
                    ? "text-primary"
                    : "hover:text-primary text-slate-700 dark:text-slate-300"
                }`}
              >
                {link.label}
              </DynamicLink>
            ))}
            <DynamicLink
              href="/booking"
              className="bg-primary hover:bg-primary/90 text-white px-5 py-2 rounded-lg text-sm font-bold transition-all"
            >
              Book Appointment
            </DynamicLink>
          </div>

          {/* Mobile: quick booking action */}
          <div className="md:hidden flex items-center gap-2">
            <DynamicLink
              href="/booking"
              className="bg-primary hover:bg-primary/90 text-white px-3 py-1.5 rounded-md text-xs font-bold transition-all"
            >
              Book
            </DynamicLink>
          </div>
        </div>
      </div>
    </nav>
  );
}
