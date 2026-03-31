'use client';
import { useEffect, useState, useRef } from 'react';

export default function AnimatedStat({ value, label }: { value: string; label: string }) {
  const [count, setCount] = useState(0);
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // SAFE PARSING: "15k+" -> 15 and "k+" | "24/7" -> 24 and "/7" | "Modern" -> null and "Modern"
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
          observer.disconnect(); // Trigger only once
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (inView && isNumeric && targetNumber > 0) {
      let start = 0;
      const duration = 2000; // 2 seconds
      const increment = Math.max(1, Math.ceil(targetNumber / (duration / 16)));
      
      const timer = setInterval(() => {
        start += increment;
        if (start >= targetNumber) {
          setCount(targetNumber);
          clearInterval(timer);
        } else {
          setCount(start);
        }
      }, 16);
      return () => clearInterval(timer);
    }
  }, [inView, isNumeric, targetNumber]);

  return (
    <div ref={ref} className="text-center group">
      <h3 className="text-4xl lg:text-5xl font-extrabold text-white mb-2 drop-shadow-md transition-all duration-300">
        {isNumeric ? `${count}${suffix}` : value}
      </h3>
      <p className="text-white/80 text-sm font-bold uppercase tracking-widest">{label}</p>
    </div>
  );
}
