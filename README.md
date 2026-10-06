# AUX Global EC — Visual Wireframe v2

2026-10-06 時点の、日本語説明用ビジュアルワイヤーフレームです。

## 今回のV2の目的

V1で作成したBtoC Shopify ECのデザイン基盤を残しながら、現在の要件である以下を統合しています。

- AUXの新しいブランド人格
- AUX TONGS / AUX Toolsの商品ファミリー
- COOK / SERVE / TABLEの用途探索
- 撮影指示書の写真 × コピー掲載マップ
- For Professionals / Hospitality
- Request Samples / Get a Quote
- Shopifyから独自B2Bシステムへの接続

画面上の本文は、打ち合わせで説明しやすいよう日本語を基本にしています。
英語のブランドコピーはWorking headlineとして残しています。

## ページ構成

### Core
- Home

### Shop / Products
- Shop All
- AUX TONGS
- AUX Tools
- COOK
- SERVE
- TABLE
- Representative PDP / AUX Fingertip Tongs

### Discover
- In Use

### Brand
- Why AUX
- The Third Utensil
- Design & Engineering
- Tsubame-Sanjo

### Professional
- For Professionals
- Hospitality
- B2B導線設計 / System Boundary

### Support
- FAQ
- Shipping
- Returns
- Contact

## 写真について

現時点では `postkeimocore/auxusa` のV1ワイヤーフレーム用写真を仮置きで参照しています。

例：

- `/auxusa/assets/wireframe/small-food-transfer.webp`
- `/auxusa/assets/wireframe/product-lineup-warm.webp`
- `/auxusa/assets/wireframe/serving-salmon.webp`
- `/auxusa/assets/wireframe/cook-pasta.webp`
- `/auxusa/assets/wireframe/manufacturing-caliper-close.webp`

本番撮影後は、撮影指示書のScene / Product番号に沿って差し替えます。

この依存はあくまでワイヤーフレーム期間中の仮運用です。

## ブランドコンテンツの軸

撮影・ブランド資料で定義されている以下をWebへ展開しています。

- Presence without self-consciousness.
- We got you.
- Quietly capable.
- Effortless.
- Considerate.
- Present, but never intrusive.
- Knife. Fork. AUX.
- Made for the moment, not the spotlight.

「紳士的」は男性的・重厚・ラグジュアリーな見た目ではなく、使う人に頑張らせず、必要な時だけ応え、食卓で出しゃばらない振る舞いとして扱います。

## Product Family

### AUX TONGS
11 products

### AUX Tools
- AUX Mini Whisk
- AUX Grating Spoon

COOK / SERVE / TABLEはProduct Familyではなく、Use / Sceneによる探索軸です。

## B2B Boundary

### Shopify / Shared Front
- Brand
- Collections
- PDP
- BtoC Cart / Checkout
- For Professionals
- Request Samples entry
- Get a Quote entry

### Dedicated B2B System
- Business Account / Login
- Quote
- Pricing conditions
- PDF quote
- Resume after approval
- Business order
- Sales / performance / commission management

## Color Direction

Working palette:

- Warm Ivory: `#fffdf9`
- Soft Neutral: `#f4f2ec`
- Ink: `#171714`
- Muted Burgundy: `#7a3f45`

AccentはPrimary CTA、Review、Professional識別など小さい面積に限定します。

## Files

- `index.html` — page content / application shell
- `v2.css` — V1 design foundation + V2 components
- `v2.js` — product data / navigation / interactions
- `meeting-2026-10-06.md` — meeting checklist
