(function initSharedSiteChrome(){
  const config = window.DOCHOIXE99_CONFIG || {};
  const phoneRaw = config.PHONE_RAW || "0878976186";
  const phoneDisplay = config.PHONE_DISPLAY || "0878 976 186";
  const currentPath = (location.pathname || "/").replace(/\/+$/,"") || "/";

  if (!document.getElementById("shared-header-style")) {
    const style=document.createElement("style");
    style.id="shared-header-style";
    style.textContent=`
      #shared-topbar{background:#060708!important;border-bottom:1px solid #20242b!important;color:#b5bac3!important;font:12px/1.3 Inter,Arial,sans-serif!important;text-transform:none!important;letter-spacing:0!important}
      #shared-topbar .dx-topbar-inner{width:min(1180px,calc(100% - 40px));min-height:34px;margin:auto;display:flex;align-items:center;justify-content:space-between;gap:16px}
      #shared-topbar b{color:#fff!important}#shared-topbar a{color:inherit!important;text-decoration:none!important}
      #shared-site-header{position:sticky!important;top:0!important;z-index:990!important;background:rgba(11,12,14,.97)!important;border-bottom:1px solid #282c33!important;box-shadow:0 8px 28px rgba(0,0,0,.18)!important;backdrop-filter:blur(16px)!important;color:#fff!important;font-family:Inter,Arial,sans-serif!important}
      #shared-site-header .dx-header-inner{width:min(1180px,calc(100% - 40px));min-height:74px;margin:auto;display:flex;align-items:center;gap:24px}
      #shared-site-header .dx-brand{display:inline-flex;align-items:center;gap:11px;min-width:max-content;color:#fff!important;text-decoration:none!important}
      #shared-site-header .dx-brand img{display:block!important;width:46px!important;height:46px!important;flex:0 0 46px!important;border:1px solid #343943!important;border-radius:13px!important;object-fit:cover!important;background:transparent!important;box-shadow:0 9px 24px rgba(224,20,20,.18)!important;padding:0!important}
      #shared-site-header .dx-brand-copy{display:block!important;line-height:1!important}.dx-brand-name{display:block!important;color:#fff!important;font-size:18px!important;font-weight:950!important;letter-spacing:-.02em!important;white-space:nowrap!important}.dx-brand-name em{color:#ef233c!important;font-style:normal!important}.dx-brand-tagline{display:block!important;margin-top:5px!important;color:#8f949d!important;font-size:9px!important;font-weight:750!important;letter-spacing:.05em!important;white-space:nowrap!important}
      #shared-site-header .dx-main-nav{margin-left:auto;display:flex;align-items:center;gap:18px;font-size:13px;font-weight:800;color:#d7dae0}
      #shared-site-header .dx-main-nav>a,#shared-site-header .dx-products>summary{display:flex;align-items:center;min-height:42px;color:#d7dae0!important;text-decoration:none!important;cursor:pointer!important;list-style:none!important;white-space:nowrap!important;background:none!important;border:0!important;padding:0!important;margin:0!important;font:inherit!important}
      #shared-site-header .dx-products>summary::-webkit-details-marker{display:none}.dx-products{position:relative}.dx-products>summary::after{content:"▾";font-size:10px;margin-left:6px;color:#81858e}.dx-products[open]>summary,.dx-main-nav>a:hover,.dx-main-nav>a[aria-current="page"]{color:#fff!important}
      .dx-product-menu{position:absolute;top:48px;left:50%;transform:translateX(-50%);width:220px;padding:9px;border:1px solid #30353e;border-radius:14px;background:#0f1115;box-shadow:0 20px 50px rgba(0,0,0,.42);display:grid;gap:3px}.dx-product-menu a{padding:10px 11px;border-radius:9px;color:#d7dae0!important;text-decoration:none!important;font-size:12px!important;font-weight:800!important}.dx-product-menu a:hover,.dx-product-menu a[aria-current="page"]{background:#1a1d23;color:#ff6676!important}
      .dx-header-actions{display:flex;align-items:center;gap:9px}.dx-hotline{display:inline-flex;min-height:42px;align-items:center;justify-content:center;padding:0 14px;border:1px solid #ef233c!important;border-radius:11px!important;background:#d71925!important;color:#fff!important;text-decoration:none!important;font-size:12px!important;font-weight:900!important;white-space:nowrap!important}.dx-cart{position:relative;display:inline-grid!important;width:42px!important;height:42px!important;place-items:center!important;border:1px solid #3b4049!important;border-radius:11px!important;background:#171a20!important;color:#fff!important;text-decoration:none!important}.dx-cart svg{width:20px;height:20px;fill:none;stroke:currentColor;stroke-width:1.9}.dx-cart-count{position:absolute;top:-7px;right:-7px;display:grid;min-width:21px;height:21px;padding:0 5px;place-items:center;border:2px solid #0a0b0d;border-radius:999px;background:#ef233c;color:#fff;font-size:10px;font-weight:950}.dx-menu-btn{display:none!important;width:42px!important;height:42px!important;border:1px solid #3b4049!important;border-radius:11px!important;background:#171a20!important;color:#fff!important;font-size:19px!important;cursor:pointer!important;padding:0!important}
      .global-category-bar{position:relative;z-index:19;border-bottom:1px solid rgba(255,255,255,.08);background:#0d0f13;color:#d9dce3}.global-category-bar__inner{width:min(1180px,calc(100% - 32px));margin:auto;display:flex;gap:8px;align-items:center;overflow-x:auto;padding:10px 0;scrollbar-width:none}.global-category-bar__inner::-webkit-scrollbar{display:none}.global-category-bar a{flex:0 0 auto;padding:8px 11px;border:1px solid #2d323a;border-radius:999px;background:#14171c;color:#cbd0d8;text-decoration:none;font-size:12px;font-weight:800;white-space:nowrap}.global-category-bar a:hover,.global-category-bar a[aria-current="page"]{border-color:#7d2934;background:#261317;color:#ff7281}
      .img-fallback{padding:18px!important;object-fit:contain!important;background:radial-gradient(circle at 50% 45%,#2b2f36,#0d0f13 72%)!important}
      @media(max-width:980px){#shared-site-header .dx-main-nav{position:absolute;left:20px;right:20px;top:74px;display:none;flex-direction:column;align-items:stretch;gap:2px;padding:12px;border:1px solid #30353e;border-radius:14px;background:#0f1115;box-shadow:0 20px 50px rgba(0,0,0,.45)}#shared-site-header .dx-main-nav.open{display:flex}#shared-site-header .dx-main-nav>a,#shared-site-header .dx-products>summary{min-height:42px;padding:0 9px!important}.dx-products{width:100%}.dx-product-menu{position:static;transform:none;width:100%;margin:2px 0 7px;box-shadow:none;background:#15181e}.dx-menu-btn{display:block!important}.dx-hotline{display:none!important}}
      @media(max-width:560px){#shared-topbar .dx-topbar-inner{width:min(100% - 24px,1180px);justify-content:center;text-align:center;padding:7px 0}#shared-topbar .dx-topbar-right{display:none}#shared-site-header .dx-header-inner{width:min(100% - 24px,1180px);min-height:66px;gap:10px}.dx-brand-tagline{display:none!important}#shared-site-header .dx-brand img{width:40px!important;height:40px!important;flex-basis:40px!important}.dx-brand-name{font-size:16px!important}.dx-cart{width:40px!important;height:40px!important}.global-category-bar__inner{width:min(100% - 20px,1180px);padding:8px 0}.global-category-bar a{font-size:11px}}
    `;
    document.head.appendChild(style);
  }

  // Remove only old topbar/header shells. Main page content is untouched.
  const oldTopbar=document.querySelector("body > .topbar");
  if(oldTopbar) oldTopbar.remove();
  const oldHeader=document.querySelector("body > header");
  if(oldHeader) oldHeader.remove();
  document.querySelectorAll(".global-category-bar").forEach(el=>el.remove());

  let cartCount=0;
  try{const items=JSON.parse(localStorage.getItem("dochoixe99DiscCartV1")||"[]");cartCount=Array.isArray(items)?items.reduce((s,i)=>s+(Number(i.quantity)||0),0):0}catch(e){}
  const isCurrent = path => currentPath === path.replace(/\/+$/,"");
  const productPaths=["/dia-thang-xe-may.html","/heo-dau-xe-may.html","/do-choi-tay-lai.html","/phuoc-rcb.html","/nhong-sen-dia.html","/mam-xe.html"];
  const productLinks=[
    ["/dia-thang-xe-may.html","Đĩa thắng"],["/heo-dau-xe-may.html","Heo & dây dầu"],["/do-choi-tay-lai.html","Đồ chơi tay lái"],["/phuoc-rcb.html","Phuộc RCB"],["/nhong-sen-dia.html","Nhông sên đĩa"],["/mam-xe.html","Mâm xe"]
  ];
  const topbar=document.createElement("div");topbar.id="shared-topbar";topbar.innerHTML=`<div class="dx-topbar-inner"><span><b>DOCHOIXE99</b> • Đồ chơi xe máy • Phụ tùng • Phụ kiện</span><span class="dx-topbar-right">Hotline: <a href="tel:${phoneRaw}"><b>${phoneDisplay}</b></a> • Kiểm tra đúng xe trước khi giao</span></div>`;
  const header=document.createElement("header");header.id="shared-site-header";
  header.innerHTML=`<div class="dx-header-inner">
    <a class="dx-brand" href="/" aria-label="DOCHOIXE99 - Trang chủ"><img src="/assets/images/logo-dochoixe99.webp" alt="Logo DOCHOIXE99" width="46" height="46"><span class="dx-brand-copy"><span class="dx-brand-name">DOCHOIXE<em>99</em></span><span class="dx-brand-tagline">Đồ chơi xe máy • Phụ tùng • Phụ kiện</span></span></a>
    <nav class="dx-main-nav" id="navlinks" aria-label="Điều hướng chính">
      <a href="/" ${currentPath==="/"||currentPath==="/index.html"?'aria-current="page"':''}>Trang chủ</a>
      <a href="/chon-phu-kien-theo-xe.html" ${isCurrent('/chon-phu-kien-theo-xe.html')?'aria-current="page"':''}>Chọn theo xe</a>
      <details class="dx-products"><summary ${productPaths.includes(currentPath)?'aria-current="page"':''}>Sản phẩm</summary><div class="dx-product-menu">${productLinks.map(([href,label])=>`<a href="${href}" ${isCurrent(href)?'aria-current="page"':''}>${label}</a>`).join('')}</div></details>
      <a href="/bai-viet/" ${currentPath.startsWith('/bai-viet')?'aria-current="page"':''}>Blog</a>
      <a href="/gioi-thieu.html" ${isCurrent('/gioi-thieu.html')?'aria-current="page"':''}>Giới thiệu</a>
      <a href="/#lien-he">Liên hệ</a>
    </nav>
    <div class="dx-header-actions"><a class="dx-hotline" href="tel:${phoneRaw}">Gọi ${phoneDisplay}</a><a class="dx-cart" href="/dia-thang-xe-may.html?cart=open" aria-label="Mở giỏ hàng, ${cartCount} sản phẩm"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 4h2l2.2 10.1a2 2 0 0 0 2 1.6h7.9a2 2 0 0 0 1.9-1.4L21 8H6.1"></path><circle cx="10" cy="20" r="1"></circle><circle cx="18" cy="20" r="1"></circle></svg><span class="dx-cart-count">${cartCount}</span></a><button class="dx-menu-btn" id="menuBtn" type="button" aria-label="Mở menu" aria-controls="navlinks" aria-expanded="false">☰</button></div>
  </div>`;
  document.body.insertBefore(header,document.body.firstChild);document.body.insertBefore(topbar,header);

  const menuBtn=header.querySelector('.dx-menu-btn'),nav=header.querySelector('.dx-main-nav');
  menuBtn.addEventListener('click',()=>{const open=nav.classList.toggle('open');menuBtn.setAttribute('aria-expanded',String(open));menuBtn.textContent=open?'×':'☰'});
  nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');menuBtn.setAttribute('aria-expanded','false');menuBtn.textContent='☰'}));
  document.addEventListener('click',e=>{if(!header.contains(e.target)){nav.classList.remove('open');menuBtn.setAttribute('aria-expanded','false');menuBtn.textContent='☰';header.querySelectorAll('.dx-products[open]').forEach(d=>d.removeAttribute('open'))}});

  // Shared quick category bar. Homepage may hide it with its existing final CSS.
  const quick=[['/','Trang chủ'],['/dia-thang-xe-may.html','Đĩa thắng'],['/heo-dau-xe-may.html','Heo & dây dầu'],['/do-choi-tay-lai.html','Đồ chơi tay lái'],['/phuoc-rcb.html','Phuộc RCB'],['/nhong-sen-dia.html','Nhông sên đĩa'],['/mam-xe.html','Mâm xe'],['/bai-viet/','Blog']];
  const bar=document.createElement('nav');bar.className='global-category-bar';bar.setAttribute('aria-label','Danh mục nhanh DOCHOIXE99');const inner=document.createElement('div');inner.className='global-category-bar__inner';
  quick.forEach(([href,label])=>{const a=document.createElement('a');a.href=href;a.textContent=label;if((href==='/'&&(currentPath==='/'||currentPath==='/index.html'))||(href==='/bai-viet/'&&currentPath.startsWith('/bai-viet'))||isCurrent(href))a.setAttribute('aria-current','page');inner.appendChild(a)});bar.appendChild(inner);header.insertAdjacentElement('afterend',bar);

  // Safe image fallback for genuinely missing local images.
  document.querySelectorAll('img').forEach(img=>img.addEventListener('error',function onerr(){img.removeEventListener('error',onerr);if((img.getAttribute('src')||'').includes('logo-dochoixe99.webp'))return;img.src='/assets/images/logo-dochoixe99.webp';img.alt=(img.alt?img.alt+' — ':'')+'ảnh đang cập nhật';img.classList.add('img-fallback')}));
})();
