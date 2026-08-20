(function(){
  const removed=['po-va-co-po.html','dan-ao-va-op.html'];
  document.querySelectorAll('a[href]').forEach(a=>{if(removed.some(x=>(a.getAttribute('href')||'').includes(x)))a.remove();});
  document.querySelectorAll('img').forEach(img=>img.addEventListener('error',function onerr(){img.removeEventListener('error',onerr);img.src='/assets/images/logo-dochoixe99.webp';img.alt=(img.alt?img.alt+' — ':'')+'ảnh đang cập nhật';img.classList.add('img-fallback');}));
  if(!document.querySelector('.global-category-bar')){const header=document.querySelector('header');if(header){const path=(location.pathname.split('/').pop()||'index.html').toLowerCase();const links=[['index.html','Trang chủ'],['dia-thang-xe-may.html','Đĩa thắng'],['heo-dau-xe-may.html','Heo & dây dầu'],['do-choi-tay-lai.html','Đồ chơi tay lái'],['phuoc-rcb.html','Phuộc RCB'],['nhong-sen-dia.html','Nhông sên đĩa'],['mam-xe.html','Mâm xe'],['bai-viet/','Blog']];const bar=document.createElement('nav');bar.className='global-category-bar';bar.setAttribute('aria-label','Danh mục nhanh DOCHOIXE99');const inner=document.createElement('div');inner.className='global-category-bar__inner';links.forEach(([href,label])=>{const a=document.createElement('a');a.href=href==='index.html'?'/':'/'+href;a.textContent=label;const normalized=href.replace(/\/$/,'index.html');if(path===normalized||(href==='bai-viet/'&&location.pathname.includes('/bai-viet/')))a.setAttribute('aria-current','page');inner.appendChild(a)});bar.appendChild(inner);header.insertAdjacentElement('afterend',bar);}}
})();

/* INDEX SHELL JS START */
(function syncIndexShell(){
  const header=document.querySelector('header.dx-shell-header');
  if(!header)return;
  const nav=header.querySelector('[data-dx-shell-nav]');
  const btn=header.querySelector('[data-dx-shell-menu]');
  if(btn&&nav&&btn.hasAttribute('data-dx-shell-auto-menu')){
    btn.addEventListener('click',()=>{
      const open=nav.classList.toggle('open');
      btn.setAttribute('aria-expanded',String(open));
      btn.setAttribute('aria-label',open?'Đóng menu':'Mở menu');
      btn.textContent=open?'×':'☰';
    });
    nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{
      nav.classList.remove('open');btn.setAttribute('aria-expanded','false');btn.setAttribute('aria-label','Mở menu');btn.textContent='☰';
    }));
  }
  try{
    const keys=['dochoixe99DiscCartV1','dochoixe99BrakeCartV1','dochoixe99CartV1'];
    const count=keys.reduce((total,key)=>{const items=JSON.parse(localStorage.getItem(key)||'[]');return total+(Array.isArray(items)?items.reduce((sum,item)=>sum+(Number(item.quantity)||0),0):0)},0);
    header.querySelectorAll('[data-dx-shell-cart-count]').forEach(el=>el.textContent=String(count));
  }catch(error){}
  const path=(location.pathname.replace(/\/+$/,'')||'/').toLowerCase();
  header.querySelectorAll('.dx-shell-navlinks a').forEach(a=>{
    try{
      const u=new URL(a.href,location.origin);
      const ap=(u.pathname.replace(/\/+$/,'')||'/').toLowerCase();
      if(ap===path && !u.hash)a.setAttribute('aria-current','page');
    }catch(error){}
  });
})();
/* INDEX SHELL JS END */


