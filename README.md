# AUX Global EC — Visual Wireframe / Current Working Version

**Primary language:** English (`index.html`)  
**Client-review language:** Japanese (`ja.html`)  
**Legacy English link:** `en.html` redirects to the new English version  
**Hosting:** GitHub Pages / `main` / repository root

## View modes (October 14)

- **Normal storefront (default):** https://postkeimocore.github.io/auxusa-v2/ — full-width website; no sidebar, language preview switcher, toolbar or stage frame.
- **Client review:** https://postkeimocore.github.io/auxusa-v2/review.html — redirects to `index.html?review=1` and keeps the existing sidebar, page index and language switcher.
- **Direct review page:** `index.html?page=pdp&product=fingertip&review=1` for a specific page in meeting mode.
- Review mode uses the **same** page templates, content and CSS as the storefront, so design changes apply to both.
- The page index / toolbar HTML is intentionally kept in `index.html`; toggling the `site-only` root class hides it in normal mode. Do not delete or redesign the preview sidebar until that is separately scoped.
- The previous V1 sidebar may be used as a later visual reference; no sidebar redesign is included in this change.
- To switch default behavior back, adjust the small inline `review=1` check in `index.html` and the `html.site-only` rules in `v2.css`.

## Scope of this refresh

This revision replaces the former `auxusa-v2` appearance and working copy while **restoring V1's content and product-discovery structure**. V1 (`postkeimocore/auxusa`) remains the foundation for Home, Shop All, Collection, In Use (now MOMENTS), PDP and Why AUX.

See [`v1-v2-content-crosswalk.md`](./v1-v2-content-crosswalk.md) for the source files, page-by-page comparison and remaining checks.

The KINTO USA site, https://kinto-usa.com, is a **visual reference only**, not an instruction to copy its sitemap or IA. Use its quiet layout, large images, ample whitespace, typographic restraint, and monochrome UI.

No bright or burgundy accent. White / light gray / charcoal. The supplied black AUX Co., Ltd. SVG is committed at `assets/aux-logo-original.svg` and rendered in the header and footer. Do not use the existing red emblem.

## Navigation

`COOK | SERVE | TABLE | MOMENTS | FOR BUSINESS | WHY AUX`

WHY AUX and the existing brand/support destinations remain available in the page index and footer.

The site is **English-first**. Japanese is a mirror intended to help explain structure to the client. Copy is working text—not finalized brand copy or legal/operational policy.

## Pages

### Start
1. HOME

### Products
2. SHOP ALL
3. COOK
4. SERVE
5. TABLE
6. AUX TONGS
7. AUX Tools
8. PRODUCT DETAIL (shared product template for all 13 items)

### Discovery
9. MOMENTS — **the existing In Use page renamed and re-edited**. It is **one page**, with four sections:
   - EVERYDAY TABLE — For everyday meals, made a little better.
   - TOGETHER AT THE TABLE — For meals shared with the people who matter.
   - HOSTING AT HOME — For welcoming people into your home.
   - SPECIAL OCCASIONS — For moments worth celebrating.

### Business
10. FOR BUSINESS — five sections, initially on one page:
   - RESTAURANTS
   - HOTELS & HOSPITALITY
   - CAFÉS & BAKERIES
   - CATERING & EVENTS
   - RETAIL & DISTRIBUTION

RETAIL & DISTRIBUTION differs from the other four in that it addresses potential resellers and distributors rather than places where the product is used.

### Brand
11. WHY AUX
12. THE THIRD UTENSIL
13. DESIGN & ENGINEERING
14. TSUBAME-SANJO

### Support
15. FAQ
16. SHIPPING
17. RETURNS
18. CONTACT

## Functional boundary

The initial release is an ordinary Shopify EC build plus business-oriented editorial information and a contact path. For known trade buyers, the October 6 discussion assumes buyer-specific coupon code operations to address differing B2B pricing.

An advanced B2B system—quotation simulator, account-specific pricing, stored quotes, sales management and commissions—will be a **separate proposal/project**, subject to later decision and approval. The wireframe does not imply those functions are ready, included, or enabled.

Sample-request operations are not yet confirmed; do not promise live sample fulfillment in UI copy.

## Photography

Placeholder photos refer to **V1 repository images** under:
`https://raw.githubusercontent.com/postkeimocore/auxusa/main/assets/wireframe/`

The UI does not contain the final photographed product assets. Source imagery is provisional, may repeat, and must be replaced once 10/12 photographs and approved stock/archive assets have been selected.

- Scene imagery: everyday food, the table, people and natural gestures.
- Product imagery: warm-neutral forms, clean hero and physical feature detail.
- Hospitality imagery: approved stock as appropriate.
- Manufacturing imagery: existing archive supplied/rights checked before publishing.
- Photography and copy roles matter more than exact one-to-one shot IDs.

## Product information

13 working names:
11 AUX TONGS and 2 AUX Tools. COOK/SERVE/TABLE overlap by use, and are not exclusive product families.

Product names and product-specific specifications, inventory, shipping, import duties, legal terms and photo accuracy remain subject to client confirmation. All product cards and PDPs temporarily use **$20.00** as a layout price, at the client’s request. Review placeholders are not displayed without genuine review data.

## Technical files

- `index.html` — preview chrome + stage
- `v2.css` — independent monochrome responsive design system
- `v2-data.js` — product dataset and MOMENTS/BUSINESS content
- `v2.js` — English/Japanese screen templates, navigation, preview behaviors
- `en.html` — legacy route redirect
- `ja.html` — Japanese direct preview route

### Preview interaction notes

The interface is a content/visual preview: navigation, product selection, thumbnail selection, gallery arrows and dot controls function. Cart, checkout, contact submission and search remain unconnected. There are **no site-visible developer annotations, photography notes, confirmation labels, or wireframe disclaimer copy**. English is the default; switching to Japanese preserves the selected page.

## Review priorities

1. Overall visual tone / hierarchy relative to KINTO (visual reference only)
2. Main navigation / COOK, SERVE, TABLE, MOMENTS, FOR BUSINESS
3. Home flow, representative category + PDP
4. The four MOMENTS in one page
5. The five business sectors and simple initial buyer flow
6. Final logo asset, post-shoot photography, product naming, operational policies, copy signoff

## October 14 gallery, comparison and copy refinements

- The PDP image presentation follows the **visual gallery pattern** in the user-provided KINTO product screenshot: left vertical image thumbnails, one large central photo, previous/next arrows and dot indicators, with mobile-responsive thumbnail placement. Only the gallery presentation pattern is borrowed; AUX information architecture is preserved.
- Comparison cards show **Best for / Scale / Moment**, with a Japanese client-review translation. Arbitrary “alternative product” flags were removed.
- Use **→** for internal navigation, not external-link diagonals.
- Remove photographer instructions, internal scope/planning language and unverified review placeholders from the rendered storefront. Developer explanations belong in repository documents, not page UI.
- `assets/aux-logo-original.svg` is the supplied logo illustration, not a CSS reconstruction.

## Design system / grid enforcement

The V1 8px spatial grid, 4px typography scale and 8px line-height rhythm are formalized in [`design-system.md`](./design-system.md). Before merging a layout change, run `node scripts/check-design-grid.js` and review whole-page alignment rather than only the edited element.
