# AUX Global EC — design system

This document is the **source of truth for layout and typography in the V2 implementation**. The KINTO USA reference concerns photography and the visual mood only; it must not override the rules established for AUX in V1.

## Site-wide rules (summary, 2026-10-15)

These rules collect the intent behind the October brush-up. They apply to every page; any exception must be written down with its reason.

| # | Rule | Why |
|---|---|---|
| 1 | **Routes to another page are buttons**: `.btn-outline.has-arrow` (secondary) or `.btn-fill.has-arrow` (primary). Underlined text links are not used for page routes; in-page jumps may use a small text link with ↓. | A route is an action; a box reads as clickable and keeps one visual language. |
| 2 | **Product cards that lead to a PDP show image, product name and price only** — no description under the name. **Product card grids are always 4 columns on desktop** (lists, MOMENTS rows, related tools), even when the last row is not full; 4/5 photo ratio. The 2-up featured pair on collection pages and the PDP comparison carousel are the exceptions. | The card's job is recognition and click-through; one grid keeps every listing the same rhythm. |
| 3 | **Names of categories, moments and business sectors used as card titles or section headings are set in the serif heading role** (Cardo). Product names and UI (menus, indexes, filters, buttons) stay in the sans role (Inter). | Serif marks editorial / world-building names; sans marks shopping and controls. |
| 4 | **One arrow**: the harpoon arrow `.arw` (line + upper barb only), 24px; `.arw-long` 48px for category doorways; `.arw-down` for in-page jumps. Drawn as an SVG mask filled with `currentColor` (anti-aliased diagonal). No `→` glyphs in the UI. | One recognisable mark across buttons, rows and cards. |
| 5 | **Five colours only** (white, surface, line, muted, ink). Buttons inherit text colour — no browser-default (e.g. iOS blue) colours. | Removes meaningless grey variations; enforced by the checker. |
| 6 | **No full-width divider lines between sections**; whitespace separates sections. Lines only inside components. | Quieter pages, closer to the reference. |
| 7 | **Labels (eyebrows) only where they inform**: doorways to another page or a concept the heading does not name. **Numbers only for real sequences.** | Structure should encode information, not decorate. |
| 8 | **Section heading rhythm**: heading → intro 16px, intro → content 32px; intro measure up to 720px; `text-wrap: pretty`. | Groups heading and text, separates them from content. |
| 9 | **One display heading per content block**; secondary blocks use H3 size or the uppercase utility heading. | Keeps the photo and one statement as the loudest elements. |
| 10 | **Spacing, type and line-height tokens only** (8px spacing incl. 160/192/224 for editorial whitespace, 4px type steps, 8px line-heights, six tracking tokens). | Run `node scripts/check-design-grid.js`. |

## Original project sources
- `postkeimocore/auxusa/wf-design-foundation.css`: strict 8px space grid, 4px typography sub-grid and 8px vertical baseline
- `postkeimocore/auxusa/wf-layout-system.css`: 8px layout and proximity logic

## Size tokens

| Category | Tokens | Rule |
|---|---|---|
| Core spacing | 8, 16, 24, 32, 40, 48, 56, 64, 72, 80, 96, 112, 128px | 8px increments |
| Large editorial spacing | 160, 192, 224px (`--space-20/24/28`) | Only for large whitespace around editorial statements (e.g. THE AUX DIFFERENCE: 224 above, 192 below) |
| Micro spacing | 4px | Explicit small-control exception |
| Desktop page gutter | 80px | Reduced at breakpoints: 64, 48, 32, 24px |
| Typography metadata | 12px / 16px line-height | Not for body copy |
| Body | 16px / 24px line-height | Customer-facing explanatory text minimum |
| Card heading | 16px / 24px line-height | Reusable card labels |
| Lead | 16px / 32px line-height | Introductory copy (same size as body, more open leading) |
| H3 | 24px / 32px line-height | Heading |
| H2 | 32px / 40px line-height | Section heading |
| H1 | 48px / 56px line-height | Page / product heading |
| Statement | 64px / 64px line-height | One brand statement per page only (e.g. `Knife. Fork. AUX.`) |
| Mobile (≤640px) | H1 32/40, H2 24/32, H3 20/32, Statement 40/48 | Reduced media query |

