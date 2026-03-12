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
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md md:hidden">
      <div className="max-w-md mx-auto flex justify-around items-center h-16">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <DynamicLink
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center gap-1 px-3 py-2 text-xs font-medium transition-colors ${
                isActive
                  ? "text-primary"
                  : "text-slate-500 dark:text-slate-400 hover:text-primary"
              }`}
            >
              <span
                className={`material-symbols-outlined text-xl ${
                  isActive ? "text-primary" : ""
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
