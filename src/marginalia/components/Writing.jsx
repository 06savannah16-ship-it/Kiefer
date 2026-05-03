import { motion, useReducedMotion } from "framer-motion";
import ChapterHeader from "./ChapterHeader";
import { SITE } from "../config.jsx";
import { WRITINGS } from "../data/writings";
import "./Writing.css";

const fmt = (iso) =>
  new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

export default function Writing() {
  const reduce = useReducedMotion();
  const { writing } = SITE;

  return (
    <section id="writing" className="r-writing" aria-label="Writing">
      <div className="r-writing__container">
        <div className="r-writing__header">
          <ChapterHeader
            align="left"
            numeral={writing.numeral}
            label={writing.label}
            title={writing.title}
            lede={writing.lede}
          />
        </div>

        <ol className="r-writing__list">
          {WRITINGS.map((w, i) => (
            <motion.li
              key={w.id}
              className="r-writing__item"
              initial={reduce ? false : { opacity: 0, y: 20 }}
              whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{
                duration: 0.6,
                delay: i * 0.06,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <a href={w.href} className="r-writing__row">
                <span className="r-writing__numeral">{w.numeral}</span>
                <div className="r-writing__main">
                  <h3 className="r-writing__name">{w.title}</h3>
                  <p className="r-writing__dek">{w.dek}</p>
                  <p className="r-writing__meta">
                    <span>{fmt(w.date)}</span>
                    <span aria-hidden="true">·</span>
                    <span>{w.venue}</span>
                    <span aria-hidden="true">·</span>
                    <span>{w.minutes} min read</span>
                  </p>
                </div>
                <span className="r-writing__arrow" aria-hidden="true">→</span>
              </a>
            </motion.li>
          ))}
        </ol>

        <footer className="r-writing__footer">
          <a href={writing.archiveHref} className="r-writing__more">
            Read the full archive
            <span aria-hidden="true">↗</span>
          </a>
        </footer>
      </div>
    </section>
  );
}
