/* AUX Global EC — working visual wireframe.
 * Primary composition: English. Japanese: client review.
 * No checkout, quotation or actual form submission is implemented here.
 */
(function(){
"use strict";
var D=window.AUX_DATA;
if(!D){document.getElementById("site-app").textContent="Content not loaded.";return;}
var q=new URLSearchParams(location.search);
var ABOUT_SECTIONS={third:"third",engineering:"engineering",tsubame:"tsubame"};
var state={
  page:ABOUT_SECTIONS[q.get("page")]?"why":(q.get("page")||"home"),
  whyAnchor:ABOUT_SECTIONS[q.get("page")] || (q.get("page")==="why"&&ABOUT_SECTIONS[q.get("section")]?q.get("section"):null),
  product:q.get("product")||"fingertip",
  lang:q.get("lang")==="ja"?"ja":"en",
  notes:false,
  qty:1,
  galleryIndex:0,
  heroIndex:0
};
var PAGES=[
  {group:"START",pages:[["home","HOME"]]},
  {group:"PRODUCT DISCOVERY",pages:[["shop","SHOP ALL"],["cook","COOK"],["serve","SERVE"],["table","TABLE"],["tongs","Leye TONGS"],["tools","Leye TOOLS"],["pdp","PRODUCT DETAIL"]]},
  {group:"MOMENTS",pages:[["moments","MOMENTS"]]},
  {group:"FOR BUSINESS",pages:[["business","FOR BUSINESS"]]},
  {group:"BRAND",pages:[["why","WHY AUX"],["brand","BRANDS"]]},
  {group:"SUPPORT",pages:[["faq","FAQ"],["shipping","SHIPPING"],["returns","RETURNS"],["privacy","PRIVACY POLICY"],["contact","CONTACT"]]}
];
var ROUTES={home:"/",shop:"/collections/all",tongs:"/collections/aux-tongs",tools:"/collections/aux-tools",cook:"/collections/cook",serve:"/collections/serve",table:"/collections/table",pdp:"/products/{handle}",moments:"/pages/moments",business:"/pages/for-business",why:"/pages/why-aux",brand:"/pages/brand",faq:"/pages/faq",shipping:"/pages/shipping",returns:"/pages/returns",privacy:"/pages/privacy-policy",contact:"/pages/contact"};
function L(en,ja){return state.lang==="ja"?ja:en;}
/* Japanese view: product names are Leye + the AUX Japanese product name; COOK / SERVE / TABLE are translated.
   Japanese headings wrap only at the | phrase marks in the data (no breaks inside a word). */
function plain(s){return String(s).replace(/\|/g,"");}
function phrase(s){s=String(s);return s.indexOf("|")<0?s:'<span class="jp-phrase">'+s.replace(/\|/g,"<wbr>")+'</span>';}
function pname(p,text){return L(p.name,"Leye "+(text?plain(p.jp):phrase(p.jp)));}
var USE_JA={cook:"調理",serve:"取り分け",table:"食卓"};
function price(p){return p.price||D.price;}
function useLabel(id){return L(id.toUpperCase(),USE_JA[id]);}
function mTitle(m){return L(m.title,phrase(m.jp));}
function mStrap(m){return L(m.strap,m.jpStrap);}
function img(file){return D.assetBase+file;}
function photo(file,label,cls){return '<div class="photo '+(cls||"")+'"><img src="'+img(file)+'" loading="lazy" alt=""></div>';}
function note(){return '';}
function bline(text,page,attrs){return '<button type="button" class="btn-line" data-go="'+page+'" '+(attrs||"")+'>'+text+'</button>';}
/* Harpoon arrow (line + upper barb). Long variant for category doorways. */
function arw(cls){return '<span class="arw'+(cls?' '+cls:'')+'" aria-hidden="true"></span>';}
var CATEGORIES=[
 ["cook","shinjo-basting-1.webp","Made for cooking movements.","調理の動作に合わせた道具。"],
 ["serve","shinjo-serving-2.webp","Made for plating and sharing.","盛り付け・取り分けに。"],
 ["table","shinjo-mini-1.webp","Made for the table.","食卓の細かな動きに。"]
];
/* One category-doorway component for HOME, SHOP ALL and WHY AUX. */
function categoryCards(){
 return '<div class="product-collections">'+CATEGORIES.map(function(c){return '<article class="category-card" tabindex="0" data-go="'+c[0]+'">'+photo(c[1],"")+
  '<div class="card-meta"><h3>'+useLabel(c[0])+'</h3><span class="arrow">'+arw("arw-long")+'</span></div><p>'+L(c[2],c[3])+'</p></article>';}).join("")+'</div>';
}
/* Product listing toolbar — V1 composition (FILTER chips left, SORT right) in the V2 system.
   kind: "use" filters by COOK/SERVE/TABLE, "family" by Leye TONGS / Leye TOOLS. */
function filterList(list,kind){
 var f=state.filter||"all";
 var out=f==="all"?list.slice():list.filter(function(p){return kind==="use"?p.uses.indexOf(f)>-1:p.family===f;});
 /* Popular: AUX_DATA.popular (page views in production). Price: one price today, so equal prices keep the featured order (stable sort). */
 if(state.sort==="popular")out.sort(function(a,b){return D.popular.indexOf(a.id)-D.popular.indexOf(b.id);});
 if(state.sort==="price-asc")out.sort(function(a,b){return price(a)-price(b);});
 if(state.sort==="price-desc")out.sort(function(a,b){return price(b)-price(a);});
 if(state.sort==="az")out.sort(function(a,b){return pname(a,1).localeCompare(pname(b,1),state.lang);});
 if(state.sort==="za")out.sort(function(a,b){return pname(b,1).localeCompare(pname(a,1),state.lang);});
 return out;
}
function listingToolbar(list,kind){
 var f=state.filter||"all";
 var opts=kind==="use"?[["cook",useLabel("cook")],["serve",useLabel("serve")],["table",useLabel("table")]]:[["tongs",'<span class="brand-word">Leye</span> '+L("TONGS","トング")],["tools",'<span class="brand-word">Leye</span> '+L("TOOLS","キッチンツール")]];
 opts=opts.filter(function(o){return list.some(function(p){return kind==="use"?p.uses.indexOf(o[0])>-1:p.family===o[0];});});
 var chips=[["all",L("All","すべて")]].concat(opts);
 var sorts=[["featured",L("Featured","おすすめ順")],["popular",L("Most popular","人気順")],["price-asc",L("Price: low to high","価格の安い順")],["price-desc",L("Price: high to low","価格の高い順")],["az",L("Name A–Z","名前順（昇順）")],["za",L("Name Z–A","名前順（降順）")]];
 return '<div class="listing-toolbar"><div class="toolbar-group" role="group" aria-label="'+L("Filter","絞り込み")+'"><span class="toolbar-label">'+L("Filter","絞り込み")+'</span>'+
  chips.map(function(c){return '<button type="button" class="filter-chip'+(f===c[0]?' active':'')+'" data-list-filter="'+c[0]+'" aria-pressed="'+(f===c[0])+'">'+c[1]+'</button>';}).join("")+'</div>'+
  '<label class="toolbar-group sort-control"><span class="toolbar-label">'+L("Sort","並び替え")+'</span><select id="list-sort" data-list-sort>'+
  sorts.map(function(o){return '<option value="'+o[0]+'"'+((state.sort||"featured")===o[0]?' selected':'')+'>'+o[1]+'</option>';}).join("")+'</select></label></div>';
}
var REVIEWS={score:"4.8",stars:5,count:["Based on 24 reviews","24件のレビュー"],items:[
 {rating:5,name:"Sarah K.",place:["Portland, OR","オレゴン州ポートランド"],date:["September 28, 2026","2026年9月28日"],
  title:["My go-to for olives and cheese boards","オリーブやチーズボードに欠かせない"],
  body:["Small enough to sit on the table without looking like kitchen equipment. Guests keep picking it up to look at the tips.","キッチン用品っぽさがなく、食卓に置いておけるサイズ。ゲストがつい手に取って先端を眺めています。"]},
 {rating:5,name:"Daniel M.",place:["Brooklyn, NY","ニューヨーク州ブルックリン"],date:["September 12, 2026","2026年9月12日"],
  title:["Precise without trying","力を入れなくても、狙いどおり"],
  body:["I use it for dumplings and plating. The spring is softer than my old tongs, so I can place food exactly where I want it.","餃子や盛り付けに使っています。前のトングよりばねが柔らかく、置きたい場所にぴたりと置けます。"]},
 {rating:4,name:"Emily R.",place:["Austin, TX","テキサス州オースティン"],date:["August 30, 2026","2026年8月30日"],
  title:["Beautiful — we ended up buying two","きれいな道具。結局2本目を買いました"],
  body:["Well made and easy to clean. We bought a second pair for serving salad because everyone at the table wanted to use it.","つくりが良く、洗いやすい。食卓のみんなが使いたがるので、サラダ用にもう1本買い足しました。"]}
]};
function stars(n){var out='';for(var i=0;i<5;i++)out+='<span class="star'+(i<n?' on':'')+'">★</span>';return '<div class="review-stars" role="img" aria-label="'+n+' / 5">'+out+'</div>';}
function boutline(text,page,attrs){return '<button type="button" class="btn-outline has-arrow" data-go="'+page+'" '+(attrs||"")+'>'+text+'</button>';}
function bfill(text,page,attrs){return '<button type="button" class="btn-fill" data-go="'+page+'" '+(attrs||"")+'>'+text+'</button>';}
function eyebrow(text){return text?'<div class="section-label">'+text+'</div>':'';}
function sectionHead(label,title,description,center){
 return '<div class="section-head'+(center?" center":"")+'">'+eyebrow(label)+'<h2 class="display-medium">'+title+'</h2>'+(description?'<p class="body-md">'+description+'</p>':'')+'</div>';
}
function productBy(id){return D.products.find(function(p){return p.id===id;})||D.products[2];}
/* Product thumbnail: an image cut, with the single cut laid over it (shown on hover). */
function thumbPhoto(main,alt){return '<div class="photo contain has-alt"><img src="'+img(main)+'" loading="lazy" alt=""><img class="photo-alt" src="'+img(alt)+'" loading="lazy" alt=""></div>';}
/* image / alt: optional photo overrides (strings; card is also used directly as a map callback). */
function card(p,image,alt){
 return '<article class="product-card" role="link" tabindex="0" data-product="'+p.id+'">'+
   thumbPhoto(typeof image==="string"?image:p.thumb,typeof alt==="string"?alt:p.image)+
   '<div class="product-meta"><h3>'+pname(p)+'</h3>'+arw()+'</div>'+
   '<div class="price">$20.00</div>'+
 '</article>';
}
function productGrid(products){
 return '<div class="product-grid">'+products.map(card).join("")+'</div>';
}
function productStrip(ids){
 return '<div class="product-strip">'+ids.map(function(id){return card(productBy(id));}).join("")+'</div>';
}
/* Logo variants for client comparison: ?logo=leye (leye.html) or ?logo=leye-type (leye-type.html) swap the header mark. The URL keeps the parameter while browsing. */
var LOGO=new URLSearchParams(location.search).get("logo")||"";
/* AUX Co., Ltd. brands (sample page modelled on aux-ltd.co.jp/brand). Sub-pages are not built yet. */
var BRANDS=[
 {id:"leye",name:"Leye",jp:"Leye",logo:"brand-leye-logo.svg",photo:"shinjo-lineup.webp",copy:["Precision tongs and kitchen tools, engineered in Japan.","日本で設計したトングやキッチンツールを展開しています。"]},
 {id:"teppan",name:"OTONA no TEPPAN",jp:"大人の鉄板",logo:"brand-otona-teppan-logo.svg",photo:"brand-otona-teppan-thumb.webp",copy:["A griddle series that brings out the best in every ingredient.","食材の魅力を最大限に引き出す「大人の鉄板」シリーズ"]},
 {id:"yakizakana",name:"OTONA no YAKIZAKANA",jp:"大人の焼魚",logo:"brand-otona-yakizakana-logo.svg",photo:"brand-otona-yakizakana-thumb.webp",copy:["Made to grill fish with crisp skin, the way a charcoal shichirin does.","目指したのは、七輪で焼き上げた皮パリの焼き魚"]},
 {id:"ishiyakiimo",name:"OTONA no ISHIYAKIIMO",jp:"大人の石焼芋",logo:"brand-otona-ishiyakiimo-logo.svg",photo:"brand-otona-ishiyakiimo-thumb.webp",copy:["Bring the rich flavor of stone-roasted sweet potatoes into your home.","大人をしあわせにする石焼芋。濃密で甘い本格的な石焼き芋をご自宅で。"]},
 {id:"apeluca",name:"APELUCA",jp:"APELUCA",logo:"brand-apeluca-logo.svg",photo:"brand-apeluca-thumb.webp",copy:["For elevated time outdoors.","プレミアムな外時間を愉しむ"]},
 {id:"haana",name:"Haana",jp:"Haana",logo:"brand-haana-logo.svg",photo:"brand-haana-thumb.webp",copy:["So that every flower lasts a little longer.","その花が、長く咲きますように"]},
 {id:"bow",name:"BOW",jp:"BOW",logo:"brand-bow-logo.webp",photo:"brand-bow-thumb.webp",copy:["Smart storage racks for design-led kitchen appliances.","デザイン家電をスマートに収納。家電収納ラックシリーズ"]},
 {id:"soraie",name:"soraie",jp:"soraie",logo:"brand-soraie-logo.svg",photo:"brand-soraie-thumb.webp",copy:["Every day is a good day for laundry.","毎日が洗濯日和。"]},
 {id:"fraclean",name:"Fra Clean",jp:"Fra Clean",logo:"brand-fraclean-logo.svg",photo:"brand-fraclean-thumb.webp",copy:["A fresh take on drying indoors, for a tidier, more comfortable home.","「部屋干し」の新発想、快適な暮らしをスッキリお手伝い。"]},
 {id:"tasgarden",name:"Tas Garden",jp:"Tas Garden",logo:"brand-tasgarden-logo.svg",photo:"brand-tasgarden-thumb.webp",copy:["Add style. Add a sense of play.","スタイルを足す。遊びごころを足す。"]}
];
function brandPage(){
 return '<section class="site-section compact shop-intro brand-intro"><h1 class="page-display">'+L("Brands","ブランド")+'</h1>'+
 '<p class="body-lg">'+L("AUX Co., Ltd. creates kitchen and everyday products across several brands.","オークス株式会社は、AUXのほかにもキッチン用品や生活用品のブランドを展開しています。")+'</p></section>'+
 '<section class="site-section compact brand-list-section"><div class="brand-list">'+BRANDS.map(function(b){
  return '<article class="brand-row" id="anchor-'+b.id+'">'+photo(b.photo,"")+
  '<div class="brand-copy">'+(b.logo?'<img class="brand-logo" src="'+img(b.logo)+'" alt="'+b.name+'" width="160" height="96">':'<h2 class="brand-name">'+L(b.name,b.jp)+'</h2>')+
  '<p class="body-md">'+L(b.copy[0],b.copy[1])+'</p>'+
  '<div class="btn-row"><button type="button" class="btn-outline has-arrow" data-demo="brand">'+L("More","詳しく見る")+'</button></div></div></article>';
 }).join("")+'</div></section>';
}
function appHeader(){
 var shopPages=["shop","tongs","tools","pdp"],supportPages=["faq","shipping","returns","privacy","contact"];
 var current=shopPages.indexOf(state.page)>-1?"shop":supportPages.indexOf(state.page)>-1?"support":state.page;
 function item(id,label){return '<button type="button" data-go="'+id+'"'+(current===id?' class="active"':'')+'>'+label+'</button>';}
 function drop(id,label,go,links){
  return '<div class="nav-item has-sub sub-'+id+(current===id?' active':'')+'"><button type="button" class="nav-parent'+(current===id?' active':'')+'" data-go="'+go+'" aria-haspopup="true" aria-expanded="false">'+label+'<span class="nav-caret" aria-hidden="true"></span></button>'+
  '<div class="nav-sub" role="menu">'+links.map(function(x){return '<button type="button" role="menuitem" data-go="'+x[0]+'"'+(x[2]?' data-anchor="'+x[2]+'"':'')+(state.page===x[0]&&!x[2]?' class="active"':'')+'>'+x[1]+'</button>';}).join("")+'</div></div>';
 }
 /* Language: a small menu beside search (desktop); a row at the end of the mobile menu. Each name is written in its own language. */
 var langButtons='<button type="button" data-lang="en" lang="en" aria-pressed="'+(state.lang==="en")+'">English</button><button type="button" data-lang="ja" lang="ja" aria-pressed="'+(state.lang==="ja")+'">日本語</button>';
 var navh=drop("shop",L("SHOP","商品"),"shop",[["shop",L("SHOP ALL","すべての商品")],["tongs",L("Leye TONGS","Leye トング")],["tools",L("Leye TOOLS","Leye キッチンツール")]])+
  item("cook",useLabel("cook"))+item("serve",useLabel("serve"))+item("table",useLabel("table"))+item("moments",L("MOMENTS","食卓のシーン"))+item("why",L("WHY AUX","AUXについて"))+
  drop("brand",L("BRAND","ブランド"),"brand",BRANDS.map(function(b){return ["brand",b.id==="leye"?b.name:L(b.name.toUpperCase(),b.jp),b.id];}))+
  drop("support",L("SUPPORT","サポート"),"faq",[["faq",L("FAQ","よくある質問")],["shipping",L("SHIPPING","配送")],["returns",L("RETURNS","返品・返金")],["privacy",L("PRIVACY POLICY","プライバシーポリシー")],["contact",L("CONTACT","お問い合わせ")]])+
  '<button type="button" class="nav-business'+(current==="business"?' active':'')+'" data-go="business">'+L("FOR BUSINESS","法人・事業者向け")+'</button>'+
  '<div class="nav-lang" role="group" aria-label="'+L("Language","言語")+'">'+langButtons+'</div>';
 return '<header class="site-header">'+
 '<button type="button" class="site-menu-mobile" data-demo="nav" aria-expanded="false" aria-label="'+L("Menu","メニュー")+'"><svg class="icon-open" viewBox="0 0 24 24"><path d="M3 9h18M3 15h18"></path></svg><svg class="icon-close" viewBox="0 0 24 24"><path d="M6 6l12 12M18 6L6 18"></path></svg></button>'+
 '<button class="site-wordmark" data-go="home" aria-label="'+L("AUX Home","AUX トップページ")+'">'+
 (LOGO==="leye"?'<img class="logo-leye" src="./assets/leye-logo.svg" alt="leye" width="42" height="56">':
  LOGO==="leye-type"?'<img class="logo-leye-type" src="./assets/leye-typelogo.svg" alt="leye" width="67" height="32">':
  '<img src="./assets/aux-logo-original.svg" alt="AUX Co., Ltd." width="152" height="17">')+'</button>'+
 '<nav class="site-menu" aria-label="'+L("Main navigation","メインナビゲーション")+'">'+navh+'</nav>'+
 '<div class="site-util"><div class="lang-switch"><button type="button" class="lang-current" aria-haspopup="true" aria-label="'+L("Language: English","言語：日本語")+'">'+L("English","日本語")+'<span class="nav-caret" aria-hidden="true"></span></button>'+
 '<div class="lang-menu">'+langButtons+'</div></div>'+
 '<button type="button" class="util-search" data-demo="search" aria-label="'+L("Search","検索")+'"><svg viewBox="0 0 24 24"><circle cx="10.5" cy="10.5" r="6.5"></circle><path d="m15.5 15.5 5 5"></path></svg></button>'+
 '<button type="button" class="util-account" data-demo="account" aria-label="'+L("Account","アカウント")+'"><svg viewBox="0 0 24 24"><circle cx="12" cy="8" r="4"></circle><path d="M4.5 20c.9-3.6 3.9-6 7.5-6s6.6 2.4 7.5 6"></path></svg></button>'+
 '<button type="button" class="util-cart" data-demo="cart" aria-label="'+L("Cart","カート")+'"><svg viewBox="0 0 24 24"><path d="M4 8h16l-1.2 12H5.2L4 8ZM8 9V6a4 4 0 0 1 8 0v3"></path></svg><span class="cart-count">0</span><span class="cart-text">'+L("CART","カート")+' (0)</span></button></div></header>';
}
function footer(){
 function grp(title,items){return '<div class="footer-group"><b>'+title+'</b>'+items.map(function(x){return '<button type="button" data-go="'+x[0]+'">'+x[1]+'</button>';}).join("")+'</div>';}
 return '<footer class="site-footer"><div class="footer-columns">'+
 '<div><img class="footer-logo-image" src="./assets/aux-logo-original.svg" alt="AUX Co., Ltd." width="175" height="20"><p class="footer-intro">'+L("Tools that quietly support the meal, the people and the moments around the table.","食事と人、食卓を囲む時間を静かに支える道具。")+'</p></div>'+
 '<div class="footer-links">'+grp(L("SHOP","商品"),[["shop",L("Shop All","すべての商品")],["tongs",L("Leye TONGS","Leye トング")],["tools",L("Leye Tools","Leye キッチンツール")],["cook",useLabel("cook")],["serve",useLabel("serve")],["table",useLabel("table")]])+
 grp(L("DISCOVER","AUXを知る"),[["moments",L("MOMENTS","食卓のシーン")],["why",L("WHY AUX","AUXについて")],["brand",L("BRANDS","ブランド")],["business",L("FOR BUSINESS","法人・事業者向け")]])+
 grp(L("SUPPORT","サポート"),[["faq",L("FAQ","よくある質問")],["shipping",L("Shipping","配送")],["returns",L("Returns","返品・返金")],["privacy",L("Privacy Policy","プライバシーポリシー")],["contact",L("Contact","お問い合わせ")]])+'</div>'+
 '</div><div class="footer-bottom"><span>© 2026 AUX Co., Ltd. All rights reserved.</span></div></footer>';
}
var HERO_SLIDES=[
 {id:"fingertip",image:"shinjo-fingertip-1.webp",copy:"A thoughtful grip for small foods and small movements.",jpCopy:"小さな食材も指先のようにつまめます。"},
 {id:"noodle",image:"shinjo-noodle-1.webp",copy:"Lift a full portion, down to the last strand.",jpCopy:"ひと束から、最後の一本まで。"},
 {id:"serving",image:"shinjo-serving-1.webp",copy:"From a shared dish to the plate, in one natural movement.",jpCopy:"大皿料理を取り皿へスムーズに取り分けられます。"}
];
/* HOME hero. All three slides are stacked and cross-dissolve; the active photo slowly
   zooms in. The pager is three vertical bars: the active bar fills with ink over the slide
   interval (3s) and the hero advances when it is full (paused on hover). */
function heroHTML(){
 var hi=Math.max(0,Math.min(2,state.heroIndex||0));
 return '<section class="photo-hero" aria-label="'+L("Featured products","注目の商品")+'">'+
  '<div class="photo-hero-visual">'+HERO_SLIDES.map(function(h,i){return '<div class="hero-slide'+(i===hi?' is-active is-zoom':'')+'" data-slide="'+i+'">'+photo(h.image,"")+'</div>';}).join("")+
   HERO_SLIDES.map(function(h,i){return '<div class="photo-hero-caption'+(i===hi?' is-active':'')+'" data-slide="'+i+'"'+(i===hi?'':' aria-hidden="true"')+'>'+
    (i===hi?'<h1 class="photo-hero-title">':'<p class="photo-hero-title">')+pname(productBy(h.id))+(i===hi?'</h1>':'</p>')+
    '<p class="photo-hero-copy">'+L(h.copy,h.jpCopy)+'</p>'+
    '<button type="button" class="btn-outline on-photo has-arrow" data-product="'+h.id+'"'+(i===hi?'':' tabindex="-1"')+'>'+L("View product","商品を見る")+'</button></div>';}).join("")+
  '</div>'+
  '<div class="photo-hero-rail"><div class="photo-hero-names" aria-hidden="true">'+HERO_SLIDES.map(function(h,i){return '<div class="photo-hero-name'+(i===hi?' is-active':'')+'" data-slide="'+i+'">'+pname(productBy(h.id)).replace(/^(AUX|Leye) /,"")+'</div>';}).join("")+'</div>'+
   '<div class="photo-hero-pager"><span class="photo-hero-count">0'+(hi+1)+' / 03</span>'+
   '<div class="photo-hero-bars" role="group" aria-label="'+L("Featured products","注目の商品")+'">'+HERO_SLIDES.map(function(s,i){
     return '<button type="button" class="hero-bar'+(i===hi?' active':'')+'" data-hero-index="'+i+'" aria-label="'+L("Show featured product "+(i+1)+" of 3","注目の商品 "+(i+1)+" / 3 を表示")+'" aria-pressed="'+(i===hi)+'"><span></span></button>';
   }).join("")+'</div></div></div>'+
 '</section>';
}
function showHero(i){
 var n=HERO_SLIDES.length;state.heroIndex=(i+n)%n;var hi=state.heroIndex;
 var root=document.querySelector(".photo-hero");if(!root)return;
 root.querySelectorAll(".hero-slide").forEach(function(el,k){
  if(k===hi){el.classList.remove("is-zoom");void el.offsetWidth;el.classList.add("is-active","is-zoom");}
  else el.classList.remove("is-active");
 });
 root.querySelectorAll(".photo-hero-caption").forEach(function(el,k){
  var on=k===hi;el.classList.toggle("is-active",on);
  if(on)el.removeAttribute("aria-hidden");else el.setAttribute("aria-hidden","true");
  var b=el.querySelector("button");if(b){if(on)b.removeAttribute("tabindex");else b.setAttribute("tabindex","-1");}
 });
 root.querySelectorAll(".photo-hero-name").forEach(function(el,k){el.classList.toggle("is-active",k===hi);});
 root.querySelectorAll(".hero-bar").forEach(function(el,k){el.classList.remove("active");el.setAttribute("aria-pressed",String(k===hi));});
 var bar=root.querySelectorAll(".hero-bar")[hi];void bar.offsetWidth;bar.classList.add("active");
 var c=root.querySelector(".photo-hero-count");if(c)c.textContent="0"+(hi+1)+" / 0"+n;
 bindHero();
}
function bindHero(){
 var fill=document.querySelector(".photo-hero .hero-bar.active span");
 if(fill)fill.addEventListener("animationend",function(){showHero((state.heroIndex||0)+1);},{once:true});
}
/* WHY AUX doorway band (HOME, COOK / SERVE / TABLE, PDP): a content-width photo background
   with a few photos scattered over it and the statement centred. Returns an open section. */
var WHY_FLOATS=[["shinjo-long-1.webp","f1",".05"],["shinjo-bread-thumb.webp","f2","-.06"],["shinjo-scoop-thumb.webp","f3",".07"],["shinjo-finetip-thumb.webp","f4","-.04"]];
function whyBand(title,text){
 return '<section class="site-section why-band-section"><div class="why-band">'+
  '<div class="why-band-bg" aria-hidden="true">'+photo("shinjo-lineup.webp","")+'</div>'+
  WHY_FLOATS.map(function(f){return '<div class="why-float '+f[1]+'" data-drift="'+f[2]+'" aria-hidden="true">'+photo(f[0],"")+'</div>';}).join("")+
  '<div class="why-band-copy">'+eyebrow(L("WHY AUX","AUXについて"))+'<h2 class="page-display">'+title+'</h2><p class="body-lg">'+text+'</p>'+
  '<div class="btn-row is-centred"><button type="button" class="btn-outline on-photo has-arrow" data-go="why">'+L("Why AUX","AUXについて")+'</button></div></div>'+
 '</div>';
}
function home(){
 var featured=["fingertip","noodle","serving","whisk"];
 var categories=[
  ["cook","shinjo-basting-1.webp","Made for cooking movements.","調理の動作に合わせた道具。"],
  ["serve","shinjo-serving-2.webp","Made for plating and sharing.","盛り付け・取り分けに。"],
  ["table","shinjo-mini-1.webp","Made for the table.","食卓の細かな動きに。"]
 ];
 var scatter=[["shinjo-fry-thumb.webp",".08"],["shinjo-garnish-thumb.webp","-.06"],["shinjo-noodle-1.webp",".06"],["shinjo-mini-thumb.webp","-.06"],["shinjo-grating-thumb.webp",".06"]];
 return '<div class="home-page">'+heroHTML()+
 /* THE AUX DIFFERENCE: centred statement; photographs scattered behind it as background. */
 '<section class="site-section home-difference scatter-section">'+
 '<div class="scatter-photos" aria-hidden="true">'+scatter.map(function(x,i){return '<div class="scatter-photo s'+(i+1)+'" data-speed="'+x[1]+'">'+photo(x[0],"")+'</div>';}).join("")+'</div>'+
 '<div class="scatter-copy"><h2 class="display-medium">'+L("Different forms<br>for different movements.","使い方に合わせて<br>変えた形状。")+'</h2>'+
 '<p class="body-lg">'+L("Tips that grip noodles, openings that drain oil, and proportions suited to smaller foods. Every detail has a purpose.","麺をつかむ先端、揚げ物の油を切る穴、小さな食材に合うサイズ。使う場面に合わせて細部まで工夫しています。")+'</p>'+
 '<button type="button" class="btn-fill has-arrow" data-go="why">'+L("Why AUX","AUXについて")+'</button></div></section>'+
 '<section class="site-section compact mist home-products">'+sectionHead("",L("Tools worth reaching for.","代表的な商品"),L("A closer look at the tools and the jobs they are made for.","日常のさまざまな動作に寄り添う4つの商品をご紹介します。"))+
 productStrip(featured)+'<div class="btn-row is-centred">'+boutline(L("Shop all products","商品一覧を見る"),"shop")+'</div></section>'+
 '<section class="site-section home-categories">'+sectionHead("",L("COOK. SERVE. TABLE.",phrase("調理。|取り分け。|食卓。")),L("Start with what you want to do, then discover the tools.","調理・取り分け・食卓の用途から商品を探せます。"))+
 categoryCards()+'</section>'+
 '<section class="site-section mist home-third"><div class="split">'+photo("shinjo-fingertip-2.webp","","scroll-zoom")+
 '<div class="split-copy">'+eyebrow(L("THE THIRD UTENSIL","第3の食卓道具"))+
 '<h2 class="display-medium">'+L("Knife.<br>Fork.<br>Tongs.","ナイフ。<br>フォーク。<br>トング。")+'</h2>'+
 '<p class="body-lg">'+L("Small tongs that belong beside the knife and fork<br>—not only in the kitchen.","キッチンだけでなく、ナイフやフォークと一緒に食卓でも使える小さなトングです。")+'</p>'+
 '<div class="btn-row">'+boutline(L("Explore the idea","この考え方を見る"),"why",'data-anchor="third"')+'</div></div></div></section>'+
 '<section class="site-section home-moments-section">'+sectionHead(L("MOMENTS","食卓のシーン"),L("From everyday meals to the moments we share.","何気ない日も、大切な日も。"),L("A different way to explore AUX: through the moments around the table.","普段の食事からおもてなしまで、食卓のシーンに合った道具をご紹介します。"),true)+
 '<div class="home-moments"><div class="home-moment-main" tabindex="0" data-go="moments" data-anchor="everyday">'+photo(D.moments[0].photo,"MOMENTS / everyday")+
 '<div class="moment-home-copy"><h3>'+mTitle(D.moments[0])+'</h3><p>'+mStrap(D.moments[0])+'</p></div><span class="arrow">'+arw()+'</span></div>'+
 '<div class="home-moment-list">'+D.moments.slice(1).map(function(m,i){return '<article tabindex="0" data-go="moments" data-anchor="'+m.id+'">'+photo(m.photo,"MOMENTS / "+m.title)+
 '<div><h3>'+mTitle(m)+'</h3><p>'+mStrap(m)+'</p></div><span class="arrow">'+arw()+'</span></article>';}).join("")+'</div></div></section>'+
 '<section class="b2b-banner home-business"><div>'+
 '<h2 class="display-medium">'+L("Tools designed for attentive service.","お客様を迎える場所にも。")+'</h2>'+
 '<p class="body-md">'+L("Discover how AUX tools fit restaurants, hotels, cafés, events and retail.","レストランやホテル、カフェなどでの業務用利用に加え、小売・卸取引についてもご相談いただけます。")+'</p>'+
 '<div class="btn-row"><button type="button" class="btn-fill has-arrow" data-go="business">'+L("For Business","法人・事業者向け")+'</button></div></div>'+
 photo("istock-1054862736.webp","Hospitality / editorial stock selection")+'</section>'+
 whyBand(L("Precision in every detail.",phrase("使いやすさを|支える|細部の工夫")),L("Considered proportions, precise tips and careful manufacturing help each tool move naturally with the hand.","先端の形や握り心地、仕上げまで。使いやすさを考えて細部を設計しています。"))+
 note("V1 priority restored: featured-product hero → AUX difference → featured products → category discovery → use-scene discovery → About AUX. New direction adds Third Utensil and Business within this sequence.","V1の基本順序：代表商品のHero→AUXの特徴→代表商品→カテゴリ→MOMENTS→About AUX。今回の方針でTABLEコンテンツ・法人導線を追加。")+'</section></div>';
}
function shop(){
 var list=filterList(D.products,"use");
 return '<section class="site-section compact shop-intro"><h1 class="page-display">'+L("All Products","すべての商品")+'</h1>'+
 '<p class="body-lg">'+L("Browse all AUX kitchen tools, or start from COOK, SERVE or TABLE.","AUXのキッチンツールを一覧でご覧いただけます。調理・取り分け・食卓の用途からも探せます。")+'</p></section>'+
 '<section class="site-section compact shop-categories">'+categoryCards()+'</section>'+
 '<section class="site-section compact" id="anchor-products">'+listingToolbar(D.products,"use")+productGrid(list)+'</section>'+
 '<section class="site-section"><div class="split">'+photo("shinjo-garnish-1.webp","")+
 '<div class="split-copy">'+eyebrow(L("MOMENTS","食卓のシーン"))+'<h2 class="display-medium">'+L("Find the right tool for the moment.",phrase("食卓のシーンから|選ぶ"))+'</h2>'+
 '<p class="body-md">'+L("Everyday meals, shared time, hosting and special occasions. See which tools suit each moment.","毎日の食事から人を招く日、特別な日まで、それぞれのシーンに合う商品をご紹介します。")+'</p>'+
 '<div class="btn-row">'+boutline(L("Explore MOMENTS","食卓のシーンを見る"),"moments")+'</div></div></div></section>';
}
function collection(id){
 var c=D.collections[id],matches=D.products.filter(function(p){return p.uses.indexOf(id)>-1;});
 var featuredIds={cook:["fry","noodle"],serve:["serving","basting"],table:["fingertip","garnish"]}[id];
 var values={
 cook:[
 ["shinjo-basting-2.webp","Turn & lift","返す・持ち上げる","Turn and lift food in the pan with control.","フライパンで食材を返したり持ち上げたりしやすい形です。"],
 ["shinjo-fry-1.webp","Drain while lifting","つかみながら油を切る","Openings in the Fry Tongs support draining.","食材をつかんだまま余分な油を切れます。"],
 ["shinjo-noodle-1.webp","Grip the last strand","麺を最後までつかむ","Serrated tips help grip noodles, down to the last strand.","先端のギザギザで麺をしっかりつかめます。"]],
 serve:[
 ["shinjo-serving-1.webp","Share from one plate","大皿から取り分ける","Make serving from a shared dish feel natural.","大皿料理から取り皿へスムーズに取り分けられます。"],
 ["shinjo-finetip-2.webp","Place with control","狙った位置に盛り付ける","Make small, careful adjustments to every plate.","細い先端で食材を狙った位置に盛り付けられます。"],
 ["shinjo-bread-2.webp","Keep the toppings in place","具材をくずさずに","Lift toast and open sandwiches by the edge, without touching the toppings.","パンの端をつかめるので、トッピングに触れずに取り分けやすくなっています。"]],
 table:[
 ["shinjo-fingertip-1.webp","Sharing at the table","食卓で取り分ける","Pass salad and small bites from the middle of the table.","テーブル中央の料理をそれぞれの皿へ取り分けられます。"],
 ["shinjo-garnish-1.webp","The smaller things","小さな器・小さな食材","A scale that suits small bowls and jars.","小さなボウルや瓶にも入れやすい細い先端です。"],
 ["katou-garnish-use2.webp","At the tea table","お茶の時間にも","From lifting a tea bag to other small jobs at the table.","ティーバッグを取り出すなど、食卓の細かな動作にも使えます。"]]
 }[id];
 return '<div class="collection-banner"><div class="detail-copy">'+
 '<h1 class="page-display">'+useLabel(id)+'</h1><p class="body-lg">'+L(c.lead[0],c.lead[1])+'</p>'+
 '<p class="body-md">'+L(c.body[0],c.body[1])+'</p></div>'+photo(c.photo,id.toUpperCase()+" collection hero")+'</div>'+
 '<section class="site-section">'+sectionHead("",L("Different tools for different movements.",phrase("用途に合わせた|3つの工夫")))+
 '<div class="collection-value-grid">'+values.map(function(v,i){return '<article>'+photo(v[0],"Physical use / working example")+
 '<h3>'+L(v[1],v[2])+'</h3><p>'+L(v[3],v[4])+'</p></article>';}).join("")+'</div></section>'+
 '<section class="site-section compact mist">'+sectionHead("",L("Start with these tools.","代表的な商品"))+
 '<div class="featured-pair">'+featuredIds.map(function(x){var p=productBy(x);return card(p,p.thumbScene,p.photos.single);}).join("")+'</div></section>'+
 '<section class="site-section compact" id="anchor-products">'+listingToolbar(matches,"family")+productGrid(filterList(matches,"family"))+'</section>'+
 (id==="table"?'<section class="site-section mist"><div class="split">'+photo("shinjo-fingertip-2.webp","Fingertip at table / THE THIRD UTENSIL")+
 '<div>'+eyebrow(L("KNIFE. FORK. TONGS.","ナイフ。フォーク。トング。"))+'<h2 class="display-medium">'+L("A new place at the table.","食卓に、新しい道具を。")+'</h2><p class="body-md">'+L("Fingertip Tongs feel at home beside the knife and fork.","ナイフやフォークの隣に、ゆびさきトングという新しい選択肢を。")+'</p>'+
 boutline(L("View Fingertip Tongs","ゆびさきトングを見る"),"pdp",'data-set-product="fingertip"')+'</div></div></section>':"")+
 whyBand(L("Precision made visible.",phrase("用途に合わせた|形状の工夫")),L("Every shape begins with a purpose and is refined through precise metalworking.","使いやすい形をつくるために、日本の金属加工技術を生かしています。"))+
 note("V1 Collection hierarchy restored: hero → use-value trio → featured products → complete listing → About AUX. COOK/SERVE/TABLE can overlap.","V1のCollection構成：Hero→3つの使用価値→代表商品→一覧→About AUX。COOK/SERVE/TABLEは重複掲載可。")+'</section>';
}
function family(kind){
 var isT=kind==="tongs";var list=D.products.filter(function(p){return p.family===kind;});
 return '<div class="collection-banner"><div class="detail-copy">'+
 '<h1 class="page-display">'+(isT?L("Leye TONGS","Leye トング"):L("Leye Tools","Leye "+phrase("キッチン|ツール")))+'</h1><p class="body-lg">'+(isT?L("Eleven shapes considered for different gripping movements.","食材や使い方に合わせて、11種類のトングを揃えています。"):L("A small whisk and a grating spoon, for dressings, sauces and finishing touches.","ドレッシングやソースづくり、料理の仕上げに使える小さな泡立て器とおろしスプーンです。"))+'</p></div>'+
 photo(isT?"shinjo-lineup.webp":"katou-tools-board.webp","Family image / provisional")+'</div>'+
 '<section class="site-section compact">'+
 listingToolbar(list,"use")+productGrid(filterList(list,"use"))+'</section>';
}
/* Brand pages (MOMENTS, WHY AUX) use an editorial layer that differs from the
   shopping pages: a full-width opening image, an asymmetric intro, then chapters
   that alternate between a full-bleed image and an offset image/copy pair. */
function editorialOpening(image,title,lead,extra){
 return '<div class="editorial-hero">'+photo(image,"")+'<h1 class="page-display editorial-hero-title">'+title+'</h1></div>'+
 '<section class="site-section editorial-intro"><p class="body-lg">'+lead+'</p>'+(extra||"")+'</section>';
}
function chapter(o){
 var num=o.num?'<span class="chapter-num" aria-hidden="true">'+o.num+'</span>':'';
 var copy='<div class="chapter-copy"><div class="chapter-head">'+eyebrow(o.label||"")+(o.layout==="wide"?'':num)+'<h2 class="display-medium">'+o.title+'</h2>'+(o.layout==="wide"?num:'')+'</div>'+
  '<div class="chapter-text">'+(o.lead?'<p class="body-lg">'+o.lead+'</p>':'')+(o.body?'<p class="body-md">'+o.body+'</p>':'')+
  (o.cta?'<div class="btn-row">'+o.cta+'</div>':'')+'</div></div>';
 var inner=o.layout==="wide"?'<div class="chapter-bleed">'+photo(o.photo,"")+'</div>'+copy:
  '<div class="chapter-body"><div class="chapter-photo">'+photo(o.photo,"")+'</div>'+copy+'</div>';
 return '<section class="site-section chapter is-'+o.layout+(o.reverse?' reverse':'')+'"'+(o.id?' id="anchor-'+o.id+'"':'')+'>'+inner+(o.extra||"")+'</section>';
}
function moments(){
 return '<div class="brand-page">'+
 editorialOpening("shinjo-fry-2.webp",L("For the moments<br>around the table.","食卓の4つのシーン"),
  L("Everyday meals, time with others, hosting at home and special celebrations. Find the right tool for each moment—not only for each task.","いつもの食事から特別な日まで、食卓のシーンに合わせて道具を探せます。"),
  '<div class="moment-jumps has-photos">'+D.moments.map(function(m,i){return '<button type="button" data-anchor="'+m.id+'"><span class="jump-bg" aria-hidden="true"><span style="background-image:url('+img(m.photo)+')"></span></span><span class="jump-title">'+mTitle(m)+'</span><span class="jump-foot"><span class="jump-num">0'+(i+1)+'/</span>'+arw("arw-down")+'</span></button>';}).join("")+'</div>')+
 D.moments.map(function(m,i){
  return chapter({id:m.id,num:"0"+(i+1)+"/",layout:i%2?"offset":"wide",reverse:i===3,photo:m.photo,title:mTitle(m),lead:mStrap(m),body:L(m.body[0],m.body[1]),
   extra:'<div class="moment-products'+(i===1?' align-left':i===3?' align-right':'')+'"><div class="moment-products-heading">'+eyebrow(L("Tools for this moment","この時間に合う道具"))+
    '</div>'+
    '<div class="moment-related-grid">'+m.products.map(function(id){return card(productBy(id));}).join("")+'</div></div>'});
 }).join("")+
 whyBand(L("Precision behind every moment.",phrase("使いやすさを|支える|設計と技術")),L("Thoughtful shapes and precise metalworking support the moments we share.","用途に合わせた先端や握り心地を、設計と金属加工の技術で実現しています。"))+'</section></div>';
}
var BIZ_PHOTOS={
 restaurants:["istock-479169402.webp","shinjo-finetip-2.webp","istock-2226618325.webp","shinjo-long-2.webp"],
 hotels:["istock-2172505701.webp","shinjo-serving-2.webp","istock-2219298796.webp","shinjo-scoop-1.webp"],
 cafes:["shinjo-bread-1.webp","istock-1839957842.webp","shinjo-mini-1.webp","istock-1772714735.webp"],
 catering:["istock-1388916470.webp","shinjo-serving-1.webp","istock-2235046527.webp","shinjo-long-1.webp"],
 retail:["shinjo-lineup.webp"]
};
/* FOR BUSINESS sector photo: prev / next arrows on the photo (same as the PDP gallery) and one bar per photo below. */
function bizGallery(id){
 var shots=BIZ_PHOTOS[id]||[];
 if(shots.length<2)return photo(shots[0],"");
 return '<div class="biz-gallery" data-biz="'+id+'"><div class="biz-frame">'+photo(shots[0],"")+'</div>'+
  '<div class="kinto-nav"><button class="kinto-arrow prev" type="button" data-biz-step="-1" aria-label="'+L("Previous image","前の画像")+'">'+arw()+'</button>'+
  '<div class="kinto-dots" role="group" aria-label="'+L("Photos","写真")+'">'+shots.map(function(f,i){return '<button type="button" class="'+(i===0?'active':'')+'" data-biz-index="'+i+'" aria-label="'+L("Image ","画像 ")+(i+1)+'" aria-pressed="'+(i===0)+'"><span></span></button>';}).join("")+'</div>'+
  '<button class="kinto-arrow next" type="button" data-biz-step="1" aria-label="'+L("Next image","次の画像")+'">'+arw()+'</button></div></div>';
}
function pdpShow(i){
 var g=document.querySelector(".kinto-gallery");if(!g)return;
 var thumbs=g.querySelectorAll(".kinto-thumb"),n=thumbs.length;if(!n)return;
 i=(i+n)%n;state.galleryIndex=i;
 var main=g.querySelector(".kinto-main img");if(main)main.src=thumbs[i].querySelector("img").getAttribute("src");
 thumbs.forEach(function(t,k){t.classList.toggle("active",k===i);t.setAttribute("aria-pressed",String(k===i));});
 g.querySelectorAll(".kinto-dots button").forEach(function(b,k){b.classList.toggle("active",k===i);b.setAttribute("aria-pressed",String(k===i));});
}
/* Photo carousels (PDP gallery, FOR BUSINESS sectors) advance every 3s while on screen;
   paused on hover, for 3s after a manual change, and for reduced motion. */
var AUTO_MS=3000;
function holdGallery(el){var g=el.closest(".kinto-gallery,.biz-gallery");if(g)g.dataset.holdUntil=String(Date.now()+AUTO_MS);}
setInterval(function(){
 if(window.matchMedia&&window.matchMedia("(prefers-reduced-motion: reduce)").matches)return;
 var now=Date.now(),vh=window.innerHeight||0;
 document.querySelectorAll(".kinto-gallery,.biz-gallery").forEach(function(g){
  if(g.matches(":hover")||Number(g.dataset.holdUntil||0)>now)return;
  var r=g.getBoundingClientRect();if(r.bottom<0||r.top>vh)return;
  if(g.classList.contains("kinto-gallery"))pdpShow((state.galleryIndex||0)+1);
  else bizShow(g,Number(g.dataset.index||0)+1);
 });
},AUTO_MS);
function bizShow(g,i){
 var shots=BIZ_PHOTOS[g.dataset.biz]||[];if(!shots.length)return;
 i=(i+shots.length)%shots.length;g.dataset.index=i;
 g.querySelector(".photo img").src=img(shots[i]);
 g.querySelectorAll("[data-biz-index]").forEach(function(b,k){b.classList.toggle("active",k===i);b.setAttribute("aria-pressed",String(k===i));});
}
function business(){
 return '<div class="detail-hero"><div class="detail-copy">'+
 '<h1 class="page-display">'+L("For spaces where<br>people gather.",phrase("飲食店や|宿泊施設にも<br>Leyeの|トングを。"))+'</h1>'+
 '<p class="body-lg">'+L("From professional kitchens to the table, AUX tools support the details of serving and sharing food.","厨房での調理からテーブルサービスまで、さまざまな業務で使える商品を揃えています。")+'</p>'+
 '<div class="btn-row">'+boutline(L("Business inquiries","法人・業務用のお問い合わせ"),"contact")+'</div></div>'+
 photo("istock-2195526262.webp","")+'</div>'+
 '<section class="site-section compact">'+sectionHead("",L("Tools for kitchens, hospitality and retail.",phrase("飲食店・|宿泊施設・|小売店向け")),
 L("Explore kitchen tools and tableware for hospitality, events and retail.","レストランやホテル、カフェ、イベント、小売店などでの用途をご紹介します。"))+
 '<div class="moment-jumps has-photos cols-5">'+D.businesses.map(function(b){return '<button type="button" data-anchor="'+b.id+'"><span class="jump-bg" aria-hidden="true"><span style="background-image:url('+img(b.photo)+')"></span></span><span class="jump-title">'+L(b.title,phrase(b.jp))+'</span><span class="jump-foot">'+arw("arw-down")+'</span></button>';}).join("")+'</div></section>'+
 D.businesses.map(function(b,i){return '<section class="site-section '+(i%2?"mist":"")+'" id="anchor-'+b.id+'"><div class="business-detail '+(i%2?"reverse":"")+'">'+bizGallery(b.id)+
 '<div><h2 class="display-medium">'+L(b.title,phrase(b.jp))+'</h2><p class="body-lg">'+L(b.body[0],b.body[1])+'</p>'+
 '<div class="business-related">'+eyebrow(L("Suggested tools","おすすめの道具"))+'<ul>'+b.products.map(function(id){var p=productBy(id);return '<li><button type="button" data-product="'+id+'">'+photo(p.image,"")+'<span>'+pname(p)+'</span>'+arw()+'</button></li>';}).join("")+'</ul></div>'+
 '<div class="btn-row">'+boutline(L("Business & wholesale inquiries","法人・卸取引について問い合わせる"),"contact")+'</div></div></div></section>';}).join("")+
 whyBand(L("Precision for every service.",phrase("業務でも|使いやすい|道具づくり")),L("Explore the design and metalworking behind every AUX tool.","AUXの商品づくりに生かしている設計や金属加工をご紹介します。"))+'</section>';
}
function pdpGallery(p){
 var ph=p.photos,shots=ph.scenes.concat([ph.single,ph.form],ph.uses);
 state.galleryIndex=Math.max(0,Math.min(shots.length-1,state.galleryIndex||0));
 var idx=state.galleryIndex;
 return '<div class="kinto-gallery" aria-label="'+L("Product photos","商品写真")+'">'+
 '<div class="kinto-thumbs" role="group" aria-label="'+L("Choose product photo","商品写真を選ぶ")+'">'+shots.map(function(file,i){
 return '<button type="button" class="kinto-thumb'+(idx===i?' active':'')+'" data-gallery-index="'+i+'" aria-label="'+L("View image ","画像を表示 ")+(i+1)+'" aria-pressed="'+(idx===i)+'"><img src="'+img(file)+'" loading="lazy" alt=""></button>';
 }).join("")+'</div>'+
 '<div class="kinto-stage"><div class="kinto-main"><img src="'+img(shots[idx])+'" alt="'+pname(p,1)+'" loading="eager"></div>'+
 '<div class="kinto-nav"><button class="kinto-arrow prev" type="button" data-gallery-step="-1" aria-label="'+L("Previous image","前の画像")+'">'+arw()+'</button>'+
 '<div class="kinto-dots" role="group" aria-label="'+L("Photo slides","写真のスライド")+'">'+shots.map(function(file,i){
 return '<button type="button" class="'+(i===idx?'active':'')+'" data-gallery-index="'+i+'" aria-label="'+L("Image ","画像 ")+(i+1)+'" aria-pressed="'+(idx===i)+'"><span></span></button>';
 }).join("")+'</div>'+
 '<button class="kinto-arrow next" type="button" data-gallery-step="1" aria-label="'+L("Next image","次の画像")+'">'+arw()+'</button></div></div></div>';
}
/* Product page specs: cm and g from the AUX product data; inches and ounces added for the English view. */
function pdpLen(cm){return cm+"\u00a0cm"+(state.lang==="ja"?"":" ("+(cm/2.54).toFixed(1)+"\u00a0in)");}
/* Size check: every tool stands on one baseline at 10px per cm (the cutouts are 20px per cm for 2x screens),
   so heights compare across the whole carousel. Guide lines every 2 in (EN) / 5 cm (JA); the first card labels them. */
var SIZE_PX=10,SIZE_BASE=16;
function sizeStage(p,labels){
 var ja=state.lang==="ja",step=ja?5:5.08,lines="";
 for(var i=1;i*step<=26;i++){lines+='<span class="size-line" style="bottom:'+(SIZE_BASE+i*step*SIZE_PX).toFixed(1)+'px">'+(labels?'<em>'+(ja?(i*5)+"\u00a0cm":(i*2)+"\u00a0in")+'</em>':"")+'</span>';}
 return '<div class="size-stage">'+lines+'<img src="'+img(p.size)+'" style="height:'+(D.pdp[p.id].specs.length*SIZE_PX)+'px" loading="lazy" alt=""></div>';
}
function pdpSpecs(s){
 var rows=[[L("Length","全長"),pdpLen(s.length)]];
 if(s.width)rows.push([L("Width","幅"),pdpLen(s.width)]);
 if(s.diameter)rows.push([L("Max. diameter","最大径"),pdpLen(s.diameter)]);
 if(s.height)rows.push([L("Height","高さ"),pdpLen(s.height)]);
 if(s.weight)rows.push([L("Weight","重さ"),s.weight+"\u00a0g"+(state.lang==="ja"?"":" ("+(s.weight/28.35).toFixed(1)+"\u00a0oz)")]);
 rows.push([L("Material","材質"),L(s.material[0],s.material[1])],[L("Made in","原産国"),L("Japan","日本")]);
 return '<dl class="pdp-specs">'+rows.map(function(r){return '<dt>'+r[0]+'</dt><dd>'+r[1]+'</dd>';}).join("")+'</dl>'+
  (s.closed?'<p>'+L("Measured with the tongs closed.","寸法は閉じたときのものです。")+'</p>':'');
}
function pdp(){
 var p=productBy(state.product);
 var close=D.products.filter(function(x){return x.id!==p.id && x.uses.some(function(u){return p.uses.indexOf(u)!==-1;});});
 if(close.length<4)close=close.concat(D.products.filter(function(x){return x.id!==p.id && close.indexOf(x)===-1;}));
 close=close.slice(0,4);
 var P=D.pdp[p.id];
 return '<div class="pdp-layout">'+pdpGallery(p)+
 '<div class="pdp-buy">'+eyebrow('<span class="brand-word">Leye</span> / '+(p.family==="tongs"?L("TONGS","トング"):L("TOOLS","キッチンツール")))+
 '<h1>'+pname(p)+'</h1>'+
 '<p class="body-md">'+L(P.lead[0],P.lead[1])+'</p>'+(P.proof?'<p class="pdp-proof">'+L(P.proof[0],P.proof[1])+'</p>':'')+
  '<div class="pdp-price">$20.00</div>'+
 '<div class="qty-row"><span>'+L("QUANTITY","数量")+'</span><div class="qty-control"><button type="button" data-qty="-" aria-label="'+L("Decrease quantity","数量を減らす")+'">−</button><span id="qty-number">'+state.qty+'</span><button type="button" data-qty="+" aria-label="'+L("Increase quantity","数量を増やす")+'">+</button></div></div>'+
 '<button class="btn-fill" type="button" data-demo="cart">'+L("ADD TO CART","カートに入れる")+'</button>'+
 
 '<div class="purchase-assurance">'+
 '<button type="button" data-go="shipping"><b>'+L("SHIPPING","配送")+'</b>'+arw("arw-short")+'</button>'+
 '<button type="button" data-go="returns"><b>'+L("RETURNS","返品")+'</b>'+arw("arw-short")+'</button>'+
 '<button type="button" data-go="faq"><b>'+L("DUTIES & TAXES","関税・税金")+'</b>'+arw("arw-short")+'</button></div>'+
  '<div class="accordion"><details open><summary>'+L("Specifications","仕様")+'</summary>'+pdpSpecs(P.specs)+'</details>'+
 '<details open><summary>'+L("Care and use","お手入れ・使用上の注意")+'</summary><p>'+P.care.map(function(c){return L(c[0],c[1]);}).join(state.lang==="ja"?"":" ")+'</p></details></div>'+
 '<div class="btn-row">'+boutline(L("Buying for a business?","法人・業務用はこちら"),"business")+'</div></div></div>'+
 '<section class="site-section">'+sectionHead("",L("Made for the movement.","この商品の使い方"),
  L("AUX is shaped to suit the food, the hand and the movement.",p.family==="tools"?"食材や手の動きに合わせて考えた形状。":"食材や動作に合わせて、つかみやすさを考えた形状。"))+
 '<div class="pdp-primary-use"><div class="pdp-primary-photo">'+photo(P.primary[0],"")+'</div>'+
 '<div class="pdp-primary-copy"><h3 class="display-small">'+L(P.primary[1],phrase(P.primary[2]))+'</h3>'+
 '<p class="body-md">'+L(P.primary[3],P.primary[4])+'</p></div></div>'+
 '<div class="pdp-use-trio">'+P.uses.map(function(x){return '<article>'+photo(x[0],"")+'<h3>'+L(x[1],x[2])+'</h3><p>'+L(x[3],x[4])+'</p></article>';}).join("")+'</div></section>'+
 '<section class="site-section pdp-details-section"><div class="sub-head"><h3 class="display-small">'+L("A closer look at the details.","先端や持ち手の工夫")+'</h3>'+
  '<p class="body-md">'+L(P.detailsLead[0],P.detailsLead[1])+'</p></div>'+
 '<div class="feature-trio">'+P.details.map(function(x){return '<article>'+photo(x[0],"")+
 '<h3>'+L(x[1],x[2])+'</h3><p>'+L(x[3],x[4])+'</p></article>';}).join("")+'</div>'+
 note("V1 PDP structural restoration: primary-use image + 3 use-value cards → physical-feature detail cards → wide feature band. Photos are not a guarantee of the exact SKU.","V1 PDP構成を復元：使用価値の画像＋3項目→形状の詳細→横長Feature写真。商品写真の個別対応は未確定。")+'</section>'+
 '<section class="site-section" id="anchor-comparison"><div class="compare-head">'+sectionHead("",L("Which tool fits your task?","用途に合う道具を比較"),
 L("All thirteen AUX tools, drawn to the same scale. Compare them by size, purpose and moment.","13商品を同じ縮尺で並べました。長さや用途、使う場面を比較できます。"))+
 '<div class="compare-controls"><span class="compare-count" id="compare-count" aria-live="polite"></span>'+
 '<button type="button" class="compare-step prev" data-compare-step="-1" aria-label="'+L("Previous tools","前の道具")+'">'+arw()+'</button>'+
 '<button type="button" class="compare-step" data-compare-step="1" aria-label="'+L("Next tools","次の道具")+'">'+arw()+'</button></div></div>'+
 '<div class="pdp-comparison compare-track" id="compare-track" tabindex="0" aria-label="'+L("Compare all AUX tools","すべての道具を比較")+'">'+[p].concat(D.products.filter(function(x){return x.id!==p.id;})).map(function(x){
 var m=D.compare[x.id]||D.compare.fingertip;
 var here=x.id===p.id;
 return '<article class="'+(here?'current':'')+'" data-product="'+x.id+'" role="link" tabindex="0"'+(here?' aria-current="page"':'')+'>'+
 sizeStage(x,here)+
 '<div class="compare-copy"><div class="compare-name"><h3>'+pname(x)+'</h3>'+(here?'':arw())+'</div>'+
 '<dl class="compare-facts"><dt>'+L("Best for","適した用途")+'</dt><dd>'+L(m.best,m.jpBest)+'</dd>'+
 '<dt>'+L("Length","全長")+'</dt><dd>'+pdpLen(D.pdp[x.id].specs.length)+'</dd>'+
 '<dt>'+L("Moment","食事のシーン")+'</dt><dd>'+L(m.moment,m.jpMoment)+'</dd></dl>'+
 '</div></article>';
 }).join("")+'</div></section>'+
 /* Customer reviews — V1 composition (rating overview left, review list right). */
 '<section class="site-section" id="anchor-reviews">'+sectionHead("",L("Customer reviews","お客様のレビュー"))+
 '<div class="review-shell"><div class="review-overview"><div class="review-score">'+REVIEWS.score+' <span>/ 5</span></div>'+
 stars(REVIEWS.stars)+'<p class="review-count">'+L(REVIEWS.count[0],REVIEWS.count[1])+'</p>'+
 '<div class="btn-row"><button type="button" class="btn-outline" data-demo="review">'+L("Write a review","レビューを書く")+'</button></div></div>'+
 '<div class="review-list">'+REVIEWS.items.map(function(r){return '<article class="review-item"><div class="review-meta">'+stars(r.rating)+
  '<span>'+r.name+'</span><span>'+L(r.place[0],r.place[1])+'</span><span>'+L(r.date[0],r.date[1])+'</span></div>'+
  '<div><h3>'+L(r.title[0],r.title[1])+'</h3><p>'+L(r.body[0],r.body[1])+'</p></div></article>';}).join("")+
 '</div></div></section>'+
 whyBand(L("Precision behind every movement.",phrase("使い心地を|支える精度。")),L("Explore the design and metalworking behind the tool.","AUXの商品づくりをご紹介します。"))+'</section>'+
 '<section class="site-section compact"><h2 class="utility-heading">'+L("Related tools","関連する商品")+'</h2>'+
 productStrip(close.map(function(x){return x.id;}))+
 '<div class="btn-row is-centred">'+boutline(L("Shop all products","商品一覧を見る"),"shop")+'</div>'+
 note("PDP is a shared 13-product template. Price, review, specifications, country-of-origin claims and product photography remain working placeholders.","PDPは13商品で共通テンプレート。価格・レビュー・仕様・製造地・物撮りは確認後に置換。")+'</section>';
}
function why(){
 var factors=[
 ["shinjo-serving-2.webp","The point of contact","食材に触れる先端","Different tips for different foods and movements.","食材の大きさや形に合わせて先端を設計しています。"],
 ["katou-fry-use1.webp","One form, one job","1つの形に1つの役割","Openings that drain oil. Tips shaped for the food they hold.","揚げ物の油を切る穴など、使い方に合わせた工夫があります。"],
 ["shinjo-mini-1.webp","The right scale","食材や器に合うサイズ","A size and reach suited to the hand, the food and the dish.","手や器の大きさ、取り分ける距離に合わせてサイズを選べます。"]
 ];
 var uses=[
 ["katou-finetip-contact.webp","Contact & precision","先端の精度","Tip shapes designed to grip delicate foods with control.","食材を扱いやすいよう先端の形を調整しています。"],
 ["katou-fingertip-contact.webp","Grip and response","握り心地と操作性","A light spring and comfortable grip for controlled handling.","手になじむ形状と、軽い力で開閉できるバネを採用しています。"],
 ["shinjo-garnish-1.webp","Scale & proportion","サイズとバランス","Sized for the food and the hand that holds it.","手に持ちやすく、食材を扱いやすいサイズやバランスを考えています。"]
 ];
 return '<div class="brand-page">'+
 editorialOpening("shinjo-basting-2.webp",L("The right tool makes<br>each movement feel natural.","使いやすさを<br>細部まで考える"),
  L("You shouldn't have to think about the tongs. A closely considered tool keeps the focus on the food and the people at the table.","Leyeのトングは、道具の扱いに気を取られず料理や会話を楽しめることを大切にしています。食材のつかみやすさや手に持ったときの感覚まで考えて設計しています。"))+
 '<section class="site-section">'+sectionHead("",L("Different forms for different tasks.","食材に合わせた先端とサイズ"),
  L("Each shape answers a different task. See how the details work in use.","食材の大きさや形、使い方に合わせて先端や長さを工夫しています。"))+
 '<div class="form-collage">'+factors.map(function(f){return '<figure>'+photo(f[0],"")+
 '<figcaption><h3>'+L(f[1],f[2])+'</h3><p>'+L(f[3],f[4])+'</p></figcaption></figure>';}).join("")+'</div></section>'+
 '<section class="site-section" id="anchor-engineering"><div class="spec-layout">'+photo("shinjo-finetip-2.webp","")+
 '<div class="spec-copy">'+eyebrow(L("DESIGN & ENGINEERING","設計と技術"))+'<h2 class="display-medium">'+L("Shape, feel and proportion.","先端、角度、握り心地。")+'</h2>'+
 '<p class="body-md">'+L("The tip, the angle, the length and the grip. Each shape has a reason you can feel in use.","先端の形や角度、長さ、握り心地まで、使いやすさを考えて設計しています。")+'</p>'+
 '<ul class="spec-list">'+uses.map(function(u){return '<li>'+photo(u[0],"")+'<div><h3>'+L(u[1],u[2])+'</h3><p>'+L(u[3],u[4])+'</p></div></li>';}).join("")+'</ul></div></div></section>'+
 chapter({id:"third",layout:"wide",photo:"shinjo-fingertip-2.webp",label:L("THE THIRD UTENSIL","第3の食卓道具"),title:L("Knife. Fork. Tongs.",phrase("ナイフ。|フォーク。|トング。")),
  body:L("Fingertip Tongs belong at the table, alongside the knife and fork—not only in the kitchen. Pick a small bite, share a dish, and let the tool rest quietly on the table.","ゆびさきトングは調理中だけでなく、ナイフやフォークと一緒に食卓でも使えます。小さな食材をつまんだり、料理を取り分けたり。使わないときもテーブルに置いておけます。"),
  cta:'<button type="button" class="btn-fill has-arrow" data-go="pdp" data-set-product="fingertip">'+L("Discover Fingertip Tongs","ゆびさきトングを見る")+'</button>'})+
 chapter({id:"tsubame",layout:"offset",reverse:true,photo:"katou-craft-lineup.webp",label:L("TSUBAME-SANJO","燕三条"),title:L("The expertise behind the form.",phrase("使いやすい形をつくる|金属加工")),
  body:L("Each shape reflects careful cutting, forming and finishing.","金属を切る、曲げる、仕上げる。それぞれの工程を丁寧に重ねて商品をつくっています。")})+
 '<section class="site-section compact">'+sectionHead("",L("Find the right tool.","用途から商品を選ぶ"),
 L("Explore the tools behind the story.","調理・取り分け・食卓の用途から商品をご覧いただけます。"))+
 categoryCards()+
 '<div class="btn-row is-centred">'+boutline(L("Shop all products","すべての商品を見る"),"shop")+'</div></section></div>';
}
function faq(){
 var rows=[
  ["Where does AUX ship?","配送できる地域は？","Shipping options and costs depend on your destination. You can review available services during checkout.","配送方法や送料はお届け先によって異なります。ご注文時に配送先を指定してご確認ください。"],
  ["How are import duties and taxes handled?","輸入関税や税金はどうなりますか？","Import duties and taxes depend on your delivery destination and applicable terms. Please check the delivery details for your order.","関税・税金はお届け先や配送条件によって異なります。ご注文に適用される配送条件をご確認ください。"],
  ["How should I care for AUX tools?","お手入れ方法を教えてください。","Wash after use with a soft sponge and dry thoroughly. Please refer to the care information for each product.","使用後は柔らかいスポンジなどで洗浄し、十分に乾かしてください。商品ごとのお手入れ情報もご確認ください。"],
  ["Can I order for a restaurant or retail business?","レストランや小売店向けの注文はできますか？","For professional orders, retail and distribution inquiries, please get in touch with our team.","業務用のご注文や小売・卸取引については、お問い合わせフォームよりご相談ください。"],
  ["How can I contact AUX?","AUXへの問い合わせ方法は？","Send us a message through the contact form. For order inquiries, please include your order number.","お問い合わせフォームからご連絡ください。ご注文については注文番号をお知らせください。"]
 ];
 return '<section class="site-section"><div class="support-wrap">'+eyebrow(L("SUPPORT","サポート"))+
 '<h1 class="page-display">'+L("FAQ","よくある質問")+'</h1><p class="body-lg">'+L("Answers to questions about AUX products, orders and care.","商品や配送、お手入れに関するよくあるご質問をまとめています。")+'</p>'+
 '<div class="faq-list">'+rows.map(function(x){return '<details><summary>'+L(x[0],x[1])+'</summary><p>'+L(x[2],x[3])+'</p></details>';}).join("")+'</div>'+
 '<div class="btn-row">'+boutline(L("Contact us","お問い合わせ"),"contact")+'</div></div></section>';
}
function policy(kind){
 var ship=kind==="shipping",priv=kind==="privacy",title=ship?L("Shipping & Delivery",phrase("配送|について")):priv?L("Privacy Policy",phrase("プライバシー|ポリシー")):L("Returns & Refunds",phrase("返品・|返金|について"));
 var rows=priv?[
  ["Information we collect","取得する情報","Details you provide when you place an order, create an account or contact us, such as your name, email address, shipping address and order history.","ご注文、アカウント作成、お問い合わせの際にご提供いただくお名前、メールアドレス、お届け先、注文履歴などの情報。"],
  ["How we use it","利用目的","To process and deliver orders, respond to inquiries and, with your consent, send news about AUX.","ご注文の処理・配送、お問い合わせへの対応、同意いただいた場合のAUXからのお知らせのため。"],
  ["Cookies","Cookieについて","Cookies keep the store working, remember your cart and help us understand how the site is used.","ストアの動作、カート内容の保持、サイトの利用状況の把握のためにCookieを使用します。"],
  ["Sharing","第三者への提供","We share information only with service providers that help us run the store, such as payment and delivery partners.","決済・配送など、ストアの運営に必要な委託先にのみ情報を提供します。"],
  ["Your choices","お客様の権利","You can ask us to access, correct or delete your personal information at any time.","個人情報の開示・訂正・削除はいつでもご依頼いただけます。"]
 ]:ship?[
  ["Shipping destinations","お届け先","Shipping availability depends on the delivery address selected at checkout.","配送対象地域はお届け先住所により異なります。"],
  ["Shipping costs","送料","Shipping costs vary by destination and order. Review the available options before payment.","送料は配送地域・ご注文内容によって異なります。お支払い前にご確認ください。"],
  ["Delivery times","お届けまでの日数","Delivery time depends on the destination and shipping service selected.","お届けまでの日数は配送地域や選択した配送方法によって異なります。"],
  ["Duties & taxes","関税・税金","Applicable duties and taxes depend on the destination and shipping terms.","関税・税金は配送先と配送条件によって異なります。"]
 ]:[
  ["Need a return?","返品のご相談","Please contact our team with your order number and the reason for your return request.","注文番号と返品理由を添えて、お問い合わせください。"],
  ["Damaged or incorrect item","商品違い・破損","If your item arrives damaged or incorrect, contact us with your order details and photos of the item.","破損や商品違いがあった場合は、注文情報と商品の写真を添えてご連絡ください。"],
  ["Returning a product","商品の返送","Our support team will explain the next steps after reviewing your request.","お問い合わせ内容を確認のうえ、返送の手順をご案内します。"],
  ["Refund inquiries","返金について","For questions about a refund, please contact customer support with your order number.","返金についてのご質問は、注文番号を添えてお問い合わせください。"]
 ];
 return '<section class="site-section"><div class="support-wrap">'+eyebrow(L("SUPPORT","サポート"))+
 '<h1 class="page-display">'+title+'</h1>'+
 '<p class="body-lg">'+(ship?L("Everything you need to know about receiving your AUX order.","AUXの商品をお届けするための配送について。"):priv?L("How AUX collects, uses and protects your information.","AUXにおける個人情報の取り扱いについて。"):L("We are here to help with returns and order concerns.","返品・注文内容についてのご相談はこちら。"))+'</p>'+
 '<dl class="policy-table">'+rows.map(function(r){return '<div class="policy-row"><dt>'+L(r[0],r[1])+'</dt><dd>'+L(r[2],r[3])+'</dd></div>';}).join("")+'</dl>'+
 '<div class="btn-row">'+boutline(L("Contact us","お問い合わせ"),"contact")+'</div></div></section>';
}
function contact(){
 return '<section class="site-section"><div class="support-wrap">'+eyebrow("CONTACT")+'<h1 class="page-display">'+L("How can we help?","お問い合わせ")+'</h1><p class="body-lg">'+L("Get in touch about products, orders or business purchasing using the form below.","商品やご注文、法人取引については以下のフォームからお問い合わせください。")+'</p>'+
 '<form class="contact-fields" id="demo-contact"><div class="field"><label>'+L("Name","お名前")+'</label><input type="text" required placeholder=""></div>'+
 '<div class="field"><label>'+L("Email address","メールアドレス")+'</label><input type="email" required></div>'+
 '<div class="field wide"><label>'+L("Inquiry type","お問い合わせ種別")+'</label><span class="select-wrap"><select><option>'+L("Product / order","商品・注文")+'</option><option>'+L("Business / wholesale","法人・卸取引")+'</option><option>'+L("Other","その他")+'</option></select></span></div>'+
 '<div class="field wide"><label>'+L("Message","お問い合わせ内容")+'</label><textarea required></textarea></div>'+
 '<div class="field wide consent"><label><input type="checkbox" required><span>'+L('I agree to the <button type="button" class="consent-link" data-go="privacy">Privacy Policy</button>.','<button type="button" class="consent-link" data-go="privacy">プライバシーポリシー</button>に同意します。')+'</span></label></div>'+
 '<div class="field wide submit"><button class="btn-fill" type="submit">'+L("SEND MESSAGE","送信")+'</button></div></form>'+
 note("This is a nonfunctional wireframe form. Do not use for real inquiries.","これは説明用のフォームで、送信処理は実装していません。")+'</div></section>';
}
function content(){
 switch(state.page){
  case "home":return home();
  case "shop":return shop();
  case "cook":case "serve":case "table":return collection(state.page);
  case "tongs":case "tools":return family(state.page);
  case "moments":return moments();
  case "business":return business();
  case "pdp":return pdp();
  case "why":return why();
  case "brand":return brandPage();
  case "faq":return faq();
  case "shipping":case "returns":case "privacy":return policy(state.page);
  case "contact":return contact();
  default:state.page="home";return home();
 }
}
function renderRail(){
 var html=PAGES.map(function(group){return '<div class="rail-group"><div class="rail-label">'+group.group+'</div>'+
 group.pages.map(function(x){return '<button type="button" class="rail-button'+(state.page===x[0]?' active':'')+'" data-go="'+x[0]+'"><span>'+x[1]+'</span><small>→</small></button>';}).join("")+'</div>';}).join("");
 document.getElementById("page-index").innerHTML=html;
 document.getElementById("page-count").textContent=Object.keys(ROUTES).length+" PAGES";
}
function updateURL(){
 var u=new URL(location.href);u.searchParams.set("page",state.page);u.searchParams.set("lang",state.lang);
 if(state.page==="pdp")u.searchParams.set("product",state.product);else u.searchParams.delete("product");
 if(state.page==="why"&&state.whyAnchor)u.searchParams.set("section",state.whyAnchor);else u.searchParams.delete("section");
 history.replaceState(null,"",u);
}
function updateCompare(){
 var t=document.getElementById("compare-track");if(!t||!t.firstElementChild)return;
 var w=t.firstElementChild.getBoundingClientRect().width||1,n=t.children.length;
 var first=Math.round(t.scrollLeft/w)+1,visible=Math.max(1,Math.floor(t.clientWidth/w+.01)),last=Math.min(n,first+visible-1);
 t.classList.toggle("at-end",t.scrollLeft+t.clientWidth>=t.scrollWidth-1);
 var c=document.getElementById("compare-count");if(c)c.textContent=first+"–"+last+" / "+n;
 var prev=document.querySelector('[data-compare-step="-1"]'),next=document.querySelector('[data-compare-step="1"]');
 if(prev)prev.disabled=t.scrollLeft<=1;
 if(next)next.disabled=t.scrollLeft+t.clientWidth>=t.scrollWidth-1;
}
/* Soft reveal for every part of the page, on page load and on scroll: each part fades in (1.2s) and
   rises 24px (1.6s, eased out) the first time it enters the viewport; parts entering together follow
   one another 80ms apart. Parts are found automatically: photos, clickable cards, buttons and form
   fields move as one; otherwise the smallest blocks of text (heading, paragraph, list item, ...).
   Full-width photos only fade. Played with the Web Animations API on opacity and `translate`, held at
   the start until the part is in view and removed when done, so the parts' own opacity, transforms and
   hover transitions are untouched. Off for reduced motion; the header stays still. */
var REVEAL_UNIT=".photo,figure,img,picture,video,svg,canvas,table,details,input,select,textarea,button,a,[data-product],[data-go],[role=link],.hero-slide";
var REVEAL_SKIP=".scatter-photo,.why-float,.why-band-bg,script,style,template";
var REVEAL_GAP=80,REVEAL_MAX_DELAY=640,revealObserver=null,revealClock=0,revealAnims=[];
/* An element that draws its own frame (border on all four sides) is revealed whole; otherwise the frame would show before its contents. */
function boxed(el){var cs=getComputedStyle(el);return ["Top","Right","Bottom","Left"].every(function(k){return parseFloat(cs["border"+k+"Width"])>0&&cs["border"+k+"Style"]!=="none";})&&el.getBoundingClientRect().width<window.innerWidth*.9;}
function revealUnits(root,out){
 [].forEach.call(root.children,function(el){
  if(el.matches(REVEAL_SKIP))return;
  if(!el.getClientRects().length){if(getComputedStyle(el).display==="contents")revealUnits(el,out);return;}
  if(el.matches(REVEAL_UNIT)||boxed(el)){out.push(el);return;}
  var block=[].some.call(el.children,function(c){return c.tagName!=="BR"&&!/^inline/.test(getComputedStyle(c).display);});
  if(block)revealUnits(el,out);else if(el.textContent.trim()||el.children.length)out.push(el);
 });
 return out;
}
function revealHold(el){
 var cs=getComputedStyle(el),op=cs.opacity,tr=cs.translate,wide=el.getBoundingClientRect().width>=window.innerWidth*.9;
 var fade=el.animate([{opacity:0},{opacity:op}],{duration:960,easing:"cubic-bezier(.37,0,.63,1)",fill:"both"});
 var rise=wide||(tr&&tr!=="none")?null:el.animate([{translate:"0 24px"},{translate:"0 0"}],{duration:1280,easing:"cubic-bezier(.22,.61,.36,1)",fill:"both"});
 el._reveal=[fade,rise].filter(Boolean);revealAnims=revealAnims.concat(el._reveal);
 el._reveal.forEach(function(a){a.pause();a.onfinish=function(){a.cancel();};});
}
function revealPlay(el,delay){
 (el._reveal||[]).forEach(function(a){a.effect.updateTiming({delay:delay});a.play();});
 el._reveal=null;
}
function bindReveal(){
 if(revealObserver)revealObserver.disconnect();
 revealAnims.forEach(function(a){a.cancel();});revealAnims=[];  /* parts show their final state */
 var reduce=window.matchMedia&&window.matchMedia("(prefers-reduced-motion: reduce)").matches;
 if(reduce||!scrollFx||!("IntersectionObserver" in window)||!Element.prototype.animate)return;
 var units=[];
 document.querySelectorAll("#site-app .site-content,#site-app .site-footer").forEach(function(r){revealUnits(r,units);});
 revealObserver=new IntersectionObserver(function(entries){
  var now=performance.now();revealClock=Math.min(Math.max(revealClock,now),now+REVEAL_MAX_DELAY);
  entries.filter(function(e){return e.isIntersecting;}).sort(function(a,b){return a.target.compareDocumentPosition(b.target)&4?-1:1;}).forEach(function(e){
   revealObserver.unobserve(e.target);revealPlay(e.target,revealClock-now);revealClock=Math.min(revealClock+REVEAL_GAP,now+REVEAL_MAX_DELAY);
  });
 });  /* starts as soon as a part enters (the last lines of the page must be reachable too) */
 units.forEach(function(el){
  if(el.getBoundingClientRect().bottom<0)return;  /* already scrolled past (re-render after a filter change) */
  revealHold(el);revealObserver.observe(el);
 });
}
/* PDP thumbnails: when the column overflows the photo height, fade its lower edge (until scrolled to the end). */
function bindGallery(){
 var t=document.querySelector(".kinto-thumbs");if(!t)return;
 var f=function(){t.classList.toggle("is-overflowing",t.scrollHeight>t.clientHeight+1);t.classList.toggle("at-end",t.scrollTop+t.clientHeight>=t.scrollHeight-1);};
 t.addEventListener("scroll",f,{passive:true});f();
}
function bindCompare(){
 var t=document.getElementById("compare-track");if(!t)return;
 t.addEventListener("scroll",updateCompare,{passive:true});updateCompare();
 /* Mouse: press and drag sideways to scroll (touch and trackpads scroll natively). A drag does not open the card under the pointer. */
 var drag=null,moved=false;
 t.addEventListener("pointerdown",function(ev){if(ev.pointerType!=="mouse"||ev.button!==0)return;drag={x:ev.clientX,left:t.scrollLeft,id:ev.pointerId};moved=false;});
 t.addEventListener("pointermove",function(ev){
  if(!drag||ev.pointerId!==drag.id)return;
  var dx=ev.clientX-drag.x;if(!moved&&Math.abs(dx)<6)return;
  if(!moved){moved=true;t.setPointerCapture(drag.id);t.classList.add("is-dragging");var sel=window.getSelection&&window.getSelection();if(sel)sel.removeAllRanges();}
  t.scrollLeft=drag.left-dx;
 });
 function end(ev){
  if(!drag||ev.pointerId!==drag.id)return;drag=null;if(!moved)return;
  t.classList.remove("is-dragging");
  var w=t.firstElementChild.getBoundingClientRect().width||1;
  t.scrollTo({left:Math.round(t.scrollLeft/w)*w,behavior:"smooth"});  /* settle on the nearest card */
 }
 t.addEventListener("pointerup",end);t.addEventListener("pointercancel",end);
 t.addEventListener("click",function(ev){if(moved){ev.preventDefault();ev.stopPropagation();moved=false;}},true);
 t.addEventListener("dragstart",function(ev){ev.preventDefault();});
}
var scatterQueued=false;
/* Scroll effects (soft reveal, floating photos, close-up) need a page that scrolls in its own window.
   When the window is as tall as the page (an XProof artboard stretches to the content height) they
   show their final state; when the page scrolls again (XProof full-screen preview, a browser) they
   come back. Checked on every render and on resize. */
var scrollFx=null;
function pageScrolls(){return document.documentElement.scrollHeight>window.innerHeight+2;}
function syncScrollFx(){var on=pageScrolls();if(on===scrollFx)return;scrollFx=on;bindFloat();bindReveal();scrollZoom();}
/* Full-width photos and the Knife. Fork. Tongs. photo: parallax close-up while scrolling.
   Progress runs from when the frame enters the viewport (or page top) until it has passed.
   Scale 100% → 150%; the image also lags downwards, never further than the scaled overflow. */
var ZOOM_SELECTOR=".scroll-zoom,.chapter-bleed .photo,.editorial-hero .photo";
function scrollZoom(){
 var reduce=window.matchMedia&&window.matchMedia("(prefers-reduced-motion: reduce)").matches;
 var vh=window.innerHeight||1,y=window.scrollY||window.pageYOffset||0;
 document.querySelectorAll(ZOOM_SELECTOR).forEach(function(frame){
  var im=frame.querySelector("img");if(!im)return;
  if(reduce||!scrollFx){im.style.transform="";return;}
  var r=frame.getBoundingClientRect(),top=r.top+y,h=r.height||1;
  var start=Math.max(0,top-vh),end=top+h;
  var p=Math.max(0,Math.min(1,(y-start)/Math.max(1,end-start)));
  var sc=1+.5*p,ty=(sc-1)*h/2*.6;
  im.style.transform="translate3d(0,"+ty.toFixed(1)+"px,0) scale("+sc.toFixed(4)+")";
 });
}
function scatterParallax(){
 scatterQueued=false;
 scrollZoom();
 floatKick();
}
/* Floating photos (HOME Different forms, WHY AUX band), after bird-and-insect: each photo fades in
   just after entering the viewport and out near the top, and on desktop drifts at its own speed
   (parallax). Both are read from the photo's own position (getBoundingClientRect) on each frame and
   eased for a soft lag; the loop stops once everything has settled. Nothing is added to the page,
   and a photo that is not handled shows normally. */
var FLOAT_SEL=[[".scatter-photo","speed"],[".why-float","drift"]];
var floatItems=[],floatRunning=false;
function bindFloat(){
 floatItems.forEach(function(el){el.style.opacity="";el.style.translate="";});
 floatItems=[];
 var reduce=window.matchMedia&&window.matchMedia("(prefers-reduced-motion: reduce)").matches;
 if(reduce||!scrollFx)return;
 FLOAT_SEL.forEach(function(g){[].forEach.call(document.querySelectorAll(g[0]),function(el){
  el._speed=Number(el.dataset[g[1]]||0);el._py=0;el._op=null;floatItems.push(el);
 });});
 floatKick();
}
function floatKick(){if(floatItems.length&&!floatRunning){floatRunning=true;requestAnimationFrame(floatStep);}}
function floatStep(){
 floatRunning=false;
 var vh=window.innerHeight||1,drift=window.innerWidth>880,moving=false;
 floatItems.forEach(function(el){
  var r=el.getBoundingClientRect();if(!r.height)return;  /* hidden at this width */
  var t=(r.top-el._py+r.height/2)/vh;  /* 0 = viewport top, 1 = viewport bottom */
  var op=Math.max(0,Math.min(1,t>.85?(1-t)/.15:(t<.15?t/.15:1)));
  var py=drift?Math.max(-40,Math.min(40,(t-.5)*vh*el._speed)):0;
  if(el._op===null){el._op=op;el._py=py;}  /* first frame: no easing from zero */
  el._op+=(op-el._op)*.12;el._py+=(py-el._py)*.1;
  if(Math.abs(op-el._op)>.003||Math.abs(py-el._py)>.05)moving=true;
  el.style.opacity=el._op>.997?"":el._op.toFixed(3);
  el.style.translate=Math.abs(el._py)<.05?"":"0 "+el._py.toFixed(2)+"px";
 });
 if(moving)floatKick();
}
/* Layout can still move after render (web fonts, images): settle the photos again. */
if("ResizeObserver" in window)new ResizeObserver(function(){floatKick();}).observe(document.getElementById("site-app"));
window.addEventListener("load",function(){floatKick();});
window.addEventListener("scroll",function(){if(!scatterQueued){scatterQueued=true;requestAnimationFrame(scatterParallax);}},{passive:true});
window.addEventListener("resize",function(){syncScrollFx();scatterParallax();updateCompare();bindGallery();});
function render(){
 document.documentElement.lang=state.lang;
 document.getElementById("site-app").innerHTML=appHeader()+'<div class="site-content">'+content()+'</div>'+footer();
 if(menuOpen())setMenu(true);  /* a language change re-renders the header while the menu is open */
 renderRail();
 document.querySelectorAll("[data-lang]").forEach(function(x){x.classList.toggle("active",x.dataset.lang===state.lang);});
  document.getElementById("rail-toggle").textContent=document.getElementById("app").classList.contains("no-rail")?L("SHOW PAGES","ページ一覧を表示"):L("HIDE PAGES","ページ一覧を隠す");
 var route=state.page==="pdp"?"/products/aux-"+state.product:ROUTES[state.page];
 document.getElementById("stage-breadcrumb").textContent="aux-global.com"+route+" / "+state.lang.toUpperCase();
  updateURL();
 scrollFx=pageScrolls();
 scatterParallax();
 bindFloat();
 bindCompare();
 bindHero();
 bindReveal();
 bindGallery();
}
function navigate(page,product,anchor){
 if(ABOUT_SECTIONS[page]){anchor=ABOUT_SECTIONS[page];page="why";}
 if(!ROUTES[page])return;
 state.page=page;state.whyAnchor=page==="why"&&ABOUT_SECTIONS[anchor]?anchor:null;if(product)state.product=product;
 state.qty=1;state.galleryIndex=0;state.filter="all";state.sort="featured";render();
 window.scrollTo(0,0);
 if(anchor)requestAnimationFrame(function(){var node=document.getElementById("anchor-"+anchor);if(node)node.scrollIntoView({behavior:"smooth",block:"start"});});
}
var timeout;
function toast(message){var node=document.getElementById("demo-toast");node.textContent=message;node.classList.add("show");clearTimeout(timeout);timeout=setTimeout(function(){node.classList.remove("show");},3500);}
/* Phone / tablet menu (≤880px): a drawer from the left. The dimmed strip on its right closes it; parents open as accordions. */
function menuOpen(){var a=document.getElementById("site-app");return !!a&&a.classList.contains("mobile-open");}
function setMenu(on){var a=document.getElementById("site-app");if(!a)return;a.classList.toggle("mobile-open",on);document.documentElement.classList.toggle("menu-lock",on);
 var b=document.querySelector(".site-menu-mobile");if(b){b.setAttribute("aria-expanded",String(on));b.setAttribute("aria-label",on?L("Close menu","メニューを閉じる"):L("Menu","メニュー"));}}
window.addEventListener("resize",function(){if(window.innerWidth>880&&menuOpen())setMenu(false);});
document.addEventListener("click",function(ev){
 if(menuOpen()){
  if(ev.target===document.getElementById("site-app")){setMenu(false);return;}  /* the dimmed strip (#site-app::before) */
  var parent=ev.target.closest(".site-menu .nav-parent");
  if(parent&&window.innerWidth<=880){var it=parent.closest(".nav-item"),open=it.classList.toggle("is-open");parent.setAttribute("aria-expanded",String(open));return;}
  if(ev.target.closest(".site-menu [data-go],.site-menu [data-anchor],.site-menu [data-product]"))setMenu(false);
 }
 var l=ev.target.closest("[data-lang]");
 if(l){state.lang=l.dataset.lang;render();return;}
 if(ev.target.closest("#rail-toggle")){document.getElementById("app").classList.toggle("no-rail");render();return;}
 var bz=ev.target.closest("[data-biz-step],[data-biz-index]");
 if(bz){var g=bz.closest(".biz-gallery");if(g){var cur=Number(g.dataset.index||0);bizShow(g,bz.dataset.bizIndex!==undefined?Number(bz.dataset.bizIndex):cur+Number(bz.dataset.bizStep));holdGallery(bz);}return;}
 var step=ev.target.closest("[data-compare-step]");
 if(step){var t=document.getElementById("compare-track");if(t&&t.firstElementChild){var cw=t.firstElementChild.getBoundingClientRect().width;t.scrollBy({left:Number(step.dataset.compareStep)*cw*Math.max(1,Math.floor(t.clientWidth/cw+.01)),behavior:"smooth"});}return;}
 var chip=ev.target.closest("[data-list-filter]");
 if(chip){state.filter=chip.dataset.listFilter;render();return;}
 var chosenHero=ev.target.closest("[data-hero-index]");
 if(chosenHero){showHero(Number(chosenHero.dataset.heroIndex)||0);return;}
 var galleryIndex=ev.target.closest("[data-gallery-index]");
 if(galleryIndex){pdpShow(parseInt(galleryIndex.dataset.galleryIndex,10)||0);holdGallery(galleryIndex);return;}
 var galleryStep=ev.target.closest("[data-gallery-step]");
 if(galleryStep){pdpShow((state.galleryIndex||0)+(galleryStep.dataset.galleryStep==="1"?1:-1));holdGallery(galleryStep);return;}
 var qp=ev.target.closest("[data-qty]");
 if(qp){state.qty=Math.max(1,state.qty+(qp.dataset.qty==="+"?1:-1));var n=document.getElementById("qty-number");if(n)n.textContent=state.qty;return;}
 var prod=ev.target.closest("[data-product]");
 if(prod){navigate("pdp",prod.dataset.product);return;}
 var go=ev.target.closest("[data-go]");
 if(go){navigate(go.dataset.go,go.dataset.setProduct||null,go.dataset.anchor||null);return;}
 var anchor=ev.target.closest("[data-anchor]");
 if(anchor){var el=document.getElementById("anchor-"+anchor.dataset.anchor);if(el)el.scrollIntoView({behavior:"smooth",block:"start"});return;}
 var demo=ev.target.closest("[data-demo]");
 if(demo){if(demo.dataset.demo==="nav"){setMenu(!menuOpen());return;}toast(L("Layout preview only. This interaction is not connected to a live store.","レイアウト確認用です。実際のEC機能には接続していません。"));}
});
document.addEventListener("change",function(ev){if(ev.target.matches("[data-list-sort]")){state.sort=ev.target.value;render();var el=document.getElementById("list-sort");if(el)el.focus();}});
document.addEventListener("submit",function(ev){if(ev.target.id==="demo-contact"){ev.preventDefault();toast(L("Preview only. No message has been sent.","説明用フォームです。送信されていません。"));}});
document.addEventListener("keydown",function(ev){if((ev.key==="Enter"||ev.key===" ")&&ev.target.matches("[role=link][data-product],article[data-go]")){ev.preventDefault();ev.target.click();}});
window.addEventListener("popstate",function(){var qp=new URLSearchParams(location.search);state.page=ABOUT_SECTIONS[qp.get("page")]?"why":(qp.get("page")||"home");state.whyAnchor=ABOUT_SECTIONS[qp.get("page")]||(state.page==="why"&&ABOUT_SECTIONS[qp.get("section")]?qp.get("section"):null);state.lang=qp.get("lang")==="ja"?"ja":"en";state.product=qp.get("product")||"fingertip";render();});
render();
if(state.whyAnchor)requestAnimationFrame(function(){var el=document.getElementById("anchor-"+state.whyAnchor);if(el)el.scrollIntoView({block:"start"});});
})();