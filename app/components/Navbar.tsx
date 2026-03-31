"use client";

import { useSearchParams } from "next/navigation";

export default function Navbar() {
  const searchParams = useSearchParams();
  const clinicName = searchParams.get("client") || "Premium Dental Care";
  const logoUrl = searchParams.get("logo_url");

  return (
    <nav className="fixed top-0 w-full z-50 bg-white/90 backdrop-blur-md border-b border-[#4DB8E8]/20 shadow-sm transition-all duration-300">
      <div className="flex justify-between items-center w-full px-6 py-4 max-w-7xl mx-auto">
        {/* Logo */}
        <div className="font-[Playfair_Display] text-xl font-bold text-[#1B3A6B] tracking-tight uppercase flex items-center">
          {logoUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={logoUrl}
              alt={`${clinicName} Logo`}
              className="h-10 w-auto object-contain"
            />
          ) : (
            clinicName
          )}
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex gap-8 items-center text-sm font-medium tracking-wide">
          <a
            className="text-[#2E7EC4] font-semibold border-b-2 border-[#2E7EC4] transition-colors duration-300"
            href="#home"
          >
            Home
          </a>
          <a
            className="text-[#1B3A6B] opacity-80 hover:text-[#2E7EC4] transition-all"
            href="#services"
          >
            Services
          </a>
          <a
            className="text-[#1B3A6B] opacity-80 hover:text-[#2E7EC4] transition-all"
            href="#about"
          >
            About
          </a>
          <a
            className="text-[#1B3A6B] opacity-80 hover:text-[#2E7EC4] transition-all"
            href="#contact"
          >
            Contact
          </a>
        </div>

        {/* CTA + Mobile Menu */}
        <div className="flex items-center gap-4">
          <a
            className="hidden sm:block bg-[#1B3A6B] text-white px-6 py-2.5 rounded-[10px] text-sm font-medium hover:bg-[#2E7EC4] transition-all editorial-shadow"
            href="#appointment"
          >
            Book Appointment
          </a>
          <button className="md:hidden text-[#1B3A6B]">
            <span className="material-symbols-outlined">menu</span>
          </button>
        </div>
      </div>
    </nav>
  );
}
