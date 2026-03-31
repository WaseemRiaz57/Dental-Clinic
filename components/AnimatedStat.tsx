'use client';

import { useEffect, useRef, useState } from 'react';

type AnimatedStatProps = {
  value: string;
  label: string;
};

export default function AnimatedStat({ value, label }: AnimatedStatProps) {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const parts = value.match(/^(\D*)(\d+)(.*)$/);
  const prefix = parts?.[1] ?? '';
  const targetNumber = parts?.[2] ? parseInt(parts[2], 10) : 0;
  const suffix = parts?.[3] ?? '';

  useEffect(() => {
    const node = ref.current;
    if (!node || targetNumber <= 0 || hasStarted) {
      return;
    }

    let rafId = 0;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          return;
        }

        setHasStarted(true);
        const duration = 1800;
        const startTime = performance.now();

        const tick = (now: number) => {
          const elapsed = now - startTime;
          const progress = Math.min(elapsed / duration, 1);
          const nextValue = Math.max(0, Math.round(progress * targetNumber));
          setCount(nextValue);

          if (progress < 1) {
            rafId = requestAnimationFrame(tick);
          }
        };

        rafId = requestAnimationFrame(tick);
        observer.disconnect();
      },
      { threshold: 0.45 }
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
      if (rafId) {
        cancelAnimationFrame(rafId);
      }
    };
  }, [hasStarted, targetNumber]);

  const displayValue = targetNumber > 0 ? `${prefix}${count}${suffix}` : value;

  return (
    <div ref={ref} className="text-center group">
      <h3 className="text-5xl font-bold mb-2 stitch-display !text-white">{displayValue}</h3>
      <p className="text-white/70 text-sm uppercase tracking-widest">{label}</p>
    </div>
  );
}
