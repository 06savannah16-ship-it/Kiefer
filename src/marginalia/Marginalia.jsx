import { useEffect } from "react";
import "./tokens.css";
import "./Marginalia.css";
import { useLenis } from "./hooks/useLenis";
import { SITE } from "./config.jsx";
import Hero from "./components/Hero";
import About from "./components/About";
import Work from "./components/Work";
import Writing from "./components/Writing";
import Stack from "./components/Stack";
import Press from "./components/Press";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import SkyCanvas from "./components/SkyCanvas";
import ScrollIndex from "./components/ScrollIndex";
import PageEmbers from "./components/PageEmbers";
import PageFigure from "./components/PageFigure";

const FONT_STACKS = {
  erode: '"Erode", "Fraunces", Georgia, serif',
  fraunces: '"Fraunces", Georgia, serif',
  instrument: '"Instrument Serif", "Fraunces", Georgia, serif',
};

export default function Marginalia() {
  useLenis();

  const params = new URLSearchParams(
    typeof window !== "undefined" ? window.location.search : "",
  );
  const fontKey = (params.get("font") || "instrument").toLowerCase();
  const stack = FONT_STACKS[fontKey] || FONT_STACKS.instrument;

  // Set document meta from config (no helmet dep needed for SPA use)
  useEffect(() => {
    document.title = SITE.title;
    const setMeta = (name, content) => {
      let el = document.querySelector(`meta[name="${name}"]`);
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute("name", name);
        document.head.appendChild(el);
      }
      el.setAttribute("content", content);
    };
    setMeta("description", SITE.description);
    setMeta("theme-color", SITE.themeColor);
  }, []);

  return (
    <main
      className="r-root"
      style={{ "--r-font-display": stack }}
      data-font={fontKey}
    >
      <a href="#r-content" className="r-skip-link">
        Skip to content
      </a>
      <SkyCanvas />
      <PageFigure />
      <PageEmbers />
      <ScrollIndex />
      <Hero />
      <div id="r-content" />
      <About />
      <Work />
      <Writing />
      <Stack />
      <Press />
      <Contact />
      <Footer />
    </main>
  );
}
