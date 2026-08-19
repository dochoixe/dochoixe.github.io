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
    const items=JSON.parse(localStorage.getItem('dochoixe99DiscCartV1')||'[]');
    const count=Array.isArray(items)?items.reduce((sum,item)=>sum+(Number(item.quantity)||0),0):0;
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
