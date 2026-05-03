# Contributing to Marginalia

Thanks for considering a contribution. This is a template for personal portfolios — the bar is "does it make the template better for everyone who forks it" rather than "does it serve a single use case."

## Good first contributions

- Bug fixes (sky transition glitches, layout breaks at unusual viewports, accessibility regressions)
- Adding alternative font presets to `Marginalia.jsx`
- Performance improvements (image loading, animation perf)
- Translations of the demo content
- Examples of contact-form integrations (Resend, Formspree, server actions)

## Out of scope

- Adding sections that only fit one person's portfolio
- Hardcoding brand colors / fonts (they live in `tokens.css` for a reason)
- Adding heavy dependencies (3D libraries, large UI kits) — keep it small

## Workflow

1. Open an issue first for anything bigger than a typo. Faster than a surprise PR.
2. Fork, branch, change, commit.
3. `npm run lint && npm run build` should both pass.
4. Open a pull request with a short description of *why* the change matters.

## Style

- Pure CSS only. No Tailwind, no CSS-in-JS, no preprocessors.
- React function components, hooks, no class components.
- Prefer adding props + config over hardcoding. Anything that varies per fork should be in `config.js` or `data/*`.

## Code of conduct

Be kind. Default to charity in interpretation. We are guests in each other's repos.
