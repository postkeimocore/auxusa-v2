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
 return '<div class="site-announcement">'+L("AUX / Thoughtfully designed tools for everyday moments.","AUX / 日々の食卓に寄り添う道具。")+'</div>'+
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
 return '<div class="site-hero"><div class="hero-photo">'+photo("serving-salmon.webp","HOME hero / replace with shoot Scene 01","full-height")+
 '<div class="hero-overlay"><div class="eyeline">AUX / JAPAN</div><h1>'+L("Made for the<br>moments that matter.","大切な時間の、<br>そばにある道具。")+'</h1><p>'+L("Thoughtful tools that make the everyday feel a little more natural.","何気ない食事も、大切な人との食卓も。自然に手が伸びる道具。")+'</p></div></div>'+
 '<div class="hero-caption"><p>'+L("Designed to do their job, then quietly step aside—so food, conversation and people stay at the center.","道具が必要な仕事をして、それ以外はそっと馴染む。料理と会話、人との時間が主役になるために。")+'</p>'+bline(L("Explore AUX","商品を見る"),"shop")+'</div></div>'+
 '<section class="site-section">'+sectionHead("DISCOVER AUX",L("For cooking. For serving. For the table.","料理する。取り分ける。食卓を囲む。"),L("Three clear ways to start with what you want to do.","道具を使う動作をもとに、3つの入口から商品を探せます。"))+
 '<div class="product-collections">'+[["cook","cook-greens-pan.webp","For the work of cooking.","料理中の動作を支える。"],["serve","serve-salad.webp","For sharing and serving.","盛り付けと取り分けに。"],["table","small-food-transfer.webp","For the table itself.","食卓に、新しい居場所を。"]].map(function(x){
 return '<article class="category-card" tabindex="0" data-go="'+x[0]+'">'+photo(x[1],x[0]+" category")+'<div class="card-meta"><h3>'+x[0].toUpperCase()+'</h3><span class="arrow">↗</span></div><p>'+L(x[2],x[3])+'</p></article>';
 }).join("")+'</div></section>'+
 '<section class="site-section mist"><div class="editorial-statement">'+eyebrow("THE EVERYDAY, CONSIDERED")+
 '<h2>'+L("Good tools make room for good moments.","道具のことを忘れられる、いい時間。")+'</h2><p>'+L("At home or together with others, the best tools help a movement feel natural without asking for attention.","日常の食事も、大切な人と過ごす時間も。自然に使えて、道具そのものを意識せずにいられることを大切に。")+'</p></div></section>'+
 '<section class="site-section">'+sectionHead("SIGNATURE PRODUCT",L("Knife. Fork. AUX.","Knife. Fork. AUX."),L("A new way to think about a small, precise tong at the table.","ゆびさきトングを、ナイフやフォークと並ぶテーブルウェアとして提案します。"))+
 '<div class="split">'+photo("small-food-transfer.webp","TABLE / scene with Fingertip Tongs")+
 '<div class="split-copy"><div class="eyeline">AUX FINGERTIP TONGS</div><h3 class="display-small">'+L("One slice. Just the one.","一枚だけを、自然に。")+'</h3><p class="body-lg">'+L("An effortless movement for a delicate slice, a small detail, or a shared plate. More than a kitchen accessory, it belongs at the table.","薄い一枚を取る、小さな食材をつまむ、誰かに取り分ける。調理道具にとどまらない食卓での役割を紹介。")+'</p><div class="btn-row">'+bline(L("Discover Fingertip Tongs","ゆびさきトングを見る"),"pdp",'data-set-product="fingertip"')+'</div></div></div></section>'+
 '<section class="site-section compact">'+sectionHead("SHOP THE LINEUP",L("AUX TONGS &amp; AUX Tools","AUX TONGS &amp; AUX Tools"),L("Eleven tongs and two smaller kitchen tools.","トング11種類、その他のツール2種類。商品の特徴や形から探せます。"))+
 productStrip(["fingertip","serving","noodle","whisk"])+
 '<div class="btn-row">'+bline(L("View all products","すべての商品を見る"),"shop")+'</div></section>'+
 '<section class="site-section cloud">'+sectionHead("MOMENTS",L("Made for the way we gather.","食事を囲む、さまざまな時間に。"),L("Four moments, from the most ordinary meal to a day worth celebrating.","何でもない日の食卓から、少し特別な日まで。4つの時間からAUXを見つけます。"))+
 '<div class="moment-grid">'+D.moments.map(function(m){return '<article class="moment-card" data-go="moments" data-anchor="'+m.id+'" tabindex="0">'+photo(m.photo,"MOMENTS / "+m.title)+'<h3>'+m.title+'</h3><p>'+m.strap+'</p></article>';}).join("")+'</div>'+
 '<div class="btn-row">'+bline(L("Explore MOMENTS","MOMENTSを見る"),"moments")+'</div></section>'+
 '<section class="b2b-banner"><div>'+eyebrow("FOR BUSINESS")+'<h2 class="display-medium">'+L("Quietly capable in professional spaces.","プロの現場にも、自然に馴染む。")+'</h2><p class="body-md">'+L("Explore where AUX can support restaurants, hotels, cafés, events and retailers.","レストラン、ホテル、カフェ、イベント、小売・卸の現場での使い方と取引導線を紹介。")+'</p><div class="btn-row">'+bline(L("Explore for business","法人・業務用はこちら"),"business")+'</div></div>'+photo("serving-salmon.webp","FOR BUSINESS / replace with hospitality stock")+'</section>'+
 '<section class="site-section">'+
 '<div class="split reverse">'+photo("manufacturing-caliper-over-shoulder.webp","Existing metalworking imagery / to be confirmed")+
 '<div class="split-copy">'+eyebrow("WHY AUX / PRECISION")+'<h2 class="display-medium">'+L("Thoughtful by design.<br>Precise by nature.","自然な使い心地を、<br>精度で支える。")+'</h2><p class="body-md">'+L("Each form starts with the movement of a hand and the food it handles. Design details and Japanese metalworking help make those moments possible.","使う人の手と食材の動きから形を考える。その使い心地の理由として設計の工夫と日本のものづくりを伝えます。")+'</p>'+bline(L("Why AUX","AUXについて"),"why")+'</div></div>'+
 note("Homepage structure: everyday experience → category discovery → signature tableware → Moments → professional use → engineering evidence.","ホーム構成：日常の体験→商品カテゴリ→テーブルウェア提案→MOMENTS→法人向け→製造・精度の根拠。")+'</section>';
}
function shop(){
 return '<div class="collection-banner"><div class="detail-copy">'+eyebrow("SHOP ALL / 13 PRODUCTS")+'<h1 class="page-display">'+L("Find your tool.","道具を探す。")+'</h1><p class="body-lg">'+L("Discover the complete AUX range, from small tabletop tongs to cooking and serving tools.","13商品を、形・用途・商品ファミリーから探せる商品一覧。")+'</p></div>'+photo("product-lineup-warm.webp","Shop all / family lineup")+'</div>'+
 '<section class="site-section compact"><div class="related-links"><button class="tag-button" data-go="tongs">AUX TONGS / 11</button><button class="tag-button" data-go="tools">AUX Tools / 2</button><button class="tag-button" data-go="cook">COOK</button><button class="tag-button" data-go="serve">SERVE</button><button class="tag-button" data-go="table">TABLE</button></div>'+
 '<div class="filterline"><span>ALL PRODUCTS · 13</span><span>FEATURED ▾</span></div>'+productGrid(D.products)+
 note("Shop All has a single 13-item catalog. COOK / SERVE / TABLE are overlapping usage collections; AUX TONGS / AUX Tools are product families.","Shop Allには13商品を掲載。COOK/SERVE/TABLEは用途による重複ありの分類。AUX TONGS/AUX Toolsは商品ファミリー。")+'</section>';
}
function collection(id){
 var c=D.collections[id];var matches=D.products.filter(function(p){return p.uses.indexOf(id)>-1;});
 return '<div class="collection-banner"><div class="detail-copy">'+eyebrow("COLLECTION / "+id.toUpperCase())+'<h1 class="page-display">'+c.name+'</h1><p class="body-lg">'+L(c.lead[0],c.lead[1])+'</p></div>'+photo(c.photo,id.toUpperCase()+" category hero")+'</div>'+
 '<section class="site-section compact"><div class="collection-lead"><h2 class="display-small">'+L("A tool for the movement.","動作に合った道具を。")+'</h2><p class="body-md">'+L(c.body[0],c.body[1])+'</p></div>'+
 '<div class="filterline"><span>'+matches.length+' PRODUCTS</span><span>'+L("SORT: FEATURED","おすすめ順")+' ▾</span></div>'+productGrid(matches)+'</section>'+
 '<section class="site-section mist"><div class="split">'+photo(c.scene,id.toUpperCase()+" scene photo")+
 '<div class="split-copy">'+eyebrow("IN THE MOMENT")+'<h2 class="display-medium">'+L(c.feature[0],c.feature[1])+'</h2><p class="body-md">'+L("Show the tool in use first, then guide visitors to the specific product for details and purchase.","カテゴリーの説明を繰り返さず、使う一瞬を写真で見せて商品詳細へ誘導します。")+'</p>'+bline(L("Discover MOMENTS","MOMENTSを見る"),"moments")+'</div></div></section>'+
 '<section class="site-section compact">'+sectionHead("EXPLORE MORE",L("Discover the rest of AUX.","他のカテゴリーを見る。"))+
 '<div class="related-links">'+["cook","serve","table"].filter(function(x){return x!==id;}).map(function(x){return '<button type="button" class="tag-button" data-go="'+x+'">'+x.toUpperCase()+'</button>';}).join("")+'<button type="button" class="tag-button" data-go="shop">SHOP ALL</button></div></section>';
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
 return '<div class="detail-hero"><div class="detail-copy">'+eyebrow("MOMENTS")+'<h1 class="page-display">'+L("Good moments,<br>made a little better.","食卓の時間を、<br>少しだけ心地よく。")+'</h1><p class="body-lg">'+L("Everyday meals, familiar people, an open door, a special occasion. Discover AUX through the moments around the table.","日常の食事、大切な人との時間、おもてなし、特別な日。使う場面ではなく、食卓を囲む時間から商品に出会うページ。")+'</p></div>'+photo("serving-salmon.webp","MOMENTS hero / editorial people + table")+'</div>'+
 '<section class="site-section compact">'+eyebrow("EXPLORE FOUR MOMENTS")+
 '<div class="anchor-pills">'+D.moments.map(function(m){return '<button type="button" data-anchor="'+m.id+'">'+m.title+'</button>';}).join("")+'</div>'+
 note("This is the former In Use page renamed MOMENTS and rewritten around four user-approved situations. The four moments are page sections, not four new pages.","MOMENTSは旧In Useページの改名・内容差し替え。4つは新規ページではなく同一ページ内のセクションです。")+'</section>'+
 D.moments.map(function(m,i){return '<section class="site-section '+(i%2===1?"mist":"")+'" id="anchor-'+m.id+'">'+
 '<div class="story-wide '+(i%2===1?"reverse":"")+'">'+photo(m.photo,"MOMENTS / "+m.title)+
 '<div class="split-copy"><div class="story-index">0'+(i+1)+' / MOMENTS</div><h2 class="display-medium">'+m.title+'</h2>'+
 '<p class="body-lg">'+m.strap+'</p><p class="body-md">'+L(m.body[0],m.body[1])+'</p>'+
 '<div class="products-mini">'+m.products.map(function(id){var p=productBy(id);return '<button type="button" data-product="'+id+'">'+p.name+' ↗</button>';}).join("")+'</div>'+
 '</div></div></section>';}).join("")+
 '<section class="site-section compact"><div class="editorial-statement">'+eyebrow("DISCOVER AUX")+'<h2>'+L("Explore the tools behind the moments.","その時間を支える道具へ。")+'</h2>'+bline(L("Shop all products","すべての商品を見る"),"shop")+'</div></section>';
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