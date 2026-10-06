# AUX Global Commerce — Visual Wireframe v2

2026-10-06 時点のAUX Global EC / B2B統合版ビジュアルワイヤーフレームです。

## V2で変えた前提

V1は「BtoC Shopify EC」を主語に設計していました。
V2では、公開フロントを **Global Commerce / Brand + Product + B2C + B2B Entry** として再定義しています。

- Shopify：ブランド体験、商品探索、PDP、BtoC購入、For Professionals
- B2B独自システム：Business Account / Login、見積、PDF、承認後再開、価格区分、営業管理
- 同じ商品・同じブランドストーリーをBtoC/BtoBで共有し、購買方法が必要になる地点で分岐
- Restaurant / Hotel は「Use Case」、Distributor / Retailer は「Buyer Type」として別軸

## V2のページ

1. Home
2. Shop & Collections
3. PDP — AUX Fingertip Tongs
4. For Professionals
5. Brand Story / Why AUX
6. Sitemap & System Boundary

## 商品分類

### Product Family
- AUX TONGS：11商品
- AUX Tools：Mini Whisk / Grating Spoon

### Use / Scene
- COOK
- SERVE
- TABLE

COOK / SERVE / TABLE は商品シリーズ名ではなく、用途探索のためのナビゲーションとして扱います。

## 撮影素材との接続

ワイヤー内の PHOTO ラベルは撮影指示書の Cut / Product shot と対応させています。

- Home Hero → Scene 01
- Knife. Fork. AUX. → Scene 02 / Product P05
- We got you. 3層 → Scene 03 / 10 / 33
- AUX TONGS Family → Product F01
- Professional / Hospitality → Stock photography
- PDP Hero → Product P05
- PDP Feature → Product P06 + Scene 03–05

撮影当日の成果が完全に計画通りにならない可能性を前提に、**特定Cutそのものではなく「写真の役割」で差し替え可能な構造**にしています。

## United Athleを参考にする範囲

参考にするのは、ブランドサイトにBtoB/BtoC双方の入口を明示し、事業者側を専用の購買・会員系へ接続する考え方のみです。

AUXはBtoCがShopify上で直接購入できるため、United Athleのように入口からサイトを二分せず、

> shared brand/product experience → purchase intent → B2C / B2B split

という構造にしています。

## Color Direction — Working

現在のV2では以下を仮置きしています。

- Warm Ivory: `#fffdf9`
- Soft Neutral: `#f4f2ec`
- Ink: `#171714`
- Dark: `#1b1b19`
- Muted Burgundy: `#7a3f45`（working）

V1の `#a8274b` より低彩度・低明度に変更しています。

Accentの用途は原則として以下だけです。

- Primary CTA
- Review star / selected state
- For Professionalsの小さな識別
- 必要最小限のinteractive state

見出し、セクション境界、大きな面には原則使いません。
「Quietly capable / Considerate / Present, but never intrusive」を色の使い方にも反映するためです。

## 10/06 MTGで決めること

- For Professionalsを独立ページとして進めるか
- Restaurant / Hotelを初期から個別ページ化するか、Professional内Use Caseに留めるか
- Get a Quote / Business Account のどこから独自システムへ遷移するか
- B2B初期対象：Hotel / Restaurant / Distributor / Retailer の範囲
- Working Global Nameを来週の画面でどこまで使用するか
- Muted Burgundy方向を採用するか、Neutral onlyで進めるか
- 来週提示物を「UI/コンテンツ方向性の承認用」と定義し、システム完成デモと分けること

## Notes

このリポジトリはV1の多数のCSS/JS overrideをそのまま複製せず、今回の構造変更を確認しやすいようV2を一旦1ファイルで再構築しています。
V1は比較・参照用として `postkeimocore/auxusa` に残します。
