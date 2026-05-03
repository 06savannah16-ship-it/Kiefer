import { useEffect, useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { SITE } from "../config.jsx";
import "./SkyCanvas.css";

const BG = SITE.assets.bg;

/**
 * SkyCanvas — single fixed background painting that crossfades
 * between time-of-day grades as the user scrolls through the page.
 *
 * Stages (mapped to scroll progress 0 → 1 across full document):
 *   0.00  Hero      — twilight dawn
 *   0.20  About     — golden hour
 *   0.40  Work      — midday cool
 *   0.60  Writing   — dusk violet
 *   0.80  Stack     — deep night
 *   1.00  Contact   — moonlit
 */

const STAGES = [
  // [stop, grade rgba, vignette intensity, brightness, sepia, hueRotate]
  { stop: 0.0,  grade: "linear-gradient(180deg, rgba(20,30,60,0.55) 0%, rgba(40,35,65,0.35) 35%, rgba(60,40,50,0.25) 65%, rgba(26,18,8,0.5) 100%)", brightness: 0.78, sepia: 0,    hue: 0 },
  { stop: 0.2,  grade: "linear-gradient(180deg, rgba(80,50,25,0.55) 0%, rgba(60,35,18,0.45) 40%, rgba(35,22,12,0.55) 80%, rgba(15,10,6,0.85) 100%)", brightness: 0.55, sepia: 0.18, hue: 0 },
  { stop: 0.4,  grade: "linear-gradient(180deg, rgba(15,18,35,0.85) 0%, rgba(20,22,40,0.7) 50%, rgba(15,12,25,0.92) 100%)", brightness: 0.42, sepia: 0,    hue: 0 },
  { stop: 0.6,  grade: "linear-gradient(180deg, rgba(40,25,50,0.65) 0%, rgba(30,22,50,0.55) 50%, rgba(15,10,25,0.85) 100%)", brightness: 0.4,  sepia: 0,    hue: -10 },
  { stop: 0.85, grade: "linear-gradient(180deg, rgba(8,10,25,0.85) 0%, rgba(12,12,30,0.75) 50%, rgba(5,5,15,0.95) 100%)", brightness: 0.32, sepia: 0,    hue: -20 },
];

export default function SkyCanvas() {
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const overlayRef = useRef(null);
  const imgRef = useRef(null);

  // Subtle parallax — bg drifts down slightly with scroll
  const parallaxY = useTransform(scrollYProgress, [0, 1], reduce ? ["0%", "0%"] : ["0%", "8%"]);

  // Cursor-aware parallax — bg shifts subtly opposite cursor
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const cursorX = useSpring(mx, { stiffness: 50, damping: 18, mass: 0.6 });
  const cursorY = useSpring(my, { stiffness: 50, damping: 18, mass: 0.6 });

  useEffect(() => {
    if (reduce) return;
    const handle = (e) => {
      const cx = (e.clientX / window.innerWidth - 0.5) * -16; // -8..8 px
      const cy = (e.clientY / window.innerHeight - 0.5) * -10;
      mx.set(cx);
      my.set(cy);
    };
    window.addEventListener("pointermove", handle, { passive: true });
    return () => window.removeEventListener("pointermove", handle);
  }, [mx, my, reduce]);

  // Drive CSS via scrollYProgress without re-rendering React tree
  useEffect(() => {
    const unsub = scrollYProgress.on("change", (p) => {
      // Find the two stages we're between
      let a = STAGES[0];
      let b = STAGES[STAGES.length - 1];
      for (let i = 0; i < STAGES.length - 1; i++) {
        if (p >= STAGES[i].stop && p <= STAGES[i + 1].stop) {
          a = STAGES[i];
          b = STAGES[i + 1];
          break;
        }
      }
      if (p > STAGES[STAGES.length - 1].stop) {
        a = STAGES[STAGES.length - 1];
        b = STAGES[STAGES.length - 1];
      }

      const span = b.stop - a.stop || 1;
      const t = Math.max(0, Math.min(1, (p - a.stop) / span));

      // Crossfade two grade layers via opacity
      if (overlayRef.current) {
        overlayRef.current.style.setProperty("--r-grade-a", a.grade);
        overlayRef.current.style.setProperty("--r-grade-b", b.grade);
        overlayRef.current.style.setProperty("--r-grade-t", String(t));
      }

      // Lerp image filter
      const lerp = (x, y, k) => x + (y - x) * k;
      const brightness = lerp(a.brightness, b.brightness, t);
      const sepia = lerp(a.sepia, b.sepia, t);
      const hue = lerp(a.hue, b.hue, t);
      if (imgRef.current) {
        imgRef.current.style.filter = `saturate(0.95) contrast(1.05) brightness(${brightness}) sepia(${sepia}) hue-rotate(${hue}deg)`;
      }
    });
    return () => unsub();
  }, [scrollYProgress]);

  return (
    <div className="r-sky" aria-hidden="true">
      <motion.div className="r-sky__layer" style={{ y: parallaxY, x: cursorX }}>
        <motion.img
          ref={imgRef}
          src={BG}
          alt=""
          className="r-sky__img"
          draggable="false"
          style={{
            y: cursorY,
            filter: `saturate(0.95) contrast(1.05) brightness(${STAGES[0].brightness})`,
          }}
        />
        <div ref={overlayRef} className="r-sky__overlay" />
        <div className="r-sky__vignette" />
      </motion.div>
    </div>
  );
}