/* ACCOUNT SYSTEM START */
(function initDxAccounts(){
  const ACCOUNTS_KEY='dochoixe99AccountsV1';
  const SESSION_KEY='dochoixe99SessionV1';
  const $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>[...r.querySelectorAll(s)];
  const gmailOk=value=>/^[a-z0-9._%+-]+@gmail\.com$/i.test(String(value||'').trim());
  const normalize=value=>String(value||'').trim().toLowerCase();
  const readAccounts=()=>{try{const x=JSON.parse(localStorage.getItem(ACCOUNTS_KEY)||'[]');return Array.isArray(x)?x:[]}catch(e){return []}};
  const readSession=()=>{try{return JSON.parse(localStorage.getItem(SESSION_KEY)||'null')}catch(e){return null}};
  const setSession=user=>localStorage.setItem(SESSION_KEY,JSON.stringify({name:user.name,email:user.email,loggedAt:new Date().toISOString()}));
  const hash=async value=>{const data=new TextEncoder().encode(String(value));const digest=await crypto.subtle.digest('SHA-256',data);return [...new Uint8Array(digest)].map(x=>x.toString(16).padStart(2,'0')).join('')};
  const accountUrl=mode=>location.pathname==='/'||/index\.html$/i.test(location.pathname)?`?account=${mode}#tai-khoan`:`/?account=${mode}#tai-khoan`;

  function injectHeader(){
    const header=$('header.dx-shell-header'); if(!header)return;
    const host=$('.dx-shell-nav-actions',header); if(!host||$('.dx-auth-actions',host))return;
    const session=readSession();
    const wrap=document.createElement('div');wrap.className='dx-auth-actions';
    if(session){
      wrap.innerHTML=`<a class="dx-auth-btn dx-auth-user" href="${accountUrl('login')}" title="${session.email}">${session.name||session.email}</a><button class="dx-auth-btn dx-auth-logout" type="button" data-account-logout>Đăng xuất</button>`;
    }else{
      wrap.innerHTML=`<a class="dx-auth-btn" href="${accountUrl('login')}">Đăng nhập</a><a class="dx-auth-btn register" href="${accountUrl('register')}">Đăng ký</a>`;
    }
    const cart=$('.dx-shell-cart-link',host); host.insertBefore(wrap,cart||host.firstChild);
    const nav=$('[data-dx-shell-nav]',header);
    if(nav&&!$('.dx-mobile-auth-link',nav)){
      const a1=document.createElement('a'),a2=document.createElement('a');
      if(session){a1.className='dx-mobile-auth-link';a1.href=accountUrl('login');a1.textContent=session.name||'Tài khoản';a2.className='dx-mobile-auth-link register';a2.href='#';a2.dataset.accountLogout='';a2.textContent='Đăng xuất'}
      else{a1.className='dx-mobile-auth-link';a1.href=accountUrl('login');a1.textContent='Đăng nhập';a2.className='dx-mobile-auth-link register';a2.href=accountUrl('register');a2.textContent='Đăng ký'}
      nav.append(a1,a2);
    }
  }
  function refreshHeader(){$$('.dx-auth-actions,.dx-mobile-auth-link').forEach(x=>x.remove());injectHeader()}
  function message(text,error=false){const el=$('#accountMessage');if(!el)return;el.textContent=text;el.classList.toggle('error',error)}
  function switchTab(mode){
    const login=mode!=='register';
    $$('[data-account-tab]').forEach(btn=>{const active=btn.dataset.accountTab===(login?'login':'register');btn.classList.toggle('active',active);btn.setAttribute('aria-selected',String(active))});
    const lf=$('#accountLoginForm'),rf=$('#accountRegisterForm');if(lf)lf.hidden=!login;if(rf)rf.hidden=login;message('');
  }
  function renderSigned(){const session=readSession(),card=$('#accountSignedCard');if(!card)return;if(!session){card.hidden=true;return}card.hidden=false;const n=$('#accountSignedName'),e=$('#accountSignedEmail');if(n)n.textContent=session.name||'Khách hàng';if(e)e.textContent=session.email||''}
  injectHeader();renderSigned();
  const requested=new URLSearchParams(location.search).get('account');if(requested)switchTab(requested);
  $$('[data-account-tab]').forEach(btn=>btn.addEventListener('click',()=>switchTab(btn.dataset.accountTab)));
  document.addEventListener('click',event=>{const logout=event.target.closest('[data-account-logout]');if(!logout)return;event.preventDefault();localStorage.removeItem(SESSION_KEY);message('Đã đăng xuất.');renderSigned();refreshHeader()});
  const register=$('#accountRegisterForm');if(register)register.addEventListener('submit',async event=>{event.preventDefault();if(!register.reportValidity())return;const fd=new FormData(register),name=String(fd.get('name')||'').trim(),email=normalize(fd.get('gmail')),password=String(fd.get('password')||''),confirm=String(fd.get('confirm')||'');if(!gmailOk(email)){message('Vui lòng dùng địa chỉ Gmail, ví dụ tenban@gmail.com.',true);return}if(password.length<8){message('Mật khẩu cần ít nhất 8 ký tự.',true);return}if(password!==confirm){message('Hai mật khẩu chưa khớp.',true);return}const accounts=readAccounts();if(accounts.some(x=>x.email===email)){message('Gmail này đã được đăng ký trên trình duyệt này.',true);switchTab('login');const loginG=$('#loginGmail');if(loginG)loginG.value=email;return}const user={name,email,passwordHash:await hash(password),createdAt:new Date().toISOString()};accounts.push(user);localStorage.setItem(ACCOUNTS_KEY,JSON.stringify(accounts));setSession(user);register.reset();message('Đăng ký thành công. Bạn đã được đăng nhập.');renderSigned();refreshHeader()});
  const login=$('#accountLoginForm');if(login)login.addEventListener('submit',async event=>{event.preventDefault();if(!login.reportValidity())return;const fd=new FormData(login),email=normalize(fd.get('gmail')),password=String(fd.get('password')||'');if(!gmailOk(email)){message('Vui lòng nhập đúng Gmail đã đăng ký.',true);return}const user=readAccounts().find(x=>x.email===email);if(!user||user.passwordHash!==await hash(password)){message('Gmail hoặc mật khẩu chưa đúng.',true);return}setSession(user);login.reset();message('Đăng nhập thành công.');renderSigned();refreshHeader()});
})();
/* ACCOUNT SYSTEM END */

