(function(){
  var IMG='/auxusa/assets/wireframe/';
  var products=[
    {name:'AUX Mini Tongs',jp:'ミニゆびさきトング',family:'tongs',uses:['table'],tag:'Small enough for the details.',feature:'7cm / tip / spring',img:'product-pair-minimal.webp'},
    {name:'AUX Garnish Tongs',jp:'ごはんのおともトング',family:'tongs',uses:['table'],tag:'For the little things.',feature:'slim tip',img:'table-tea-bag.webp'},
    {name:'AUX Fingertip Tongs',jp:'ゆびさきトング®',family:'tongs',uses:['table','serve'],tag:'Knife. Fork. AUX.',feature:'fingertip-like tip / soft spring',img:'small-food-transfer.webp'},
    {name:'AUX Scoop Tongs',jp:'すくえるアイストング',family:'tongs',uses:['table','serve'],tag:'Grip one. Scoop a few.',feature:'OPEN / CLOSED pair',img:'small-food-olives-wide.webp'},
    {name:'AUX Serving Tongs',jp:'ゆびさきサーバートング',family:'tongs',uses:['serve','table'],tag:'Made for the middle of the table.',feature:'tip alignment / form',img:'serve-salad.webp'},
    {name:'AUX Fry Tongs',jp:'あげものトング',family:'tongs',uses:['cook'],tag:'Lift. Drain. Serve.',feature:'large ring openings',img:'cook-frying.webp'},
    {name:'AUX Fine Tip Tongs',jp:'おきラク焼き肉トング',family:'tongs',uses:['cook'],tag:'Fine tips. Clean rest.',feature:'fine tip + built-in rest',img:'cook-steak-pan.webp'},
    {name:'AUX Long Tongs',jp:'もりつけトング',family:'tongs',uses:['serve'],tag:'More reach. Same light touch.',feature:'long profile / slim tip',img:'serving-salmon.webp'},
    {name:'AUX Noodle Tongs',jp:'しっかりめんトング',family:'tongs',uses:['cook'],tag:'Down to the last strand.',feature:'alternating teeth',img:'cook-pasta.webp'},
    {name:'AUX Bread Tongs',jp:'ふんわりパントング',family:'tongs',uses:['table','serve'],tag:'Hold the edge. Leave the good part alone.',feature:'purpose-shaped bread edge tip',img:'table-tea-bag.webp'},
    {name:'AUX Basting Tongs',jp:'ソースもすくえるガッシリトング',family:'tongs',uses:['cook'],tag:'Grip. Scoop. Baste.',feature:'deep spoon-shaped tips',img:'cook-steak-pan.webp'},
    {name:'AUX Mini Whisk',jp:'計量みそマドラー',family:'tools',uses:['cook'],tag:'Small whisk. Everyday jobs.',feature:'small / large wire ends',img:'plating-scallops.webp'},
    {name:'AUX Grating Spoon',jp:'おろしスプーン',family:'tools',uses:['cook'],tag:'Grate. Stir. Finish.',feature:'60° grating teeth / spoon basin',img:'plating-scallops.webp'}
  ];

  function productCard(p){
    return '<article class="product-card-v2" data-go="pdp">'+
      '<div class="v2-photo"><img src="'+IMG+p.img+'" alt=""><span class="photo-note">V1仮写真 / 本番物撮りへ差替</span></div>'+
      '<h4>'+p.name+'</h4><div class="jpname">'+p.jp+'</div>'+
      '<div class="meta">'+p.tag+'</div><div class="rating">★★★★★ <span style="color:#777">— reviews</span></div>'+
    '</article>';
  }
  function fillProducts(){
    document.querySelectorAll('[data-grid]').forEach(function(grid){
      var type=grid.getAttribute('data-grid');
      var list=products;
      if(type==='tongs') list=products.filter(function(p){return p.family==='tongs';});
      if(type==='tools') list=products.filter(function(p){return p.family==='tools';});
      if(type==='cook'||type==='serve'||type==='table') list=products.filter(function(p){return p.uses.indexOf(type)>-1;});
      if(type==='hospitality') list=products.filter(function(p){return ['AUX Fingertip Tongs','AUX Serving Tongs','AUX Long Tongs','AUX Fine Tip Tongs'].indexOf(p.name)>-1;});
      grid.innerHTML=list.map(productCard).join('');
    });
  }

  function header(){
    return '<div class="site-header">'+
      '<div class="logo" data-go="home">AUX</div>'+
      '<div class="header-right"><nav class="globalnav">'+
        '<button data-go="shop">SHOP</button>'+
        '<button data-go="tongs">AUX TONGS</button>'+
        '<button data-go="inuse">IN USE</button>'+
        '<button data-go="why">WHY AUX</button>'+
        '<button data-go="professionals" class="pro-link">FOR PROFESSIONALS</button>'+
      '</nav><div class="actions"><button class="action-item"><span>Search</span></button><button class="action-item"><span>Cart (0)</span></button></div></div>'+
    '</div>';
  }
  function footer(){
    return '<footer class="site-footer"><div class="footer-grid">'+
      '<div><div class="footer-logo" data-go="home">AUX</div><p style="font-size:9px;color:#aaa;max-width:260px">必要なときには、きちんと応える。でも、食卓では出しゃばらない。</p></div>'+
      '<div class="footer-col"><b>Shop</b><span data-go="shop">Shop All</span><span data-go="tongs">AUX TONGS</span><span data-go="tools">AUX Tools</span></div>'+
      '<div class="footer-col"><b>Use</b><span data-go="cook">COOK</span><span data-go="serve">SERVE</span><span data-go="table">TABLE</span><span data-go="inuse">In Use</span></div>'+
      '<div class="footer-col"><b>Brand</b><span data-go="why">Why AUX</span><span data-go="third">The Third Utensil</span><span data-go="engineering">Design & Engineering</span><span data-go="tsubame">Tsubame-Sanjo</span></div>'+
      '<div class="footer-col"><b>Business / Support</b><span data-go="professionals">For Professionals</span><span data-go="faq">FAQ</span><span data-go="shipping">Shipping</span><span data-go="contact">Contact</span></div>'+
    '</div></footer>';
  }

  document.querySelectorAll('.js-header').forEach(function(x){x.innerHTML=header();});
  document.querySelectorAll('.js-footer').forEach(function(x){x.innerHTML=footer();});
  fillProducts();

  var routes={
    home:'/',shop:'/collections/all',tongs:'/collections/aux-tongs',tools:'/collections/aux-tools',
    cook:'/collections/cook',serve:'/collections/serve',table:'/collections/table',
    inuse:'/pages/in-use',pdp:'/products/fingertip-tongs',
    why:'/pages/why-aux',third:'/pages/the-third-utensil',engineering:'/pages/engineering',tsubame:'/pages/tsubame-sanjo',
    professionals:'/pages/professionals',hospitality:'/pages/hospitality',businessflow:'/working/b2b-flow',
    faq:'/pages/faq',shipping:'/pages/shipping',returns:'/pages/returns',contact:'/pages/contact'
  };
  var pages=Array.prototype.slice.call(document.querySelectorAll('.v2-page'));
  function showPage(id,update){
    if(!routes[id]) id='home';
    pages.forEach(function(p){p.style.display=p.id===id?'block':'none';});
    document.querySelectorAll('.page-link').forEach(function(b){b.classList.toggle('active',b.getAttribute('data-page')===id);});
    var address=document.getElementById('address'); if(address) address.textContent='aux-global.com'+routes[id];
    document.querySelector('.workspace').scrollTop=0; window.scrollTo(0,0);
    if(update!==false){
      var u=new URL(location.href);u.searchParams.set('page',id);history.replaceState(null,'',u);
    }
  }

  document.body.addEventListener('click',function(e){
    var go=e.target.closest('[data-go]');
    if(go){var id=go.getAttribute('data-go');if(routes[id]){showPage(id,true);return;}}
    var nav=e.target.closest('[data-page]');
    if(nav){showPage(nav.getAttribute('data-page'),true);}
  });

  var app=document.getElementById('app');
  var layout=document.getElementById('layout');
  document.getElementById('metaToggle').addEventListener('click',function(){
    app.classList.toggle('show-meta');
    this.classList.toggle('active');
    this.textContent=app.classList.contains('show-meta')?'構成メモを隠す':'構成メモを表示';
  });
  function toggleSide(){
    layout.classList.toggle('side-collapsed');
    var closed=layout.classList.contains('side-collapsed');
    document.getElementById('sideToggle').textContent=closed?'左メニューを開く':'左メニューを閉じる';
    document.getElementById('sideIcon').textContent=closed?'›':'‹';
  }
  document.getElementById('sideToggle').addEventListener('click',toggleSide);
  document.getElementById('sideIcon').addEventListener('click',toggleSide);
  document.getElementById('accentToggle').addEventListener('click',function(){
    document.body.classList.toggle('accent-off');
    var off=document.body.classList.contains('accent-off');
    this.textContent=off?'Accent OFF':'Accent ON';
    this.classList.toggle('active',!off);
  });

  var initial=new URLSearchParams(location.search).get('page')||'home';
  showPage(initial,false);
})();