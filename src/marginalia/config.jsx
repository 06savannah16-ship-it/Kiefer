// Single config file — fork the project, edit this, ship your folio.
// All sections read from here. No hardcoded names elsewhere (data files
// for lists like works/writings/stack/press live in ./data/*).

export const SITE = {
  // Browser tab + meta
  title: "Marginalia — A Modern Renaissance Folio",
  description:
    "A working notebook of design + code work. Built with Marginalia, an open-source portfolio template.",
  themeColor: "#1a1208",

  // Owner identity
  owner: {
    name: "Your Name",
    initials: "YN",
    role: "Design Engineer",
    location: "Somewhere · Earth",
    email: "you@example.com",
  },

  // Hero
  hero: {
    titleLine1: "Building",
    titleLine2Italic: "Beautifully",
    folioLabel: "Folio MMXXVI",
    lede: (
      <>
        A folio of work — design engineer shipping across design and code.
        Six years of small inventions for big problems.
      </>
    ),
    nav: [
      { label: "Work", numeral: "I", href: "#work" },
      { label: "About", numeral: "II", href: "#about" },
      { label: "Writing", numeral: "III", href: "#writing" },
      { label: "Stack", numeral: "IV", href: "#stack" },
      { label: "Press", numeral: "V", href: "#press" },
      { label: "Contact", numeral: "VI", href: "#contact" },
    ],
    topRight: [
      { kind: "link", label: "Old site", href: "/" },
      { kind: "cta",  label: "Get in touch", href: "#contact" },
    ],
  },

  // Manifesto / About
  about: {
    numeral: "II",
    label: "Manifesto",
    title: (
      <>
        Software has lost the smell of <em>oil paint</em>.
        I am here to put it back.
      </>
    ),
    body: [
      "For six years I have shipped at the seam where design meets code — different stacks, same craft.",
      "I believe small teams build the most interesting software, that taste is a skill, and that the right detail at the right time is worth a hundred meetings.",
      "This folio is a working notebook. Recent inventions, old experiments, things I am proud of, things I am still figuring out.",
    ],
    signature: "— Your Name",
    signatureMeta: "Somewhere · MMXXVI",
    stats: [
      { num: "VI",  label: "Years shipping", note: "design + code" },
      { num: "III", label: "Continents lived", note: "edit me" },
      { num: "XL+", label: "Projects shipped", note: "edit me" },
      { num: "I",   label: "Craft", note: "design engineering" },
    ],
  },

  // Section copy (titles + ledes — items live in ./data/*)
  work: {
    numeral: "III",
    label: "Selected Work",
    title: (
      <>
        A folio of <em>small inventions</em>
      </>
    ),
    lede: "Six years of products shipped across health, fintech, government, and indie tooling. Each one a frame in the gallery.",
  },
  writing: {
    numeral: "IV",
    label: "Writing",
    title: (
      <>
        From the <em>marginalia</em>
      </>
    ),
    lede: "Notes from the workshop — essays on craft, shipping, and the small interfaces between design and code.",
    archiveHref: "#",
  },
  stack: {
    numeral: "V",
    label: "Workshop",
    title: (
      <>
        The <em>workbench</em>
      </>
    ),
    lede: "A working ledger of the tools I reach for daily. Updated when something earns its place.",
    countLabel: "tools on the bench",
    countMeta: "last updated · MMXXVI",
  },
  press: {
    numeral: "VI",
    label: "Press",
    title: (
      <>
        In <em>print</em> &amp; on the wire
      </>
    ),
    lede: "Press kit, talks, mentions. Use the bio that fits the column.",
  },
  contact: {
    numeral: "VII",
    label: "Contact",
    title: (
      <>
        Send word — I keep a <em>short reply</em> queue
      </>
    ),
    lede: "Project? Talk? Idea worth chasing? Drop a note. I read every message and reply within a few days.",
    workingHours: "Mon — Fri · 09:00–18:00 local",
    workingHoursNote: "Async-first. Don't wait for office hours to write.",
  },

  // Footer
  footer: {
    line: "Made by hand. A modern Renaissance folio.",
    typeCredit: <em>Instrument Serif</em>,
    techCredit: "Built with React, framer-motion, and Lenis.",
    links: [
      { label: "Github",  href: "https://github.com/uxderrick/marginalia" },
      { label: "License", href: "https://github.com/uxderrick/marginalia/blob/main/LICENSE" },
    ],
  },

  // Asset paths — drop your own bg + figure here, keep filenames or update
  assets: {
    bg:     "/assets/marginalia/bg-01-dawn.png",
    figure: "/assets/marginalia/figure-01-standing.png",
  },
};
