import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useReducedMotion,
} from "framer-motion";
import { SITE } from "../config.jsx";
import "./PageFigure.css";

const FIGURE = SITE.assets.figure;

/**
 * Page-wide protagonist. Anchored bottom-left.
 * Scale + horizontal drift driven by scroll progress.
 *
 * Scale keyframes (mapped to total document scroll 0 → 1):
 *   0.00 Hero      → 1.0    (full size)
 *   0.15 About     → 0.78   (smaller for text reading)
 *   0.32 Work      → 0.52   (small, frames take spotlight)
 *   0.55 Writing   → 0.46   (smallest, list focus)
 *   0.72 Stack     → 0.46   (still small)
 *   0.82 Press     → 0.65   (growing back)
 *   1.00 Contact   → 0.95   (large again — bookend greeting)
 */
const SCALE_STOPS = [0,    0.15, 0.32, 0.55, 0.72, 0.82, 1.0];
const SCALE_VALS  = [1.0,  0.78, 0.52, 0.46, 0.46, 0.62, 0.78];

const X_STOPS = [0,    0.15, 0.32, 0.55, 0.72, 0.82, 1.0];
const X_VALS  = ["0%", "-6%", "-22%", "-30%", "-30%", "-22%", "-22%"];

export default function PageFigure() {
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const ref = useRef(null);

  const rawScale = useTransform(scrollYProgress, SCALE_STOPS, SCALE_VALS);
  const rawX = useTransform(scrollYProgress, X_STOPS, X_VALS);

  // Spring smooth so motion feels organic, not stepped
  const scale = useSpring(rawScale, {
    stiffness: 90,
    damping: 22,
    mass: 0.8,
  });
  const x = useSpring(rawX, {
    stiffness: 80,
    damping: 24,
    mass: 0.8,
  });

  // Reduced motion = static at hero scale
  if (reduce) {
    return (
      <div className="r-pf" aria-hidden="true">
        <img src={FIGURE} alt="" className="r-pf__img" draggable="false" />
      </div>
    );
  }

  return (
    <div className="r-pf" aria-hidden="true" ref={ref}>
      <motion.img
        src={FIGURE}
        alt=""
        className="r-pf__img"
        draggable="false"
        style={{ scale, x, transformOrigin: "left bottom" }}
      />
    </div>
  );
}
