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
  const [hidden, setHidden] = useState(false);

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
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 12);
      setHidden(y > last && y > 240);
      last = y;
    };
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
      className={`fixed inset-x-0 top-0 z-[300] transition-[transform,background-color,box-shadow] duration-300 ${
        hidden && !open ? "-translate-y-full" : "translate-y-0"
      } ${scrolled || open ? "bg-paper shadow-[0_1px_0_var(--color-rule)]" : "bg-transparent"}`}
    >
      <nav
        aria-label="Primary"
        className="mx-auto flex h-[4.5rem] max-w-7xl items-center justify-between px-5 md:px-8"
      >
        <Link href={home} className="flex items-center gap-2.5 font-display text-lg font-bold text-ink no-underline">
          {logoUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={logoUrl} alt={`${clinicName} logo`} className="h-10 w-auto object-contain" />
          ) : (
            <>
              <span aria-hidden className="grid h-9 w-9 place-items-center rounded-input bg-accent text-sm text-accent-ink">
                {clinicName.trim().charAt(0).toUpperCase()}
              </span>
              <span className="max-w-[12rem] truncate">{clinicName}</span>
            </>
          )}
        </Link>

        <ul className="hidden items-center gap-9 text-md text-ink-2 md:flex">
          {links.map((l) => (
            <li key={l.hash}>
              <Link href={withHash(l.hash)} className="link-line py-1">
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <Link href={withHash("#appointment")} className="btn btn--primary btn--sm hidden sm:inline-flex">
            Book a visit
          </Link>
          <button
            type="button"
            className="grid h-11 w-11 place-items-center rounded-pill text-ink hover:bg-paper-3 md:hidden"
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
        className="fixed inset-x-0 bottom-0 top-[4.5rem] bg-paper px-5 pb-10 pt-6 md:hidden"
      >
        <ul className="divide-y divide-rule">
          {links.map((l) => (
            <li key={l.hash}>
              <Link
                href={withHash(l.hash)}
                onClick={() => setOpen(false)}
                className="flex items-center justify-between py-5 font-display text-2xl font-bold text-ink no-underline"
              >
                {l.label}
                
              </Link>
            </li>
          ))}
        </ul>
        <Link href={withHash("#appointment")} onClick={() => setOpen(false)} className="btn btn--primary mt-8 w-full">
          Book a visit
        </Link>
      </div>
    </header>
  );
}