**Quiet type volume (2026-10-14 brush-up).** Headings were reduced so photography carries the page and type stays low, as on the KINTO reference. Section backgrounds no longer alternate white / mist; whitespace separates sections, and tonal fills remain only on panels (hero, business split, footer).

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

- Display: 0.035em
- Heading: 0.05em
- Body: 0.03em
- UI controls: 0.06em
- Eyebrow: 0.12em
- Index: 0.08em

Letter spacing uses em values rather than the 8px spatial grid. The CSS checker accepts only these tokens.

## Visual direction — Quiet Precision / desktop HOME (2026-10-14)

**Reference hierarchy.** KINTO USA is a reference for restraint, negative space, image-to-type balance and quiet interaction. It is not a source of ready-made layouts or additional site sections. AUX's unique signal is usefulness grounded in precise tool shapes and everyday dining, not luxury decoration. Retain the established V1 information architecture.

### Visual roles and invariants

| Role | Rule | Example |
|---|---|---|
| Heading type | Cardo **400**, Baskerville / Georgia fallback; Japanese serif fallback | H1/H2 and editorial H3 across HOME, collections, PDP, brand pages |
| Body/UI type | Inter **400/500/600**, Helvetica Neue / Arial / Japanese Gothic fallback | Paragraphs, menus, buttons, product-card names, category labels, support links |
| Letter spacing | `--tracking-display:.035em`, `--tracking-heading:.05em`, `--tracking-body:.03em`, `--tracking-ui:.06em` | Slightly wider than V1; apply via shared typography roles, not one-off selectors |
| Primary text | `--ink` / `--text` on white/paper | Purchase CTAs and descriptions |
| Backgrounds | White, original mist `#f5f5f3`, original hero panel `#f3f3f1`; no additional color theme | Section grouping |
| Photography | Use large image frames **within** the existing content hierarchy | Hero split, AUX DIFFERENCE collage, MOMENTS asymmetry |
| Section spacing | Use established `site-section`, `compact` and `--page-gutter`; no one-off discretionary blocks | Home and lower-page sections |
| Actions | `btn-fill` primary, `btn-line` secondary; identical component rules across backgrounds | Product and story routes |
| Carousel | Preserve **3** featured tools and the page counter; each 8px visual dot has a 40px touch target | HOME hero rail |
| Hero title | Intentionally H2 size (32/40) on the HOME h1 so the photograph leads | HOME hero caption |
| Scatter statement | Intentionally H2 size with a 48px line-height (mobile: token 32px) for an open, quiet setting | THE AUX DIFFERENCE |
| Navigation | `SHOP` first; `FOR BUSINESS` as a boxed button (`.nav-business`) at the right end | Global header |
| Footer | Original calm five-column footer; no giant image + duplicate wordmark | Site-wide |

### HOME hierarchy (no supplementary invented chapters)

1. Photo-led hero (2026-10-14): full-width photograph with an 80px rail (vertical product name + 3-slide pager). Product caption bottom-left on a dark scrim: label, product name, one-line copy, price / feature, `View product` button
2. THE AUX DIFFERENCE — centred statement (max 480px) with photographs scattered behind it as background; slight scroll drift on desktop, disabled for reduced motion
3. Featured products — four product cards
4. COOK / SERVE / TABLE — equal category entry cards
5. Knife. Fork. AUX. — single identifiable typographic brand statement
6. MOMENTS — four established themes; headings follow shared Cardo serif role
7. FOR BUSINESS — understated pale split (never a black advertisement band)
8. WHY AUX teaser — craftsmanship proof / footer

**Not in scope:** extra “Made for sharing” or “At home, at the table” photo chapters, Journal, Newsletter, modal PDP, oversized footer AUX overlay, one-off serif/sans font declarations that bypass shared typography roles. Any new content section requires a content role, not merely visual variety.

### Design acceptance gate

