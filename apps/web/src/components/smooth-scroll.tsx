'use client';

import { useEffect } from 'react';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';

/**
 * Apple-style inertial smooth scroll (Lenis). Disabled under prefers-reduced-motion
 * (native scroll). Renders nothing — it just drives the scroll engine via rAF.
 */
export function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const lenis = new Lenis({
      lerp: 0.1,
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.4,
    });
    const stop = () => lenis.stop();
    const start = () => lenis.start();
    window.addEventListener('app:lenis-stop', stop);
    window.addEventListener('app:lenis-start', start);

    let raf = 0;
    const loop = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('app:lenis-stop', stop);
      window.removeEventListener('app:lenis-start', start);
      lenis.destroy();
    };
  }, []);

  return null;
}
