import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import "./ScrollIndex.css";

const SECTIONS = [
  { id: "hero", numeral: "I", label: "Hero" },
  { id: "about", numeral: "II", label: "Manifesto" },
  { id: "work", numeral: "III", label: "Work" },
  { id: "writing", numeral: "IV", label: "Writing" },
  { id: "stack", numeral: "V", label: "Workshop" },
  { id: "press", numeral: "VI", label: "Press" },
  { id: "contact", numeral: "VII", label: "Contact" },
];

export default function ScrollIndex() {
  const [active, setActive] = useState("hero");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > window.innerHeight * 0.4);

      // Find section currently in viewport center
      const targets = SECTIONS.map((s) => {
        const el = document.getElementById(s.id) || document.querySelector(`section[aria-label]`);
        if (!el) return { id: s.id, top: Infinity };
        const r = el.getBoundingClientRect();
        return { id: s.id, top: r.top };
      });

      const trigger = window.innerHeight * 0.4;
      let current = SECTIONS[0].id;
      for (const t of targets) {
        if (t.top <= trigger) current = t.id;
      }
      setActive(current);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  const handleJump = (id) => (e) => {
    e.preventDefault();
    const el = id === "hero" ? document.querySelector(".r-hero") : document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <motion.aside
      className="r-index"
      aria-label="Section index"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: visible ? 1 : 0, x: visible ? 0 : 20 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      style={{ pointerEvents: visible ? "auto" : "none" }}
    >
      <ol className="r-index__list">
        {SECTIONS.map((s) => {
          const isActive = active === s.id;
          return (
            <li key={s.id} className={`r-index__item ${isActive ? "is-active" : ""}`}>
              <a
                href={`#${s.id}`}
                onClick={handleJump(s.id)}
                className="r-index__link"
                aria-current={isActive ? "true" : undefined}
              >
                <span className="r-index__numeral">{s.numeral}</span>
                <span className="r-index__rule" aria-hidden="true" />
                <span className="r-index__label">{s.label}</span>
              </a>
            </li>
          );
        })}
      </ol>
    </motion.aside>
  );
}
