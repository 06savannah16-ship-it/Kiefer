import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { SITE } from "../config.jsx";
import "./Hero.css";

export default function Hero() {
  const ref = useRef(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], reduce ? ["0%", "0%"] : ["0%", "12%"]);
  const cardOpacity = useTransform(scrollYProgress, [0, 0.55], [1, 0]);
  const cardScale = useTransform(scrollYProgress, [0, 0.55], reduce ? [1, 1] : [1, 0.92]);
  const cardY = useTransform(scrollYProgress, [0, 1], reduce ? ["0%", "0%"] : ["0%", "-30%"]);
  const navOpacity = useTransform(scrollYProgress, [0.5, 0.9], [1, 0]);

  const { hero, owner, assets } = SITE;

  return (
    <section ref={ref} id="hero" className="r-hero" aria-label="Hero">
      {/* Sky / background painting (kept as fallback if SkyCanvas not used) */}
      <motion.div className="r-hero__bg" style={{ y: bgY }}>
        <img src={assets.bg} alt="" aria-hidden="true" draggable="false" />
        <div className="r-hero__bg-twilight" aria-hidden="true" />
        <div className="r-hero__bg-vignette" aria-hidden="true" />
      </motion.div>

      {/* Top nav bar */}
      <motion.header className="r-hero__nav" style={{ opacity: navOpacity }}>
        <div className="r-hero__nav-left">
          <a className="r-hero__sig" href="#hero">
            <span className="r-hero__sig-mark">{owner.initials}</span>
            <span className="r-hero__sig-label">{hero.folioLabel}</span>
          </a>
        </div>
        <div className="r-hero__nav-right">
          {hero.topRight.map((item) => (
            <a
              key={item.label}
              className={item.kind === "cta" ? "r-hero__nav-cta" : "r-hero__nav-link"}
              href={item.href}
            >
              {item.label}
            </a>
          ))}
        </div>
      </motion.header>

      {/* Center card */}
      <div className="r-hero__card-anchor">
        <motion.div
          className="r-hero__card"
          style={{ opacity: cardOpacity, y: cardY, scale: cardScale }}
        >
          <div className="r-hero__card-inner">
            <h1 className="r-hero__title">
              <span className="r-hero__title-block">{hero.titleLine1}</span>
              <span className="r-hero__title-block">
                <em>{hero.titleLine2Italic}</em>
              </span>
            </h1>

            <p className="r-hero__lede">{hero.lede}</p>

            <ul className="r-hero__nav-list" aria-label="Sections">
              {hero.nav.map((item) => (
                <li key={item.label} className="r-hero__nav-row">
                  <a href={item.href} className="r-hero__nav-row-link">
                    <span className="r-hero__nav-row-label">{item.label}</span>
                    <span className="r-hero__nav-row-rule" aria-hidden="true" />
                    <span className="r-hero__nav-row-numeral">{item.numeral}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      </div>

      {/* Scroll cue */}
      <div className="r-hero__scroll-cue" aria-hidden="true">
        <span>Scroll</span>
        <span className="r-hero__scroll-line" />
      </div>
    </section>
  );
}
