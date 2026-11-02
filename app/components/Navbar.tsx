"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

const links = [
  { label: "Services", hash: "#services" },
  { label: "Our doctor", hash: "#about" },
  { label: "Reviews", hash: "#reviews" },
  { label: "Contact", hash: "#contact" },
];

export default function Navbar() {
  const searchParams = useSearchParams();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const clinicName = searchParams.get("client") || "Premium Dental Care";
  const rawLogoUrl = searchParams.get("logo_url");
  const qs = searchParams.toString();
  const home = qs ? `/?${qs}` : "/";
  const withHash = (hash: string) => (qs ? `/?${qs}${hash}` : `/${hash}`);

  const logoUrl = (() => {
    if (!rawLogoUrl) return null;
    if (rawLogoUrl.startsWith("/") || rawLogoUrl.startsWith("data:") || rawLogoUrl.startsWith("blob:")) {
      return rawLogoUrl;
    }
    try {
      const parsed = new URL(rawLogoUrl);
      const sourcePath = `${parsed.host}${parsed.pathname}${parsed.search}`;
      return `https://images.weserv.nl/?url=${encodeURIComponent(sourcePath)}&output=webp&q=82`;
    } catch {
      return rawLogoUrl;
    }
  })();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled || open
          ? "bg-porcelain/90 backdrop-blur-md shadow-[0_1px_0_var(--color-line)]"
          : "bg-transparent"
      }`}
    >
      <nav
        aria-label="Primary"
        className="mx-auto flex h-[4.5rem] max-w-7xl items-center justify-between px-5 md:px-8"
      >
        <Link href={home} className="flex items-center gap-2.5 font-display text-lg font-semibold text-teal-deep">
          {logoUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={logoUrl} alt={`${clinicName} logo`} className="h-10 w-auto object-contain" />
          ) : (
            <>
              <span aria-hidden className="grid h-9 w-9 place-items-center rounded-t-full rounded-b-lg bg-teal-deep text-sm text-gold">
                {clinicName.trim().charAt(0).toUpperCase()}
              </span>
              <span className="max-w-[12rem] truncate">{clinicName}</span>
            </>
          )}
        </Link>

        <ul className="hidden items-center gap-9 text-[0.95rem] font-medium text-ink-soft md:flex">
          {links.map((l) => (
            <li key={l.hash}>
              <Link href={withHash(l.hash)} className="link-draw py-1 hover:text-teal-deep">
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <Link href={withHash("#appointment")} className="btn btn-primary hidden !min-h-11 !px-5 !py-2 text-[0.95rem] sm:inline-flex">
            Book a visit
          </Link>
          <button
            type="button"
            className="grid h-11 w-11 place-items-center rounded-full text-teal-deep hover:bg-mist md:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
          >
            <span className="material-symbols-outlined">{open ? "close" : "menu"}</span>
          </button>
        </div>
      </nav>

      <div
        id="mobile-menu"
        hidden={!open}
        className="fixed inset-x-0 bottom-0 top-[4.5rem] bg-porcelain px-5 pb-10 pt-6 md:hidden"
      >
        <ul className="divide-y divide-line">
          {links.map((l) => (
            <li key={l.hash}>
              <Link
                href={withHash(l.hash)}
                onClick={() => setOpen(false)}
                className="flex items-center justify-between py-5 font-display text-2xl font-semibold text-teal-deep"
              >
                {l.label}
                <span className="material-symbols-outlined text-ink-soft">arrow_forward</span>
              </Link>
            </li>
          ))}
        </ul>
        <Link href={withHash("#appointment")} onClick={() => setOpen(false)} className="btn btn-primary mt-8 w-full">
          Book a visit
        </Link>
      </div>
    </header>
  );
}
