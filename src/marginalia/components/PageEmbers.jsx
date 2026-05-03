import { useReducedMotion } from "framer-motion";
import "./PageEmbers.css";

/**
 * Page-wide chartreuse embers. Fixed layer, drifts up continuously.
 * Density grows toward the bottom of the page (intensifies near contact).
 */
export default function PageEmbers({ count = 28 }) {
  const reduce = useReducedMotion();
  if (reduce) return null;

  const particles = Array.from({ length: count });
  return (
    <div className="r-pe" aria-hidden="true">
      {particles.map((_, i) => {
        const left = (i * 31) % 100;
        const delay = (i * 0.7) % 12;
        const duration = 11 + ((i * 1.7) % 9);
        const size = 1.5 + ((i * 1.3) % 4);
        const drift = -20 + ((i * 7) % 40);
        return (
          <span
            key={i}
            className="r-pe__ember"
            style={{
              left: `${left}%`,
              width: `${size}px`,
              height: `${size}px`,
              animationDelay: `${delay}s`,
              animationDuration: `${duration}s`,
              "--r-drift": `${drift}px`,
            }}
          />
        );
      })}
    </div>
  );
}
