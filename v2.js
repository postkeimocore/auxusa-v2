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
  {group:"PRODUCT DISCOVERY",pages:[["shop","SHOP ALL"],["cook","COOK"],["serve","SERVE"],["table","TABLE"],["tongs","AUX TONGS"],["tools","AUX TOOLS"],["pdp","PRODUCT DETAIL"]]},
  {group:"MOMENTS",pages:[["moments","MOMENTS"]]},
  {group:"FOR BUSINESS",pages:[["business","FOR BUSINESS"]]},
  {group:"BRAND",pages:[["why","WHY AUX"]]},
  {group:"SUPPORT",pages:[["faq","FAQ"],["shipping","SHIPPING"],["returns","RETURNS"],["privacy","PRIVACY POLICY"],["contact","CONTACT"]]}
];
var ROUTES={home:"/",shop:"/collections/all",tongs:"/collections/aux-tongs",tools:"/collections/aux-tools",cook:"/collections/cook",serve:"/collections/serve",table:"/collections/table",pdp:"/products/{handle}",moments:"/pages/moments",business:"/pages/for-business",why:"/pages/why-aux",faq:"/pages/faq",shipping:"/pages/shipping",returns:"/pages/returns",privacy:"/pages/privacy-policy",contact:"/pages/contact"};
function L(en,ja){return state.lang==="ja"?ja:en;}
function img(file){return D.assetBase+file;}
function photo(file,label,cls){return '<div class="photo '+(cls||"")+'"><img src="'+img(file)+'" loading="lazy" alt=""></div>';}
function note(){return '';}
function bline(text,page,attrs){return '<button type="button" class="btn-line" data-go="'+page+'" '+(attrs||"")+'>'+text+'</button>';}
/* Harpoon arrow (line + upper barb). Long variant for category doorways. */
function arw(cls){return '<span class="arw'+(cls?' '+cls:'')+'" aria-hidden="true"></span>';}
var CATEGORIES=[
 ["cook","cook-greens-pan.webp","Made for cooking movements.","調理の動作に合わせた道具。"],
 ["serve","serve-salad.webp","Made for plating and sharing.","盛り付け・取り分けに。"],
 ["table","small-food-transfer.webp","Made for the table.","食卓の細かな動きに。"]
];
/* One category-doorway component for HOME, SHOP ALL and WHY AUX. */
function categoryCards(){
 return '<div class="product-collections">'+CATEGORIES.map(function(c){return '<article class="category-card" tabindex="0" data-go="'+c[0]+'">'+photo(c[1],"")+
  '<div class="card-meta"><h3>'+c[0].toUpperCase()+'</h3><span class="arrow">'+arw("arw-long")+'</span></div><p>'+L(c[2],c[3])+'</p></article>';}).join("")+'</div>';
}
/* Product listing toolbar — V1 composition (FILTER chips left, SORT right) in the V2 system.
   kind: "use" filters by COOK/SERVE/TABLE, "family" by AUX TONGS / AUX TOOLS. */
