/* AUX product family, collection and editorial content data.
   jp: Japanese names; | marks where a Japanese heading may wrap (phrase boundaries). */
window.AUX_DATA = {
  assetBase:"./assets/photos/",
  /* One price for every tool (USD). */
  price:20,
  /* "Most popular" order. Production: page views. Until there are page views, AUX's 3-year unit sales
     (13商品 3年実績.xlsx, 2023-2025); Scoop Tongs is not in that sheet and goes last. */
  popular:["fingertip","whisk","garnish","fry","long","grating","serving","basting","noodle","finetip","mini","bread","scoop"],
  products:[
    {id:"mini",name:"Leye Mini Tongs",jp:"ミニ|ゆびさき|トング",family:"tongs",uses:["table"],image:"shinjo-mini-card.webp",thumb:"shinjo-mini-thumb.webp",thumbScene:"shinjo-mini-1.webp",scene:"shinjo-mini-1.webp",photos:{single:"shinjo-mini-single.webp",scenes:["shinjo-mini-1.webp"],uses:["katou-mini-use1.webp","katou-mini-use2.webp"],detail:"katou-mini-contact.webp",form:"katou-mini-form.webp"},size:"size-mini.webp",feature:"7 cm / light touch"},
    {id:"garnish",name:"Leye Garnish Tongs",jp:"ごはんの|おとも|トング",family:"tongs",uses:["table"],image:"shinjo-garnish-card.webp",thumb:"shinjo-garnish-thumb.webp",thumbScene:"shinjo-garnish-1.webp",scene:"shinjo-garnish-1.webp",photos:{single:"shinjo-garnish-single.webp",scenes:["shinjo-garnish-1.webp","shinjo-garnish-2.webp"],uses:["katou-garnish-use1.webp","katou-garnish-use2.webp"],detail:"katou-garnish-contact.webp",form:"katou-garnish-form.webp"},size:"size-garnish.webp",feature:"Slim tips"},
    {id:"fingertip",name:"Leye Fingertip Tongs",jp:"ゆびさき|トング®",family:"tongs",uses:["table","serve"],image:"shinjo-fingertip-card.webp",thumb:"shinjo-fingertip-thumb.webp",thumbScene:"shinjo-fingertip-2.webp",scene:"shinjo-fingertip-1.webp",photos:{single:"shinjo-fingertip-single.webp",scenes:["shinjo-fingertip-1.webp","shinjo-fingertip-2.webp"],uses:["katou-fingertip-use1.webp","katou-fingertip-use2.webp"],detail:"katou-fingertip-contact.webp",form:"katou-fingertip-form.webp"},size:"size-fingertip.webp",feature:"Fingertip-like tips / soft spring"},
    {id:"scoop",name:"Leye Scoop Tongs",jp:"すくえる|アイス|トング",family:"tongs",uses:["table","serve"],image:"shinjo-scoop-card.webp",thumb:"shinjo-scoop-thumb.webp",thumbScene:"shinjo-scoop-1.webp",scene:"shinjo-scoop-1.webp",photos:{single:"shinjo-scoop-single.webp",scenes:["shinjo-scoop-1.webp"],uses:["katou-scoop-use1.webp","katou-scoop-use2.webp"],detail:"katou-scoop-contact.webp",form:"katou-scoop-form.webp"},size:"size-scoop.webp",feature:"Grip one / scoop a few"},
    {id:"serving",name:"Leye Serving Tongs",jp:"ゆびさき|サーバー|トング",family:"tongs",uses:["serve","table"],image:"shinjo-serving-card.webp",thumb:"shinjo-serving-thumb.webp",thumbScene:"shinjo-serving-2.webp",scene:"shinjo-serving-1.webp",photos:{single:"shinjo-serving-single.webp",scenes:["shinjo-serving-1.webp","shinjo-serving-2.webp"],uses:["katou-serving-use1.webp","katou-serving-use2.webp"],detail:"katou-serving-contact.webp",form:"katou-serving-form.webp"},size:"size-serving.webp",feature:"Form / reach / tip alignment"},
    {id:"fry",name:"Leye Fry Tongs",jp:"あげもの|トング",family:"tongs",uses:["cook"],image:"shinjo-fry-card.webp",thumb:"shinjo-fry-thumb.webp",thumbScene:"shinjo-fry-1.webp",scene:"shinjo-fry-1.webp",photos:{single:"shinjo-fry-single.webp",scenes:["shinjo-fry-1.webp","shinjo-fry-2.webp"],uses:["katou-fry-use1.webp"],detail:"katou-fry-contact.webp",form:"katou-fry-form.webp"},size:"size-fry.webp",feature:"Drain openings"},
    {id:"finetip",name:"Leye Fine Tip Tongs",jp:"おきラク|焼き肉|トング",family:"tongs",uses:["cook"],image:"shinjo-finetip-card.webp",thumb:"shinjo-finetip-thumb.webp",thumbScene:"shinjo-finetip-1.webp",scene:"shinjo-finetip-1.webp",photos:{single:"shinjo-finetip-single.webp",scenes:["shinjo-finetip-1.webp","shinjo-finetip-2.webp"],uses:["katou-finetip-use1.webp","katou-finetip-use2.webp"],detail:"katou-finetip-contact.webp",form:"katou-finetip-form.webp"},size:"size-finetip.webp",feature:"Fine tips / built-in rest"},
    {id:"long",name:"Leye Long Tongs",jp:"もりつけ|トング",family:"tongs",uses:["serve"],image:"shinjo-long-card.webp",thumb:"shinjo-long-thumb.webp",thumbScene:"shinjo-long-1.webp",scene:"shinjo-long-1.webp",photos:{single:"shinjo-long-single.webp",scenes:["shinjo-long-1.webp","shinjo-long-2.webp"],uses:["katou-long-use1.webp","katou-long-use2.webp"],detail:"katou-long-contact.webp",form:"katou-long-form.webp"},size:"size-long.webp",feature:"Extended reach / narrow tips"},
    {id:"noodle",name:"Leye Noodle Tongs",jp:"しっかり|めん|トング",family:"tongs",uses:["cook"],image:"shinjo-noodle-card.webp",thumb:"shinjo-noodle-thumb.webp",thumbScene:"shinjo-noodle-2.webp",scene:"shinjo-noodle-1.webp",photos:{single:"shinjo-noodle-single.webp",scenes:["shinjo-noodle-1.webp","shinjo-noodle-2.webp"],uses:["katou-noodle-use1.webp","katou-noodle-use2.webp"],detail:"katou-noodle-contact.webp",form:"katou-noodle-form.webp"},size:"size-noodle.webp",feature:"Alternating teeth"},
    {id:"bread",name:"Leye Bread Tongs",jp:"ふんわり|パン|トング",family:"tongs",uses:["table","serve"],image:"shinjo-bread-card.webp",thumb:"shinjo-bread-thumb.webp",thumbScene:"shinjo-bread-2.webp",scene:"shinjo-bread-1.webp",photos:{single:"shinjo-bread-single.webp",scenes:["shinjo-bread-1.webp","shinjo-bread-2.webp"],uses:["katou-bread-use1.webp","katou-bread-use2.webp"],detail:"katou-bread-contact.webp",form:"katou-bread-form.webp"},size:"size-bread.webp",feature:"Bread-edge tip"},
    {id:"basting",name:"Leye Basting Tongs",jp:"ソースも|すくえる|ガッシリ|トング",family:"tongs",uses:["cook","serve"],image:"shinjo-basting-card.webp",thumb:"shinjo-basting-thumb.webp",thumbScene:"shinjo-basting-1.webp",scene:"shinjo-basting-1.webp",photos:{single:"shinjo-basting-single.webp",scenes:["shinjo-basting-1.webp","shinjo-basting-2.webp"],uses:["katou-basting-use1.webp"],detail:"katou-basting-contact.webp",form:"katou-basting-form.webp"},size:"size-basting.webp",feature:"Deep, spoon-shaped tips"},
    {id:"whisk",name:"Leye Mini Whisk",jp:"計量|みそ|マドラー",family:"tools",uses:["cook"],image:"shinjo-whisk-card.webp",thumb:"shinjo-whisk-thumb.webp",thumbScene:"shinjo-whisk-1.webp",scene:"shinjo-whisk-1.webp",photos:{single:"shinjo-whisk-single.webp",scenes:["shinjo-whisk-1.webp"],uses:["katou-whisk-use1.webp","katou-whisk-use2.webp"],detail:"katou-whisk-contact.webp",form:"katou-whisk-form.webp"},size:"size-whisk.webp",feature:"Two wire ends"},
    {id:"grating",name:"Leye Grating Spoon",jp:"おろし|スプーン",family:"tools",uses:["cook"],image:"shinjo-grating-card.webp",thumb:"shinjo-grating-thumb.webp",thumbScene:"shinjo-grating-1.webp",scene:"shinjo-grating-1.webp",photos:{single:"shinjo-grating-single.webp",scenes:["shinjo-grating-1.webp"],uses:["katou-grating-use1.webp","katou-grating-use2.webp","katou-grating-use3.webp"],detail:"katou-grating-contact.webp",form:"katou-grating-form.webp"},size:"size-grating.webp",feature:"Grating teeth / spoon basin"}
  ],
  collections:{
    cook:{name:"COOK",photo:"shinjo-basting-1.webp",lead:["For the movements that make a meal.","料理のさまざまな場面で使える道具です。"],body:["From the pan to the plate: gripping, turning, lifting and draining. Discover tools shaped around the actual task.","食材をつかむ、返す、持ち上げる、油を切る。作業に合わせて先端や形状を工夫しています。"],scene:"shinjo-noodle-1.webp",feature:["A little more control, in the middle of cooking.","調理中の小さな動きを、より自然に。"]},
    serve:{name:"SERVE",photo:"shinjo-serving-2.webp",lead:["Made for sharing and serving.","盛り付けや取り分けに。"],body:["From shared plates to carefully arranged dishes, find the tool that helps the movement feel natural.","大皿料理の取り分けから繊細な盛り付けまで、食材を扱いやすい形状を揃えています。"],scene:"shinjo-serving-1.webp",feature:["Pass the dish. Keep the moment.","取り分ける動作で、食卓の流れを止めない。"]},
    table:{name:"TABLE",photo:"shinjo-mini-1.webp",lead:["A considered place at the table.","食卓に、もうひとつの道具。"],body:["From small bites to shared dishes, discover how tongs can become a natural part of the table setting.","小さな食材をつまむときも料理を取り分けるときも、トングを食卓の道具のひとつとして使えます。"],scene:"shinjo-lineup.webp",feature:["Knife. Fork. Tongs.","Knife. Fork. Tongs."]}
  },
  moments:[
    {id:"everyday",title:"EVERYDAY TABLE",strap:"For everyday meals, made a little better.",jp:"なんでもない日の|食卓",jpStrap:"いつもの食事を少しだけ心地よく。",body:["Breakfast, a quick salad, or pasta on a weekday evening. Small movements feel effortless when the right tool is always within reach.","朝食や手早く作るサラダ、平日の夜のパスタ。使いやすい道具が手元にあれば、毎日の細かな作業が楽になります。"],photo:"shinjo-noodle-2.webp",products:["noodle","whisk","fingertip"]},
    {id:"together",title:"TOGETHER AT THE TABLE",strap:"For meals shared with the people who matter.",jp:"大切な人との|食事",jpStrap:"大切な人と食卓を囲む時間に。",body:["A meal with family, a partner, or friends. Pass a favorite dish, share a small bite, and stay in the conversation.","家族やパートナー、友人との食事に。好きな料理を回したり小さなひと口を分け合ったりしながら、会話を楽しめます。"],photo:"shinjo-garnish-2.webp",products:["fingertip","serving","long"]},
    {id:"hosting",title:"HOSTING AT HOME",strap:"For welcoming people into your home.",jp:"人を招く日の|食卓",jpStrap:"自宅に人を招くときに。",body:["A weekend dinner, lunch with friends, or a relaxed gathering at home. Shared platters, salads passed around the table, and serving your guests.","週末のディナーや友人とのランチ、自宅での気軽な集まりに。大皿料理やサラダを取り分けて、ゲストをもてなすときに使えます。"],photo:"shinjo-long-2.webp",products:["serving","bread","scoop"]},
    {id:"special",title:"SPECIAL OCCASIONS",strap:"For moments worth celebrating.",jp:"少し特別な日",jpStrap:"お祝いしたい日に。",body:["Birthdays, anniversaries, holidays and seasonal gatherings. A meal prepared with a little extra care, with tools that complement the occasion without drawing attention to themselves.","誕生日や記念日、祝日や季節の集まりに。少し丁寧に作った料理に、主張しすぎずになじむ道具です。"],photo:"shinjo-finetip-1.webp",products:["fingertip","long","basting"]}
  ],
  businesses:[
    {id:"restaurants",title:"RESTAURANTS",jp:"レストラン",photo:"istock-479169402.webp",body:["From preparation to plating and tableside service, precision tools designed for each task.","調理から盛り付け、テーブルサービスまで、用途に合わせた道具を揃えています。"],products:["finetip","long","serving"]},
    {id:"hotels",title:"HOTELS & HOSPITALITY",jp:"ホテル・|宿泊施設",photo:"istock-2172505701.webp",body:["From the breakfast buffet to the lounge, tools for serving guests with care.","朝食ビュッフェからラウンジまで、ゲストに丁寧に料理を提供するための道具です。"],products:["scoop","serving","fingertip"]},
    {id:"cafes",title:"CAFÉS & BAKERIES",jp:"カフェ・|ベーカリー",photo:"istock-1839957842.webp",body:["Bread, pastries and fresh salads deserve a gentle touch at the counter.","パンやペストリー、サラダをカウンターでやさしく取り分けられます。"],products:["bread","mini","garnish"]},
    {id:"catering",title:"CATERING & EVENTS",jp:"ケータリング・|イベント",photo:"istock-1388916470.webp",body:["From buffets to shared platters, serve food with precise tools that are easy to handle.","ビュッフェから大皿料理まで、扱いやすく精密な道具で料理を取り分けられます。"],products:["serving","long","fry"]},
    {id:"retail",title:"RETAIL & DISTRIBUTION",jp:"小売・|卸売",photo:"shinjo-lineup.webp",body:["Offer your customers kitchen and tabletop tools engineered in Japan, each shaped for a specific task. Explore the AUX range and ask about retail or distribution partnerships.","キッチンウェアショップや百貨店、セレクトショップなど、商品のお取り扱いや卸取引についてご相談いただけます。"],products:["fingertip","mini","whisk"]}
  ]
};
window.AUX_DATA.compare = {
 mini:{best:"Small bites at the table",moment:"Everyday Table",jpBest:"食卓で小さなものをつまむ",jpMoment:"なんでもない日の食卓"},
 garnish:{best:"Tea bags, olives and small bites",moment:"Everyday Table",jpBest:"ティーバッグ・オリーブ・小さなもの",jpMoment:"なんでもない日の食卓"},
 fingertip:{best:"Small and thin foods, at the table",moment:"Together at the Table",jpBest:"小さなもの・薄いものを食卓で",jpMoment:"大切な人との食事"},
 scoop:{best:"Ice: one cube or a scoop",moment:"Hosting at Home",jpBest:"氷をつまむ・すくう",jpMoment:"人を招く日の食卓"},
 serving:{best:"Salads and delicate slices",moment:"Hosting at Home",jpBest:"サラダ・生ハム",jpMoment:"人を招く日の食卓"},
 fry:{best:"Lifting and draining fried food",moment:"Everyday Table",jpBest:"揚げ物をつかむ・油を切る",jpMoment:"なんでもない日の食卓"},
 finetip:{best:"Sliced steak and roast beef",moment:"Special Occasions",jpBest:"スライスしたステーキ・ローストビーフ",jpMoment:"少し特別な日"},
 long:{best:"Plating salads and roasts",moment:"Special Occasions",jpBest:"サラダ・焼いたお肉の盛り付け",jpMoment:"少し特別な日"},
 noodle:{best:"Noodles, down to the last strand",moment:"Everyday Table",jpBest:"麺を最後の1本までつかむ",jpMoment:"なんでもない日の食卓"},
 bread:{best:"Toast, open sandwiches, croissants",moment:"Hosting at Home",jpBest:"トースト・具をのせたパン・クロワッサン",jpMoment:"人を招く日の食卓"},
 basting:{best:"Large foods, plus a spoonful of sauce",moment:"Special Occasions",jpBest:"大きな食材とソース",jpMoment:"少し特別な日"},
 whisk:{best:"Dressings, sauces and eggs",moment:"Everyday Table",jpBest:"ドレッシング・ソース・卵",jpMoment:"なんでもない日の食卓"},
 grating:{best:"Grating citrus, ginger and garlic",moment:"Everyday Table",jpBest:"柑橘・しょうが・にんにくをおろす",jpMoment:"なんでもない日の食卓"}
};
/* Product page copy and specifications, one entry per product.
   Facts come from the current AUX site (aux-ltd.co.jp product pages), the product spec sheet
   (weights; 18-8 + nylon for the Mini Whisk) and the Tong Encyclopedia (Scoop Tongs uses).
   Every text block that sits next to a photo names that photo, and says what the photo shows:
   primary and each of uses / details are [photo, heading EN, heading JA, text EN, text JA].
   lead/proof: under the product name (next to the gallery). specs: cm and g (inches and ounces
   are computed when shown). care: care and precautions. */
