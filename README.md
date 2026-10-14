# AUX Global EC — Visual Wireframe / Current Working Version

**Primary language:** English (`index.html`)  
**Client-review language:** Japanese (`ja.html`)  
**Legacy English link:** `en.html` redirects to the new English version  
**Hosting:** GitHub Pages / `main` / repository root

## Scope of this refresh

This revision completely replaces the former `auxusa-v2` screen designs and copy. V1 (`postkeimocore/auxusa`) is reused only where its underlying structure, content understanding or provisional imagery is helpful.

The KINTO USA site, https://kinto-usa.com, is a **visual reference only**, not an instruction to copy its sitemap or IA. Use its quiet layout, large images, ample whitespace, typographic restraint, and monochrome UI.

No bright or burgundy accent. White / light gray / charcoal. For the header, use a black AUX wordmark treatment; the exact approved production asset still needs to replace the text-only working rendering. Do not use the existing red emblem.

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

Product name, price, specifications, inventory, shipping, import duties, legal terms and product-photo accuracy are subject to client confirmation. No fake reviews or arbitrary prices are shown.

## Technical files

- `index.html` — preview chrome + stage
- `v2.css` — independent monochrome responsive design system
- `v2-data.js` — product dataset and MOMENTS/BUSINESS content
- `v2.js` — English/Japanese screen templates, navigation, preview behaviors
- `en.html` — legacy route redirect
- `ja.html` — Japanese direct preview route

### Preview interaction notes

This is a visual wireframe: navigation and product selection function; cart, checkout, contact submission and commerce search do not. "SHOW NOTES" reveals placeholders and editing decisions. English is the default; switching to Japanese preserves the selected page.

## Review priorities

1. Overall visual tone / hierarchy relative to KINTO (visual reference only)
2. Main navigation / COOK, SERVE, TABLE, MOMENTS, FOR BUSINESS
3. Home flow, representative category + PDP
4. The four MOMENTS in one page
5. The five business sectors and simple initial buyer flow
6. Final logo asset, post-shoot photography, product naming, operational policies, copy signoff
