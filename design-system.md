# AUX Global EC — design system

This document is the **source of truth for layout and typography in the V2 implementation**. The KINTO USA reference concerns photography and the visual mood only; it must not override the rules established for AUX in V1.

## Original project sources
- `postkeimocore/auxusa/wf-design-foundation.css`: strict 8px space grid, 4px typography sub-grid and 8px vertical baseline
- `postkeimocore/auxusa/wf-layout-system.css`: 8px layout and proximity logic

## Size tokens

| Category | Tokens | Rule |
|---|---|---|
| Core spacing | 8, 16, 24, 32, 40, 48, 56, 64, 72, 80, 96, 112, 128px | 8px increments |
| Micro spacing | 4px | Explicit small-control exception |
| Desktop page gutter | 80px | Reduced at breakpoints: 64, 48, 32, 24px |
| Typography metadata | 12px / 16px line-height | Not for body copy |
| Body | 16px / 24px line-height | Customer-facing explanatory text minimum |
| Card heading | 20px / 24px line-height | Reusable card labels |
| Lead | 20px / 32px line-height | Introductory copy |
| H3 | 24px / 32px line-height | Heading |
| H2 | 48px / 56px line-height | Heading |
| H1 | 64px / 64px line-height | Desktop heading |
| Mobile H1 | 40px / 48px line-height | Reduced media query |

All actual site values must use these tokens or conform to the same grids. Typography sizes are 4px multiples; line heights are explicit 8px multiples. A 1px border or SVG stroke is a visual boundary, **not** spacing. Percent widths, image aspect ratios and flex ratios are layout proportions rather than spatial unit values.

## PDP alignment contract
- Gallery thumbnails, main photo, and right product-info content share one top reference.
- `--pdp-top-gutter:var(--space-8)` on desktop = **64px**.
- On narrower widths use `var(--space-6)` = **48px**; on mobile `var(--space-4)` = **32px**.
- Do not restore `67px`, `45px` or one-off paddings because they used to be present visually.
- Changing one column's gutter requires checking the other column and the full page hierarchy.

## Reusable layout and text contracts
- Site sections, footer and header use the same `--page-gutter`.
- The default body size is 16px with 24px line-height.
- Metadata can be 12px, but functional CTAs and explanatory content must remain readable.
- Favor token-driven classes over per-page overrides. Grouped layout changes must be validated across desktop/tablet/mobile.
- Do not add page-visible wireframe instructions, nonfunctional review counts or meaningless labels.

## Grid validation

```bash
node scripts/check-design-grid.js
```

The lint script rejects CSS spatial lengths that are not 8px multiples (except permitted 4px micro-spacing), font sizes not on the 4px scale, line-heights not on the 8px scale, and spacing expressed as arbitrary percentages. This prevents ad hoc dimensional patches from silently changing the design system.

## Letter spacing

V1 has six tracking tokens, defined in v2.css:

- Display: -0.025em
- Heading: -0.018em
- Body: 0
- UI controls: 0.02em
- Eyebrow: 0.12em
- Index: 0.08em

Letter spacing uses em values rather than the 8px spatial grid. The CSS checker accepts only these tokens.
