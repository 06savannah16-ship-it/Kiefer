# Marginalia

> A modern Renaissance portfolio template. Single oil-painting world that color-grades through the day as you scroll. React + Vite + framer-motion + Lenis.

Marginalia is an open-source portfolio template for designers, design engineers, and indie builders who want a folio that feels like a painting and ships like software. One painted scene becomes the backdrop for the whole site, shifting from dawn through midday, dusk, and night as the reader scrolls.

## Live demo

<img width="3100" height="2122" alt="image" src="https://github.com/user-attachments/assets/a3b4f398-81b8-4b45-b553-0962db20773c" />
<img width="3094" height="2126" alt="image" src="https://github.com/user-attachments/assets/a2cc10ba-8351-4f0d-97c9-97f3f29939b5" />



## Features

- **One-world design**: a single Renaissance-style background painting, color-graded section by section as you scroll
- **Persistent protagonist**: a figure anchored to the bottom of the page that scales and shifts with scroll progress
- **Seven chapters**: Hero · Manifesto · Work · Writing · Workshop · Press · Contact
- **Built-in animations**: scroll-driven, intersection-observer reveals, cursor parallax, floating embers
- **Smooth scroll** via [Lenis](https://github.com/darkroomengineering/lenis)
- **Single-file config**: all copy + identity in `src/marginalia/config.js`. List data in `src/marginalia/data/*`
- **Theming**: design tokens exported as CSS variables — palette, type, motion easing
- **Accessible**: skip link, reduced-motion respected, semantic landmarks, scroll index navigable by keyboard
- **No backend required**: ships as a static SPA, host on Vercel / Netlify / GitHub Pages

## Stack

- React 19 + Vite
- framer-motion
- lenis (smooth scroll)
- Google Fonts: Instrument Serif, Inter, Geist Mono
- Pure CSS — no Tailwind, no CSS-in-JS

## Quickstart

```bash
git clone https://github.com/uxderrick/marginalia.git my-folio
cd my-folio
npm install
npm run dev
```

Visit `http://localhost:5173`.

## Make it yours

Marginalia is designed to be forked. Three places to edit:

1. **`src/marginalia/config.js`** — your identity, all section titles + copy
2. **`src/marginalia/data/*.js`** — list content (works, writings, stack, press, socials)
3. **`public/assets/marginalia/`** — drop your background painting + figure here

### 1. Replace the painting + figure

Marginalia ships with a placeholder painting and figure. Replace them:

- `public/assets/marginalia/bg-01-dawn.png` — landscape painting, ~1600×900, used as the world bg
- `public/assets/marginalia/figure-01-standing.png` — protagonist on transparent background, vertical 9:16

Generate them in any image tool (Gemini, Midjourney, DALL·E, Imagen, Flux). Two starter prompts below — full asset guide + extra poses in [`docs/asset-prompts.md`](./docs/asset-prompts.md).

**Background prompt** (16:9 PNG, no transparency):

```
Wide cinematic landscape painting in Italian High Renaissance oil-painting
style (think Giorgione, early Raphael). Dawn lighting: soft pink and gold sky
with low pearlescent mist hanging over rolling Tuscan hills. Cluster of slender
cypress trees mid-frame left. Distant blue mountains fading into atmospheric
haze. Sparse pink and white blossoming branches in foreground corners. Two
small birds in mid-flight upper right. No people, no text, no UI elements.
Empty center-frame composition leaving negative space for a figure. Dramatic
volumetric clouds, god-rays piercing through. Color palette: ivory #F4EBD9,
deep umber #3B2A1A, venetian red #8B2E1F, old gold #C9A227, sky teal #6B8E9E.
Painterly brushstrokes visible. 16:9 cinematic aspect ratio. Ultra-detailed,
museum-quality, soft volumetric light, cinematic depth.
```

**Figure prompt** (9:16 PNG, true alpha — generate against solid magenta if your tool fakes transparency, then chroma-key):

```
Single full-body figure on a SOLID FLAT MAGENTA BACKGROUND (#FF00FF). NOT
transparent, NOT checkered — pure solid magenta fill behind figure for chroma
keying. Italian High Renaissance oil-painting style matching Giorgione and
early Raphael. [DESCRIBE YOURSELF: age range, ethnicity, hair, expression].
Standing pose, slight contrapposto, weight on one leg, arms relaxed, one hand
holding a closed gilded illuminated manuscript at hip level. Wearing flowing
ivory and pale-gold classical robe with painterly fabric folds, venetian red
sash. Lit from upper-left by warm golden dawn light, soft pink rim light on
right shoulder, deep umber shadows on left side. Visible oil brushstrokes,
museum-quality. Color palette: ivory #F4EBD9, deep umber #3B2A1A, venetian
red #8B2E1F, old gold #C9A227. Vertical 9:16 frame, full body head to feet.
```

> **⚠️ Transparency gotcha:** many image generators export a checkerboard pattern as the "background" instead of true alpha. Generate against solid magenta `#FF00FF`, then key it out:
>
> ```bash
> magick figure.png -fuzz 8% -transparent "#FF00FF" figure-cut.png
> ```

After generating, **compress before committing** (Squoosh, ImageOptim, pngquant). Target under 500KB per asset.

#### Use your own photo as reference

Want the figure to actually look like you (or your subject)? Most modern image models accept reference images alongside the prompt — Gemini, Midjourney (`--cref`), DALL·E, Flux Kontext, ChatGPT image, Nano Banana. Workflow:

1. **Attach 1–3 clear photos** of your face / full body. Front-facing, even lighting, neutral expression works best. No sunglasses, no heavy filters.
2. **Reference them inside the prompt** so the model knows what role they play. Add a line like:

   ```
   Use the attached photo(s) as the facial reference for the figure —
   match the face, hair, skin tone, and approximate age. Keep the
   Renaissance oil-painting style; do NOT photorealistically copy the
   photo, paint it.
   ```

3. **Replace the `[DESCRIBE YOURSELF: ...]` placeholder** with a one-line description that matches your photo (e.g. `mid-30s, West African, short coiled hair, calm gaze`). Models lock onto descriptors faster than pixels alone.
4. **Iterate.** Likeness is the hardest part — regenerate 3–6 times, pick the closest, optionally inpaint the face.

Tool-specific notes:

- **Midjourney:** upload photo, copy URL, prepend to prompt: `<url> <prompt> --cref <url> --cw 80`
- **Gemini / ChatGPT:** drop the image into chat, then paste the prompt — they pick it up automatically
- **Flux Kontext / Nano Banana:** use the dedicated reference-image slot in the UI

### 2. Edit `config.js`

Open `src/marginalia/config.js`. Edit the `SITE` object — your name, role, hero copy, manifesto, section titles, footer, etc.

```js
export const SITE = {
  owner: {
    name: "Your Name",
    initials: "YN",
    role: "Design Engineer",
    location: "Somewhere · Earth",
    email: "you@example.com",
  },
  hero: {
    titleLine1: "Building",
    titleLine2Italic: "Beautifully",
    // ...
  },
  // ...
};
```

### 3. Fill the data files

- `src/marginalia/data/works.js` — projects (frame grid)
- `src/marginalia/data/writings.js` — essays / talks
- `src/marginalia/data/stack.js` — tools by category
- `src/marginalia/data/press.js` — mentions, downloads, facts
- `src/marginalia/data/socials.js` — contact links

### 4. Tune the palette (optional)

Open `src/marginalia/tokens.css`. CSS custom properties under `:root` control palette, type, motion. Defaults:

```css
--r-ivory:      #f4ebd9;
--r-umber:      #3b2a1a;
--r-venetian:   #8b2e1f;
--r-gold:       #c9a227;
--r-chartreuse: #d4ff3a;  /* accent — change to taste */
```

### 5. Tune scroll choreography (optional)

- `src/marginalia/components/SkyCanvas.jsx` — `STAGES` array drives sky color grade per scroll position
- `src/marginalia/components/PageFigure.jsx` — `SCALE_VALS` and `X_VALS` arrays drive figure size + position
- `src/marginalia/components/PageEmbers.jsx` — particle count

## Wire the contact form

The contact form is a stub — submitting flips to a "sealed" state but does nothing. To wire it up, pass an `onSubmit` handler to `<Contact />`, or post directly to a service like:

- [Resend](https://resend.com)
- [Formspree](https://formspree.io)
- [Web3Forms](https://web3forms.com)

Example:

```jsx
<Contact
  onSubmit={async (formData) => {
    await fetch("/api/contact", {
      method: "POST",
      body: formData,
    });
  }}
/>
```

## Switching fonts

The default display font is **Instrument Serif**. Marginalia bundles two alternates loaded from Google Fonts:

- `?font=instrument` (default)
- `?font=fraunces`
- `?font=erode` (requires self-hosting, see below)

Set the default in `Marginalia.jsx`:

```js
const fontKey = (params.get("font") || "instrument").toLowerCase();
```

To use **Erode** (Indian Type Foundry), self-host the variable woff2 files at `/public/fonts/erode/` and add a `@font-face` rule.

## Build + deploy

```bash
npm run build       # → ./dist
npm run preview     # serve the build locally
```

Drop `dist/` on any static host. Vercel, Netlify, GitHub Pages all work without config.

## Performance notes

- The background painting is a single PNG, served as-is. **Compress it** before deploy (Squoosh, ImageOptim) — under 500KB is reasonable.
- Consider serving WebP/AVIF for ~40% smaller payloads.
- Lenis adds ~6KB gz; framer-motion ~30KB gz.

## License

[MIT](./LICENSE) — fork it, ship your folio, keep the credit if you'd like (it helps others find the template).

## Credits

- Built by [Derrick Tsorme](https://uxderrick.com)
- Inspired by [Shopify Editions Winter '26](https://www.shopify.com/editions/winter2026) — "The Renaissance Edition"
- Type: Instrument Serif (Rodrigo Fuenzalida + Franco Jonas Henríquez), Inter (Rasmus Andersson), Geist Mono (Vercel)

## Contributing

Issues, ideas, and pull requests welcome. See [CONTRIBUTING.md](./CONTRIBUTING.md).
