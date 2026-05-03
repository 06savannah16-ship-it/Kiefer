import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import ChapterHeader from "./ChapterHeader";
import { SITE } from "../config.jsx";
import "./About.css";

export default function About() {
  const ref = useRef(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const textY = useTransform(scrollYProgress, [0, 1], reduce ? ["0%", "0%"] : ["20%", "-20%"]);
  const { about } = SITE;

  return (
    <section ref={ref} id="about" className="r-about" aria-label="About">
      <motion.div className="r-about__content" style={{ y: textY }}>
        <ChapterHeader
          align="left"
          numeral={about.numeral}
          label={about.label}
          title={about.title}
        />

        <div className="r-about__body">
          {about.body.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>

        <div className="r-about__signature">
          <span className="r-about__signature-name">{about.signature}</span>
          <span className="r-about__signature-meta">{about.signatureMeta}</span>
        </div>

        <ul className="r-about__stats">
          {about.stats.map((s) => (
            <li key={s.label} className="r-about__stat">
              <span className="r-about__stat-num">{s.num}</span>
              <span className="r-about__stat-label">{s.label}</span>
              <span className="r-about__stat-note">{s.note}</span>
            </li>
          ))}
        </ul>
      </motion.div>
    </section>
  );
}
