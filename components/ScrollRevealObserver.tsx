'use client';

import { useEffect } from 'react';

export default function ScrollRevealObserver() {
  useEffect(() => {
    const elements = Array.from(
      document.querySelectorAll<HTMLElement>('.reveal-up')
    );

    if (elements.length === 0) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.18,
        rootMargin: '0px 0px -8% 0px',
      }
    );

    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return null;
}