function filterList(list,kind){
 var f=state.filter||"all";
 var out=f==="all"?list.slice():list.filter(function(p){return kind==="use"?p.uses.indexOf(f)>-1:p.family===f;});
 if(state.sort==="az")out.sort(function(a,b){return a.name.localeCompare(b.name);});
 if(state.sort==="za")out.sort(function(a,b){return b.name.localeCompare(a.name);});
 return out;
}
function listingToolbar(list,kind){
 var f=state.filter||"all";
 var opts=kind==="use"?[["cook","COOK"],["serve","SERVE"],["table","TABLE"]]:[["tongs","AUX TONGS"],["tools","AUX TOOLS"]];
 opts=opts.filter(function(o){return list.some(function(p){return kind==="use"?p.uses.indexOf(o[0])>-1:p.family===o[0];});});
 var chips=[["all",L("All","すべて")]].concat(opts);
 var sorts=[["featured",L("Featured","おすすめ順")],["az",L("Name A–Z","名前順 A–Z")],["za",L("Name Z–A","名前順 Z–A")]];
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
function card(p){
 return '<article class="product-card" role="link" tabindex="0" data-product="'+p.id+'">'+
   photo(p.image,"Product imagery", "contain")+
   '<h3>'+p.name+'</h3>'+
   '<div class="price">$20.00</div>'+
 '</article>';
}
function productGrid(products){
 return '<div class="product-grid">'+products.map(card).join("")+'</div>';
}
function productStrip(ids){
 return '<div class="product-strip">'+ids.map(function(id){return card(productBy(id));}).join("")+'</div>';
}
function appHeader(){
 var shopPages=["shop","tongs","tools"],supportPages=["faq","shipping","returns","privacy","contact"];
 var current=shopPages.indexOf(state.page)>-1?"shop":supportPages.indexOf(state.page)>-1?"support":state.page;
 function item(id,label){return '<button type="button" data-go="'+id+'"'+(current===id?' class="active"':'')+'>'+label+'</button>';}
 function drop(id,label,go,links){
  return '<div class="nav-item has-sub'+(current===id?' active':'')+'"><button type="button" class="nav-parent'+(current===id?' active':'')+'" data-go="'+go+'" aria-haspopup="true">'+label+'<span class="nav-caret" aria-hidden="true"></span></button>'+
  '<div class="nav-sub" role="menu">'+links.map(function(x){return '<button type="button" role="menuitem" data-go="'+x[0]+'"'+(state.page===x[0]?' class="active"':'')+'>'+x[1]+'</button>';}).join("")+'</div></div>';
 }
 var navh=drop("shop","SHOP","shop",[["shop","SHOP ALL"],["tongs","AUX TONGS"],["tools","AUX TOOLS"]])+
  item("cook","COOK")+item("serve","SERVE")+item("table","TABLE")+item("moments","MOMENTS")+item("why","WHY AUX")+
  drop("support","SUPPORT","faq",[["faq","FAQ"],["shipping","SHIPPING"],["returns","RETURNS"],["privacy","PRIVACY POLICY"],["contact","CONTACT"]])+
  '<button type="button" class="nav-business'+(current==="business"?' active':'')+'" data-go="business">FOR BUSINESS</button>';
 return '<header class="site-header">'+
 '<button type="button" class="site-menu-mobile" data-demo="nav" aria-label="Menu"><svg viewBox="0 0 24 24"><path d="M3 9h18M3 15h18"></path></svg></button>'+
 '<button class="site-wordmark" data-go="home" aria-label="AUX Home">'+
 '<img src="./assets/aux-logo-original.svg" alt="AUX Co., Ltd." width="152" height="17"></button>'+
 '<nav class="site-menu" aria-label="Main navigation">'+navh+'</nav>'+
 '<div class="site-util"><button type="button" class="util-search" data-demo="search" aria-label="Search"><svg viewBox="0 0 24 24"><circle cx="10.5" cy="10.5" r="6.5"></circle><path d="m15.5 15.5 5 5"></path></svg></button>'+
 '<button type="button" class="util-account" data-demo="account" aria-label="Account"><svg viewBox="0 0 24 24"><circle cx="12" cy="8" r="4"></circle><path d="M4.5 20c.9-3.6 3.9-6 7.5-6s6.6 2.4 7.5 6"></path></svg></button>'+
 '<button type="button" class="util-cart" data-demo="cart" aria-label="Cart"><svg viewBox="0 0 24 24"><path d="M4 8h16l-1.2 12H5.2L4 8ZM8 9V6a4 4 0 0 1 8 0v3"></path></svg><span class="cart-count">0</span><span class="cart-text">CART (0)</span></button></div></header>';
}
function footer(){
 function grp(title,items){return '<div class="footer-group"><b>'+title+'</b>'+items.map(function(x){return '<button type="button" data-go="'+x[0]+'">'+x[1]+'</button>';}).join("")+'</div>';}
 return '<footer class="site-footer"><div class="footer-columns">'+
 '<div><img class="footer-logo-image" src="./assets/aux-logo-original.svg" alt="AUX Co., Ltd." width="175" height="20"><p class="footer-intro">'+L("Tools that quietly support the meal, the people and the moments around the table.","食事と人、食卓を囲む時間を静かに支える道具。")+'</p></div>'+
 '<div class="footer-links">'+grp("SHOP",[["shop","Shop All"],["tongs","AUX TONGS"],["tools","AUX Tools"],["cook","COOK"],["serve","SERVE"],["table","TABLE"]])+
 grp("DISCOVER",[["moments","MOMENTS"],["why","WHY AUX"],["business","FOR BUSINESS"]])+
 grp("SUPPORT",[["faq","FAQ"],["shipping","Shipping"],["returns","Returns"],["privacy","Privacy Policy"],["contact","Contact"]])+'</div>'+
 '</div><div class="footer-bottom"><span>© 2026 AUX Co., Ltd. All rights reserved.</span></div></footer>';
}
var HERO_SLIDES=[
 {id:"fingertip",image:"small-food-transfer.webp",title:"AUX Fingertip Tongs",jpTitle:"AUX ゆびさきトング",copy:"A thoughtful grip for small foods and small movements.",jpCopy:"小さな食材や、食卓での繊細な動きに。"},
 {id:"noodle",image:"cook-pasta.webp",title:"AUX Noodle Tongs",jpTitle:"AUX しっかりめんトング",copy:"Lift a full portion, down to the last strand.",jpCopy:"ひと束から、最後の一本まで。"},
 {id:"serving",image:"serve-salad.webp",title:"AUX Serving Tongs",jpTitle:"AUX ゆびさきサーバートング",copy:"From a shared dish to the plate, in one natural movement.",jpCopy:"大皿から取り皿へ、自然な動きで。"}
];
/* HOME hero. All three slides are stacked and cross-dissolve; the active photo slowly
   zooms in. The pager is three vertical bars: the active bar fills with ink over the slide
   interval (3s) and the hero advances when it is full (paused on hover). */
function heroHTML(){
 var hi=Math.max(0,Math.min(2,state.heroIndex||0));
 return '<section class="photo-hero" aria-label="'+L("Featured products","注目の商品")+'">'+
  '<div class="photo-hero-visual">'+HERO_SLIDES.map(function(h,i){return '<div class="hero-slide'+(i===hi?' is-active is-zoom':'')+'" data-slide="'+i+'">'+photo(h.image,"")+'</div>';}).join("")+
   HERO_SLIDES.map(function(h,i){return '<div class="photo-hero-caption'+(i===hi?' is-active':'')+'" data-slide="'+i+'"'+(i===hi?'':' aria-hidden="true"')+'>'+
    (i===hi?'<h1 class="photo-hero-title">':'<p class="photo-hero-title">')+L(h.title,h.jpTitle)+(i===hi?'</h1>':'</p>')+
    '<p class="photo-hero-copy">'+L(h.copy,h.jpCopy)+'</p>'+
    '<button type="button" class="btn-outline on-photo has-arrow" data-product="'+h.id+'"'+(i===hi?'':' tabindex="-1"')+'>'+L("View product","商品を見る")+'</button></div>';}).join("")+
  '</div>'+
  '<div class="photo-hero-rail"><div class="photo-hero-names" aria-hidden="true">'+HERO_SLIDES.map(function(h,i){return '<div class="photo-hero-name'+(i===hi?' is-active':'')+'" data-slide="'+i+'">'+productBy(h.id).name.replace(/^AUX /,"")+'</div>';}).join("")+'</div>'+
   '<div class="photo-hero-pager"><span class="photo-hero-count">0'+(hi+1)+' / 03</span>'+
   '<div class="photo-hero-bars" role="group" aria-label="'+L("Featured products","注目の商品")+'">'+HERO_SLIDES.map(function(s,i){
     return '<button type="button" class="hero-bar'+(i===hi?' active':'')+'" data-hero-index="'+i+'" aria-label="Show featured product '+(i+1)+' of 3" aria-pressed="'+(i===hi)+'"><span></span></button>';
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
var WHY_FLOATS=[["product-tip-macro-dark.webp","f1",".05"],["manufacturing-inspection-lineup.webp","f2","-.06"],["product-tomato-scale.webp","f3",".07"],["product-pair-minimal.webp","f4","-.04"]];
function whyBand(title,text){
 return '<section class="site-section why-band-section"><div class="why-band">'+
  '<div class="why-band-bg" aria-hidden="true">'+photo("manufacturing-caliper-close.webp","")+'</div>'+
  WHY_FLOATS.map(function(f){return '<div class="why-float '+f[1]+'" data-drift="'+f[2]+'" aria-hidden="true">'+photo(f[0],"")+'</div>';}).join("")+
  '<div class="why-band-copy">'+eyebrow("WHY AUX")+'<h2 class="page-display">'+title+'</h2><p class="body-lg">'+text+'</p>'+
  '<div class="btn-row is-centred"><button type="button" class="btn-outline on-photo has-arrow" data-go="why">'+L("Why AUX","AUXについて")+'</button></div></div>'+
 '</div>';
}
function home(){
 var featured=["fingertip","noodle","serving","whisk"];
 var categories=[
  ["cook","cook-greens-pan.webp","Made for cooking movements.","調理の動作に合わせた道具。"],
  ["serve","serve-salad.webp","Made for plating and sharing.","盛り付け・取り分けに。"],
  ["table","small-food-transfer.webp","Made for the table.","食卓の細かな動きに。"]
 ];
 var scatter=[["product-tip-macro-dark.webp",".08"],["product-pair-minimal.webp","-.06"],["cook-frying.webp",".06"],["product-tip-tomato-macro.webp","-.06"],["small-food-olive-macro.webp",".06"]];
 return '<div class="home-page">'+heroHTML()+
 /* THE AUX DIFFERENCE: centred statement; photographs scattered behind it as background. */
 '<section class="site-section home-difference scatter-section">'+
 '<div class="scatter-photos" aria-hidden="true">'+scatter.map(function(x,i){return '<div class="scatter-photo s'+(i+1)+'" data-speed="'+x[1]+'">'+photo(x[0],"")+'</div>';}).join("")+'</div>'+
 '<div class="scatter-copy"><h2 class="display-medium">'+L("Different forms<br>for different movements.","使い方に合わせて、<br>形を変える。")+'</h2>'+
 '<p class="body-lg">'+L("A tip for noodles, an opening for draining, a size that fits small food. Each detail begins with a different task.","麺をつかむ先端、油を切る穴、小さな食材に合うサイズ。道具の形には、それぞれ理由があります。")+'</p>'+
 '<button type="button" class="btn-fill has-arrow" data-go="why">'+L("Why AUX","AUXについて")+'</button></div></section>'+
 '<section class="site-section compact mist home-products">'+sectionHead("",L("Tools worth reaching for.","代表商品を見る。"),L("A closer look at the tools and the jobs they are made for.","日常のさまざまな動作に寄り添う、代表的な4つの道具。"))+
 productStrip(featured)+'<div class="btn-row is-centred">'+boutline(L("Shop all products","商品一覧を見る"),"shop")+'</div></section>'+
 '<section class="site-section home-categories">'+sectionHead("",L("Cook. Serve. Table.","COOK / SERVE / TABLE"),L("Start with what you want to do, then discover the tools.","やりたいことから道具を探せる3つの入口。"))+
 categoryCards()+'</section>'+
 '<section class="site-section mist home-third"><div class="split">'+photo("small-food-transfer.webp","","scroll-zoom")+
 '<div class="split-copy">'+eyebrow("THE THIRD UTENSIL")+
 '<h2 class="display-medium">Knife.<br>Fork.<br>AUX.</h2>'+
 '<p class="body-lg">'+L("A small tong considered as part of the table setting<br>—not only a tool kept in the kitchen.","調理だけでなく、<br>ナイフやフォークと並ぶ食卓の道具として。")+'</p>'+
 '<div class="btn-row">'+boutline(L("Explore the idea","TABLEの考え方を見る"),"why",'data-anchor="third"')+'</div></div></div></section>'+
 '<section class="site-section home-moments-section">'+sectionHead("MOMENTS",L("From everyday meals to the moments we share.","何気ない日も、大切な日も。"),L("A different way to explore AUX: through the moments around the table.","何気ない日も、特別な日も。食卓の時間に合う道具を見つけてください。"),true)+
 '<div class="home-moments"><div class="home-moment-main" tabindex="0" data-go="moments" data-anchor="everyday">'+photo(D.moments[0].photo,"MOMENTS / everyday")+
 '<div class="moment-home-copy"><h3>'+D.moments[0].title+'</h3><p>'+D.moments[0].strap+'</p></div><span class="arrow">'+arw()+'</span></div>'+
 '<div class="home-moment-list">'+D.moments.slice(1).map(function(m,i){return '<article tabindex="0" data-go="moments" data-anchor="'+m.id+'">'+photo(m.photo,"MOMENTS / "+m.title)+
 '<div><h3>'+m.title+'</h3><p>'+m.strap+'</p></div><span class="arrow">'+arw()+'</span></article>';}).join("")+'</div></div></section>'+
 '<section class="b2b-banner home-business"><div>'+
 '<h2 class="display-medium">'+L("Thoughtful tools for thoughtful service.","お客様を迎える場所にも。")+'</h2>'+
 '<p class="body-md">'+L("Explore the ways AUX may belong in restaurants, hotels, cafés, events and retail.","レストラン、ホテル、カフェ、イベント、小売まで。業務の現場でも、AUXの使い心地を。")+'</p>'+
 '<div class="btn-row"><button type="button" class="btn-fill has-arrow" data-go="business">'+L("For Business","法人・事業者向け")+'</button></div></div>'+
 photo("serving-salmon.webp","Hospitality / editorial stock selection")+'</section>'+
 whyBand(L("Precision behind the everyday.","自然な使い心地を支える、精度。"),L("Thoughtful proportions, contact points and careful manufacturing help the tool fit the movement.","繊細な先端、考え抜かれた形、丁寧な仕上げ。そのすべてが、自然な使い心地につながっています。"))+
 note("V1 priority restored: featured-product hero → AUX difference → featured products → category discovery → use-scene discovery → About AUX. New direction adds Third Utensil and Business within this sequence.","V1の基本順序：代表商品のHero→AUXの特徴→代表商品→カテゴリ→MOMENTS→About AUX。今回の方針でTABLEコンテンツ・法人導線を追加。")+'</section></div>';
}
function shop(){
 var list=filterList(D.products,"use");
 return '<section class="site-section compact shop-intro"><h1 class="page-display">'+L("All Products","すべての商品")+'</h1>'+
 '<p class="body-lg">'+L("Browse all AUX kitchen tools, or start from COOK, SERVE or TABLE.","AUXのキッチンツールを一覧で。COOK / SERVE / TABLEから探すこともできます。")+'</p></section>'+
 '<section class="site-section compact shop-categories">'+categoryCards()+'</section>'+
 '<section class="site-section compact" id="anchor-products">'+listingToolbar(D.products,"use")+productGrid(list)+'</section>'+
 '<section class="site-section"><div class="split">'+photo("serve-meatballs.webp","")+
 '<div class="split-copy">'+eyebrow("MOMENTS")+'<h2 class="display-medium">'+L("Find the right tool for the moment.","食卓の時間から、道具を選ぶ。")+'</h2>'+
 '<p class="body-md">'+L("Everyday meals, shared time, hosting and special occasions. See which tools suit each moment.","何気ない食事、大切な人との時間、おもてなし、特別な日。それぞれの時間に合う道具を紹介しています。")+'</p>'+
 '<div class="btn-row">'+boutline(L("Explore MOMENTS","MOMENTSを見る"),"moments")+'</div></div></div></section>';
}
function collection(id){
 var c=D.collections[id],matches=D.products.filter(function(p){return p.uses.indexOf(id)>-1;});
 var featuredIds={cook:["fry","noodle"],serve:["serving","basting"],table:["fingertip","garnish"]}[id];
 var values={
 cook:[
 ["cook-steak-pan.webp","Turn & lift","返す・持ち上げる","Find a form that works beside the pan.","フライパンで食材を返し、持ち上げる。"],
 ["cook-frying.webp","Drain while lifting","つかみながら油を切る","Openings in the Fry Tongs support draining.","食材をつかんだまま、余分な油を切りやすい形。"],
 ["cook-pasta-close.webp","Grip the last strand","麺を最後までつかむ","Explore the noodle-focused tip.","麺をしっかりつかめるよう考えられた先端。"]],
 serve:[
 ["serving-salmon.webp","Share from one plate","大皿から取り分ける","Make serving from a shared dish feel natural.","みんなで囲む大皿から自然に取り分ける。"],
 ["plating-scallops.webp","Place with control","狙った位置に盛り付ける","Make small, careful adjustments to every plate.","盛り付けの位置を調整する繊細な動き。"],
 ["serve-meatballs.webp","Serve together with sauce","食材とソースを扱う","Grip the food and serve it with its sauce.","すくう形を使って料理を取り分ける。"]],
 table:[
 ["small-food-transfer.webp","Fingertip control","指先のようにつまむ","Pick up one small or delicate piece.","小さな食材や薄い一枚をつまむ。"],
 ["small-food-olives-wide.webp","The smaller things","小さな器・小さな食材","A scale that suits small bowls and jars.","小鉢や瓶など、小さな器にもちょうどいいサイズ。"],
 ["table-tea-bag.webp","At the tea table","お茶の時間にも","From lifting a tea bag to other small jobs at the table.","ティーバッグを引き上げるような、食卓の小さな動きにも。"]]
 }[id];
 return '<div class="collection-banner"><div class="detail-copy">'+
 '<h1 class="page-display">'+id.toUpperCase()+'</h1><p class="body-lg">'+L(c.lead[0],c.lead[1])+'</p>'+
 '<p class="body-md">'+L(c.body[0],c.body[1])+'</p></div>'+photo(c.photo,id.toUpperCase()+" collection hero")+'</div>'+
 '<section class="site-section">'+sectionHead("",L("Different tools for different movements.","動作に応える、それぞれの形。"))+
 '<div class="collection-value-grid">'+values.map(function(v,i){return '<article>'+photo(v[0],"Physical use / working example")+
 '<h3>'+L(v[1],v[2])+'</h3><p>'+L(v[3],v[4])+'</p></article>';}).join("")+'</div></section>'+
 '<section class="site-section compact mist">'+sectionHead("",L("Start with these tools.","代表商品から選ぶ。"))+
 '<div class="featured-pair">'+featuredIds.map(function(x){return card(productBy(x));}).join("")+'</div></section>'+
 '<section class="site-section compact" id="anchor-products">'+listingToolbar(matches,"family")+productGrid(filterList(matches,"family"))+'</section>'+
 (id==="table"?'<section class="site-section mist"><div class="split">'+photo("small-food-transfer.webp","Fingertip at table / THE THIRD UTENSIL")+
 '<div>'+eyebrow("KNIFE. FORK. AUX.")+'<h2 class="display-medium">'+L("A new place at the table.","食卓に、新しい道具を。")+'</h2><p class="body-md">'+L("Fingertip Tongs feel at home beside the knife and fork.","ナイフやフォークの隣に、ゆびさきトングという新しい選択肢を。")+'</p>'+
 boutline(L("View Fingertip Tongs","ゆびさきトングを見る"),"pdp",'data-set-product="fingertip"')+'</div></div></section>':"")+
 whyBand(L("Precision made visible.","使いやすさの理由を、形から。"),L("The shape you feel in your hand begins with thoughtful design and precise metalworking.","道具の形と使い心地を支える、日本の金属加工技術。"))+
 note("V1 Collection hierarchy restored: hero → use-value trio → featured products → complete listing → About AUX. COOK/SERVE/TABLE can overlap.","V1のCollection構成：Hero→3つの使用価値→代表商品→一覧→About AUX。COOK/SERVE/TABLEは重複掲載可。")+'</section>';
}
function family(kind){
 var isT=kind==="tongs";var list=D.products.filter(function(p){return p.family===kind;});
 return '<div class="collection-banner"><div class="detail-copy">'+
 '<h1 class="page-display">'+(isT?"AUX TONGS":"AUX Tools")+'</h1><p class="body-lg">'+(isT?L("Eleven shapes considered for different gripping movements.","「つかむ」動作の違いに合わせた11種類のトング。"):L("Small tools that bring thoughtfulness to everyday kitchen jobs.","毎日の小さな仕事を助ける2種類のキッチンツール。"))+'</p></div>'+
 photo(isT?"product-lineup-warm.webp":"product-pair-warm.webp","Family image / provisional")+'</div>'+
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
 var copy='<div class="chapter-copy"><div class="chapter-head">'+eyebrow(o.label||"")+'<h2 class="display-medium">'+o.title+'</h2></div>'+
  '<div class="chapter-text">'+(o.lead?'<p class="body-lg">'+o.lead+'</p>':'')+(o.body?'<p class="body-md">'+o.body+'</p>':'')+
  (o.cta?'<div class="btn-row">'+o.cta+'</div>':'')+'</div></div>';
 var inner=o.layout==="wide"?'<div class="chapter-bleed">'+photo(o.photo,"")+'</div>'+copy:
  '<div class="chapter-body"><div class="chapter-photo">'+photo(o.photo,"")+'</div>'+copy+'</div>';
 return '<section class="site-section chapter is-'+o.layout+(o.reverse?' reverse':'')+'"'+(o.id?' id="anchor-'+o.id+'"':'')+'>'+inner+(o.extra||"")+'</section>';
}
function moments(){
 return '<div class="brand-page">'+
 editorialOpening("serving-salmon.webp",L("For the moments<br>around the table.","食卓を囲む、<br>4つの時間。"),
  L("Everyday meals, shared time, welcoming people and occasions worth celebrating. Find a tool by the moment—not only by the task.","何気ない食事、大切な人との食事、おもてなし、特別な日。動作だけでなく、過ごす時間を入口に。"),
  '<div class="moment-jumps has-photos">'+D.moments.map(function(m){return '<button type="button" data-anchor="'+m.id+'" style="background-image:url('+img(m.photo)+')"><span>'+m.title+'</span>'+arw("arw-down")+'</button>';}).join("")+'</div>')+
 D.moments.map(function(m,i){
  return chapter({id:m.id,layout:i%2?"offset":"wide",reverse:i===3,photo:m.photo,title:m.title,lead:m.strap,body:L(m.body[0],m.body[1]),
   extra:'<div class="moment-products'+(i===1?' align-left':i===3?' align-right':'')+'"><div class="moment-products-heading">'+eyebrow(L("Tools for this moment","この時間に合う道具"))+
    '</div>'+
    '<div class="moment-related-grid">'+m.products.map(function(id){return card(productBy(id));}).join("")+'</div></div>'});
 }).join("")+
 whyBand(L("Precision behind every moment.","どの時間にも、確かな使い心地を。"),L("The forms that make each moment easier begin with careful design and metalworking.","それぞれの時間を心地よくする形は、丁寧な設計と金属加工から生まれます。"))+'</section></div>';
}
var BIZ_PHOTOS={
 restaurants:["plating-scallops.webp","cook-steak-pan.webp","serve-meatballs.webp","product-tip-macro-dark.webp"],
 hotels:["serving-salmon.webp","small-food-olives-wide.webp","serve-salad.webp","product-pair-shadow.webp"],
 cafes:["table-tea-bag.webp","small-food-transfer.webp","small-food-olive-macro.webp","product-pair-minimal.webp"],
 catering:["serve-salad-greens.webp","serving-salmon.webp","serve-meatballs.webp","product-lineup-marble.webp"],
 retail:["product-lineup-warm.webp","product-lineup-marble.webp","product-pair-warm.webp","product-tomato-scale.webp"]
};
/* FOR BUSINESS sector photo: prev / next arrows on the photo (same as the PDP gallery) and one bar per photo below. */
function bizGallery(id){
 var shots=BIZ_PHOTOS[id]||[];
 return '<div class="biz-gallery" data-biz="'+id+'"><div class="biz-frame">'+photo(shots[0],"")+
  '<button class="kinto-arrow prev" type="button" data-biz-step="-1" aria-label="Previous image">'+arw()+'</button>'+
  '<button class="kinto-arrow next" type="button" data-biz-step="1" aria-label="Next image">'+arw()+'</button></div>'+
  '<div class="kinto-dots" role="group" aria-label="Photos">'+shots.map(function(f,i){return '<button type="button" class="'+(i===0?'active':'')+'" data-biz-index="'+i+'" aria-label="Image '+(i+1)+'" aria-pressed="'+(i===0)+'"><span></span></button>';}).join("")+'</div></div>';
}
function bizShow(g,i){
 var shots=BIZ_PHOTOS[g.dataset.biz]||[];if(!shots.length)return;
 i=(i+shots.length)%shots.length;g.dataset.index=i;
 g.querySelector(".photo img").src=img(shots[i]);
 g.querySelectorAll("[data-biz-index]").forEach(function(b,k){b.classList.toggle("active",k===i);b.setAttribute("aria-pressed",String(k===i));});
}
function business(){
 return '<div class="detail-hero"><div class="detail-copy">'+
 '<h1 class="page-display">'+L("For spaces where<br>people gather.","人が集まる場所に、<br>AUXを。")+'</h1>'+
 '<p class="body-lg">'+L("From restaurant kitchens to the dining table, AUX brings thoughtful design to the places where food brings people together.","レストランの厨房から食卓まで。料理を通じて人が集まる場所に、AUXの使い心地を。")+'</p>'+
 '<div class="btn-row">'+boutline(L("Business enquiries","法人・業務用のお問い合わせ"),"contact")+'</div></div>'+
 photo("serving-salmon.webp","")+'</div>'+
 '<section class="site-section compact">'+sectionHead("",L("Made for your place.","それぞれの現場に。"),
 L("Explore kitchen tools and tableware for hospitality, events and retail.","レストラン、ホテル、カフェ、イベント、小売など幅広い現場に。"))+
 '<div class="moment-jumps has-photos cols-5">'+D.businesses.map(function(b){return '<button type="button" data-anchor="'+b.id+'" style="background-image:url('+img(b.photo)+')"><span>'+b.title+'</span>'+arw("arw-down")+'</button>';}).join("")+'</div></section>'+
 D.businesses.map(function(b,i){return '<section class="site-section '+(i%2?"mist":"")+'" id="anchor-'+b.id+'"><div class="business-detail '+(i%2?"reverse":"")+'">'+bizGallery(b.id)+
 '<div><h2 class="display-medium">'+b.title+'</h2><p class="body-lg">'+L(b.body[0],b.body[1])+'</p>'+
 '<div class="business-related">'+eyebrow(L("Suggested tools","おすすめの道具"))+'<ul>'+b.products.map(function(id){var p=productBy(id);return '<li><button type="button" data-product="'+id+'">'+photo(p.image,"")+'<span>'+p.name+'</span>'+arw()+'</button></li>';}).join("")+'</ul></div>'+
 '<div class="btn-row">'+boutline(L("Enquire about business orders","法人・卸取引について問い合わせる"),"contact")+'</div></div></div></section>';}).join("")+
 whyBand(L("Precision for every service.","業務の現場にも、確かな精度を。"),L("Explore the design and metalworking behind every AUX tool.","AUXの道具を支える設計と金属加工について。"))+'</section>';
}
var GALLERY_EXTRA=["product-tip-macro-dark.webp","product-tomato-scale.webp","product-pair-shadow.webp","product-lineup-marble.webp"];
function pdpGallery(p){
 var shots=[p.image,p.scene].concat(GALLERY_EXTRA);
 state.galleryIndex=Math.max(0,Math.min(shots.length-1,state.galleryIndex||0));
 var idx=state.galleryIndex;
 return '<div class="kinto-gallery" aria-label="Product photos">'+
 '<div class="kinto-thumbs" role="group" aria-label="Choose product photo">'+shots.map(function(file,i){
 return '<button type="button" class="kinto-thumb'+(idx===i?' active':'')+'" data-gallery-index="'+i+'" aria-label="View image '+(i+1)+'" aria-pressed="'+(idx===i)+'"><img src="'+img(file)+'" loading="lazy" alt=""></button>';
 }).join("")+'</div>'+
 '<div class="kinto-stage"><div class="kinto-main"><img src="'+img(shots[idx])+'" alt="'+p.name+'" loading="eager">'+
 '<button class="kinto-arrow prev" type="button" data-gallery-step="-1" aria-label="Previous image">'+arw()+'</button>'+
 '<button class="kinto-arrow next" type="button" data-gallery-step="1" aria-label="Next image">'+arw()+'</button></div>'+
 '<div class="kinto-dots" role="group" aria-label="Photo slides">'+shots.map(function(file,i){
 return '<button type="button" class="'+(i===idx?'active':'')+'" data-gallery-index="'+i+'" aria-label="Image '+(i+1)+'" aria-pressed="'+(idx===i)+'"><span></span></button>';
 }).join("")+'</div></div></div>';
}
function pdp(){
 var p=productBy(state.product);
 var close=D.products.filter(function(x){return x.id!==p.id && x.uses.some(function(u){return p.uses.indexOf(u)!==-1;});});
 if(close.length<4)close=close.concat(D.products.filter(function(x){return x.id!==p.id && close.indexOf(x)===-1;}));
 close=close.slice(0,4);
 var useContext={
  cook:[["cook-pasta.webp","In the kitchen","調理中に","Right beside the pan, where the cooking happens.","フライパンのすぐそばで、調理の動きに寄り添う。"],
        ["cook-steak-pan.webp","Turn and lift","返す・持ち上げる","Stay in control as the food turns and moves.","食材を返す、持ち上げる。その動きを確かに。"],
        ["cook-frying.webp","At the right moment","必要な瞬間に","Made for the job it does best.","それぞれの道具が得意な仕事のために。"]],
  serve:[["serve-salad.webp","Plate","盛り付ける","Place food as intended, in the right part of the plate.","皿の中の狙った位置に料理を置く。"],
        ["serving-salmon.webp","Share","取り分ける","From the central dish to someone's plate.","大皿から相手の皿へ自然に取り分ける。"],
        ["plating-scallops.webp","Refine","整える","Small corrections, just where they are needed.","仕上げの細かな調整にも。"]],
  table:[["small-food-transfer.webp","One precise movement","一つをつまむ","Pick up a small or delicate piece.","小さな食材や一枚をつまむ。"],
        ["small-food-olives-wide.webp","Small foods","小さな食材","A scale suited to the tabletop.","小皿の料理にも自然に手が伸びる、小回りのきくサイズ感。"],
        ["table-tea-bag.webp","Everyday rituals","いつもの時間","A tool that naturally becomes part of the table.","日々の食卓に、自然に馴染む道具。"]]
 };
 var primary=p.uses.includes("table")?"table":p.uses.includes("cook")?"cook":"serve";
 var scenes=useContext[primary];
 var mechanics=[
  ["product-tip-macro-dark.webp","The contact point","食材に触れる先端","A closer view of the tip that meets the food.","食材に触れる部分こそ、使い心地を左右する。"],
  ["product-pair-shadow.webp","Grip and form","手に馴染む全体形状","A comfortable form that responds to the hand.","手の動きに沿うように考えられた形。"],
  ["product-tomato-scale.webp","Size and proportion","サイズと距離感","Sized to suit the food and the dish.","扱う食材と器に合わせた、ちょうどよいサイズ。"]
 ];
 return '<div class="pdp-layout">'+pdpGallery(p)+
 '<div class="pdp-buy">'+eyebrow("AUX / "+(p.family==="tongs"?"TONGS":"TOOLS"))+
 '<h1>'+p.name+'</h1>'+
 '<p class="body-md">'+L(p.desc[0],p.desc[1])+'</p>'+
  '<div class="pdp-price">$20.00</div>'+
 '<div class="qty-row"><span>'+L("QUANTITY","数量")+'</span><div class="qty-control"><button type="button" data-qty="-" aria-label="'+L("Decrease quantity","数量を減らす")+'">−</button><span id="qty-number">'+state.qty+'</span><button type="button" data-qty="+" aria-label="'+L("Increase quantity","数量を増やす")+'">+</button></div></div>'+
 '<button class="btn-fill" type="button" data-demo="cart">'+L("ADD TO CART","カートに入れる")+'</button>'+
 
 '<div class="purchase-assurance">'+
 '<button type="button" data-go="shipping"><b>'+L("SHIPPING","配送")+'</b>'+arw()+'</button>'+
 '<button type="button" data-go="returns"><b>'+L("RETURNS","返品")+'</b>'+arw()+'</button>'+
 '<button type="button" data-go="faq"><b>'+L("DUTIES & TAXES","関税・税金")+'</b>'+arw()+'</button></div>'+
  '<div class="accordion"><details><summary>'+L("Product details","商品仕様")+'</summary><p>'+L("Made with stainless steel and formed for easy handling.","材質：ステンレス鋼。持ちやすさを考えた形状。")+'</p></details>'+
 '<details><summary>'+L("Care","お手入れ")+'</summary><p>'+L("Clean after each use and dry thoroughly before storing.","使用後は洗浄し、十分に乾かしてから保管してください。")+'</p></details>'+
 '<details><summary>'+L("Use and precautions","使用上の注意")+'</summary><p>'+L("Take care around hot cookware. Wash and dry after use.","加熱した調理器具の近くではご注意ください。使用後は洗浄し、十分に乾かしてください。")+'</p></details></div>'+
 '<div class="btn-row">'+boutline(L("Buying for a business?","法人・業務用はこちら"),"business")+'</div></div></div>'+
 '<section class="site-section">'+sectionHead("",L("Made for the movement.","動作から考えられた形。"),
  L("AUX is shaped to suit the food, the hand and the movement.","食材や動作に合わせて、つかみやすさを考えた形状。"))+
 '<div class="pdp-primary-use"><div class="pdp-primary-photo">'+photo(p.scene,"Primary use image / hand + food + exact product")+'</div>'+
 '<div class="pdp-primary-copy"><h3 class="display-small">'+L({cook:"Made for cooking movements.",serve:"Made for plating and sharing.",table:"Made for small movements at the table."}[primary],{cook:"調理の動きのために。",serve:"盛り付けと取り分けのために。",table:"食卓の小さな動きのために。"}[primary])+'</h3>'+
 '<p class="body-md">'+L("From lifting a single bite to serving a shared dish, the details work together.","小さなひと口から大皿の取り分けまで、使う動きに沿った工夫。")+'</p></div></div>'+
 '<div class="pdp-use-trio">'+scenes.map(function(x,i){return '<article>'+photo(x[0],"Use context / check specific product match")+'<h3>'+L(x[1],x[2])+'</h3><p>'+L(x[3],x[4])+'</p></article>';}).join("")+'</div></section>'+
 '<section class="site-section pdp-details-section"><div class="sub-head"><h3 class="display-small">'+L("A closer look at the details.","細かな仕事を支える設計。")+'</h3>'+
  '<p class="body-md">'+L("Considered tips, balanced proportions, and a shape that sits naturally in the hand.","先端の形、サイズ、持ったときのバランス。使い心地を左右する細部。")+'</p></div>'+
 '<div class="feature-trio">'+mechanics.map(function(x,i){return '<article>'+photo(x[0],x[1]+" / illustrative close-up")+
 '<h3>'+L(x[1],x[2])+'</h3><p>'+L(x[3],x[4])+'</p></article>';}).join("")+'</div>'+
 '<div class="pdp-detail-band">'+photo(p.scene,"Full-width primary feature image / final shoot replacement")+'</div>'+
 note("V1 PDP structural restoration: primary-use image + 3 use-value cards → physical-feature detail cards → wide feature band. Photos are not a guarantee of the exact SKU.","V1 PDP構成を復元：使用価値の画像＋3項目→形状の詳細→横長Feature写真。商品写真の個別対応は未確定。")+'</section>'+
 '<section class="site-section" id="anchor-comparison"><div class="compare-head">'+sectionHead("",L("Which tool fits your task?","どの道具が、動作に合う？"),
 L("Compare all thirteen AUX tools by purpose, scale and moment.","得意な用途・サイズ感・使う場面から、ぴったりの一本を見つけてください。"))+
 '<div class="compare-controls"><span class="compare-count" id="compare-count" aria-live="polite"></span>'+
 '<button type="button" class="compare-step prev" data-compare-step="-1" aria-label="'+L("Previous tools","前の道具")+'">'+arw()+'</button>'+
 '<button type="button" class="compare-step" data-compare-step="1" aria-label="'+L("Next tools","次の道具")+'">'+arw()+'</button></div></div>'+
 '<div class="pdp-comparison compare-track" id="compare-track" tabindex="0" aria-label="'+L("Compare all AUX tools","すべての道具を比較")+'">'+[p].concat(D.products.filter(function(x){return x.id!==p.id;})).map(function(x){
 var m=D.compare[x.id]||D.compare.fingertip;
 var here=x.id===p.id;
 return '<article class="'+(here?'current':'')+'" data-product="'+x.id+'" role="link" tabindex="0"'+(here?' aria-current="page"':'')+'>'+
 photo(x.image,"","contain")+
 '<div class="compare-copy">'+(here?'<span class="compare-current">'+L("Viewing","表示中")+'</span>':'')+'<h3>'+x.name+'</h3>'+
 '<dl class="compare-facts"><dt>'+L("Best for","適した用途")+'</dt><dd>'+L(m.best,m.jpBest)+'</dd>'+
 '<dt>'+L("Scale","サイズ・特徴")+'</dt><dd>'+L(m.size,m.jpSize)+'</dd>'+
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
 whyBand(L("Precision behind every movement.","使い心地を支える精度。"),L("Explore the design and metalworking behind the tool.","設計とものづくりの背景へ。"))+'</section>'+
 '<section class="site-section compact"><h2 class="utility-heading">'+L("Related tools","関連する商品")+'</h2>'+
 productStrip(close.map(function(x){return x.id;}))+
 '<div class="btn-row is-centred">'+boutline(L("Shop all products","商品一覧を見る"),"shop")+'</div>'+
 note("PDP is a shared 13-product template. Price, review, specifications, country-of-origin claims and product photography remain working placeholders.","PDPは13商品で共通テンプレート。価格・レビュー・仕様・製造地・物撮りは確認後に置換。")+'</section>';
}
function why(){
 var factors=[
 ["product-tip-tomato-macro.webp","The point of contact","食材に触れる先端","Different tips for different foods and movements.","食材やつかむ動作に合わせた先端形状。"],
 ["cook-frying.webp","One form, one job","目的のある形","Draining openings and task-specific silhouettes.","油を切る穴など、必要な作業につながる形。"],
 ["product-pair-minimal.webp","The right scale","適切な大きさ","Size and reach in relation to hand and dish.","手や器、食卓での距離感に合うサイズ。"]
 ];
 var uses=[
 ["product-tip-macro-dark.webp","Contact & precision","先端の精度","A considered contact point for precise handling.","食材を繊細につかむための先端形状。"],
 ["product-pair-shadow.webp","Grip and response","握り心地と操作性","A spring and grip designed for natural control.","手に馴染む形と、自然に開閉するばねの感覚。"],
 ["product-tomato-scale.webp","Scale & proportion","サイズとバランス","Sized for the food and the hand that holds it.","手にも食材にも合う、考えられたバランス。"]
 ];
 return '<div class="brand-page">'+
 editorialOpening("plating-scallops.webp",L("A better movement<br>starts with a better tool.","使う人の動きから、<br>道具を考える。"),
  L("It is not about getting better at using a tong. The tool itself can be considered more closely, so the meal remains the focus.","道具を使うことに意識を向けず、食事そのものを楽しめるように。AUXは、手と食材の自然な動きから形を考えています。"))+
 '<section class="site-section">'+sectionHead("",L("Different forms for different tasks.","食材や使い方に合わせて形を変える。"),
  L("Look at the distinctive shapes first, then see where they make a difference.","食材が変われば、必要な形も変わる。"))+
 '<div class="form-collage">'+factors.map(function(f){return '<figure>'+photo(f[0],"")+
 '<figcaption><h3>'+L(f[1],f[2])+'</h3><p>'+L(f[3],f[4])+'</p></figcaption></figure>';}).join("")+'</div></section>'+
 '<section class="site-section" id="anchor-engineering"><div class="spec-layout">'+photo("product-lineup-marble.webp","")+
 '<div class="spec-copy">'+eyebrow("DESIGN & ENGINEERING")+'<h2 class="display-medium">'+L("Shape, feel and proportion.","先端、角度、握り心地。")+'</h2>'+
 '<p class="body-md">'+L("The tip, the angle, the length and the grip. Each shape has a reason you can feel in use.","先端、角度、長さ、握り心地。一つひとつの形に理由があります。")+'</p>'+
 '<ul class="spec-list">'+uses.map(function(u){return '<li>'+photo(u[0],"")+'<div><h3>'+L(u[1],u[2])+'</h3><p>'+L(u[3],u[4])+'</p></div></li>';}).join("")+'</ul></div></div></section>'+
 chapter({id:"third",layout:"wide",photo:"small-food-transfer.webp",label:"THE THIRD UTENSIL",title:L("The third utensil.","食卓に、もうひとつの道具。"),
  body:L("Fingertip Tongs can sit beside the knife and fork, not only in the kitchen. Pick a small bite, share a dish, and let the tool rest quietly on the table.","ゆびさきトングをキッチンだけでなく、ナイフやフォークと並ぶ食卓の道具に。小さな一口をつまむ、料理を取り分ける、食卓にさりげなく置く。"),
  cta:'<button type="button" class="btn-fill has-arrow" data-go="pdp" data-set-product="fingertip">'+L("Discover Fingertip Tongs","ゆびさきトングを見る")+'</button>'})+
 chapter({id:"tsubame",layout:"offset",reverse:true,photo:"manufacturing-caliper-close.webp",label:"TSUBAME-SANJO",title:L("The expertise behind the form.","形を支える、金属加工の技術。"),
  body:L("Behind each form is careful metalworking, from cutting and forming to the final finish.","形の背景には、切る・曲げる・仕上げるまでの丁寧な金属加工があります。")})+
 '<section class="site-section compact">'+sectionHead("",L("Find the right tool.","商品から確かめる。"),
 L("Continue from the story to the collection and the products.","ストーリーから、商品選びへ。"))+
 categoryCards()+
 '<div class="btn-row is-centred">'+boutline(L("Shop all products","すべての商品を見る"),"shop")+'</div></section></div>';
}
function faq(){
 var rows=[
  ["Where does AUX ship?","配送できる地域は？","Shipping options and costs depend on your destination. You can review available services during checkout.","配送方法や送料はお届け先によって異なります。ご注文時に配送先を指定してご確認ください。"],
  ["How are import duties and taxes handled?","輸入関税や税金はどうなりますか？","Import duties and taxes depend on your delivery destination and applicable terms. Please check the delivery details for your order.","関税・税金はお届け先や配送条件によって異なります。ご注文に適用される配送条件をご確認ください。"],
  ["How should I care for AUX tools?","お手入れ方法を教えてください。","Wash after use with a soft sponge and dry thoroughly. Please refer to the care information for each product.","使用後は柔らかいスポンジなどで洗浄し、十分に乾かしてください。商品ごとのお手入れ情報もご確認ください。"],
  ["Can I order for a restaurant or retail business?","レストランや小売店向けの注文はできますか？","For professional orders, retail and distribution enquiries, please get in touch with our team.","業務用のご注文や小売・卸取引については、お問い合わせフォームよりご相談ください。"],
  ["How can I contact AUX?","AUXへの問い合わせ方法は？","Send us a message through the contact form. For order enquiries, please include your order number.","お問い合わせフォームからご連絡ください。ご注文については注文番号をお知らせください。"]
 ];
 return '<section class="site-section"><div class="support-wrap">'+eyebrow("SUPPORT")+
 '<h1 class="page-display">FAQ</h1><p class="body-lg">'+L("Answers to questions about AUX products, orders and care.","商品・配送・お手入れについて、よくあるご質問。")+'</p>'+
 '<div class="faq-list">'+rows.map(function(x){return '<details><summary>'+L(x[0],x[1])+'</summary><p>'+L(x[2],x[3])+'</p></details>';}).join("")+'</div>'+
 '<div class="btn-row">'+boutline(L("Contact us","お問い合わせ"),"contact")+'</div></div></section>';
}
function policy(kind){
 var ship=kind==="shipping",priv=kind==="privacy",title=ship?"Shipping & Delivery":priv?"Privacy Policy":"Returns & Refunds";
 var rows=priv?[
  ["Information we collect","取得する情報","Details you provide when you place an order, create an account or contact us, such as your name, email address, shipping address and order history.","ご注文、アカウント作成、お問い合わせの際にご提供いただくお名前、メールアドレス、お届け先、注文履歴などの情報。"],
  ["How we use it","利用目的","To process and deliver orders, respond to enquiries and, with your consent, send news about AUX.","ご注文の処理・配送、お問い合わせへの対応、同意いただいた場合のAUXからのお知らせのため。"],
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
  ["Refund enquiries","返金について","For questions about a refund, please contact customer support with your order number.","返金についてのご質問は、注文番号を添えてお問い合わせください。"]
 ];
 return '<section class="site-section"><div class="support-wrap">'+eyebrow("SUPPORT")+
 '<h1 class="page-display">'+title+'</h1>'+
 '<p class="body-lg">'+(ship?L("Everything you need to know about receiving your AUX order.","AUXの商品をお届けするための配送について。"):priv?L("How AUX collects, uses and protects your information.","AUXにおける個人情報の取り扱いについて。"):L("We are here to help with returns and order concerns.","返品・注文内容についてのご相談はこちら。"))+'</p>'+
 '<dl class="policy-table">'+rows.map(function(r){return '<div class="policy-row"><dt>'+L(r[0],r[1])+'</dt><dd>'+L(r[2],r[3])+'</dd></div>';}).join("")+'</dl>'+
 '<div class="btn-row">'+boutline(L("Contact us","お問い合わせ"),"contact")+'</div></div></section>';
}
function contact(){
 return '<section class="site-section"><div class="support-wrap">'+eyebrow("CONTACT")+'<h1 class="page-display">'+L("How can we help?","お問い合わせ")+'</h1><p class="body-lg">'+L("For products, orders or business purchasing, please use the appropriate contact route.","商品・ご注文・法人取引などのお問い合わせを受け付けています。")+'</p>'+
 '<form class="contact-fields" id="demo-contact"><div class="field"><label>'+L("Name","お名前")+'</label><input type="text" required placeholder=""></div>'+
 '<div class="field"><label>'+L("Email address","メールアドレス")+'</label><input type="email" required></div>'+
 '<div class="field wide"><label>'+L("Inquiry type","お問い合わせ種別")+'</label><select><option>'+L("Product / order","商品・注文")+'</option><option>'+L("Business / wholesale","法人・卸取引")+'</option><option>'+L("Other","その他")+'</option></select></div>'+
 '<div class="field wide"><label>'+L("Message","お問い合わせ内容")+'</label><textarea required></textarea></div>'+
 '<div class="field wide"><button class="btn-fill" type="submit">'+L("SEND MESSAGE","送信")+'</button></div></form>'+
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
var REVEAL_SELECTOR=[".section-head",".listing-toolbar",".product-card",".category-card",".split>*",".feature-trio>*",".collection-value-grid>*",
 ".pdp-use-trio>*",".pdp-primary-use>*",".pdp-detail-band",".home-moment-main",".home-moment-list article",".b2b-banner>*",".about-image-band>*",
 ".business-detail>*",".business-tiles",".chapter-bleed",".chapter-copy",".chapter-photo",".form-collage figure",".spec-layout>*",".moment-jumps",
 ".moment-products-heading",".moment-end>*",".review-shell>*",".compare-head",".pdp-comparison",".editorial-intro>*",".collection-banner>*",
 ".detail-hero>*",".shop-intro>*",".utility-heading",".featured-pair>*",".scatter-copy>*",".why-band-copy>*"].join(",");
var revealObserver=null;
function bindReveal(){
 var reduce=window.matchMedia&&window.matchMedia("(prefers-reduced-motion: reduce)").matches;
 if(reduce||!("IntersectionObserver" in window))return;
 if(revealObserver)revealObserver.disconnect();
 revealObserver=new IntersectionObserver(function(entries){entries.forEach(function(e){if(e.isIntersecting){e.target.classList.add("is-in");revealObserver.unobserve(e.target);}});},{rootMargin:"0px 0px -8% 0px"});
 document.querySelectorAll("#site-app .site-content "+REVEAL_SELECTOR.split(",").join(",#site-app .site-content ")).forEach(function(el){
  var i=Array.prototype.indexOf.call(el.parentNode.children,el)%4;
  el.style.transitionDelay=(i*80)+"ms";
  el.classList.add("reveal");revealObserver.observe(el);
 });
}
/* PDP thumbnails: when the column overflows the photo height, fade its lower edge (until scrolled to the end). */
function bindGallery(){
 var t=document.querySelector(".kinto-thumbs");if(!t)return;
 var f=function(){t.classList.toggle("is-overflowing",t.scrollHeight>t.clientHeight+1);t.classList.toggle("at-end",t.scrollTop+t.clientHeight>=t.scrollHeight-1);};
 t.addEventListener("scroll",f,{passive:true});f();
}
function bindCompare(){var t=document.getElementById("compare-track");if(t){t.addEventListener("scroll",updateCompare,{passive:true});updateCompare();}}
var scatterQueued=false;
/* Full-width photos and the Knife. Fork. AUX. photo: parallax close-up while scrolling.
   Progress runs from when the frame enters the viewport (or page top) until it has passed.
   Scale 100% → 150%; the image also lags downwards, never further than the scaled overflow. */
var ZOOM_SELECTOR=".scroll-zoom,.chapter-bleed .photo,.editorial-hero .photo";
function scrollZoom(){
 var reduce=window.matchMedia&&window.matchMedia("(prefers-reduced-motion: reduce)").matches;
 var vh=window.innerHeight||1,y=window.scrollY||window.pageYOffset||0;
 document.querySelectorAll(ZOOM_SELECTOR).forEach(function(frame){
  var im=frame.querySelector("img");if(!im)return;
  if(reduce){im.style.transform="";return;}
  var r=frame.getBoundingClientRect(),top=r.top+y,h=r.height||1;
  var start=Math.max(0,top-vh),end=top+h;
  var p=Math.max(0,Math.min(1,(y-start)/Math.max(1,end-start)));
  var sc=1+.5*p,ty=(sc-1)*h/2*.6;
  im.style.transform="translate3d(0,"+ty.toFixed(1)+"px,0) scale("+sc.toFixed(4)+")";
 });
}
function bandDrift(){
 var reduce=window.matchMedia&&window.matchMedia("(prefers-reduced-motion: reduce)").matches,vh=window.innerHeight||1;
 document.querySelectorAll(".why-float[data-drift]").forEach(function(el){
  if(reduce||window.innerWidth<=880){el.style.transform="";return;}
  var r=el.parentNode.getBoundingClientRect();
  var off=Math.max(-48,Math.min(48,(r.top+r.height/2-vh/2)*Number(el.dataset.drift)));
  el.style.transform="translate3d(0,"+off.toFixed(1)+"px,0)";
 });
}
function scatterParallax(){
 scatterQueued=false;
 scrollZoom();
 bandDrift();
 var nodes=document.querySelectorAll(".scatter-photo[data-speed]");
 var reduce=window.matchMedia&&window.matchMedia("(prefers-reduced-motion: reduce)").matches;
 var vh=window.innerHeight||1,drift=window.innerWidth>880;
 nodes.forEach(function(el){
  if(reduce){el.style.transform="";el.style.opacity="";return;}
  var r=el.getBoundingClientRect(),ty=el._ty||0;
  var t=(r.top-ty+r.height/2)/vh;           /* 0 = viewport top, 1 = viewport bottom */
  var op=t>.75?(1-t)/.25:(t<.25?t/.25:1);    /* fade in from the bottom, fade out towards the top */
  op=Math.max(0,Math.min(1,op));
  var off=drift?Math.max(-40,Math.min(40,(t-.5)*vh*Number(el.dataset.speed))):0;
  el._ty=off;
  el.style.opacity=op.toFixed(3);
  el.style.transform="translate3d(0,"+off.toFixed(1)+"px,0)";
 });
}
window.addEventListener("scroll",function(){if(!scatterQueued){scatterQueued=true;requestAnimationFrame(scatterParallax);}},{passive:true});
window.addEventListener("resize",function(){scatterParallax();updateCompare();bindGallery();});
function render(){
 document.documentElement.lang=state.lang;
 document.getElementById("site-app").innerHTML=appHeader()+'<div class="site-content">'+content()+'</div>'+footer();
 renderRail();
 document.querySelectorAll("[data-lang]").forEach(function(x){x.classList.toggle("active",x.dataset.lang===state.lang);});
  document.getElementById("rail-toggle").textContent=document.getElementById("app").classList.contains("no-rail")?L("SHOW PAGES","ページ一覧を表示"):L("HIDE PAGES","ページ一覧を隠す");
 var route=state.page==="pdp"?"/products/aux-"+state.product:ROUTES[state.page];
 document.getElementById("stage-breadcrumb").textContent="aux-global.com"+route+" / "+state.lang.toUpperCase();
  updateURL();
 scatterParallax();
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
document.addEventListener("click",function(ev){
 var l=ev.target.closest("[data-lang]");
 if(l){state.lang=l.dataset.lang;render();return;}
 if(ev.target.closest("#rail-toggle")){document.getElementById("app").classList.toggle("no-rail");render();return;}
 var bz=ev.target.closest("[data-biz-step],[data-biz-index]");
 if(bz){var g=bz.closest(".biz-gallery");if(g){var cur=Number(g.dataset.index||0);bizShow(g,bz.dataset.bizIndex!==undefined?Number(bz.dataset.bizIndex):cur+Number(bz.dataset.bizStep));}return;}
 var step=ev.target.closest("[data-compare-step]");
 if(step){var t=document.getElementById("compare-track");if(t&&t.firstElementChild){var cw=t.firstElementChild.getBoundingClientRect().width;t.scrollBy({left:Number(step.dataset.compareStep)*cw*Math.max(1,Math.floor(t.clientWidth/cw+.01)),behavior:"smooth"});}return;}
 var chip=ev.target.closest("[data-list-filter]");
 if(chip){state.filter=chip.dataset.listFilter;render();return;}
 var chosenHero=ev.target.closest("[data-hero-index]");
 if(chosenHero){showHero(Number(chosenHero.dataset.heroIndex)||0);return;}
 var galleryIndex=ev.target.closest("[data-gallery-index]");
 if(galleryIndex){state.galleryIndex=parseInt(galleryIndex.dataset.galleryIndex,10)||0;render();return;}
 var galleryStep=ev.target.closest("[data-gallery-step]");
 if(galleryStep){var gn=GALLERY_EXTRA.length+2;state.galleryIndex=(state.galleryIndex+(galleryStep.dataset.galleryStep==="1"?1:-1)+gn)%gn;render();return;}
 var qp=ev.target.closest("[data-qty]");
 if(qp){state.qty=Math.max(1,state.qty+(qp.dataset.qty==="+"?1:-1));var n=document.getElementById("qty-number");if(n)n.textContent=state.qty;return;}
 var prod=ev.target.closest("[data-product]");
 if(prod){navigate("pdp",prod.dataset.product);return;}
 var go=ev.target.closest("[data-go]");
 if(go){navigate(go.dataset.go,go.dataset.setProduct||null,go.dataset.anchor||null);return;}
 var anchor=ev.target.closest("[data-anchor]");
 if(anchor){var el=document.getElementById("anchor-"+anchor.dataset.anchor);if(el)el.scrollIntoView({behavior:"smooth",block:"start"});return;}
 var demo=ev.target.closest("[data-demo]");
 if(demo){if(demo.dataset.demo==="nav"){document.getElementById("site-app").classList.toggle("mobile-open");return;}toast(L("Layout preview only. This interaction is not connected to a live store.","レイアウト確認用です。実際のEC機能には接続していません。"));}
});
document.addEventListener("change",function(ev){if(ev.target.matches("[data-list-sort]")){state.sort=ev.target.value;render();var el=document.getElementById("list-sort");if(el)el.focus();}});
document.addEventListener("submit",function(ev){if(ev.target.id==="demo-contact"){ev.preventDefault();toast(L("Preview only. No message has been sent.","説明用フォームです。送信されていません。"));}});
document.addEventListener("keydown",function(ev){if((ev.key==="Enter"||ev.key===" ")&&ev.target.matches("[role=link][data-product],article[data-go]")){ev.preventDefault();ev.target.click();}});
window.addEventListener("popstate",function(){var qp=new URLSearchParams(location.search);state.page=ABOUT_SECTIONS[qp.get("page")]?"why":(qp.get("page")||"home");state.whyAnchor=ABOUT_SECTIONS[qp.get("page")]||(state.page==="why"&&ABOUT_SECTIONS[qp.get("section")]?qp.get("section"):null);state.lang=qp.get("lang")==="ja"?"ja":"en";state.product=qp.get("product")||"fingertip";render();});
render();
if(state.whyAnchor)requestAnimationFrame(function(){var el=document.getElementById("anchor-"+state.whyAnchor);if(el)el.scrollIntoView({block:"start"});});
})();