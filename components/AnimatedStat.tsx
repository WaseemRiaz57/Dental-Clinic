'use client';
import { useEffect, useState, useRef } from 'react';

export default function AnimatedStat({ value, label }: { value: string; label: string }) {
  const [count, setCount] = useState(0);
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // "15k+" -> 15 + "k+" | "24/7" -> 24 + "/7" | "Modern" -> text only
  const match = String(value).match(/^(\d+)(.*)$/);
  const isNumeric = !!match;
  const targetNumber = isNumeric ? parseInt(match[1], 10) : 0;
  const suffix = isNumeric ? match[2] : value;

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!(inView && isNumeric && targetNumber > 0)) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setCount(targetNumber);
      return;
    }
    let raf = 0;
    const duration = 1600;
    const t0 = performance.now();
    const tick = (now: number) => {
      const p = Math.min(1, (now - t0) / duration);
      setCount(Math.round(targetNumber * (1 - Math.pow(1 - p, 4))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, isNumeric, targetNumber]);

  // Show the final value until the count-up starts so there is no layout shift or flash of "0"
  const shown = isNumeric ? `${inView ? count : targetNumber}${suffix}` : value;

  return (
    <div ref={ref}>
      <div className="font-display text-4xl font-semibold tabular-nums text-white md:text-5xl">{shown}</div>
      <p className="mt-2 text-[0.95rem] text-teal-light">{label}</p>
    </div>
  );
}
