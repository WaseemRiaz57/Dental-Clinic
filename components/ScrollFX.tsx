"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/**
 * All scroll choreography for the home page. The server-rendered markup is the finished page;
 * this only adds motion on top, and only for people who have not asked for reduced motion.
 */
export default function ScrollFX() {
  // Drop photographs that failed to load so the slot's paper gradient shows instead of a broken icon.
  useEffect(() => {
    document.querySelectorAll<HTMLImageElement>("[data-slot] img").forEach((img) => {
      if (img.complete && !img.naturalWidth) img.remove();
      else img.addEventListener("error", () => img.remove(), { once: true });
    });
  }, []);

  useGSAP(() => {
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const q = <T extends Element>(sel: string) => gsap.utils.toArray<T>(sel);

      /* 1 · progress spine */
      gsap.to("[data-spine] i", {
        scaleY: 1,
        ease: "none",
        scrollTrigger: { start: 0, end: "max", scrub: 0.3 },
      });

      /* 2 · hero: pause window light off screen, slab straightens and label drifts */
      const hero = document.querySelector<HTMLElement>("[data-hero]");
      if (hero) {
        ScrollTrigger.create({
          trigger: hero,
          start: "top top",
          end: "bottom top",
          onToggle: (self) => hero.classList.toggle("is-paused", !self.isActive),
        });
      }
      mm.add("(min-width: 48rem)", () => {
        gsap.fromTo(
          "[data-slab]",
          { rotateX: 10, rotateY: -16, rotateZ: 1.5 },
          {
            rotateX: 0, rotateY: 0, rotateZ: 0, y: -50, ease: "none",
            scrollTrigger: { trigger: "[data-hero]", start: "top top", end: "bottom top", scrub: 0.6 },
          },
        );
        gsap.to("[data-label]", {
          y: -110, ease: "none",
          scrollTrigger: { trigger: "[data-hero]", start: "top top", end: "bottom top", scrub: 0.6 },
        });
      });

      /* 3 · tray: lids lift in a run as each row enters */
      const lids = q<HTMLElement>("[data-lid]");
      gsap.set(lids, { opacity: 1, rotateX: 0 });
      ScrollTrigger.batch(lids, {
        start: "top 88%",
        once: true,
        onEnter: (els) =>
          gsap.to(els, { rotateX: -115, autoAlpha: 0, duration: 1.1, ease: "power3.out", stagger: 0.14 }),
      });

      /* 4 · statement: display text fills in word by word, scrubbed */
      q<HTMLElement>("[data-words]").forEach((el) => {
        const text = el.textContent ?? "";
        el.setAttribute("aria-label", text);
        el.textContent = "";
        const words = text.split(/(\s+)/).filter(Boolean).map((w) => {
          const span = document.createElement("span");
          span.className = /^\s+$/.test(w) ? "" : "word";
          span.setAttribute("aria-hidden", "true");
          span.textContent = w;
          el.appendChild(span);
          return span;
        });
        gsap.fromTo(
          words.filter((w) => w.className === "word"),
          { opacity: 0.16 },
          {
            opacity: 1, stagger: 0.12, ease: "none",
            scrollTrigger: { trigger: el, start: "top 82%", end: "bottom 46%", scrub: 0.4 },
          },
        );
      });

      /* 5 · portraits: clip opens from a small arch to the full frame, image drifts inside */
      q<HTMLElement>("[data-open]").forEach((el) => {
        gsap.fromTo(
          el,
          { clipPath: "inset(14% 10% 14% 10% round 28px)" },
          {
            clipPath: "inset(0% 0% 0% 0% round 14px)", ease: "none",
            scrollTrigger: { trigger: el, start: "top 92%", end: "top 38%", scrub: 0.5 },
          },
        );
      });
      q<HTMLElement>("[data-drift]").forEach((el) => {
        gsap.fromTo(
          el,
          { yPercent: -7, scale: 1.14 },
          {
            yPercent: 7, scale: 1.14, ease: "none",
            scrollTrigger: { trigger: el.parentElement, start: "top bottom", end: "bottom top", scrub: true },
          },
        );
      });

      /* 6 · things that rise once: labels, quotes, form fields */
      gsap.set("[data-rise]", { autoAlpha: 0, y: 36 });
      ScrollTrigger.batch(q<HTMLElement>("[data-rise]"), {
        start: "top 90%",
        once: true,
        onEnter: (els) =>
          gsap.to(els, { y: 0, autoAlpha: 1, duration: 0.8, ease: "power3.out", stagger: 0.1 }),
      });
      /* stamps land */
      q<HTMLElement>("[data-stamp]").forEach((el) => {
        gsap.from(el, {
          scale: 1.6, autoAlpha: 0, rotate: -6, duration: 0.5, ease: "power4.out",
          scrollTrigger: { trigger: el, start: "top 90%", once: true },
        });
      });

      /* 7 · gallery: pinned, travels sideways on wide screens */
      mm.add("(min-width: 48rem)", () => {
        const section = document.querySelector<HTMLElement>("[data-hscroll]");
        const track = document.querySelector<HTMLElement>("[data-htrack]");
        if (!section || !track) return;
        const distance = () => Math.max(0, track.scrollWidth - window.innerWidth);
        gsap.to(track, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: section,
            pin: true,
            scrub: 0.7,
            start: "top top",
            end: () => `+=${distance()}`,
            invalidateOnRefresh: true,
          },
        });
      });
    });

    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);
    document.fonts?.ready.then(refresh);
    return () => {
      window.removeEventListener("load", refresh);
      mm.revert();
    };
  }, []);

  return (
    <div className="spine" data-spine aria-hidden="true">
      <i />
    </div>
  );
}