Before publishing style work: (1) check each existing section against this role table; (2) run `node scripts/check-design-grid.js`; (3) visually inspect the desktop homepage at the same viewport and compare with the previous screenshot; (4) confirm carousel page indicator and navigation; (5) verify one product page still renders. The grid test alone is necessary but never sufficient for visual quality.

## Typography revision — Figma Make × KINTO reference (2026-10-14)

The user-provided Figma Make CSS uses **Cardo / Inter**. Its serif headlines are set with airy letter spacing (often `.08em`), and body uses Inter with `.06em`. AUX adopts the **role split**, not the source's tiny 9–12px body sizing. To retain AUX's minimum 16px / 24px body contract and avoid overly open long paragraphs, AUX deliberately uses more moderate body tracking (`.03em`) and headline tracking (`.035em` / `.05em`).

Use shared font role selectors in `v2.css`: H1/H2/story H3 = serif, product/category/interface labels and prose = sans. Do not switch fonts by individual page or append section-specific font overrides. Keep the established 4px type scale, 8px line-height grid and 8px spacing grid unchanged.

## Colour system (2026-10-14)

The storefront uses **five colours**, each with a single role. Grey variations that carried no meaning (about 80 near-identical values) were folded into these tokens.

| Token | Value | Role |
|---|---|---|
| `--white` | `#fff` | Page background; text and buttons placed on photographs |
| `--surface` | `#f4f4f2` | Tonal panels: footer, business band, image placeholders, hover fills |
| `--line` | `#dddddb` | Hairlines, dividers, inactive pager dots |
| `--muted` | `#666` | Secondary text (descriptions, captions, labels, meta); borders of form controls (≥3:1) |
| `--ink` | `#232323` | Primary text, headings, primary buttons (incl. FOR BUSINESS), active states, focus rings, link underlines |

- Contrast: `--muted` is 5.7:1 on white and 5.2:1 on `--surface`; `--ink` passes everywhere. Light greys such as `#999` / `#aaa` for text are no longer used.
- Photo scrims are `--ink` at reduced opacity via `color-mix(in srgb,var(--ink) N%,transparent)`. Text on photographs is always `--white`.
- Literal colours are allowed only inside `:root` and in the review chrome (preview bar, page rail, stage). `node scripts/check-design-grid.js` fails on any other literal colour.

## Buttons (2026-10-14)

One component family: 48px min height, `0 24px` padding, 16/24 type, UI tracking.

| Class | Role |
|---|---|
| `.btn-fill` | Primary — ink fill, white text (ADD TO CART, FOR BUSINESS). Hover inverts. |
| `.btn-outline` | Secondary — 1px ink outline, ink text (e.g. `Why AUX` in THE AUX DIFFERENCE). Hover fills ink. |
| `.btn-outline.on-photo` | The same outline in white for buttons on photographs (HOME hero `View product`). |
| `.btn-line` | Tertiary — text link with an ink underline. |
| `.has-arrow` | Appends `→` to a fill / outline button. |

## Dividers (2026-10-14)

No full-width lines between sections (footer top, filter bar, MOMENTS product row were removed). **Exception (2026-10-15, user decision):** the header keeps a 1px `--line` rule at its bottom at all times; the dropdown bar therefore has only a bottom rule. Sections are separated by whitespace. Lines remain only inside components: lists, accordions, tables, indexes, the comparison grid, and the footer copyright rule.

## Intentional exceptions

- HOME hero pager: 32px pitch (user request); each dot's target is 40×32px, above the 24px minimum target size.

## Section heading rhythm (2026-10-15)

`.section-head`: heading → intro text **16px**, intro text → content **32px** (twice the first gap). Intro text measure up to 720px; all paragraphs use `text-wrap: pretty` to avoid one-word last lines. Applies site-wide.

## Navigation dropdowns (2026-10-15)

