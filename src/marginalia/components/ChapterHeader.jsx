import { motion, useReducedMotion } from "framer-motion";
import "./ChapterHeader.css";

/**
 * Shared chapter header. Animated on scroll-into-view:
 *   - Roman numeral draws in from left
 *   - rule line scales in from 0 to full width
 *   - label fades up
 *   - title splits into block lines, fades up with stagger
 */
export default function ChapterHeader({
  numeral,
  label,
  title,
  lede,
  align = "left", // "left" | "center"
}) {
  const reduce = useReducedMotion();
  const ease = [0.22, 1, 0.36, 1];

  const baseTransition = (delay = 0) => ({
    duration: 0.8,
    delay,
    ease,
  });

  return (
    <motion.header
      className={`r-ch r-ch--${align}`}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.3 }}
    >
      <p className="r-ch__chapter">
        <motion.span
          className="r-ch__numeral"
          variants={
            reduce
              ? undefined
              : {
                  hidden: { opacity: 0, x: -12 },
                  show: { opacity: 1, x: 0, transition: baseTransition(0) },
                }
          }
        >
          {numeral}
        </motion.span>

        <motion.span
          className="r-ch__rule"
          aria-hidden="true"
          variants={
            reduce
              ? undefined
              : {
                  hidden: { scaleX: 0 },
                  show: {
                    scaleX: 1,
                    transition: { ...baseTransition(0.1), duration: 1 },
                  },
                }
          }
        />

        <motion.span
          className="r-ch__label"
          variants={
            reduce
              ? undefined
              : {
                  hidden: { opacity: 0, y: 6 },
                  show: { opacity: 1, y: 0, transition: baseTransition(0.2) },
                }
          }
        >
          {label}
        </motion.span>
      </p>

      <motion.h2
        className="r-ch__title"
        variants={
          reduce
            ? undefined
            : {
                hidden: { opacity: 0, y: 24 },
                show: { opacity: 1, y: 0, transition: baseTransition(0.25) },
              }
        }
      >
        {title}
      </motion.h2>

      {lede && (
        <motion.p
          className="r-ch__lede"
          variants={
            reduce
              ? undefined
              : {
                  hidden: { opacity: 0, y: 16 },
                  show: { opacity: 1, y: 0, transition: baseTransition(0.4) },
                }
          }
        >
          {lede}
        </motion.p>
      )}
    </motion.header>
  );
}