/* CENTRAL PRICE SYNC START */
(function syncConfiguredPrices(){
  const config=window.DOCHOIXE99_CONFIG||{}, prices=config.PRODUCT_PRICES||{};
  if(!prices||typeof prices!=='object')return;
  const money=n=>Number(n).toLocaleString('vi-VN')+' ₫';
  const label=value=>{const n=Number(value);return Number.isFinite(n)&&n>0?money(n):String(value||'Liên hệ giá')};
  const setPrice=(el,key)=>{if(!el||prices[key]===undefined)return;el.textContent=label(prices[key])};
  const path=(location.pathname.split('/').pop()||'index.html').toLowerCase();
  if(path==='mam-xe.html')document.querySelectorAll('.product-card[id]').forEach(card=>setPrice(card.querySelector('.store-price strong'),'mam-'+card.id));
  if(path==='nhong-sen-dia.html')document.querySelectorAll('.product-card[id]').forEach(card=>setPrice(card.querySelector('.store-price strong'),'nhong-'+card.id));
  if(path==='phuoc-rcb.html')document.querySelectorAll('.shock-card').forEach(card=>{const name=card.querySelector('h3')?.textContent||'';const slug=name.toLowerCase().replace(/&/g,' ').replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');setPrice(card.querySelector('.shock-price strong'),'phuoc-'+slug)});
  if(path==='heo-dau-xe-may.html')document.querySelectorAll('[data-brake-product]').forEach(card=>{const value=prices[card.dataset.id];if(value===undefined)return;const n=Number(value);if(Number.isFinite(n)&&n>0){card.dataset.price=String(n);setPrice(card.querySelector('.brake-price strong'),card.dataset.id)}});
  if(path==='index.html'||path===''){
    const names={
      'RCB RS Floating 267mm':'rcb-rs-267','RCB E2+ Floating 260mm':'rcb-e2plus-260','RCB E2 Steel 245mm':'rcb-exciter-front-245','Galfer Wave DF532W':'galfer-df532w',
      'RCB R1 Brake Caliper':'rcb-r1','RCB R34 Radial Caliper':'rcb-r34','RCB S Series Brake Hose':'rcb-s-hose','RCB E Series Brake Hose':'rcb-e-hose',
      'RCB S2 Series':'phuoc-rcb-s2-series-absorber','RCB Flow S Series':'phuoc-rcb-flow-s-series-absorber','RCB A3 Monoshock':'phuoc-rcb-a3-series-absorber-monoshock','RCB SS Line Monoshock':'phuoc-rcb-ss-line-monoshock'
    };
    document.querySelectorAll('.store-card').forEach(card=>{const key=names[card.querySelector('h3')?.textContent?.trim()||''];if(key)setPrice(card.querySelector('.store-price strong'),key)});
  }
})();
/* CENTRAL PRICE SYNC END */
