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
  qty:1
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
function photo(file,note,cls){
  return '<div class="photo '+(cls||"")+'"><img src="'+img(file)+'" loading="lazy" alt=""><span class="photo-label">'+(state.lang==="ja"?"仮素材 / ":"V1 placeholder / ")+note+'</span></div>';
}
function note(en,ja){return '<div class="working-note">'+L(en,ja)+'</div>';}
function bline(text,page,attrs){return '<button type="button" class="btn-line" data-go="'+page+'" '+(attrs||"")+'>'+text+'</button>';}
function bfill(text,page){return '<button type="button" class="btn-fill" data-go="'+page+'">'+text+'</button>';}
function eyebrow(text){return '<div class="section-label">'+text+'</div>';}
function sectionHead(label,title,description,center){
 return '<div class="section-head'+(center?" center":"")+'">'+eyebrow(label)+'<h2 class="display-medium">'+title+'</h2>'+(description?'<p class="body-md">'+description+'</p>':'')+'</div>';
}
function productBy(id){return D.products.find(function(p){return p.id===id;})||D.products[2];}
function card(p){
 return '<article class="product-card" role="link" tabindex="0" data-product="'+p.id+'">'+
   photo(p.image,"Product imagery", "contain")+
   '<h3>'+p.name+'</h3><div class="product-sub">'+L(p.desc[0],p.desc[1])+'</div>'+
   '<div class="price">'+L("Price to be confirmed","価格：確認中")+'</div>'+
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
 return 
 '<header class="site-header"><button class="site-wordmark" data-go="home" aria-label="AUX Home">'+
 '<span class="logo-big">AUX</span><span class="logo-small">CO., LTD.</span></button>'+
 '<nav class="site-menu" aria-label="Main navigation">'+navh+'</nav>'+
 '<button type="button" class="site-menu-mobile" data-demo="nav">MENU ☰</button>'+
 '<div class="site-util"><button type="button" data-demo="search" aria-label="Search"><svg viewBox="0 0 24 24"><circle cx="10.5" cy="10.5" r="6.5"></circle><path d="m15.5 15.5 5 5"></path></svg></button>'+
 '<button type="button" data-demo="cart" aria-label="Cart"><svg viewBox="0 0 24 24"><path d="M4 8h16l-1.2 12H5.2L4 8ZM8 9V6a4 4 0 0 1 8 0v3"></path></svg><span>0</span></button></div></header>';
}
function footer(){
 function grp(title,items){return '<div class="footer-group"><b>'+title+'</b>'+items.map(function(x){return '<button type="button" data-go="'+x[0]+'">'+x[1]+'</button>';}).join("")+'</div>';}
 return '<footer class="site-footer"><div class="footer-columns">'+
 '<div><div class="footer-logo">AUX</div><p class="footer-intro">'+L("Tools that quietly support the meal, the people and the moments around the table.","食事と人、食卓を囲む時間を静かに支える道具。")+'</p></div>'+
 grp("SHOP",[["shop","Shop All"],["tongs","AUX TONGS"],["tools","AUX Tools"],["cook","COOK"],["serve","SERVE"],["table","TABLE"]])+
 grp("DISCOVER",[["moments","MOMENTS"],["business","FOR BUSINESS"]])+
 grp("ABOUT",[["why","WHY AUX"],["third","The Third Utensil"],["engineering","Design & Engineering"],["tsubame","Tsubame-Sanjo"]])+
 grp("SUPPORT",[["faq","FAQ"],["shipping","Shipping"],["returns","Returns"],["contact","Contact"]])+
 '</div><div class="footer-bottom"><span>AUX GLOBAL / VISUAL WIREFRAME</span><span>WORKING CONTENT — NOT THE LIVE STORE</span></div></footer>';
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
   '<div class="btn-row">'+bfill(L("VIEW PRODUCT","商品を見る"),"pdp")+
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
 '<section class="site-section compact mist">'+sectionHead("FEATURED PRODUCTS",L("Tools worth reaching for.","代表商品を見る。"),L("A closer look at the tools and the jobs they are made for.","商品ごとの形と使い方がわかる4商品の紹介。"))+
 productStrip(featured)+'<div class="btn-row">'+bline(L("Shop all products","商品一覧を見る"),"shop")+'</div></section>'+
 '<section class="site-section">'+sectionHead("SHOP BY CATEGORY",L("Cook. Serve. Table.","COOK / SERVE / TABLE"),L("Start with what you want to do, then discover the tools.","やりたいことから道具を探せる3つの入口。"))+
 '<div class="product-collections">'+categories.map(function(c){return '<article class="category-card" tabindex="0" data-go="'+c[0]+'">'+photo(c[1],"Category / "+c[0])+'<div class="card-meta"><h3>'+c[0].toUpperCase()+'</h3><span class="arrow">↗</span></div><p>'+L(c[2],c[3])+'</p></article>';}).join("")+'</div></section>'+
 '<section class="site-section mist"><div class="split">'+photo("small-food-transfer.webp","TABLE / Fingertip Tongs as tableware")+
 '<div class="split-copy">'+eyebrow("TABLE / THE THIRD UTENSIL")+
 '<h2 class="display-medium">Knife.<br>Fork.<br>AUX.</h2>'+
 '<p class="body-lg">'+L("A small tong considered as part of the table setting—not only a tool kept in the kitchen.","トングを調理器具だけでなく、ナイフやフォークと並ぶ食卓の道具として紹介。")+'</p>'+
 '<div class="btn-row">'+bline(L("Explore the idea","TABLEの考え方を見る"),"third")+
 bline(L("View Fingertip Tongs","ゆびさきトングを見る"),"pdp",'data-set-product="fingertip"')+'</div></div></div></section>'+
 '<section class="site-section">'+sectionHead("MOMENTS",L("From everyday meals to the moments we share.","何気ない日も、大切な日も。"),L("A different way to explore AUX: through the moments around the table.","「何に使うか」ではなく「どんな時間を過ごすか」からAUXを探す。"))+
 '<div class="home-moments"><div class="home-moment-main" tabindex="0" data-go="moments" data-anchor="everyday">'+photo(D.moments[0].photo,"MOMENTS / everyday")+
 '<div class="moment-home-copy"><span>01 / MOMENTS</span><h3>'+D.moments[0].title+'</h3><p>'+D.moments[0].strap+'</p></div></div>'+
 '<div class="home-moment-list">'+D.moments.slice(1).map(function(m,i){return '<article tabindex="0" data-go="moments" data-anchor="'+m.id+'">'+photo(m.photo,"MOMENTS / "+m.title)+
 '<div><span>0'+(i+2)+' / MOMENTS</span><h3>'+m.title+'</h3><p>'+m.strap+'</p></div><span class="arrow">↗</span></article>';}).join("")+'</div></div>'+
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
 '<p class="body-md">'+L("Thoughtful proportions, contact points and careful manufacturing help the tool fit the movement. Explore the evidence behind each detail.","先端・形状・仕上げの理由と、それを可能にするものづくりを商品価値に結びつけて紹介します。")+'</p>'+
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
 '<div class="shop-category-title"><strong>'+c[2]+'</strong><span>↗</span></div></article>';}).join("")+'</div></section>'+
 '<section class="site-section compact mist">'+sectionHead("THE COLLECTION",L("All AUX products.","すべての商品。"),L("11 tongs and 2 other kitchen tools.","トング11商品、その他のキッチンツール2商品。"))+
 '<div class="related-links"><button class="tag-button" data-go="tongs">AUX TONGS / 11</button><button class="tag-button" data-go="tools">AUX Tools / 2</button></div>'+
 '<div class="filterline"><span>ALL PRODUCTS · 13</span><span>'+L("FEATURED","おすすめ順")+'</span></div>'+
 productGrid(D.products)+'</section>'+
 '<section class="site-section compact"><div class="split">'+photo("serve-meatballs.webp","Exit image / use scene")+
 '<div>'+eyebrow("DISCOVER BY MOMENT")+'<h2 class="display-medium">'+L("See AUX in everyday life.","食卓の時間から選ぶ。")+'</h2>'+
 '<p class="body-md">'+L("The same tool can belong to different moments. Explore the use, then return to the product.","ひとつの道具がいろいろな食卓の場面で使われる様子を紹介。")+'</p>'+
 bline("MOMENTS","moments")+'</div></div>'+
 note("V1 Shop All modules retained: category discovery → full grid → exit to contextual discovery.","V1のShop All：カテゴリ導線→商品一覧→MOMENTSへの誘導。")+'</section>';
}
function collection(id){
 var c=D.collections[id],matches=D.products.filter(function(p){return p.uses.indexOf(id)>-1;});
 var featuredIds={cook:["fry","noodle"],serve:["serving","basting"],table:["fingertip","garnish"]}[id];
 var values={
 cook:[
 ["cook-steak-pan.webp","Turn & lift","返す・持ち上げる","Find a form that works beside the pan.","フライパンで食材を返し、持ち上げる。"],
 ["cook-frying.webp","Drain while lifting","つかみながら油を切る","Openings in the Fry Tongs support draining.","あげものトングの穴のある形状を示す。"],
 ["cook-pasta-close.webp","Grip the last strand","麺を最後までつかむ","Explore the noodle-focused tip.","麺をつかむ先端形状を見せる。"]],
 serve:[
 ["serving-salmon.webp","Share from one plate","大皿から取り分ける","Make serving from a shared dish feel natural.","みんなで囲む大皿から自然に取り分ける。"],
 ["plating-scallops.webp","Place with control","狙った位置に盛り付ける","Show small adjustments in presentation.","盛り付けの位置を調整する繊細な動き。"],
 ["serve-meatballs.webp","Serve together with sauce","食材とソースを扱う","Show the form that helps scoop and grip.","すくう形を使って料理を取り分ける。"]],
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
 '<section class="site-section compact mist">'+sectionHead("FEATURED TOOLS",L("Start with these tools.","代表商品から選ぶ。"),L("Two products help illustrate the range, without replacing the full collection.","用途の違いを伝える代表2商品から、関連する商品へ広げます。"))+
 '<div class="featured-pair">'+featuredIds.map(function(x){return card(productBy(x));}).join("")+'</div></section>'+
 '<section class="site-section compact">'+sectionHead("SHOP "+id.toUpperCase(),L("Explore the collection.","商品を一覧で見る。"))+
 '<div class="filterline"><span>'+matches.length+' PRODUCTS</span><span>'+L("FEATURED","おすすめ順")+'</span></div>'+productGrid(matches)+'</section>'+
 (id==="table"?'<section class="site-section mist"><div class="split">'+photo("small-food-transfer.webp","Fingertip at table / THE THIRD UTENSIL")+
 '<div>'+eyebrow("KNIFE. FORK. AUX.")+'<h2 class="display-medium">'+L("A new place at the table.","食卓に、新しい道具を。")+'</h2><p class="body-md">'+L("Show Fingertip Tongs beside the knife and fork as a considered part of the place setting.","ナイフ・フォークと並べて、ゆびさきトングをテーブルウェアとして見せる。")+'</p>'+
 bline(L("View Fingertip Tongs","ゆびさきトングを見る"),"pdp",'data-set-product="fingertip"')+'</div></div></section>':"")+
 '<section class="site-section compact"><div class="about-image-band">'+photo("manufacturing-caliper-over-shoulder.webp","AUX engineering / manufacturing image")+
 '<div>'+eyebrow("ABOUT AUX")+'<h2 class="display-medium">'+L("Precision made visible.","使いやすさの理由を、形から。")+'</h2>'+
 '<p class="body-md">'+L("Explore the design details and metalworking behind each movement.","各商品の先端・形状と日本の金属加工技術を結びつけて紹介。")+'</p>'+bline(L("Why AUX","AUXについて"),"why")+'</div></div>'+
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
 return '<div class="detail-hero"><div class="detail-copy">'+eyebrow("AUX / FOR BUSINESS")+'<h1 class="page-display">'+L("For spaces where<br>people gather.","人が集まる場所に、<br>AUXを。")+'</h1><p class="body-lg">'+L("Explore potential uses for AUX in hospitality, food service, events and retail. Business enquiries are welcome.","レストラン、ホテル、カフェ、イベント、販売店など。業態ごとの利用イメージと取引相談への入口。")+'</p><div class="btn-row">'+bline(L("Contact us","法人向け問い合わせ"),"contact")+'</div></div>'+photo("serving-salmon.webp","Hospitality scene / stock selection needed")+'</div>'+
 '<section class="site-section compact">'+sectionHead("BUSINESS APPLICATIONS",L("Five ways to work with AUX.","5つの業態・販路。"),L("Use these categories to explore the role AUX could play, or get in touch about business purchasing.","利用する事業者と販売する事業者を区別し、それぞれに適切な導線を用意します。"))+
 '<div class="business-tiles">'+D.businesses.map(function(b){return '<button class="business-tile" type="button" data-anchor="'+b.id+'"><strong>'+b.title+'</strong><span>EXPLORE ↗</span></button>';}).join("")+'</div></section>'+
 D.businesses.map(function(b,i){return '<section class="site-section '+(i%2===1?"mist":"")+'" id="anchor-'+b.id+'"><div class="business-detail '+(i%2===1?"reverse":"")+'">'+photo(b.photo,b.title+" / illustrative photography")+
 '<div><div class="story-index">0'+(i+1)+' / FOR BUSINESS</div><h2 class="display-medium">'+b.title+'</h2><p class="body-lg">'+L(b.body[0],b.body[1])+'</p>'+
 '<p class="body-sm">'+L("Products to explore:","関連商品例：")+' '+b.products.map(function(id){return productBy(id).name;}).join(" / ")+'</p><div class="btn-row">'+bline(L("Business enquiry","取引について問い合わせ"),"contact")+'</div></div></div></section>';}).join("")+
 '<section class="site-section cloud">'+sectionHead("WORKING PURCHASE FLOW",L("Start simple. Build further when needed.","まず販売できる仕組みから。"),L("The launch version keeps business purchasing simple. Advanced quotation, account pricing and sales management are a separate future project.","初期はShopifyでの販売と事業者別クーポン運用を想定。個社別マイページや見積シミュレーターは別案件として検討。"))+
 '<div class="process"><div class="process-item"><div class="num">01</div><h3>'+L("Explore","商品を知る")+'</h3><p>'+L("Review the range and relevant use cases.","商品・用途を確認。")+'</p></div><div class="process-item"><div class="num">02</div><h3>'+L("Contact","条件を相談")+'</h3><p>'+L("Discuss wholesale purchasing and commercial terms.","取引条件と価格運用を相談。")+'</p></div><div class="process-item"><div class="num">03</div><h3>'+L("Purchase","購入する")+'</h3><p>'+L("Initial workflow uses Shopify and buyer-specific coupon codes where applicable.","初期はShopifyと個別クーポンコードで対応。")+'</p></div></div>'+
 note("Do not present the future B2B quote simulator, buyer account system or commission functions as features in the initial release. Sample-request operations require confirmation.","見積シミュレーター・法人マイページ・営業実績管理は初期実装に含めない。サンプル依頼の運用は未確定。")+'</section>';
}
function pdp(){
 var p=productBy(state.product);
 return '<div class="pdp-layout"><div class="pdp-gallery">'+photo(p.image,"Product hero / final shoot replacement","contain")+
 photo(p.scene,"Lifestyle scene")+
 photo("product-tip-macro-dark.webp","Detail / generic provisional, not product-specific","contain")+
 '</div><div class="pdp-buy">'+eyebrow("AUX / "+(p.family==="tongs"?"TONGS":"TOOLS"))+
 '<h1>'+p.name+'</h1><p class="body-sm">'+L("Global product name — working","英語商品名は仮称")+'</p>'+
 '<p class="body-md">'+L(p.desc[0],p.desc[1])+'</p>'+
 '<div class="pdp-price">'+L("Price to be confirmed","販売価格：確認中")+'</div>'+
 '<div class="qty-row"><span>'+L("QUANTITY","数量")+'</span><button type="button" data-qty="-">−</button><span id="qty-number">'+state.qty+'</span><button type="button" data-qty="+">+</button></div>'+
 '<button class="btn-fill" type="button" data-demo="cart">'+L("ADD TO CART","カートに入れる")+'</button>'+
 '<p class="notice">'+L("This is a layout preview. Pricing, cart and checkout are not live.","ワイヤーフレームです。価格・決済・カートは未実装です。")+'</p>'+
 '<div class="accordion"><details><summary>'+L("Product details","商品仕様")+'</summary><p>'+L("Final measurements, material and specification will be added after confirmation.","寸法・材質・仕様は確認後に反映します。")+'</p></details>'+
 '<details><summary>'+L("Care","お手入れ")+'</summary><p>'+L("Care instructions to be confirmed for this product.","商品ごとの手入れ方法を確認後に掲載します。")+'</p></details>'+
 '<details><summary>'+L("Shipping and returns","配送・返品")+'</summary><p>'+L("Final delivery and returns policies to be added.","配送・返品条件が決まり次第掲載します。")+'</p></details></div>'+
 '<div class="btn-row">'+bline(L("Buying for a business?","法人・業務用はこちら"),"business")+'</div></div></div>'+
 '<section class="site-section mist"><div class="split">'+photo(p.scene,"Product-specific use visual / replace after shoot")+
 '<div class="split-copy">'+eyebrow("DESIGNED AROUND THE USE")+
 '<h2 class="display-medium">'+L("A simple movement,<br>considered closely.","小さな動作を、<br>丁寧に考える。")+'</h2><p class="body-lg">'+L(p.desc[0],p.desc[1])+'</p>'+
 '<p class="body-md">'+L("A close look at the detail: ","形の特徴：")+p.feature+'</p></div></div></section>'+
 '<section class="site-section">'+sectionHead("EXPLORE MORE",L("Other tools you may like.","ほかの商品を見る。"))+
 productStrip(D.products.filter(function(x){return x.id!==p.id;}).slice(0,4).map(function(x){return x.id;}))+
 '<div class="btn-row">'+bline(L("Shop all products","商品一覧に戻る"),"shop")+'</div>'+
 note("The PDP is a reusable 13-product template, not 13 independent fixed layouts. No synthetic ratings or unverified prices are displayed.","PDPは13商品共通テンプレート。未確認のレビュー点数・価格・仕様値は入れません。")+'</section>';
}
function why(){
 return '<div class="detail-hero"><div class="detail-copy">'+eyebrow("WHY AUX")+'<h1 class="page-display">'+L("Thoughtful tools.<br>Everyday moments.","使う人を考えた形。<br>日々の食卓へ。")+'</h1><p class="body-lg">'+L("The role of a tool is not to draw attention to itself. It is to make the movement feel natural and leave room for the meal.","道具を強く主張するのではなく、使う人が自然に動けて、食事そのものを楽しめる状態へ。")+'</p></div>'+photo("plating-scallops.webp","Why AUX / lifestyle photo")+'</div>'+
 '<section class="site-section">'+sectionHead("OUR APPROACH",L("Designed for the person, not the tool.","道具ではなく、人の動きから考える。"),L("The brand idea should be felt through use and visual experience, rather than spelled out as an internal slogan.","内部のコンセプトを言葉として説明しすぎず、使う場面や所作を通して伝えます。"))+
 '<div class="brand-values"><div><div class="num">01 / NATURAL</div><h3>'+L("Easy to reach for.","自然に手が伸びる。")+'</h3><p>'+L("The tool fits the movement instead of asking the user to adapt.","人が道具に合わせるのではなく、道具が人の動きに寄り添う。")+'</p></div>'+
 '<div><div class="num">02 / CONSIDERATE</div><h3>'+L("Made to be considerate.","食卓への配慮。")+'</h3><p>'+L("Consider how food is picked up, shared and placed back down.","つかむ、取り分ける、置く。ひとつひとつの動作を考える。")+'</p></div>'+
 '<div><div class="num">03 / PRECISE</div><h3>'+L("Details that matter.","使い心地を支える精度。")+'</h3><p>'+L("Tips, form and spring response make the intended movement possible.","先端・形・ばねの感覚。設計の違いを機能の根拠として見せる。")+'</p></div></div></section>'+
 '<section class="site-section mist"><div class="split">'+photo("small-food-transfer.webp","Third utensil / Fingertip Tongs")+
 '<div>'+eyebrow("THE THIRD UTENSIL")+'<h2 class="display-medium">Knife. Fork. AUX.</h2><p class="body-md">'+L("The dining table is more than a place to set down a serving tool. Discover the idea of a personal tong, considered as part of the table setting.","トングを共有する道具だけでなく、一人ひとりの食卓に置かれる道具として考える。")+'</p>'+bline(L("Explore the idea","詳しく見る"),"third")+'</div></div></section>'+
 '<section class="site-section"><div class="split reverse">'+photo("manufacturing-caliper-close.webp","Engineering / metalwork reference")+
 '<div>'+eyebrow("FORM & PRECISION")+'<h2 class="display-medium">'+L("The reason behind the feeling.","使い心地の理由を伝える。")+'</h2><p class="body-md">'+L("Once the benefit is visible, introduce the detail that makes it possible—and the Japanese metalworking behind the product.","使う場面から伝え、その後に先端や形状の理由、燕三条の技術へつなげます。")+'</p><div class="btn-row">'+bline(L("Design & Engineering","設計を見る"),"engineering")+bline("Tsubame-Sanjo","tsubame")+'</div></div></div></section>';
}
function third(){
 return '<div class="detail-hero"><div class="detail-copy">'+eyebrow("THE THIRD UTENSIL")+'<h1 class="page-display">Knife.<br>Fork.<br>AUX.</h1><p class="body-lg">'+L("Reimagine where a precise tong belongs: not only in the kitchen, but at each place around the table.","トングをキッチンから食卓へ。ナイフ・フォークと並ぶ道具として、ゆびさきトングを見せます。")+'</p>'+bline(L("Discover Fingertip Tongs","ゆびさきトングを見る"),"pdp",'data-set-product="fingertip"')+'</div>'+
 photo("small-food-transfer.webp","Third utensil / Scene 02")+'</div>'+
 '<section class="site-section">'+sectionHead("AT THE TABLE",L("A small movement, a different possibility.","小さな動きから、食卓の新しい選択肢へ。"))+
 '<div class="feature-trio">'+[["small-food-olives-wide.webp","Pick precisely.","小さな食材をつまむ。"],["serving-salmon.webp","Share naturally.","自然に取り分ける。"],["product-pair-minimal.webp","Rest quietly.","さりげなく食卓に置く。"]].map(function(x){return '<div>'+photo(x[0],"Signature use")+ '<h3>'+L(x[1],x[2])+'</h3></div>';}).join("")+'</div></section>';
}
function engineering(){
 return '<div class="detail-hero"><div class="detail-copy">'+eyebrow("DESIGN & ENGINEERING")+'<h1 class="page-display">'+L("Why this shape?","なぜ、この形なのか。")+'</h1><p class="body-lg">'+L("A tool is shaped around the food, the hand and the movement. Let each product detail explain the difference it makes.","食材、手、動作との関係から形を考える。抽象的な「使いやすさ」ではなく、商品固有の構造を見せる。")+'</p></div>'+photo("product-tip-macro-dark.webp","Macro / replace with product-specific close-up","contain")+'</div>'+
 '<section class="site-section">'+sectionHead("THOUGHTFUL DETAIL",L("One image. One purpose.","一枚の写真で、ひとつの機能を伝える。"))+
 '<div class="feature-trio">'+[["product-tip-tomato-macro.webp","At the point of contact.","食材に触れる先端。","Tip geometry"],["product-pair-shadow.webp","In the movement of a hand.","手の力とばね感。","Grip & spring"],["product-tomato-scale.webp","In the right proportion.","長さとサイズ感。","Size & reach"]].map(function(x){return '<article>'+photo(x[0],x[3])+'<h3>'+L(x[1],x[2])+'</h3><p>'+x[3]+'</p></article>';}).join("")+'</div></section>'+
 '<section class="site-section mist"><div class="split">'+photo("manufacturing-caliper-over-shoulder.webp","Manufacturing reference")+ '<div>'+eyebrow("MADE POSSIBLE BY CRAFT")+'<h2 class="display-medium">'+L("Precision supports the experience.","自然な使い心地を、精度が支える。")+'</h2><p class="body-md">'+L("Continue the story with verified manufacturing details and the expertise of Tsubame-Sanjo.","製造地や工程は確認できた事実だけを掲載。品質の根拠として燕三条を紹介します。")+'</p>'+bline("Tsubame-Sanjo","tsubame")+'</div></div></section>';
}
function tsubame(){
 return '<div class="detail-hero"><div class="detail-copy">'+eyebrow("TSUBAME-SANJO")+'<h1 class="page-display">'+L("A tradition of<br>working with metal.","金属加工の技術を、<br>日々の道具へ。")+'</h1><p class="body-lg">'+L("The design story leads to the people and processes that make precision possible. Product-specific manufacturing claims will be verified before publication.","まず商品で感じる違いを伝え、その理由として燕三条の金属加工技術や製造工程を紹介します。")+'</p></div>'+photo("manufacturing-inspection-lineup.webp","Manufacturing archive / rights and origin to be confirmed")+'</div>'+
 '<section class="site-section"><div class="split">'+photo("manufacturing-caliper-close.webp","Tooling / inspection visual")+
 '<div>'+eyebrow("REASON TO BELIEVE")+'<h2 class="display-medium">'+L("Craft in service of the everyday.","日常の使い心地を支える、ものづくり。")+'</h2><p class="body-md">'+L("Show confirmed processes, finishing work and quality control as the explanation behind a better movement—not as decoration.","工程、仕上げ、検品などの確認済み素材を、製品の形状・操作性を裏づける根拠として掲載。")+'</p>'+bline(L("Explore the products","商品を見る"),"shop")+'</div></div>'+
 note("Verify which products and processes are actually manufactured in Tsubame-Sanjo. Do not assign origin statements to all products without verification.","全商品の製造地・工程が燕三条と断定できるわけではありません。商品・工程別に確認してコピー化。")+'</section>';
}
function faq(){
 var rows=[
  ["Where does AUX ship?","配送できる地域は？"],
  ["How are shipping and import duties handled?","送料や輸入関税は？"],
  ["How should AUX products be cared for?","お手入れの方法は？"],
  ["Can I purchase AUX for my business?","法人・業務用で購入できますか？"],
  ["How can I request support?","問い合わせ方法は？"]
 ];
 return '<section class="site-section"><div class="support-wrap">'+eyebrow("SUPPORT")+'<h1 class="page-display">FAQ</h1><p class="body-lg">'+L("Answers to common questions about shopping and using AUX.","購入前後に必要な情報をまとめるページ。")+'</p>'+
 '<div class="faq-list">'+rows.map(function(x){return '<details><summary>'+L(x[0],x[1])+'</summary><p>'+L("Details will be added after the final sales and support policies are confirmed.","販売・サポート体制の確定後に正確な回答を反映します。")+'</p></details>';}).join("")+'</div></div></section>';
}
function policy(kind){
 var isShip=kind==="shipping";var title=isShip?"Shipping & Delivery":"Returns & Refunds";
 var rows=isShip?[["Shipping destinations","配送対象地域"],["Shipping costs","送料"],["Delivery times","配送日数"],["Duties & taxes","関税・税"]]:[["Return window","返品受付期間"],["Eligibility","返品可能な状態"],["Return shipping","返送料"],["Refund timeline","返金期間"]];
 return '<section class="site-section"><div class="support-wrap">'+eyebrow("SUPPORT")+'<h1 class="page-display">'+title+'</h1><p class="body-lg">'+(isShip?L("Clearly explain delivery coverage, shipping costs and duties before checkout.","配送地域、送料、日数、関税など購入前に知りたい条件を整理します。"):L("Make conditions for returns and refunds easy to understand.","返品・返金の条件を明確にするページ。"))+'</p>'+
 '<dl class="policy-table">'+rows.map(function(r){return '<div class="policy-row"><dt>'+L(r[0],r[1])+'</dt><dd>'+L("Final policy to be confirmed.","最終条件確認後に反映。")+'</dd></div>';}).join("")+'</dl></div></section>';
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
 group.pages.map(function(x){return '<button type="button" class="rail-button'+(state.page===x[0]?' active':'')+'" data-go="'+x[0]+'"><span>'+x[1]+'</span><small>↗</small></button>';}).join("")+'</div>';}).join("");
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
 document.getElementById("notes-toggle").textContent=state.notes?L("HIDE NOTES","メモを隠す"):L("SHOW NOTES","構成メモ");
 document.getElementById("rail-toggle").textContent=document.getElementById("app").classList.contains("no-rail")?L("SHOW PAGES","ページ一覧を表示"):L("HIDE PAGES","ページ一覧を隠す");
 var route=state.page==="pdp"?"/products/aux-"+state.product:ROUTES[state.page];
 document.getElementById("stage-breadcrumb").textContent="aux-global.com"+route+" / "+state.lang.toUpperCase();
 document.getElementById("app").classList.toggle("show-notes",state.notes);
 updateURL();
}
function navigate(page,product,anchor){
 if(!ROUTES[page])return;
 state.page=page;if(product)state.product=product;
 state.qty=1;render();
 window.scrollTo(0,0);
 if(anchor)requestAnimationFrame(function(){var node=document.getElementById("anchor-"+anchor);if(node)node.scrollIntoView({behavior:"smooth",block:"start"});});
}
var timeout;
function toast(message){var node=document.getElementById("demo-toast");node.textContent=message;node.classList.add("show");clearTimeout(timeout);timeout=setTimeout(function(){node.classList.remove("show");},3500);}
document.addEventListener("click",function(ev){
 var l=ev.target.closest("[data-lang]");
 if(l){state.lang=l.dataset.lang;render();return;}
 if(ev.target.closest("#notes-toggle")){state.notes=!state.notes;render();return;}
 if(ev.target.closest("#rail-toggle")){document.getElementById("app").classList.toggle("no-rail");render();return;}
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