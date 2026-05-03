import { motion, useReducedMotion } from "framer-motion";
import ChapterHeader from "./ChapterHeader";
import { SITE } from "../config.jsx";
import { STACK } from "../data/stack";
import "./Stack.css";

export default function Stack() {
  const reduce = useReducedMotion();
  const { stack: cfg } = SITE;
  const totalCount = STACK.reduce((acc, c) => acc + c.items.length, 0);

  return (
    <section id="stack" className="r-stack" aria-label="Stack and tools">
      <div className="r-stack__container">
        <div className="r-stack__header">
          <ChapterHeader
            align="left"
            numeral={cfg.numeral}
            label={cfg.label}
            title={cfg.title}
            lede={cfg.lede}
          />
        </div>

        <div className="r-stack__ledger">
          <div className="r-stack__ledger-head" aria-hidden="true">
            <span>Category</span>
            <span>Tool</span>
            <span>Note</span>
          </div>

          {STACK.map((cat, ci) => (
            <motion.div
              key={cat.category}
              className="r-stack__cat"
              initial={reduce ? false : { opacity: 0, y: 20 }}
              whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.6,
                delay: ci * 0.08,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              {cat.items.map((item, ii) => (
                <div className="r-stack__row" key={item.name}>
                  <span className="r-stack__cat-label">
                    {ii === 0 ? cat.category : ""}
                  </span>
                  <span className="r-stack__name">{item.name}</span>
                  <span className="r-stack__note">{item.note}</span>
                </div>
              ))}
            </motion.div>
          ))}
        </div>

        <p className="r-stack__count">
          <span className="r-stack__count-num">{totalCount}</span>
          <span className="r-stack__count-label">{cfg.countLabel}</span>
          <span className="r-stack__count-meta">{cfg.countMeta}</span>
        </p>
      </div>
    </section>
  );
}
