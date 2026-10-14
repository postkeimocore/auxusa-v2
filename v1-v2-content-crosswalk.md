# V1 → V2 Content Structure Crosswalk

Reviewed on 2026-10-14. The aim is to **retain the content and shopping decisions of V1** while rebuilding the visual design using KINTO USA **only as a visual reference**.

## Sources in V1

Repository: `postkeimocore/auxusa`

- `index.html`: original site map and page types
- `wireframe.html`: layered preview entry point
- `wf-content-master-v1.js`: content hierarchy for Home, Shop All, Collection, In Use, PDP and Why AUX
- `wf-content-master-design-corrections.js`: restoration of product-led Home hero, product-form collage and PDP structures
- `wf-inuse-redesign.js`: full scene explanation with repeated related-product units
- `wf-pdp-structure-v2.js`: consolidated primary-use and Product Features, Product Details within buybox, wide feature image and About AUX image band
- `wf-pdp-assurance-compact.js`: shopping assurance details in the purchasing area
- `wf-photo-direct-v1.js`: provisional visual asset mapping

Because V1 was implemented with many sequential JS/CSS overrides, the effective final composition is determined by the later overrides, not merely by the first-page markup.

## Structural crosswalk

| Surface | V1 effective content flow | Current V2 flow (restored) | New decisions |
|---|---|---|---|
| Home | Product-led hero → AUX feature/shape differences → Featured Products → Shop by Category → In Use → About AUX | Product-led Fingertip hero → AUX shape/feature collage → Featured Products → COOK/SERVE/TABLE → Third Utensil → MOMENTS → FOR BUSINESS → About AUX | Third Utensil / Business sections added to meet the later brief |
| Shop All | Intro → Shop by Use → Product List → Contextual exit | Intro → Three discovery categories → All 13 products → MOMENTS | Names/structure retained |
| Collection | Category hero → use-value explanation with features → Featured Products → product grid → About AUX | Category hero → 3 use-value cards → 2 featured products → full product grid → Table-specific Third Utensil (TABLE only) → About AUX | COOK/SERVE/TABLE can overlap by product |
| In Use / MOMENTS | Scene hero → scene navigation → repeated scene image/text/related product modules → exit | MOMENTS hero → 4-section nav → four scene editorial modules, **each with three related product cards** → Shop All | Same *page role* and route concept. Renamed and content replaced per Tanaka |
| PDP | Gallery/buybox → Primary Use + Product Features → feature image band → compare similar tools → reviews → About AUX → related products | Gallery/buybox incl. shipping/returns/details and compare jump → primary use → 3 use contexts → 3 physical details → wide feature band → comparable tools → review placeholder → About AUX → related tools | 13 product template. No false ratings, product prices, specification claims |
| Why AUX | Hero → product-form gallery → design details → manufacturing background → Shop AUX | Hero → 3 form illustrations → 3 engineering details → Third Utensil editorial → manufacturing background → three category links | Brand experience is not a literal "We got you." explainer |

## Shared design principles

- Product discovery and the physical reasons to choose a tool are preserved.
- Working copy can be approximate but must make section roles clear.
- English is the primary working language; the JP toggle is a client-review mirror.
- Visuals: no color accent, ample whitespace, restrained text, monochrome UI.
- V1 photo assets are placeholders only; they should **not** be taken as accurate photos of each SKU.
- B2B: initial buyer-specific coupons as described on 2026-10-06; quotes, account pricing and sales/commission management remain a separate future project.

## Remaining production checks

1. Visually compare the live wireframe in a graphical browser at desktop/tablet/mobile widths. Source and logical output are tested, but browser screenshots are **not yet verified**.
2. Replace the temporary text rendering of the AUX CO., LTD. logo with the approved original black wordmark asset.
3. Replace all product-specific photos (including PDP/compare cards) with correctly matched final photographs.
4. Verify final English names, per-SKU features, specs, shipping/duties, review operations and business sales policies with the client.
5. Revisit exact photo-to-copy pairing once selected 10/12 and stock images are supplied.