`SHOP ▾ | COOK | SERVE | TABLE | MOMENTS | WHY AUX | SUPPORT ▾ | [FOR BUSINESS]`. SHOP opens SHOP ALL / AUX TONGS / AUX TOOLS; SUPPORT opens FAQ / SHIPPING / RETURNS / CONTACT. On hover or keyboard focus a full-width bar opens under the header with centred 12px uppercase links separated by short `--line` rules (KINTO reference). Clicking SHOP goes to Shop All, SUPPORT to FAQ. On narrow screens the header is menu icon / centred logo / `CART (0)`, and sub-links are listed under their parent inside the menu.

## HOME specifics (2026-10-15)

- Route links on HOME are boxed buttons (`.btn-outline.has-arrow`); `Why AUX` in THE AUX DIFFERENCE is `.btn-fill`. The MOMENTS teaser has no button: each of the four moments is itself a link with an arrow.
- Category card names (COOK / SERVE / TABLE) use the serif heading role at H3 size (24/32).
- Knife. Fork. AUX.: intentional — the photo column (max 528px) and a content-sized text column are centred as one group, so this one section has wider, equal side margins.
- FOR BUSINESS band: the `--surface` panel has 96px top and bottom padding so it is taller than its photo.
- WHY AUX teaser: photo left, text right.
- Footer: logo block left; SHOP / DISCOVER (MOMENTS, WHY AUX, FOR BUSINESS) / SUPPORT grouped at the right edge.
- Phone hero keeps the desktop composition with a 56px rail; the page counter is hidden at that size.

## Header behaviour (2026-10-15)

- The header is sticky at the top of the viewport (`z-index:40`); anchored sections use `scroll-margin-top` equal to the header height (80px, 72px on narrow screens).
- While a dropdown is open, the bar has thin `--line` rules top and bottom, and the page below is dimmed with an ink scrim at 16% (`color-mix`).

## Shop All (2026-10-15, V1 structure)

No image hero. Short intro (H1 `All Products` + one line) → COOK / SERVE / TABLE category doorways (shared component with HOME and WHY AUX) → listing toolbar → product grid → MOMENTS exit.

## Listing toolbar (2026-10-15, V1 composition)

Used on every product listing (Shop All, COOK / SERVE / TABLE, AUX TONGS / AUX Tools). Parts follow the V1 wireframe; values follow the V2 system.

- A 64px bar between two `--line` hairlines (component lines), 40px above the grid.
- Left: `FILTER` label (12px, index tracking, muted) + chips (40px high, `0 16px`, 1px `--muted` border; active = ink fill, white text).
- Right: `SORT` label + select (Featured / Name A–Z / Name Z–A), same 40px control style with a small caret.
- Filters use the dimension the page does not already fix: Shop All and family pages filter by COOK / SERVE / TABLE; collection pages filter by AUX TONGS / AUX TOOLS. Only options that exist in the list are shown. Filter and sort reset when the page changes.
- Family pages keep their image hero (it carries the appeal before the list); the `PRODUCT FAMILY / N ITEMS` label is removed.

## PDP comparison carousel (2026-10-15)

`Which tool fits your task?` compares **all thirteen tools**, the current product first (tagged VIEWING, `--surface` fill). It reads as one table: cards share `--line` separators and the Best for / Scale / Moment rows line up. Desktop shows 4 cards (3 ≤1168px, 2 ≤880px, 80% peek ≤552px); scroll-snap per card; 40px prev / next buttons step one page; a `1–4 / 13` counter; buttons turn `--line` when an end is reached. The previous arrow is the harpoon arrow mirrored. The buy-box jump link reads `Compare all AUX tools ↓`.

## PDP customer reviews (2026-10-15)

After the comparison carousel. V1 composition: rating overview on the left (score `— / 5` in the serif at H1 size, stars, `[Number of reviews]`, `Write a review` outline button), review list on the right (meta column 160px: stars / `[Verified buyer]` / `[Date]`; content: `[Review title]` + `[Customer review text]`), rows separated by component hairlines. Placeholders stay bracketed until real review data exists.

## HOME updates (2026-10-15, later)

