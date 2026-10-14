/* AUX Global EC — working visual wireframe.
 * Primary composition: English. Japanese: client review.
 * No checkout, quotation or actual form submission is implemented here.
 */
(function(){
"use strict";
var D=window.AUX_DATA;
if(!D){document.getElementById("site-app").textContent="Content not loaded.";return;}
var q=new URLSearchParams(location.search);
var state={
  page:q.get("page")||"home",
  product:q.get("product")||"fingertip",
  lang:q.get("lang")==="ja"?"ja":"en",
  notes:false,
  qty:1,
  galleryIndex:0
};
var PAGES=[
  {group:"START",pages:[["home","HOME"]]},
  {group:"PRODUCT DISCOVERY",pages:[["shop","SHOP ALL"],["cook","COOK"],["serve","SERVE"],["table","TABLE"],["tongs","AUX TONGS"],["tools","AUX TOOLS"],["pdp","PRODUCT DETAIL"]]},
  {group:"MOMENTS",pages:[["moments","MOMENTS"]]},
  {group:"FOR BUSINESS",pages:[["business","FOR BUSINESS"]]},
  {group:"BRAND",pages:[["why","WHY AUX"],["third","THE THIRD UTENSIL"],["engineering","DESIGN & ENGINEERING"],["tsubame","TSUBAME-SANJO"]]},
  {group:"SUPPORT",pages:[["faq","FAQ"],["shipping","SHIPPING"],["returns","RETURNS"],["contact","CONTACT"]]}
];
var ROUTES={home:"/",shop:"/collections/all",tongs:"/collections/aux-tongs",tools:"/collections/aux-tools",cook:"/collections/cook",serve:"/collections/serve",table:"/collections/table",pdp:"/products/{handle}",moments:"/pages/moments",business:"/pages/for-business",why:"/pages/why-aux",third:"/pages/the-third-utensil",engineering:"/pages/design-engineering",tsubame:"/pages/tsubame-sanjo",faq:"/pages/faq",shipping:"/pages/shipping",returns:"/pages/returns",contact:"/pages/contact"};
function L(en,ja){return state.lang==="ja"?ja:en;}
function img(file){return D.assetBase+file;}
function photo(file,label,cls){return '<div class="photo '+(cls||"")+'"><img src="'+img(file)+'" loading="lazy" alt=""></div>';}
function note(){return '';}
function bline(text,page,attrs){return '<button type="button" class="btn-line" data-go="'+page+'" '+(attrs||"")+'>'+text+'</button>';}
function bfill(text,page,attrs){return '<button type="button" class="btn-fill" data-go="'+page+'" '+(attrs||"")+'>'+text+'</button>';}
function eyebrow(text){return '<div class="section-label">'+text+'</div>';}
function sectionHead(label,title,description,center){
 return '<div class="section-head'+(center?" center":"")+'">'+eyebrow(label)+'<h2 class="display-medium">'+title+'</h2>'+(description?'<p class="body-md">'+description+'</p>':'')+'</div>';
}
function productBy(id){return D.products.find(function(p){return p.id===id;})||D.products[2];}
function card(p){
 return '<article class="product-card" role="link" tabindex="0" data-product="'+p.id+'">'+
   photo(p.image,"Product imagery", "contain")+
   '<h3>'+p.name+'</h3><div class="product-sub">'+L(p.desc[0],p.desc[1])+'</div>'+
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
 var nav=[["cook","COOK"],["serve","SERVE"],["table","TABLE"],["moments","MOMENTS"],["business","FOR BUSINESS"],["why","WHY AUX"]];
 var navh=nav.map(function(p){return '<button type="button" data-go="'+p[0]+'"'+(state.page===p[0]?' class="active"':'')+'>'+p[1]+'</button>';}).join("");
 return '<header class="site-header"><button class="site-wordmark" data-go="home" aria-label="AUX Home">'+
 '<img src="./assets/aux-logo-original.svg" alt="AUX Co., Ltd." width="152" height="17"></button>'+
 '<nav class="site-menu" aria-label="Main navigation">'+navh+'</nav>'+
 '<button type="button" class="site-menu-mobile" data-demo="nav">MENU ☰</button>'+
 '<div class="site-util"><button type="button" data-demo="search" aria-label="Search"><svg viewBox="0 0 24 24"><circle cx="10.5" cy="10.5" r="6.5"></circle><path d="m15.5 15.5 5 5"></path></svg></button>'+
 '<button type="button" data-demo="cart" aria-label="Cart"><svg viewBox="0 0 24 24"><path d="M4 8h16l-1.2 12H5.2L4 8ZM8 9V6a4 4 0 0 1 8 0v3"></path></svg><span>0</span></button></div></header>';
}
function footer(){
 function grp(title,items){return '<div class="footer-group"><b>'+title+'</b>'+items.map(function(x){return '<button type="button" data-go="'+x[0]+'">'+x[1]+'</button>';}).join("")+'</div>';}
 return '<footer class="site-footer"><div class="footer-columns">'+
 '<div><img class="footer-logo-image" src="./assets/aux-logo-original.svg" alt="AUX Co., Ltd." width="175" height="20"><p class="footer-intro">'+L("Tools that quietly support the meal, the people and the moments around the table.","食事と人、食卓を囲む時間を静かに支える道具。")+'</p></div>'+
 grp("SHOP",[["shop","Shop All"],["tongs","AUX TONGS"],["tools","AUX Tools"],["cook","COOK"],["serve","SERVE"],["table","TABLE"]])+
 grp("DISCOVER",[["moments","MOMENTS"],["business","FOR BUSINESS"]])+
 grp("ABOUT",[["why","WHY AUX"],["third","The Third Utensil"],["engineering","Design & Engineering"],["tsubame","Tsubame-Sanjo"]])+
 grp("SUPPORT",[["faq","FAQ"],["shipping","Shipping"],["returns","Returns"],["contact","Contact"]])+
 '</div><div class="footer-bottom"><span>© 2026 AUX Co., Ltd.</span><span>All rights reserved.</span></div></footer>';
}
function home(){
 var featured=["fingertip","noodle","serving","whisk"];
 var categories=[
  ["cook","cook-greens-pan.webp","Made for cooking movements.","調理の動作に合わせた道具。"],
  ["serve","serve-salad.webp","Made for plating and sharing.","盛り付け・取り分けに。"],
  ["table","small-food-transfer.webp","Made for the table.","食卓の細かな動きに。"]
 ];
 return '<div class="product-first-hero"><div class="product-first-visual" data-product="fingertip" role="link" tabindex="0">'+photo("small-food-transfer.webp","V1 product-led hero / final lifestyle photography")+
   '<div class="hero-index">01 / 03 · TABLE</div></div>'+
  '<div class="product-first-content">'+eyebrow("AUX TONGS / SIGNATURE")+
   '<h1 class="page-display">'+L("AUX<br>Fingertip Tongs","AUX<br>ゆびさきトング")+'</h1>'+
   '<p class="body-lg">'+L("A thoughtful grip for small foods and small movements. Designed to feel natural in your hand and at the table.","小さな食材や食卓での繊細な動きに。手にも食卓にも、自然に馴染む道具。")+'</p>'+
   '<div class="btn-row">'+bfill(L("VIEW PRODUCT","商品を見る"),"pdp",'data-set-product="fingertip"')+
   bline(L("Explore MOMENTS","食卓での使い方を見る"),"moments",'data-anchor="everyday"')+'</div>'+
   '<div class="hero-pager" aria-hidden="true"><i class="active"></i><i></i><i></i></div>'+
   note("V1 structure: a featured product and its immediate benefit, not a generic lifestyle slogan. The three dots are a visual concept, not a working carousel.","V1に合わせて代表商品・使用価値を優先。ページャーはカルーセル機能ではなく構成イメージ。")+
  '</div></div>'+
 '<section class="site-section">'+
 '<div class="feature-showcase"><div class="feature-showcase-copy">'+eyebrow("THE AUX DIFFERENCE")+
 '<h2 class="display-medium">'+L("Different forms for different movements.","使い方に合わせて、形を変える。")+'</h2>'+
 '<p class="body-lg">'+L("A tip for noodles, an opening for draining, a size that fits small food. Each detail begins with a different task.","麺をつかむ先端、油を切る穴、小さな食材に合うサイズ。道具の形には、それぞれ理由があります。")+'</p>'+
 bline(L("Why AUX","AUXの特徴を見る"),"why")+'</div>'+
 '<div class="feature-collage">'+photo("product-tip-macro-dark.webp","Fine tip / detail","contain")+photo("cook-frying.webp","Drain opening / cooking detail")+photo("product-pair-minimal.webp","Compact form / scale","contain")+'</div></div></section>'+
 '<section class="site-section compact mist">'+sectionHead("FEATURED PRODUCTS",L("Tools worth reaching for.","代表商品を見る。"),L("A closer look at the tools and the jobs they are made for.","日常のさまざまな動作に寄り添う、代表的な4つの道具。"))+
 productStrip(featured)+'<div class="btn-row">'+bline(L("Shop all products","商品一覧を見る"),"shop")+'</div></section>'+
 '<section class="site-section">'+sectionHead("SHOP BY CATEGORY",L("Cook. Serve. Table.","COOK / SERVE / TABLE"),L("Start with what you want to do, then discover the tools.","やりたいことから道具を探せる3つの入口。"))+
 '<div class="product-collections">'+categories.map(function(c){return '<article class="category-card" tabindex="0" data-go="'+c[0]+'">'+photo(c[1],"Category / "+c[0])+'<div class="card-meta"><h3>'+c[0].toUpperCase()+'</h3><span class="arrow">→</span></div><p>'+L(c[2],c[3])+'</p></article>';}).join("")+'</div></section>'+
 '<section class="site-section mist"><div class="split">'+photo("small-food-transfer.webp","TABLE / Fingertip Tongs as tableware")+
 '<div class="split-copy">'+eyebrow("TABLE / THE THIRD UTENSIL")+
 '<h2 class="display-medium">Knife.<br>Fork.<br>AUX.</h2>'+
 '<p class="body-lg">'+L("A small tong considered as part of the table setting—not only a tool kept in the kitchen.","トングを調理器具だけでなく、ナイフやフォークと並ぶ食卓の道具として紹介。")+'</p>'+
 '<div class="btn-row">'+bline(L("Explore the idea","TABLEの考え方を見る"),"third")+
 bline(L("View Fingertip Tongs","ゆびさきトングを見る"),"pdp",'data-set-product="fingertip"')+'</div></div></div></section>'+
 '<section class="site-section">'+sectionHead("MOMENTS",L("From everyday meals to the moments we share.","何気ない日も、大切な日も。"),L("A different way to explore AUX: through the moments around the table.","何気ない日も、特別な日も。食卓の時間に合う道具を見つけてください。"))+
 '<div class="home-moments"><div class="home-moment-main" tabindex="0" data-go="moments" data-anchor="everyday">'+photo(D.moments[0].photo,"MOMENTS / everyday")+
 '<div class="moment-home-copy"><span>01 / MOMENTS</span><h3>'+D.moments[0].title+'</h3><p>'+D.moments[0].strap+'</p></div></div>'+
 '<div class="home-moment-list">'+D.moments.slice(1).map(function(m,i){return '<article tabindex="0" data-go="moments" data-anchor="'+m.id+'">'+photo(m.photo,"MOMENTS / "+m.title)+
 '<div><span>0'+(i+2)+' / MOMENTS</span><h3>'+m.title+'</h3><p>'+m.strap+'</p></div><span class="arrow">→</span></article>';}).join("")+'</div></div>'+
 '<div class="btn-row">'+bline(L("Explore all MOMENTS","MOMENTSを見る"),"moments")+'</div></section>'+
 '<section class="b2b-banner"><div>'+eyebrow("FOR BUSINESS")+
 '<h2 class="display-medium">'+L("Thoughtful tools for thoughtful service.","お客様を迎える場所にも。")+'</h2>'+
 '<p class="body-md">'+L("Explore the ways AUX may belong in restaurants, hotels, cafés, events and retail.","レストラン、ホテル、カフェ、イベント、小売など事業者向けの使い方・取引導線を紹介。")+'</p>'+
 '<div class="btn-row">'+bline(L("For Business","法人・事業者向け"),"business")+'</div></div>'+
 photo("serving-salmon.webp","Hospitality / editorial stock selection")+'</section>'+
 '<section class="site-section"><div class="split reverse">'+
 photo("manufacturing-inspection-lineup.webp","About AUX / metalworking archive")+
 '<div class="split-copy">'+eyebrow("ABOUT AUX")+
 '<h2 class="display-medium">'+L("Precision behind the everyday.","自然な使い心地を支える、精度。")+'</h2>'+
 '<p class="body-md">'+L("Thoughtful proportions, contact points and careful manufacturing help the tool fit the movement. Explore the evidence behind each detail.","繊細な先端、考え抜かれた形、丁寧な仕上げ。そのすべてが、自然な使い心地につながっています。")+'</p>'+
 bline(L("Discover Why AUX","AUXについて"),"why")+'</div></div>'+
 note("V1 priority restored: featured-product hero → AUX difference → featured products → category discovery → use-scene discovery → About AUX. New direction adds Third Utensil and Business within this sequence.","V1の基本順序：代表商品のHero→AUXの特徴→代表商品→カテゴリ→MOMENTS→About AUX。今回の方針でTABLEコンテンツ・法人導線を追加。")+'</section>';
}
function shop(){
 var categories=[["cook","cook-greens-pan.webp","COOK"],["serve","serve-salad.webp","SERVE"],["table","small-food-transfer.webp","TABLE"]];
 return '<div class="collection-banner"><div class="detail-copy">'+eyebrow("SHOP ALL / 13 PRODUCTS")+
 '<h1 class="page-display">'+L("Find your tool.","商品を探す。")+'</h1>'+
 '<p class="body-lg">'+L("Discover AUX by what you want to do, or compare all thirteen products.","用途別のカテゴリーから探すことも、13商品を一覧で比較することもできます。")+'</p></div>'+
 photo("product-lineup-warm.webp","Family lineup / replace with production photography")+'</div>'+
 '<section class="site-section compact">'+sectionHead("SHOP BY USE",L("Start with the movement.","使う動作から探す。"))+
 '<div class="shop-category-grid">'+categories.map(function(c){return '<article tabindex="0" data-go="'+c[0]+'">'+photo(c[1],"Shop by use / "+c[2])+
 '<div class="shop-category-title"><strong>'+c[2]+'</strong><span>→</span></div></article>';}).join("")+'</div></section>'+
 '<section class="site-section compact mist">'+sectionHead("THE COLLECTION",L("All AUX products.","すべての商品。"),L("11 tongs and 2 other kitchen tools.","トング11商品、その他のキッチンツール2商品。"))+
 '<div class="related-links"><button class="tag-button" data-go="tongs">AUX TONGS / 11</button><button class="tag-button" data-go="tools">AUX Tools / 2</button></div>'+
 '<div class="filterline"><span>ALL PRODUCTS · 13</span><span>'+L("FEATURED","おすすめ順")+'</span></div>'+
 productGrid(D.products)+'</section>'+
 '<section class="site-section compact"><div class="split">'+photo("serve-meatballs.webp","Exit image / use scene")+
 '<div>'+eyebrow("DISCOVER BY MOMENT")+'<h2 class="display-medium">'+L("See AUX in everyday life.","食卓の時間から選ぶ。")+'</h2>'+
 '<p class="body-md">'+L("The same tool can make itself at home in more than one moment.","同じ道具でも、使う時間が変われば新しい楽しみが生まれます。")+'</p>'+
 bline("MOMENTS","moments")+'</div></div>'+
 note("V1 Shop All modules retained: category discovery → full grid → exit to contextual discovery.","V1のShop All：カテゴリ導線→商品一覧→MOMENTSへの誘導。")+'</section>';
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
 ["small-food-olives-wide.webp","The smaller things","小さな器・小さな食材","Find the scale for compact tabletop use.","小鉢や瓶などで使う場面を示す。"],
 ["table-tea-bag.webp","At the tea table","お茶の時間にも","A possible use with tea and small tabletop items.","ティーバッグなど食卓での使い方を示す。"]]
 }[id];
 return '<div class="collection-banner"><div class="detail-copy">'+eyebrow("COLLECTION / "+id.toUpperCase())+
 '<h1 class="page-display">'+id.toUpperCase()+'</h1><p class="body-lg">'+L(c.lead[0],c.lead[1])+'</p>'+
 '<p class="body-md">'+L(c.body[0],c.body[1])+'</p></div>'+photo(c.photo,id.toUpperCase()+" collection hero")+'</div>'+
 '<section class="site-section">'+sectionHead("DESIGNED FOR THE MOMENT",L("Different tools for different movements.","動作に応える、それぞれの形。"),L(c.body[0],c.body[1]))+
 '<div class="collection-value-grid">'+values.map(function(v,i){return '<article>'+photo(v[0],"Physical use / working example")+
 '<span class="value-number">0'+(i+1)+'</span><h3>'+L(v[1],v[2])+'</h3><p>'+L(v[3],v[4])+'</p></article>';}).join("")+'</div></section>'+
 '<section class="site-section compact mist">'+sectionHead("FEATURED TOOLS",L("Start with these tools.","代表商品から選ぶ。"),L("Two products help illustrate the range, without replacing the full collection.","まずは使い方の異なる2つの道具から。"))+
 '<div class="featured-pair">'+featuredIds.map(function(x){return card(productBy(x));}).join("")+'</div></section>'+
 '<section class="site-section compact">'+sectionHead("SHOP "+id.toUpperCase(),L("Explore the collection.","商品を一覧で見る。"))+
 '<div class="filterline"><span>'+matches.length+' PRODUCTS</span><span>'+L("FEATURED","おすすめ順")+'</span></div>'+productGrid(matches)+'</section>'+
 (id==="table"?'<section class="site-section mist"><div class="split">'+photo("small-food-transfer.webp","Fingertip at table / THE THIRD UTENSIL")+
 '<div>'+eyebrow("KNIFE. FORK. AUX.")+'<h2 class="display-medium">'+L("A new place at the table.","食卓に、新しい道具を。")+'</h2><p class="body-md">'+L("Fingertip Tongs feel at home beside the knife and fork.","ナイフやフォークの隣に、ゆびさきトングという新しい選択肢を。")+'</p>'+
 bline(L("View Fingertip Tongs","ゆびさきトングを見る"),"pdp",'data-set-product="fingertip"')+'</div></div></section>':"")+
 '<section class="site-section compact"><div class="about-image-band">'+photo("manufacturing-caliper-over-shoulder.webp","AUX engineering / manufacturing image")+
 '<div>'+eyebrow("ABOUT AUX")+'<h2 class="display-medium">'+L("Precision made visible.","使いやすさの理由を、形から。")+'</h2>'+
 '<p class="body-md">'+L("The shape you feel in your hand begins with thoughtful design and precise metalworking.","道具の形と使い心地を支える、日本の金属加工技術。")+'</p>'+bline(L("Why AUX","AUXについて"),"why")+'</div></div>'+
 note("V1 Collection hierarchy restored: hero → use-value trio → featured products → complete listing → About AUX. COOK/SERVE/TABLE can overlap.","V1のCollection構成：Hero→3つの使用価値→代表商品→一覧→About AUX。COOK/SERVE/TABLEは重複掲載可。")+'</section>';
}
function family(kind){
 var isT=kind==="tongs";var list=D.products.filter(function(p){return p.family===kind;});
 return '<div class="collection-banner"><div class="detail-copy">'+eyebrow("PRODUCT FAMILY / "+list.length+' ITEMS')+
 '<h1 class="page-display">'+(isT?"AUX TONGS":"AUX Tools")+'</h1><p class="body-lg">'+(isT?L("Eleven shapes considered for different gripping movements.","「つかむ」動作の違いに合わせた11種類のトング。"):L("Small tools that bring thoughtfulness to everyday kitchen jobs.","毎日の小さな仕事を助ける2種類のキッチンツール。"))+'</p></div>'+
 photo(isT?"product-lineup-warm.webp":"product-pair-warm.webp","Family image / provisional")+'</div>'+
 '<section class="site-section compact">'+sectionHead("THE COLLECTION",isT?L("One family. Different movements.","ひとつのファミリー、違う動作。"):L("Everyday tools, considered.","日常に馴染むツール。"),isT?L("Explore tip shapes, reach, and the details that make each tool distinct.","先端・長さ・形状の違いから商品を比較できます。"):L("Mini Whisk and Grating Spoon sit apart from the eleven-tong family.","トング11種類とは別ファミリーとして位置づけます。"))+
 productGrid(list)+'</section>';
}
function moments(){
 return '<div class="detail-hero"><div class="detail-copy">'+eyebrow("MOMENTS")+
 '<h1 class="page-display">'+L("For the moments<br>around the table.","食卓を囲む、<br>4つの時間。")+'</h1>'+
 '<p class="body-lg">'+L("Everyday meals, shared time, welcoming people and occasions worth celebrating. Find a tool by the moment—not only by the task.","何気ない食事、大切な人との食事、おもてなし、特別な日。動作だけでなく、過ごす時間を入口に。")+'</p></div>'+
 photo("serving-salmon.webp","MOMENTS hero / replace with selected people + table image")+'</div>'+
 '<section class="site-section compact">'+eyebrow("EXPLORE FOUR MOMENTS")+
 '<div class="moment-jumps">'+D.moments.map(function(m,i){return '<button type="button" data-anchor="'+m.id+'">'+
 '<span>0'+(i+1)+'</span>'+m.title+' <b>↓</b></button>';}).join("")+'</div>'+
 note("MOMENTS is the former In Use page, not four new URLs. Each moment includes a scene, editorial copy and three product cards leading to individual PDPs.","旧In Useページの名称・内容変更。4つのテーマは同じページ内で、写真・説明・関連商品を一組として表示。")+'</section>'+
 D.moments.map(function(m,i){
   return '<section class="site-section moment-section '+(i%2?"mist":"")+'" id="anchor-'+m.id+'">'+
    '<div class="moment-editorial '+(i%2?"reverse":"")+'">'+photo(m.photo,m.title+" / final scene image")+
    '<div class="moment-editorial-copy"><div class="story-index">0'+(i+1)+' / MOMENTS</div>'+
    '<h2 class="display-medium">'+m.title+'</h2><p class="body-lg">'+m.strap+'</p>'+
    '<p class="body-md">'+L(m.body[0],m.body[1])+'</p>'+
    '</div></div>'+
    '<div class="moment-products">'+
    '<div class="moment-products-heading"><div>'+eyebrow("TOOLS FOR THIS MOMENT")+
    '<h3 class="display-small">'+L("Find a tool for the table.","この時間に合う道具。")+'</h3></div>'+
    '<span>'+m.products.length+' PRODUCTS</span></div>'+
    '<div class="moment-related-grid">'+m.products.map(function(id){return card(productBy(id));}).join("")+'</div>'+
    '</div></section>';
 }).join("")+
 '<section class="site-section compact"><div class="moment-end">'+photo("product-lineup-warm.webp","Product range / exit")+
 '<div>'+eyebrow("EXPLORE AUX")+'<h2 class="display-medium">'+L("From the moment to the tool.","時間から、道具へ。")+'</h2>'+
 '<p class="body-md">'+L("Discover the full range by task or by product family.","使う動作・商品ファミリーからすべての商品を探せます。")+'</p>'+
 bline(L("Shop all products","すべての商品を見る"),"shop")+'</div></div></section>';
}
function business(){
 return '<div class="detail-hero"><div class="detail-copy">'+eyebrow("FOR BUSINESS")+
 '<h1 class="page-display">'+L("For spaces where<br>people gather.","人が集まる場所に、<br>AUXを。")+'</h1>'+
 '<p class="body-lg">'+L("From restaurant kitchens to the dining table, AUX brings thoughtful design to the places where food brings people together.","レストランの厨房から食卓まで。料理を通じて人が集まる場所に、AUXの使い心地を。")+'</p>'+
 '<div class="btn-row">'+bline(L("Business enquiries","法人・業務用のお問い合わせ"),"contact")+'</div></div>'+
 photo("serving-salmon.webp","")+'</div>'+
 '<section class="site-section compact">'+sectionHead("DISCOVER BY BUSINESS",L("Made for your place.","それぞれの現場に。"),
 L("Explore kitchen tools and tableware for hospitality, events and retail.","レストラン、ホテル、カフェ、イベント、小売など幅広い現場に。"))+
 '<div class="business-tiles">'+D.businesses.map(function(b){return '<button class="business-tile" type="button" data-anchor="'+b.id+'"><strong>'+b.title+'</strong><span>'+L("View","見る")+' →</span></button>';}).join("")+'</div></section>'+
 D.businesses.map(function(b,i){return '<section class="site-section '+(i%2?"mist":"")+'" id="anchor-'+b.id+'"><div class="business-detail '+(i%2?"reverse":"")+'">'+photo(b.photo,"")+
 '<div><h2 class="display-medium">'+b.title+'</h2><p class="body-lg">'+L(b.body[0],b.body[1])+'</p>'+
 '<div class="business-related">'+b.products.map(function(id){var p=productBy(id);return '<button type="button" data-product="'+id+'">'+p.name+' →</button>';}).join("")+'</div>'+
 '<div class="btn-row">'+bline(L("Enquire about business orders","法人・卸取引について問い合わせる"),"contact")+'</div></div></div></section>';}).join("")+
 '<section class="site-section cloud"><div class="split">'+photo("product-lineup-warm.webp","")+
 '<div>'+eyebrow("WORK WITH AUX")+'<h2 class="display-medium">'+L("Bring AUX to your business.","AUXをビジネスに。")+'</h2>'+
 '<p class="body-md">'+L("For professional use, retail and distribution, our team can help you explore the product range and discuss ordering options.","飲食店での利用から小売・卸の取扱いまで。商品や取引について、お気軽にお問い合わせください。")+'</p>'+
 '<div class="btn-row">'+bline(L("Contact our team","お問い合わせ"),"contact")+'</div></div></div></section>';
}
function pdpGallery(p){
 var shots=[p.image,p.scene,"product-tip-macro-dark.webp","product-tomato-scale.webp","product-pair-shadow.webp"];
 state.galleryIndex=Math.max(0,Math.min(shots.length-1,state.galleryIndex||0));
 var idx=state.galleryIndex;
 return '<div class="kinto-gallery" aria-label="Product photos">'+
 '<div class="kinto-thumbs" role="group" aria-label="Choose product photo">'+shots.map(function(file,i){
 return '<button type="button" class="kinto-thumb'+(idx===i?' active':'')+'" data-gallery-index="'+i+'" aria-label="View image '+(i+1)+'" aria-pressed="'+(idx===i)+'"><img src="'+img(file)+'" loading="lazy" alt=""></button>';
 }).join("")+'</div>'+
 '<div class="kinto-stage"><div class="kinto-main"><img src="'+img(shots[idx])+'" alt="'+p.name+'" loading="eager"></div>'+
 '<button class="kinto-arrow prev" type="button" data-gallery-step="-1" aria-label="Previous image">‹</button>'+
 '<button class="kinto-arrow next" type="button" data-gallery-step="1" aria-label="Next image">›</button>'+
 '<div class="kinto-dots" role="group" aria-label="Photo slides">'+shots.map(function(file,i){
 return '<button type="button" class="'+(i===idx?'active':'')+'" data-gallery-index="'+i+'" aria-label="Image '+(i+1)+'" aria-pressed="'+(idx===i)+'"></button>';
 }).join("")+'</div></div></div>';
}
function pdp(){
 var p=productBy(state.product);
 var close=D.products.filter(function(x){return x.id!==p.id && x.uses.some(function(u){return p.uses.indexOf(u)!==-1;});});
 if(close.length<3)close=close.concat(D.products.filter(function(x){return x.id!==p.id && close.indexOf(x)===-1;}));
 close=close.slice(0,3);
 var useContext={
  cook:[["cook-pasta.webp","In the kitchen","調理中に","See the movement beside the pan or preparation surface.","調理の動きと商品を一緒に見せる。"],
        ["cook-steak-pan.webp","Turn and lift","返す・持ち上げる","Show control as the food changes position.","調理中の手元と食材の動きを見せる。"],
        ["cook-frying.webp","At the right moment","必要な瞬間に","Focus on the specific job the tool makes possible.","道具が担う具体的な仕事を示す。"]],
  serve:[["serve-salad.webp","Plate","盛り付ける","Place food as intended, in the right part of the plate.","皿の中の狙った位置に料理を置く。"],
        ["serving-salmon.webp","Share","取り分ける","From the central dish to someone's plate.","大皿から相手の皿へ自然に取り分ける。"],
        ["plating-scallops.webp","Refine","整える","Small corrections, just where they are needed.","仕上げの細かな調整を見せる。"]],
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
 '<div class="qty-row"><span>'+L("QUANTITY","数量")+'</span><button type="button" data-qty="-">−</button><span id="qty-number">'+state.qty+'</span><button type="button" data-qty="+">+</button></div>'+
 '<button class="btn-fill" type="button" data-demo="cart">'+L("ADD TO CART","カートに入れる")+'</button>'+
 
 '<div class="purchase-assurance">'+
 '<button type="button" data-go="shipping"><b>'+L("SHIPPING","配送")+'</b><span>'+L("Terms & delivery","条件・日数")+' →</span></button>'+
 '<button type="button" data-go="returns"><b>'+L("RETURNS","返品")+'</b><span>'+L("Return policy","返品条件")+' →</span></button>'+
 '<button type="button" data-go="faq"><b>'+L("DUTIES & TAXES","関税・税金")+'</b><span>'+L("Learn more","詳しく見る")+' →</span></button></div>'+
 '<button class="inline-anchor" type="button" data-anchor="comparison">'+L("Compare similar AUX tools ↓","近い商品と比較する ↓")+'</button>'+
 '<div class="accordion"><details><summary>'+L("Product details","商品仕様")+'</summary><p>'+L("Made with stainless steel and formed for easy handling.","材質：ステンレス鋼。持ちやすさを考えた形状。")+'</p></details>'+
 '<details><summary>'+L("Care","お手入れ")+'</summary><p>'+L("Clean after each use and dry thoroughly before storing.","使用後は洗浄し、十分に乾かしてから保管してください。")+'</p></details>'+
 '<details><summary>'+L("Use and precautions","使用上の注意")+'</summary><p>'+L("Take care around hot cookware. Wash and dry after use.","加熱した調理器具の近くではご注意ください。使用後は洗浄し、十分に乾かしてください。")+'</p></details></div>'+
 '<div class="btn-row">'+bline(L("Buying for a business?","法人・業務用はこちら"),"business")+'</div></div></div>'+
 '<section class="site-section">'+sectionHead("PRODUCT FEATURES",L("Made for the movement.","動作から考えられた形。"),
  L("AUX is shaped to suit the food, the hand and the movement.","食材や動作に合わせて、つかみやすさを考えた形状。"))+
 '<div class="pdp-primary-use"><div class="pdp-primary-photo">'+photo(p.scene,"Primary use image / hand + food + exact product")+'</div>'+
 '<div class="pdp-primary-copy">'+eyebrow("PRIMARY USE")+'<h3 class="display-small">'+L(p.desc[0],p.desc[1])+'</h3>'+
 '<p class="body-md">'+L("From lifting a single bite to serving a shared dish, the details work together.","小さなひと口から大皿の取り分けまで、使う動きに沿った工夫。")+'</p></div></div>'+
 '<div class="pdp-use-trio">'+scenes.map(function(x,i){return '<article>'+photo(x[0],"Use context / check specific product match")+'<span class="value-number">0'+(i+1)+'</span><h3>'+L(x[1],x[2])+'</h3><p>'+L(x[3],x[4])+'</p></article>';}).join("")+'</div></section>'+
 '<section class="site-section mist">'+sectionHead("PRODUCT DETAILS / DESIGN",L("A closer look at the details.","細かな仕事を支える設計。"),
  L("Considered tips, balanced proportions, and a shape that sits naturally in the hand.","先端の形、サイズ、持ったときのバランス。使い心地を左右する細部。"))+
 '<div class="feature-trio">'+mechanics.map(function(x,i){return '<article>'+photo(x[0],x[1]+" / illustrative close-up")+
 '<div class="value-number">0'+(i+1)+'</div><h3>'+L(x[1],x[2])+'</h3><p>'+L(x[3],x[4])+'</p></article>';}).join("")+'</div>'+
 '<div class="pdp-detail-band">'+photo(p.scene,"Full-width primary feature image / final shoot replacement")+'</div>'+
 note("V1 PDP structural restoration: primary-use image + 3 use-value cards → physical-feature detail cards → wide feature band. Photos are not a guarantee of the exact SKU.","V1 PDP構成を復元：使用価値の画像＋3項目→形状の詳細→横長Feature写真。商品写真の個別対応は未確定。")+'</section>'+
 '<section class="site-section" id="anchor-comparison">'+sectionHead("COMPARE AUX TOOLS",L("Which tool fits your task?","どの道具が、動作に合う？"),
 L("Compare the purpose, scale and moments that suit each AUX tool.","得意な用途・サイズ感・使う場面から、ぴったりの一本を見つけてください。"))+
 '<div class="pdp-comparison">'+[p].concat(close).map(function(x){
 var m=D.compare[x.id]||D.compare.fingertip;
 return '<article data-product="'+x.id+'" role="link" tabindex="0">'+
 photo(x.image,"","contain")+
 '<div class="compare-copy"><h3>'+x.name+'</h3>'+
 '<dl class="compare-facts"><dt>'+L("Best for","適した用途")+'</dt><dd>'+L(m.best,m.jpBest)+'</dd>'+
 '<dt>'+L("Scale","サイズ・特徴")+'</dt><dd>'+L(m.size,m.jpSize)+'</dd>'+
 '<dt>'+L("Moment","食事のシーン")+'</dt><dd>'+L(m.moment,m.jpMoment)+'</dd></dl>'+
 '<div class="compare-cta">'+L("View product →","商品を見る →")+'</div></div></article>';
 }).join("")+'</div></section>'+
 '<section class="site-section compact"><div class="about-image-band">'+photo("manufacturing-caliper-over-shoulder.webp","About AUX / verified manufacturing image to come")+
 '<div>'+eyebrow("ABOUT AUX")+'<h2 class="display-medium">'+L("Precision behind every movement.","使い心地を支える精度。")+'</h2>'+
 '<p class="body-md">'+L("Explore the design and metalworking behind the tool.","設計とものづくりの背景へ。")+'</p>'+bline(L("Why AUX","AUXについて"),"why")+'</div></div></section>'+
 '<section class="site-section compact">'+sectionHead("RELATED PRODUCTS",L("Discover another tool.","関連する商品を探す。"))+
 productStrip(close.map(function(x){return x.id;}))+
 '<div class="btn-row">'+bline(L("Shop all products","商品一覧を見る"),"shop")+'</div>'+
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
 ["product-tomato-scale.webp","Scale & proportion","サイズとバランス","See size in relation to the food and the user.","手にも食材にも合う、考えられたバランス。"]
 ];
 return '<div class="detail-hero"><div class="detail-copy">'+eyebrow("WHY AUX")+
 '<h1 class="page-display">'+L("A better movement<br>starts with a better tool.","使う人の動きから、<br>道具を考える。")+'</h1>'+
 '<p class="body-lg">'+L("It is not about getting better at using a tong. The tool itself can be considered more closely, so the meal remains the focus.","道具を使うことに意識を向けず、食事そのものを楽しめるように。AUXは、手と食材の自然な動きから形を考えています。")+'</p></div>'+
 photo("plating-scallops.webp","Why AUX / use-oriented editorial hero")+'</div>'+
 '<section class="site-section">'+sectionHead("AUX FEATURES",L("Different forms for different tasks.","食材や使い方に合わせて形を変える。"),
 L("Look at the distinctive shapes first, then see where they make a difference.","食材が変われば、必要な形も変わる。"))+
 '<div class="aux-form-gallery">'+factors.map(function(f,i){return '<article>'+photo(f[0],"AUX distinct form / illustrative")+
 '<span class="value-number">0'+(i+1)+'</span><h3>'+L(f[1],f[2])+'</h3><p>'+L(f[3],f[4])+'</p></article>';}).join("")+'</div></section>'+
 '<section class="site-section mist">'+sectionHead("DESIGNED FOR USE",L("Shape, feel and proportion.","先端、角度、握り心地。"),
 L("Physical features provide evidence behind the experience; avoid an abstract list of virtues.","先端、角度、長さ、握り心地。一つひとつの形に理由があります。"))+
 '<div class="feature-trio">'+uses.map(function(u,i){return '<article>'+photo(u[0],"Design & Engineering / illustrative")+
 '<span class="value-number">0'+(i+1)+'</span><h3>'+L(u[1],u[2])+'</h3><p>'+L(u[3],u[4])+'</p></article>';}).join("")+'</div>'+
 '<div class="btn-row">'+bline(L("Design & Engineering","設計を詳しく見る"),"engineering")+'</div></section>'+
 '<section class="site-section compact"><div class="split">'+photo("small-food-transfer.webp","TABLE / Signature Fingertip Tongs")+
 '<div>'+eyebrow("KNIFE. FORK. AUX.")+'<h2 class="display-medium">'+L("The third utensil.","食卓に、もうひとつの道具。")+'</h2>'+
 '<p class="body-md">'+L("One possible new place for Fingertip Tongs: alongside familiar cutlery at the table.","ゆびさきトングをナイフやフォークと並べ、食卓に置く新しい使い方を示します。")+'</p>'+
 bline(L("Explore the idea","この考え方を見る"),"third")+'</div></div></section>'+
 '<section class="site-section compact"><div class="about-image-band">'+photo("manufacturing-caliper-close.webp","Archive / source, rights and manufacturing claims to be confirmed")+
 '<div>'+eyebrow("MANUFACTURING / TSUBAME-SANJO")+
 '<h2 class="display-medium">'+L("The expertise behind the form.","形を支える、金属加工の技術。")+'</h2>'+
 '<p class="body-md">'+L("Once the physical details are clear, connect them with verified manufacturing processes and Tsubame-Sanjo expertise.","形の理由を伝えた後に、燕三条の技術や工程を根拠として紹介。事実確認できた情報のみ掲載します。")+'</p>'+
 bline(L("About Tsubame-Sanjo","燕三条について"),"tsubame")+'</div></div></section>'+
 '<section class="site-section compact mist">'+sectionHead("EXPLORE AUX",L("Find the right tool.","商品から確かめる。"),
 L("Continue from the story to the collection and the products.","WHY AUXで得た理解を、商品選びにつなげる。"))+
 '<div class="product-collections">'+[["cook","cook-greens-pan.webp"],["serve","serve-salad.webp"],["table","small-food-transfer.webp"]].map(function(x){return '<article tabindex="0" class="category-card" data-go="'+x[0]+'">'+photo(x[1],x[0]+" collection entry")+
 '<div class="card-meta"><h3>'+x[0].toUpperCase()+'</h3><span class="arrow">→</span></div></article>';}).join("")+'</div>'+
 '<div class="btn-row">'+bline(L("Shop all products","すべての商品を見る"),"shop")+'</div>'+
 note("V1 Why AUX hierarchy restored: form comparison → product design details → manufacturing evidence → Shop AUX. Additional Third Utensil section reflects the later brand concept.","V1 Why AUXの骨格：形状差→設計・機能→製造背景→商品。Third Utensilは今回の追加ブランド方針。")+'</section>';
}
function third(){
 return '<div class="detail-hero"><div class="detail-copy">'+eyebrow("THE THIRD UTENSIL")+'<h1 class="page-display">Knife.<br>Fork.<br>AUX.</h1><p class="body-lg">'+L("Reimagine where a precise tong belongs: not only in the kitchen, but at each place around the table.","キッチンで使うだけでなく、ナイフやフォークと並んで食卓に置く。トングの新しい役割を提案します。")+'</p>'+bline(L("Discover Fingertip Tongs","ゆびさきトングを見る"),"pdp",'data-set-product="fingertip"')+'</div>'+
 photo("small-food-transfer.webp","Third utensil / Scene 02")+'</div>'+
 '<section class="site-section">'+sectionHead("AT THE TABLE",L("A small movement, a different possibility.","小さな動きから、食卓の新しい選択肢へ。"))+
 '<div class="feature-trio">'+[["small-food-olives-wide.webp","Pick precisely.","小さな食材をつまむ。"],["serving-salmon.webp","Share naturally.","自然に取り分ける。"],["product-pair-minimal.webp","Rest quietly.","さりげなく食卓に置く。"]].map(function(x){return '<div>'+photo(x[0],"Signature use")+ '<h3>'+L(x[1],x[2])+'</h3></div>';}).join("")+'</div></section>';
}
function engineering(){
 return '<div class="detail-hero"><div class="detail-copy">'+eyebrow("DESIGN & ENGINEERING")+'<h1 class="page-display">'+L("Why this shape?","なぜ、この形なのか。")+'</h1><p class="body-lg">'+L("A tool is shaped around the food, the hand and the movement. Let each product detail explain the difference it makes.","食材や手の動きが違えば、必要な形も変わる。使い心地を支える設計の細部をご覧ください。")+'</p></div>'+photo("product-tip-macro-dark.webp","Macro / replace with product-specific close-up","contain")+'</div>'+
 '<section class="site-section">'+sectionHead("THOUGHTFUL DETAIL",L("One image. One purpose.","ひとつひとつの動作に、意味のある形。"))+
 '<div class="feature-trio">'+[["product-tip-tomato-macro.webp","At the point of contact.","食材に触れる先端。","Tip geometry"],["product-pair-shadow.webp","In the movement of a hand.","手の力とばね感。","Grip & spring"],["product-tomato-scale.webp","In the right proportion.","長さとサイズ感。","Size & reach"]].map(function(x){return '<article>'+photo(x[0],x[3])+'<h3>'+L(x[1],x[2])+'</h3><p>'+x[3]+'</p></article>';}).join("")+'</div></section>'+
 '<section class="site-section mist"><div class="split">'+photo("manufacturing-caliper-over-shoulder.webp","Manufacturing reference")+ '<div>'+eyebrow("MADE POSSIBLE BY CRAFT")+'<h2 class="display-medium">'+L("Precision supports the experience.","自然な使い心地を、精度が支える。")+'</h2><p class="body-md">'+L("Continue the story with verified manufacturing details and the expertise of Tsubame-Sanjo.","細かな金属加工の技術が、道具の精度と使い心地を支えています。")+'</p>'+bline("Tsubame-Sanjo","tsubame")+'</div></div></section>';
}
function tsubame(){
 return '<div class="detail-hero"><div class="detail-copy">'+eyebrow("TSUBAME-SANJO")+'<h1 class="page-display">'+L("A tradition of<br>working with metal.","金属加工の技術を、<br>日々の道具へ。")+'</h1><p class="body-lg">'+L("Metalworking skills, careful finishing, and an eye for detail bring considered shapes to everyday life.","長年培われてきた金属加工の技術。精度を重ね、日々の食卓で使う道具をつくり続けています。")+'</p></div>'+photo("manufacturing-inspection-lineup.webp","Manufacturing archive / rights and origin to be confirmed")+'</div>'+
 '<section class="site-section"><div class="split">'+photo("manufacturing-caliper-close.webp","Tooling / inspection visual")+
 '<div>'+eyebrow("REASON TO BELIEVE")+'<h2 class="display-medium">'+L("Craft in service of the everyday.","日常の使い心地を支える、ものづくり。")+'</h2><p class="body-md">'+L("Careful work with metal supports the details you feel every time you pick up an AUX tool.","形状へのこだわりから細かな仕上げまで。金属加工の技術が、毎日の使い心地を支えます。")+'</p>'+bline(L("Explore the products","商品を見る"),"shop")+'</div></div>'+
 note("Verify which products and processes are actually manufactured in Tsubame-Sanjo. Do not assign origin statements to all products without verification.","全商品の製造地・工程が燕三条と断定できるわけではありません。商品・工程別に確認してコピー化。")+'</section>';
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
 '<div class="btn-row">'+bline(L("Contact us","お問い合わせ"),"contact")+'</div></div></section>';
}
function policy(kind){
 var ship=kind==="shipping",title=ship?"Shipping & Delivery":"Returns & Refunds";
 var rows=ship?[
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
 '<p class="body-lg">'+(ship?L("Everything you need to know about receiving your AUX order.","AUXの商品をお届けするための配送について。"):L("We are here to help with returns and order concerns.","返品・注文内容についてのご相談はこちら。"))+'</p>'+
 '<dl class="policy-table">'+rows.map(function(r){return '<div class="policy-row"><dt>'+L(r[0],r[1])+'</dt><dd>'+L(r[2],r[3])+'</dd></div>';}).join("")+'</dl>'+
 '<div class="btn-row">'+bline(L("Contact us","お問い合わせ"),"contact")+'</div></div></section>';
}
function contact(){
 return '<section class="site-section"><div class="support-wrap">'+eyebrow("CONTACT")+'<h1 class="page-display">'+L("How can we help?","お問い合わせ")+'</h1><p class="body-lg">'+L("For products, orders or business purchasing, please use the appropriate contact route.","商品・注文・法人取引などのお問い合わせを受け付ける想定です。")+'</p>'+
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
  case "third":return third();
  case "engineering":return engineering();
  case "tsubame":return tsubame();
  case "faq":return faq();
  case "shipping":case "returns":return policy(state.page);
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
 history.replaceState(null,"",u);
}
function render(){
 document.documentElement.lang=state.lang;
 document.getElementById("site-app").innerHTML=appHeader()+'<div class="site-content">'+content()+'</div>'+footer();
 renderRail();
 document.querySelectorAll("[data-lang]").forEach(function(x){x.classList.toggle("active",x.dataset.lang===state.lang);});
  document.getElementById("rail-toggle").textContent=document.getElementById("app").classList.contains("no-rail")?L("SHOW PAGES","ページ一覧を表示"):L("HIDE PAGES","ページ一覧を隠す");
 var route=state.page==="pdp"?"/products/aux-"+state.product:ROUTES[state.page];
 document.getElementById("stage-breadcrumb").textContent="aux-global.com"+route+" / "+state.lang.toUpperCase();
  updateURL();
}
function navigate(page,product,anchor){
 if(!ROUTES[page])return;
 state.page=page;if(product)state.product=product;
 state.qty=1;state.galleryIndex=0;render();
 window.scrollTo(0,0);
 if(anchor)requestAnimationFrame(function(){var node=document.getElementById("anchor-"+anchor);if(node)node.scrollIntoView({behavior:"smooth",block:"start"});});
}
var timeout;
function toast(message){var node=document.getElementById("demo-toast");node.textContent=message;node.classList.add("show");clearTimeout(timeout);timeout=setTimeout(function(){node.classList.remove("show");},3500);}
document.addEventListener("click",function(ev){
 var l=ev.target.closest("[data-lang]");
 if(l){state.lang=l.dataset.lang;render();return;}
 if(ev.target.closest("#rail-toggle")){document.getElementById("app").classList.toggle("no-rail");render();return;}
 var galleryIndex=ev.target.closest("[data-gallery-index]");
 if(galleryIndex){state.galleryIndex=parseInt(galleryIndex.dataset.galleryIndex,10)||0;render();return;}
 var galleryStep=ev.target.closest("[data-gallery-step]");
 if(galleryStep){state.galleryIndex=(state.galleryIndex+(galleryStep.dataset.galleryStep==="1"?1:-1)+5)%5;render();return;}
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
document.addEventListener("submit",function(ev){if(ev.target.id==="demo-contact"){ev.preventDefault();toast(L("Preview only. No message has been sent.","説明用フォームです。送信されていません。"));}});
document.addEventListener("keydown",function(ev){if((ev.key==="Enter"||ev.key===" ")&&ev.target.matches("[role=link][data-product],article[data-go]")){ev.preventDefault();ev.target.click();}});
window.addEventListener("popstate",function(){var qp=new URLSearchParams(location.search);state.page=qp.get("page")||"home";state.lang=qp.get("lang")==="ja"?"ja":"en";state.product=qp.get("product")||"fingertip";render();});
render();
})();