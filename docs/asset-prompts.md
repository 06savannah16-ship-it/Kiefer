# Asset prompts

Marginalia ships with two PNG assets you should replace with your own:

- `public/assets/marginalia/bg-01-dawn.png` — the painted world
- `public/assets/marginalia/figure-01-standing.png` — the protagonist

These were generated with [Google Gemini](https://gemini.google.com) (image generation) using the prompts below. Adapt the prompts to your own face, location, era, color palette — that is the whole point of forking the template.

Any image generator works (Midjourney, DALL·E, Imagen, Flux, Stable Diffusion). Marginalia just needs the dimensions, transparency, and tone described below.

---

## 1. Background — `bg-01-dawn.png`

**Format:** PNG, 16:9 (≥ 1600 × 900px). Solid background — no transparency needed.

**Prompt:**

```
Wide cinematic landscape painting in Italian High Renaissance oil-painting
style (think Giorgione, early Raphael). Dawn lighting: soft pink and gold sky
with low pearlescent mist hanging over rolling Tuscan hills. Cluster of
slender cypress trees mid-frame left. Distant blue mountains fading into
atmospheric haze. Sparse pink and white blossoming branches in foreground
corners. Two small birds in mid-flight upper right. No people, no text, no
UI elements. Empty center-frame composition leaving negative space for a
figure. Dramatic volumetric clouds, god-rays piercing through. Color palette:
ivory #F4EBD9, deep umber #3B2A1A, venetian red #8B2E1F, old gold #C9A227,
sky teal #6B8E9E. Painterly brushstrokes visible. 16:9 cinematic aspect
ratio. Ultra-detailed, museum-quality, soft volumetric light, cinematic
depth.
```

**Notes:**

- The painting is color-graded by the SkyCanvas component as you scroll, so generate **one neutral, golden-hour version**. The CSS overlays will turn it dawn → midday → dusk → night automatically.
- Keep negative space in the center / right where text and the figure will sit.
- If you want a different period or location, swap "Italian High Renaissance" + "Tuscan" — try "Flemish Northern Renaissance + Belgian countryside" for a cooler palette, or "Edo-period yamato-e + Japanese mountains" for something further from the source.

---

## 2. Protagonist — `figure-01-standing.png`

**Format:** PNG with **real alpha transparency**, vertical 9:16 (≥ 900 × 1600px).

> ⚠️ Many image generators export a checkerboard pattern instead of true alpha. If yours does, generate against a solid magenta `#FF00FF` background and chroma-key it out in any image editor (Photoshop, Affinity, even ImageMagick: `magick figure.png -fuzz 8% -transparent "#FF00FF" figure-cut.png`).

**Prompt:**

```
Single full-body figure on a SOLID FLAT MAGENTA BACKGROUND (#FF00FF).
NOT transparent, NOT checkered — pure solid magenta fill behind figure for
chroma keying. Italian High Renaissance oil-painting style matching
Giorgione and early Raphael. [DESCRIBE YOURSELF: age range, ethnicity, hair,
expression]. Standing pose, slight contrapposto, weight on one leg, arms
relaxed, one hand holding a closed gilded illuminated manuscript at hip
level. Wearing flowing ivory and pale-gold classical robe with painterly
fabric folds, venetian red sash. Lit from upper-left by warm golden dawn
light, soft pink rim light on right shoulder, deep umber shadows on left
side. Visible oil brushstrokes, museum-quality. Color palette: ivory
#F4EBD9, deep umber #3B2A1A, venetian red #8B2E1F, old gold #C9A227.
Vertical 9:16 frame, full body head to feet.
```

**Notes:**

- Replace the `[DESCRIBE YOURSELF: ...]` block with your own description, or skip it entirely for a generic figure.
- The "illuminated manuscript at hip level" prop is the Marginalia signature. You can swap it for something more *you* — a coffee cup, a laptop, a sketchbook, a sword, a falcon. The prop becomes the anachronism that makes the image feel modern.
- Try alternate poses for variety — see the optional "more figures" section below.

---

## Optional — extra figures

The default site reuses one figure across the page, scaling and shifting with scroll. If you want a fuller cast, generate alternates and swap them in `PageFigure.jsx` per scroll progress.

**Pose 2 — presenting (for Work section):**

```
[same base prompt] Standing turned three-quarters toward viewer right,
right arm extended outward as if presenting an artwork, left hand resting
on the closed manuscript at hip level. Head turned to follow the gesture,
calm proud expression. [...]
```

**Pose 3 — seated (for Manifesto):**

```
[same base prompt] Seated on a low marble bench, leaning forward slightly,
manuscript open across the lap, one hand turning a page, gaze contemplative
and downward. [...]
```

**Pose 4 — reaching (for Contact):**

```
[same base prompt] Standing at three-quarter view, right hand extended
forward in an inviting open-palm gesture toward the viewer, left hand on
the manuscript. Warm welcoming half-smile, eye contact with viewer. [...]
```

---

## Optimization

After generating, **always compress** before committing:

```bash
# macOS
brew install pngquant
pngquant --quality 65-85 --strip --force --ext .png bg-01-dawn.png

# or use Squoosh (https://squoosh.app) — drag, encode WebP/AVIF, download
```

Target: under 500KB per asset. The default Marginalia bg is ~7MB out of Gemini — bring it down before deploying.