window.AUX_DATA.pdp = {
 mini:{
  lead:["A compact 7 cm version of our Fingertip Tongs, made for the table.","ゆびさきトングを全長7cmにした、食卓向けのミニサイズです。"],
  primary:["shinjo-mini-1.webp","Pick up one small bite.","小さな食材をつまむ","The fingertip-shaped tips pick up a single berry at the table.","指先の形をした先端で、食卓でもベリーをひと粒ずつつまめます。"],
  uses:[["katou-mini-use1.webp","From a shared plate","大皿から","Take an olive or a piece of cheese without touching the food.","オリーブやチーズも、指で触れずに取れます。"],
        ["katou-mini-use2.webp","Beside the cutlery","カトラリーの横に","At 7 cm, it sits with the knife and fork without getting in the way.","全長7cmなので、ナイフやフォークの横に置いても邪魔になりません。"],
        ["katou-mini-contact.webp","Small, round foods","小さく丸いものも","The tips close like two fingertips and hold a single olive firmly.","先端が指先のように合わさり、オリーブひと粒もしっかりつかめます。"]],
  detailsLead:["The shape of our Fingertip Tongs, scaled down to 7 cm.","ゆびさきトングと同じ先端形状を全長7cmに収めました。"],
  details:[["katou-mini-form.webp","Fingertip-shaped tips","指先のような先端","The same tip shape as the Fingertip Tongs, in a smaller size.","ゆびさきトングと同じ先端形状を採用しています。"],
           ["shinjo-mini-card.webp","Patented spring design","特許技術のバネ","A patented spring design lets you grip with a light touch.","特許技術によるバネ構造で、軽い力でつかめます。"],
           ["shinjo-mini-single.webp","Tips stay off the table","先端が浮く置き方","Turn it over and the tips stay off the table.","裏返して置くと、先端がテーブルに触れない構造です。"]],
  specs:{length:7,height:3.3,weight:12,material:["18-0 stainless steel","18-0ステンレス"]},
  care:[["Dishwasher safe.","食器洗い乾燥機に対応しています。"]]
 },
 garnish:{
  lead:["Slim tongs for tea bags, olives and other small things at the table.","ティーバッグやオリーブなどをつまみやすい細身のトングです。"],
  primary:["shinjo-garnish-1.webp","Pick up one piece, even from a narrow jar.","口の狭い瓶からも|1つずつ取り出す","The slim, gap-free tips pick up small, slippery foods from jars and small bowls.","細い先端がすき間なく閉じるので、瓶や小さな器から小さく滑りやすいものもつまめます。"],
  uses:[["katou-garnish-use2.webp","Tea bags","ティーバッグに","Lift a tea bag out of the pot or cup without touching it.","ポットやカップからティーバッグを手で触れずに取り出せます。"],
        ["katou-garnish-use1.webp","Olives and pickles","オリーブやピクルスに","Lift olives one at a time, even from a narrow jar.","口の狭い瓶からも、オリーブを1つずつ取り出せます。"],
        ["shinjo-garnish-2.webp","Toppings for bread","パンにのせる具に","Add toppings to bread a piece at a time.","パンにのせる具材を、1つずつつまんで盛り付けられます。"]],
  detailsLead:["A 13.5 cm pair of tongs designed for the table.","食卓で使いやすい全長13.5cmのトングです。"],
  details:[["katou-garnish-contact.webp","Gap-free tips","すき間なく閉じる先端","The tips close fully, so small and thin pieces don't slip out.","先端がすき間なく閉じるので、小さなものや薄いものもつまめます。"],
           ["katou-garnish-form.webp","Light grip","やわらかな握り心地","A gentle squeeze is enough to hold small foods securely.","やわらかな握り心地で、軽い力でつかめます。"],
           ["shinjo-garnish-single.webp","Tips stay off the table","先端が浮く置き方","Turn it over and the tips stay off the table.","裏返して置くと、先端がテーブルに触れない構造です。"]],
  specs:{length:13.5,height:2.5,weight:28,material:["18-0 stainless steel","18-0ステンレス"]},
  care:[["Dishwasher safe.","食器洗い乾燥機に対応しています。"]]
 },
 fingertip:{
  lead:["Fingertip-like control, with a form designed to belong at the table.","指先のように繊細につまめる、食卓でも使いやすいトングです。"],
  primary:["shinjo-fingertip-2.webp","Set it beside the knife and fork.","ナイフとフォークの横に置く。","Small and simple enough to stay on the table with the cutlery, ready to share food during the meal.","小さくシンプルなので、カトラリーと並べて食卓に置き、食事中の取り分けに使えます。"],
  uses:[["shinjo-fingertip-1.webp","Sharing a salad","サラダを取り分ける","Serve salad from the middle of the table to each plate.","テーブル中央のサラダを、それぞれの皿へ取り分けられます。"],
        ["katou-fingertip-use1.webp","Thin slices","薄いものも","The tapered tips pick up thin slices of prosciutto.","先端が細いので、生ハムのような薄いものもつまめます。"],
        ["katou-fingertip-contact.webp","A light hold","やさしくつかむ","A soft spring helps you hold delicate foods with a light touch.","やわらかいバネで、繊細な食材もやさしくつかめます。"]],
  detailsLead:["Palm-sized, with a soft spring and tips that taper like fingertips.","手のひらに収まるサイズに、やわらかいバネと指先のように細い先端を備えています。"],
  details:[["katou-fingertip-form.webp","Tapered tips","細い先端","The tips taper like fingertips, for quick, precise handling.","先端が指先のように細く、すばやく正確に扱えます。"],
           ["shinjo-fingertip-card.webp","Patented bending process","特許取得の曲げ加工","A patented bending process gives a soft spring, so a small squeeze is enough.","特許取得の曲げ加工により、軽い力でつかめます。"],
           ["shinjo-fingertip-single.webp","Tips stay off the table","先端が浮く置き方","Turn it over and the tips lift off the table.","裏返して置くと先端がテーブルに触れず、清潔に使える構造です。"]],
  specs:{length:14.7,height:4.5,weight:60,material:["18-0 stainless steel","18-0ステンレス"]},
  care:[["Dishwasher safe.","食器洗い乾燥機に対応しています。"]]
 },
 scoop:{
  lead:["Open to grip a single ice cube. Close to scoop several at once.","開くと氷を1つずつつまめて、閉じると複数の氷をすくえます。"],
  primary:["shinjo-scoop-1.webp","Ice for a tall glass.","グラスに氷を入れる","Squeeze it closed to scoop ice, then pour it into a tall glass through the narrow tip.","閉じて氷をすくい、細い先端からロンググラスへそのまま入れられます。"],
  uses:[["katou-scoop-use2.webp","One piece","ひとつ取る","Open, it works as tongs: pick up a single piece of ice.","開けばトング。氷を1つつまめます。"],
        ["katou-scoop-use1.webp","Several at once","まとめてすくう","Closed, it becomes a scoop for several pieces at once.","閉じればスコップ。氷をまとめてすくえます。"],
        ["katou-scoop-contact.webp","Large pieces too","大きな氷も","Serrated tips give a secure grip on larger pieces of ice.","先端のギザギザで、大きめの氷もしっかりつかめます。"]],
  detailsLead:["Ice tongs and an ice scoop in one 16.6 cm tool.","全長16.6cmの1本で、氷をつまむ・すくうの両方に対応します。"],
  details:[["shinjo-scoop-card.webp","Serrated tips","ギザギザの先端","The serrated edge grips ice so it doesn't slip.","先端のギザギザ形状で、氷をしっかりつかめます。"],
           ["katou-scoop-form.webp","A scoop-shaped side","スコップ形の片側","One side is shaped like a scoop, so the closed tongs collect several ice cubes at once.","片側がスコップ状になっており、閉じると氷をまとめてすくえます。"],
           ["shinjo-scoop-single.webp","Strong stainless steel","丈夫なステンレス","Sturdy stainless steel helps separate cubes that have lightly stuck together in the ice maker.","製氷機の中で軽くくっついた氷も離せる、丈夫なステンレス製です。"]],
  specs:{length:16.6,width:5.3,height:2.7,closed:true,material:["18-0 stainless steel","18-0ステンレス"]},
  care:[["Dishwasher safe.","食器洗い乾燥機に対応しています。"],
        ["If kept in the ice maker, the tongs become very cold. Take care when holding them with wet hands.","製氷機内に長時間保管すると本体が冷たくなります。濡れた手で持つ際はご注意ください。"],
        ["Do not use them to break up blocks of ice. A strong impact can damage or bend the tongs.","氷のかたまりを砕くような強い衝撃を与えると、本体が破損・変形する恐れがあります。"]]
 },
 serving:{
  lead:["Serve salad while seated, and lift delicate slices of prosciutto gently.","座ったままサラダを取り分けられる形状です。ちぎれやすい生ハムもやさしくつかめます。"],
  primary:["shinjo-serving-1.webp","Serve without standing up.","座ったまま取り分ける。","The curve from handle to tip is angled for serving while seated, so you can pass salad from the shared dish to a plate without getting up.","持ち手から先端までのカーブを、イスに座ったまま取り分けやすい角度にしています。"],
  uses:[["katou-serving-use1.webp","A generous portion","たっぷりつかむ","Takes a full serving of salad in one grip.","サラダを一度にたっぷりつかめます。"],
        ["shinjo-serving-2.webp","Delicate slices","ちぎれやすいものも","The tips lift thin slices of prosciutto gently, helping keep them intact.","ちぎれやすい生ハムも、やさしく持ち上げられます。"],
        ["katou-serving-use2.webp","Onto each plate","取り皿へ","Place salad neatly on each plate.","サラダを取り皿へきれいに取り分けられます。"]],
  detailsLead:["Tips that meet exactly, finished by craftspeople in Tsubame-Sanjo.","燕三条の職人技でつくる、ぴたりと合わさる先端。"],
  details:[["katou-serving-contact.webp","Gentle on leaves","葉物をやさしく","The tips grip leafy greens gently, helping prevent bruising.","食材を包み込むようにつかむので、レタスなどの葉物も傷めにくくなっています。"],
           ["katou-serving-form.webp","Precisely matched tips","ぴたりと合う刃先","Craftspeople in Tsubame-Sanjo finish the tips so they meet exactly.","燕三条の職人技で、刃先がぴったり合わさります。"],
           ["shinjo-serving-card.webp","Patented spring design","特許取得のバネ","A patented spring design gives a soft, gentle hold.","特許取得のバネで、やわらかくつかめます。"]],
  specs:{length:21,height:5.2,weight:85,material:["18-0 stainless steel","18-0ステンレス"]},
  care:[["Dishwasher safe.","食器洗い乾燥機に対応しています。"]]
 },
 fry:{
  lead:["Grip fried food and let the oil drain through.","揚げ物をつかんだまま油を切れるトングです。"],
  primary:["shinjo-fry-1.webp","Lift it, drain it.","つかんだまま油を切る","The ring-shaped tips are open in the middle, so oil runs off while you lift a cutlet from the pan.","先端の大きな穴から油が落ちるので、カツレツを持ち上げたまま油を切れます。"],
  uses:[["katou-fry-use1.webp","Over the pot","鍋の上で","Hold fried food over the oil for a moment and let it drip.","揚げたものを鍋の上で持ったまま、油を切れます。"],
        ["shinjo-fry-2.webp","Serving at the table","食卓で取り分ける","The open-ring tips touch less of the food, so softer vegetables and salads release easily.","リング状の先端は食材に触れる面が少なく、やわらかい野菜もくっつきにくい設計です。"],
        ["katou-fry-contact.webp","Heavy pieces","重いものも","The ring-shaped tips grip larger or irregularly shaped fried foods securely.","大きな揚げ物や形の不揃いな食材も、しっかりつかめます。"]],
  detailsLead:["Openings to drain oil, and a spring that stays soft in the hand.","油を切りやすい先端と軽い握り心地が特徴です。"],
  details:[["katou-fry-form.webp","Large openings","大きな穴","The open rings let oil drain as soon as you lift.","大きな穴から油がよく切れます。"],
           ["shinjo-fry-card.webp","Patented spring design","特許取得のバネ","An easy opening angle and a patented spring design keep the grip soft.","使いやすい開き角度と特許取得のバネ構造で、やわらかく握れます。"],
           ["shinjo-fry-single.webp","One-piece stainless steel","ステンレス一体成形","Formed from a single piece of stainless steel, with no joints to clean around.","ステンレス一体成形で継ぎ目がなく、洗いやすい構造です。"]],
  specs:{length:23,height:4,weight:45,material:["18-0 stainless steel","18-0ステンレス"]},
  care:[["Dishwasher safe.","食器洗い乾燥機に対応しています。"]]
 },
 finetip:{
  lead:["Fine tips for sliced steak and roast beef, from the board to each plate.","細い先端でスライスしたステーキやローストビーフをつかみ、取り皿へ移せます。"],
  primary:["shinjo-finetip-1.webp","Serve sliced meat at the table.","切り分けた肉を取り分ける","The fine tips pick up one slice of steak or roast beef at a time and hold it securely.","細い先端で、ステーキやローストビーフを一切れずつしっかりつかめます。"],
  uses:[["katou-finetip-use1.webp","From the board","まな板から","Pick up a slice of steak straight from the cutting board.","まな板の上で切ったステーキも、そのままつかめます。"],
        ["shinjo-finetip-2.webp","Plating","盛り付けに","Place shrimp and other small pieces exactly where you want them on the plate.","えびなどの小さな具材も、皿の上の狙った位置に盛り付けられます。"],
        ["katou-finetip-use2.webp","Resting between dishes","食器の間に置く","Set the tongs down and the raised tips stay clear of the plate.","お皿に置いても先端が浮いて、食器に当たりません。"]],
  detailsLead:["Fine tips that stay aligned when gripping, and stay raised when set down.","つかむときにズレにくく、置いたときは先端が浮く構造です。"],
  details:[["katou-finetip-contact.webp","Aligned fine tips","ズレにくい細い先端","A patented design keeps the fine tips aligned as they close, so even a thin slice is held steadily.","閉じたときに先端がズレにくい特許技術で、薄い一切れも安定してつかめます。"],
           ["katou-finetip-form.webp","Raised tips","高く浮く先端","Set down, the tips sit high enough to clear the plate and the table.","置いたときも先端が皿やテーブルに触れない高さです。"],
           ["shinjo-finetip-card.webp","A simple form","シンプルな形","A simple shape that sits comfortably in the hand and rinses clean.","手になじむシンプルな形状で、汚れも落としやすくなっています。"]],
  specs:{length:24,height:6.3,weight:62,material:["18-0 stainless steel","18-0ステンレス"]},
  care:[["Dishwasher safe.","食器洗い乾燥機に対応しています。"]]
 },
 long:{
  lead:["A 25 cm pair of tongs with fine tips for neatly plating salads and sliced roasts.","全長25cmのトングです。細い先端でサラダやスライスしたロースト肉を盛り付けられます。"],
  primary:["shinjo-long-1.webp","Plate a salad neatly.","サラダを狙った位置に盛り付ける","The fine tips place each piece exactly where you want it on the plate.","先端が細いので、サラダの具を狙った位置に盛り付けられます。"],
  uses:[["shinjo-long-2.webp","Sliced roasts","ロースト肉の盛り付けに","Arrange sliced roast beef on the plate.","ローストビーフなどの焼いたお肉も、盛り付けやすい長さです。"],
        ["katou-long-use1.webp","From a large bowl","大きな器から","At 25 cm, it reaches into a large salad bowl.","全長25cmなので、大きな器のサラダにも届きます。"],
        ["katou-long-use2.webp","Onto each plate","取り皿へ","Place soft leaves gently on each plate.","やわらかな葉物もつぶしにくく、取り皿へ丁寧に移せます。"]],
  detailsLead:["A light feel with a secure hold.","軽い握り心地で食材をしっかりつかめます。"],
  details:[["katou-long-contact.webp","Gentle tips","やさしい先端","The fine tips hold a single leaf gently.","細い先端で、葉一枚もやさしくつかめます。"],
           ["shinjo-long-card.webp","Patented spring design","特許取得のバネ","A patented spring design holds firmly with little force.","特許取得のやわらかいバネで、少しの力でしっかりつかめます。"],
           ["shinjo-long-single.webp","Tips stay off the table","先端が浮く置き方","Turn it over and the tips stay off the table.","裏返して置くと、先端がテーブルに触れない構造です。"]],
  specs:{length:25,height:3.8,weight:77,material:["18-0 stainless steel","18-0ステンレス"]},
  care:[["Dishwasher safe.","食器洗い乾燥機に対応しています。"]]
 },
 noodle:{
  lead:["Lift a full portion of noodles, down to the last strand.","たっぷりの麺から鍋に残った最後の1本までつかめます。"],
  primary:["shinjo-noodle-1.webp","From a full portion to the last strand.","ひと束から最後の1本まで","The tips meet exactly, so you can pick up a full portion of pasta or the last strand left in the pan.","先端がぴったり合うので、たっぷりの麺も最後の1本までつかめます。"],
  uses:[["katou-noodle-use1.webp","Straight from the pot","鍋から直接","The longer handle gives your hand more room when lifting noodles from boiling water.","柄が長く、熱い鍋から麺を引き上げる際も手元に余裕が生まれます。"],
        ["shinjo-noodle-2.webp","Plating","盛り付けに","The smooth upper part keeps pasta from tangling, so it slides neatly onto the plate.","先端の上部がなめらかで麺が絡みにくく、皿に移しやすい設計です。"],
        ["katou-noodle-contact.webp","A full grip","たっぷりつかむ","Staggered serrations hold a large amount of noodles at once.","互い違いのギザギザで、たっぷりの麺をしっかりつかめます。"]],
  detailsLead:["Tips that grip pasta, then let it go cleanly.","麺をつかみやすく、離しやすい先端です。"],
  details:[["katou-noodle-form.webp","Shallow serrations","浅めのギザギザ","Shallow serrations make the tips easy to rinse after cooking.","浅めのギザギザ形状で、使用後も洗いやすい設計です。"],
           ["shinjo-noodle-card.webp","Patented spring design","特許取得のバネ","A patented spring design lets you grip with a light touch.","特許取得のバネで、軽い力でつかめます。"],
           ["shinjo-noodle-single.webp","Tips stay off the counter","先端が浮く置き方","Turn it over and the tips stay off the counter.","裏返して置くと、先端が調理台に触れない構造です。"]],
  specs:{length:25,height:4,weight:81,material:["18-0 stainless steel","18-0ステンレス"]},
  care:[["Dishwasher safe.","食器洗い乾燥機に対応しています。"]]
 },
 bread:{
  lead:["Grips bread by the edge, helping keep the toppings in place.","パンの端をつかむことで、具材を崩しにくいトングです。"],
  primary:["shinjo-bread-2.webp","Lift toast without touching the toppings.","具材に触れずに|トーストを|持ち上げる","The shaped tips grip the edge of the bread, helping keep the toppings in place.","パンの端をつかむ形状で、トーストやオープンサンドの具材を崩しにくくなっています。"],
  uses:[["katou-bread-use2.webp","Open sandwiches","具をのせたパンに","Pick up an open sandwich by the crust, without touching the topping.","具材に触れずに、パンの端をつかめます。"],
        ["katou-bread-use1.webp","Croissants","クロワッサンに","The shaped tips gently grip different breads, including croissants.","クロワッサンなど形の違うパンも、やさしくつかめます。"],
        ["shinjo-bread-1.webp","From the board","ボードから","Serve open sandwiches from a board onto plates.","ボードに並べたパンも取り皿へ移しやすくなっています。"]],
  detailsLead:["A head shaped around the bread.","パンの端をつかみやすい先端形状です。"],
  details:[["katou-bread-contact.webp","Tips shaped for bread","パンに合わせた先端","The tip shape follows the curve of the bread.","パンの形にしっかりフィットする先端です。"],
           ["katou-bread-form.webp","Easy opening angle","使いやすい開き角度","Opens to a width that suits bread.","パンをつかみやすい開き角度にこだわりました。"],
           ["shinjo-bread-card.webp","Patented spring design","特許技術のバネ","A patented spring design lets you grip with a light touch.","特許技術のバネ構造で、軽い力でつかめます。"]],
  specs:{length:25,height:3.5,weight:81,material:["18-0 stainless steel","18-0ステンレス"]},
  care:[["Dishwasher safe.","食器洗い乾燥機に対応しています。"]]
 },
 basting:{
  lead:["Grip large cuts, then spoon sauce over them with the same tool.","大きな食材をつかみ、ソースもすくえるトングです。"],
  primary:["shinjo-basting-1.webp","Grip it, then spoon the sauce.","つかんでソースをかける","One side is deep enough to hold about a tablespoon, so you can spoon sauce over food in the pan without switching tools.","片側が深くなっていて約大さじ1すくえるので、道具を持ち替えずにフライパンの中でソースをかけられます。"],
  uses:[["shinjo-basting-2.webp","Large, heavy pieces","大きく重いものも","Holds a thick cut of meat securely.","厚切りのお肉も、ガッシリつかめます。"],
        ["katou-basting-use1.webp","In the pan","フライパンの中で","The extended, angled handle makes it easier to reach into the pan.","長めのハンドルと角度のついた形状で、フライパンの中へ手を伸ばしやすくしています。"],
        ["katou-basting-contact.webp","Wraps around the food","包みこむようにつかむ","The head closes around the food and holds it from both sides.","食材を包み込むようにつかみます。"]],
  detailsLead:["A deep, spoon-shaped side for sauce, and an extended handle for the stove.","ソースをすくえる片側の深さと、加熱調理で扱いやすい長めのハンドルが特徴です。"],
  details:[["katou-basting-form.webp","A deep side for sauce","ソースをすくう深さ","One side is shaped like a spoon and holds about 1 tablespoon.","片側が深くなっていて、約大さじ1すくえます。"],
           ["shinjo-basting-card.webp","Patented spring design","特許取得のバネ","A patented spring design gives a soft grip.","特許取得のバネでやわらかくつかめます。"],
           ["shinjo-basting-single.webp","Tips stay off the counter","先端が浮く置き方","Turn it over and the tips stay off the counter.","裏返して置くと、先端が調理台に触れない構造です。"]],
  specs:{length:25.7,height:4.9,weight:105,material:["18-0 stainless steel","18-0ステンレス"]},
  care:[["Dishwasher safe.","食器洗い乾燥機に対応しています。"]]
 },
 whisk:{
  lead:["A small whisk for dressings, sauces and a single egg.","ドレッシングやソース、卵1個を混ぜるのに適した小さな泡立て器です。"],
  primary:["shinjo-whisk-1.webp","Mix it in a small bowl.","小さなボウルで混ぜる","Sized for small bowls: mix a sauce or a dressing.","小さなボウルで、ソースやドレッシングを混ぜられます。"],
  uses:[["katou-whisk-use1.webp","Dressings","ドレッシングに","Mix oil, lemon and seasonings into a dressing.","油やレモン、調味料を混ぜてドレッシングを作れます。"],
        ["katou-whisk-use2.webp","One egg","卵ひとつ","Beat a single egg.","卵1個を溶くときにも使えます。"],
        ["katou-whisk-contact.webp","Small amounts","少量でも","The rounded heads mix small amounts easily in a compact bowl.","丸みのある先端で、少量の材料も小さなボウルで混ぜやすくなっています。"]],
  detailsLead:["Two differently sized heads, with a sealed connection to the handle.","大小2つの先端と、密閉されたハンドル接続部が特徴です。"],
  details:[["katou-whisk-form.webp","A head at each end","両端に大小の玉","Choose the larger or smaller end to suit the bowl and the amount you're mixing.","器の大きさや混ぜる量に合わせて、大きい玉と小さい玉を使い分けられます。"],
           ["shinjo-whisk-card.webp","Sealed joint","密閉された接続部","The heads are fixed to the handle with an inner plug and sealed.","計量部とハンドルの接続部分は中栓で固定し、密閉しています。"],
           ["shinjo-whisk-single.webp","Made in Tsubame-Sanjo","燕三条製","Sturdy stainless steel, made in Tsubame-Sanjo.","燕三条でつくられた丈夫なステンレス製です。"]],
  specs:{length:20,diameter:4,weight:20,material:["18-8 stainless steel; inner plug: nylon","18-8ステンレス、中栓：ナイロン"]},
  care:[["Dishwasher safe.","食器洗い乾燥機に対応しています。"]]
 },
 grating:{
  lead:["Grate citrus, ginger or garlic into the spoon, then stir it straight into the dish.","柑橘類やしょうが、にんにくをおろし、そのまま料理に混ぜられます。"],
  primary:["shinjo-grating-1.webp","Grate it over the dish.","料理の上でおろす","Grate lemon peel straight over a salad, only as much as you need.","サラダの上で、レモンの皮を必要な分だけおろせます。"],
  uses:[["katou-grating-use1.webp","A finishing touch","仕上げに","Add fresh zest to pasta just before serving.","パスタの仕上げに柑橘の皮をその場でおろして加えられます。"],
        ["katou-grating-use2.webp","Grate, mix, pour","おろす、混ぜる、かける","The spoon holds what you grate, so you can mix it and pour it over the dish.","おろしたものをスプーンで受けて、混ぜて、そのまま料理にかけられます。"],
        ["katou-grating-use3.webp","Garlic","にんにくに","Grate garlic straight into oil or a dressing.","にんにくをおろし、そのまま油やドレッシングに加えられます。"]],
  detailsLead:["Blades set by craftspeople in Tsubame-Sanjo.","燕三条の職人による目立て。"],
  details:[["katou-grating-contact.webp","60° blades","60度のおろし刃","The blades are raised at a 60° angle to grate smoothly and consistently.","60度に起こしたおろし刃で食材が滑りにくく、スムーズにおろせます。"],
           ["katou-grating-form.webp","Easy to rinse","洗い流しやすい刃","Ginger fibers are less likely to catch in the blades, so cleanup is easier.","しょうがなどの繊維が刃に絡みにくく、洗い流しやすい構造です。"],
           ["shinjo-grating-card.webp","Steady handle","安定する柄","The handle lets it rest steadily and is easy to pick up again.","おろした後も安定して置けて、手に取りやすい柄の形状です。"]],
  specs:{length:16.5,width:4,weight:50,material:["18-0 stainless steel","18-0ステンレス"]},
  care:[["Dishwasher safe.","食器洗い乾燥機に対応しています。"]]
 }
};
