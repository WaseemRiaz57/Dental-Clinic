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
    <nav className="sticky top-0 z-50 w-full border-b border-[#4DB8E8]/20 bg-white/90 backdrop-blur-md shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-18 py-3">
          {/* Logo */}
          <DynamicLink href="/" className="flex items-center gap-2.5">
            <span className="material-symbols-outlined text-[#2E7EC4] text-3xl">
              {icon}
            </span>
            <span className="stitch-title text-xl font-bold tracking-tight uppercase text-[#1B3A6B]">
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
                className={`text-sm font-semibold tracking-wide transition-colors ${
                  pathname === link.href
                    ? "text-[#2E7EC4] border-b-2 border-[#2E7EC4] pb-0.5"
                    : "text-[#1B3A6B]/85 hover:text-[#2E7EC4]"
                }`}
              >
                {link.label}
              </DynamicLink>
            ))}
            <DynamicLink
              href="/booking"
              className="bg-[#1B3A6B] hover:bg-[#2E7EC4] text-white px-6 py-2.5 rounded-[10px] text-sm font-bold transition-all editorial-shadow"
            >
              Book Appointment
            </DynamicLink>
          </div>

          {/* Mobile: quick booking action */}
          <div className="md:hidden flex items-center gap-2">
            <DynamicLink
              href="/booking"
              className="bg-[#1B3A6B] hover:bg-[#2E7EC4] text-white px-4 py-2 rounded-[10px] text-xs font-bold transition-all"
            >
              Book
            </DynamicLink>
          </div>
        </div>
      </div>
    </nav>
  );
}