- Hero pager: three vertical bars (2px line, 32px tall, 40px targets). The active bar fills with ink over **3s** and the hero advances when it is full; hovering the hero pauses it. Slides are stacked and **cross-dissolve (1.2s)**; the active photo **zooms 100% → 106%** over the interval; caption and vertical name dissolve with it. Reduced motion: no auto-advance, active bar shown full. Only the hero is re-rendered on a slide change.
- THE AUX DIFFERENCE photos: start 64px below the hero. On scroll each photo fades in as it enters from the bottom of the viewport and fades out as it passes towards the top (full opacity in the middle half), with a small drift on desktop (max 40px). Reduced motion: static, fully visible.
- Featured products: `Shop all products` button centred.
- Category doorway cards: 16px right inset after the arrow so it does not crowd the next card.
- FOR BUSINESS band: no label; `For Business` is `.btn-fill`.
- MOMENTS teaser: label, heading and intro centred.

## Motion and brand-page openings (2026-10-15)

- **Scroll reveal (site-wide, KINTO-like):** content parts (section heads, cards, split columns, chapters, toolbars, reviews, etc.) fade in and rise 24px over 0.8s when they enter the viewport, once; siblings stagger by 80ms (up to 4). Applied by script only; off for reduced motion. The HOME hero and THE AUX DIFFERENCE photos keep their own effects.
- **THE AUX DIFFERENCE spacing:** photos sit in a box inset 64px from the top and 112px from the bottom of the section, so the gap from the last photo to the next heading is 112 + 72 = 184px — the same rhythm as between Featured products and Cook. Serve. Table.
- **MOMENTS / WHY AUX opening:** full-width photo (440–720px high) with a white fade over the lower 56%; the page title (H1) is centred over the fade, 48px from the bottom; the lead is centred below. MOMENTS rows show no product count.

## Later additions (2026-10-15)

- Header utilities: search, **account** (person icon; member page to come — preview toast for now), cart. On narrow screens only `CART (0)` shows.
- Collection pages: `Start with these tools.` has no intro text.
- MOMENTS jump boxes keep their layout but carry each moment's photo under an ink scrim (40%, 56% on hover) with white text.
- Down arrows for in-page jumps are the harpoon arrow rotated 90° (`.arw-down`); no `↓` glyphs.
- MOMENTS product rows: `TOOLS FOR THIS MOMENT` label and cards centred; cards keep the 4-column card width.

## More refinements (2026-10-15)

- Header (desktop): three columns — logo left, menu centred, utility icons right. Menu items show the 4px ink underline on hover as well as for the current page (dropdown parents keep it while their bar is open).
- HOME hero titles: product name only (no "Meet").
- Knife. Fork. AUX.: parallax close-up (see below). THE AUX DIFFERENCE copy (heading, text, button) uses the site-wide scroll reveal.
- A button that follows a grid of cards is centred (`.btn-row.is-centred`): HOME featured products, PDP related tools, WHY AUX explore.
- MOMENTS jump boxes are 16:9. Product rows alternate alignment for rhythm: centre (Everyday) / left (Together) / centre (Hosting) / right (Special occasions).
- AUX TONGS / AUX Tools: hero, then directly the listing toolbar and grid (no intermediate heading).

## Parallax close-up for full-width photos (2026-10-15)

Every full-width photo (MOMENTS / WHY AUX openings, wide chapters such as THE THIRD UTENSIL) and the Knife. Fork. AUX. photo scale from 100% to **150%** while the frame scrolls through the viewport, and the image lags downwards (parallax) by at most 60% of the scaled overflow so edges never show. Progress starts when the frame enters the viewport (or at page top for frames visible on load). Reduced motion: static. The HOME hero keeps its own slow zoom.

## Other refinements (2026-10-15)

- MOMENTS jump boxes: titles in the serif role at H3 size; the down arrow sits bottom-right; the title is trimmed to its cap height (`text-box: trim-both cap alphabetic`) so its visible inset top-left (24 / 16) mirrors the arrow's inset bottom-right (24 / 16).
- Down arrow `.arw-down` is drawn vertically (16×24, barb on the right) instead of a rotated right arrow.
- WHY AUX: `Discover Fingertip Tongs` is `.btn-fill`; Design & Engineering item names use the serif role at H3 size; the text column is vertically centred against the photo.
- MOMENTS rows aligned left / right (desktop ≥881px): the `TOOLS FOR THIS MOMENT` label sits in the free fourth column — right of the products (Together at the table), left of them and right-aligned (Special occasions). Below 881px it returns above the products.

