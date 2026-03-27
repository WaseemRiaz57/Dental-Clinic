"use client";

import { usePathname } from "next/navigation";
import DynamicLink from "./DynamicLink";

const navItems = [
  { href: "/", icon: "home", label: "Home" },
  { href: "/services", icon: "medical_services", label: "Services" },
  { href: "/booking", icon: "calendar_today", label: "Book" },
  { href: "/contact", icon: "contact_page", label: "Contact" },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-[#4DB8E8]/20 bg-white/95 backdrop-blur-md md:hidden">
      <div className="max-w-md mx-auto flex justify-around items-center h-16">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <DynamicLink
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center gap-1 px-3 py-2 text-xs font-medium transition-colors ${
                isActive
                  ? "text-[#2E7EC4]"
                  : "text-[#1B3A6B]/70 hover:text-[#2E7EC4]"
              }`}
            >
              <span
                className={`material-symbols-outlined text-xl ${
                  isActive ? "text-[#2E7EC4]" : ""
                }`}
              >
                {item.icon}
              </span>
              {item.label}
            </DynamicLink>
          );
        })}
      </div>
    </nav>
  );
}