## PDP refinements (2026-10-15, later)

- Buy box: no Key feature / Use rows; no `Compare all AUX tools` jump.
- `SHIPPING → RETURNS → DUTIES & TAXES →` in one row between hairlines (wraps only below 1169px).
- Quantity: one framed control `− 1 +` (1px muted border, 48px cells).
- Accordion content: 12px / 24px muted — intentional exception to the 16px body minimum so content reads below its 12px uppercase label.
- Gallery: six photos; photo frame 4:3; prev / next are 32px harpoon arrows centred vertically on the photo, white with `mix-blend-mode: difference` so they invert against any image; slide indicators are 32px bars (2px line, same tone as the HOME hero pager) 16px below the photo. Thumbnails follow the photo height; extra thumbnails scroll and the lower edge fades while more remain.
- MOMENTS jump box titles: serif 16 / 24.

## PDP / support (2026-10-15, later)

- Shipping / Returns / Duties & taxes row has no rules above or below.
- The first editorial section starts 32px under the buy box (buy box bottom padding 32px).
- `Made for the movement.` primary-use block has no label.
- Sub-section intro text (`.sub-head`) uses the 720px measure.
- New page **Privacy Policy** (`/pages/privacy-policy`, provisional content) in the SUPPORT dropdown, footer SUPPORT group and review page index; same template as Shipping / Returns.

## WHY AUX doorway band (2026-10-15)

One shared component (`whyBand()`) at the foot of HOME, COOK / SERVE / TABLE and the PDP (each keeps its own statement): a content-width section (640px min height) with a photo background under a 64% ink scrim, four photos scattered over it (kept clear of the centred copy, slight drift on scroll, hidden below 881px), and centred white copy — `WHY AUX` label, H1-size serif statement, one line of text, `Why AUX` on-photo outline button. Copy uses the scroll reveal.

## FOR BUSINESS (2026-10-15)

- The sector index (`Made for your place.`) uses the MOMENTS jump-box component, five across: 16:9 photo boxes under an ink scrim, serif title top-left, down arrow bottom-right on the same diagonal insets.
- Sector sections keep the alternating layout (photo left / right). The reverse rule applies only to the section's own photo (`.business-detail.reverse>.photo`), so the Suggested tools rows look the same on both sides.
- MOMENTS and FOR BUSINESS end with the WHY AUX doorway band (replacing `From the moment to the tool.` and `Bring AUX to your business.`).

## Galleries and comparison (2026-10-15, later)

- FOR BUSINESS sector photos are small galleries (4 provisional photos each): prev / next harpoon arrows on the photo (same component as the PDP gallery — centred, white, difference blend) and one 32px bar per photo 16px below. Switching swaps the image in place (no page re-render).
- PDP comparison: no `View product` line or rule (the whole card links to the product). Four and a half cards show (3.5 ≤1168px, 2.5 ≤880px, 80% ≤552px); the half card fades out until the end of the list; prev / next move by whole visible cards.

## Brands and Leye naming (2026-10-15)

- `BRAND` sits after WHY AUX in the header with a dropdown of the ten AUX Co., Ltd. brands (tighter 16px item padding so they fit one line); each jumps to its row on the new **Brands** page (`/pages/brand`, sample after aux-ltd.co.jp/brand). Rows: photo left (16:9); brand mark (Leye) or serif name, one line and a `More` outline button centred on the right. Brand sub-pages are not built yet. The footer DISCOVER group lists Brands.
- **Product names use the Leye brand on every URL (2026-10-15, client decision):** `Leye Fingertip Tongs` etc. in `v2-data.js` and the HOME hero slides. The hero rail shows the name without the brand prefix. The logo variants (`?logo=leye`, `?logo=leye-type`) only swap the header logo and are not maintained further.
