(function initDiscCatalog(){
  const root=document.getElementById("catalogGrid");
  if(!root)return;

  const config=window.DOCHOIXE99_CONFIG||{};
  const products=[
    {id:"rcb-rs-267",brand:"RCB",type:"floating",size:"267",bike:"LC135 5S 125ZR",name:"RCB RS Series Floating 267mm",code:"01D0532B",image:"assets/images/rcb-rs-floating.webp",price:Number(config.RCB_RS_267_PRICE)||1790000,note:"Tâm nhôm 7-series T6; LC135 4S/LCV8 có cấu hình cần pat.",detail:"rcb-rs-series-floating.html",source:"Giá cố định trên website"},
    {id:"rcb-rs-298",brand:"RCB",type:"floating",size:"298",bike:"Y15ZR Y16ZR",name:"RCB RS Series Floating 298mm",code:"01D0545",image:"assets/images/rcb-rs-floating.webp",price:Number(config.RCB_RS_298_PRICE)||1990000,note:"Bản floating lớn cho Y15ZR/Y16ZR; kiểm tra mâm, pat và heo.",detail:"rcb-rs-series-floating.html",source:"Giá cố định trên website"},
    {id:"rcb-exciter-front-245",brand:"RCB",type:"fixed",size:"245",bike:"Exciter 150 Exciter 155",name:"RCB đĩa trước Exciter 150/155 245mm",code:"Mã theo phiên bản",image:"assets/images/rcb-e2-steel.webp",price:Number(config.DISC_RCB_EXCITER_FRONT_245_PRICE)||460000,note:"Cấu hình trước 245mm; cần xác nhận lỗ bắt và đời xe trước khi giao.",source:"Giá cố định trên website"},
    {id:"rcb-exciter-rear-203",brand:"RCB",type:"fixed",size:"203",bike:"Exciter 150 Exciter 155",name:"RCB đĩa sau Exciter 150/155 203mm",code:"Mã theo phiên bản",image:"assets/images/rcb-e2-steel.webp",price:Number(config.DISC_RCB_EXCITER_REAR_203_PRICE)||90000,note:"Đĩa sau 203mm; ngoại hình được xác nhận theo lô hàng.",source:"Giá cố định trên website"},
    {id:"rcb-e2-190",brand:"RCB",type:"fixed",size:"190",bike:"Vario 150 Click 150 Beat",name:"RCB E2 Series Steel 190mm",code:"Dòng 01D0525Z",image:"assets/images/rcb-e2-steel.webp",price:350000,note:"Có mã cho Vario/Click/Beat; vị trí và số lỗ thay đổi theo mã.",source:"Giá shop cố định"},
    {id:"rcb-e2-220",brand:"RCB",type:"fixed",size:"220",bike:"Vario 160",name:"RCB E2 Series Steel 220mm",code:"Dòng 01D0525Z",image:"assets/images/rcb-e2-steel.webp",price:390000,note:"Biến thể tham khảo cho Vario 160; kiểm tra đời, mâm và vị trí đĩa.",source:"Giá shop cố định"},
    {id:"rcb-e2-230",brand:"RCB",type:"fixed",size:"230",bike:"NMAX NVX",name:"RCB E2 Series Steel 230mm",code:"Dòng 01D0525Z",image:"assets/images/rcb-e2-steel.webp",price:420000,note:"Có ứng dụng NMAX/NVX; không chọn chỉ dựa trên đường kính.",source:"Giá shop cố định"},
    {id:"rcb-e2-256",brand:"RCB",type:"fixed",size:"256",bike:"Winner X RSX 150",name:"RCB E2 Series Steel 256mm",code:"Dòng 01D0525Z",image:"assets/images/rcb-e2-steel.webp",price:490000,note:"Có mã cho Winner X/RSX150; phải khớp tâm, lỗ và offset.",source:"Giá shop cố định"},
    {id:"rcb-e2-267",brand:"RCB",type:"fixed",size:"267",bike:"LC135 Y15ZR Y16ZR",name:"RCB E2 Series Steel 267mm",code:"Dòng 01D0525Z",image:"assets/images/rcb-e2-steel.webp",price:590000,note:"Đường kính 267mm, có nhiều cấu hình lỗ bắt theo xe.",source:"Giá shop cố định"},
    {id:"rcb-e2plus-260",brand:"RCB",type:"floating",size:"260",bike:"NMAX NVX Vario 125 Vario 150 Click 150",name:"RCB E2+ Floating 260mm",code:"SKU theo ứng dụng",image:"assets/images/rcb-e2-plus-floating.webp",price:1290000,note:"Dòng floating 260mm cho một số cấu hình NMAX/NVX/Vario/Click.",source:"Giá shop cố định"},
    {id:"rcb-e2plus-267-4",brand:"RCB",type:"floating",size:"267",bike:"LC135 125ZR",name:"RCB E2+ Floating 267mm · 4 lỗ",code:"01D0520",image:"assets/images/rcb-e2-plus-floating.webp",price:1390000,note:"Bản bốn lỗ cho LC135/125ZR; xác nhận phiên bản xe trước khi đặt.",source:"Giá shop cố định"},
    {id:"rcb-e2plus-267-5",brand:"RCB",type:"floating",size:"267",bike:"Y15ZR Y16ZR",name:"RCB E2+ Floating 267mm · 5 lỗ",code:"01D0533",image:"assets/images/rcb-e2-plus-floating.webp",price:1490000,note:"Bản năm lỗ cho Y15ZR/Y16ZR; kiểm tra cấu hình heo và pat.",source:"Giá shop cố định"},
    {id:"galfer-df532w",brand:"Galfer",type:"wave",size:"245",bike:"Exciter 150",name:"Galfer Wave DF532W 245mm",code:"DF532W · 5 lỗ · dày 4mm",image:"assets/images/galfer-floating-w-cw.webp",price:Number(config.DISC_GALFER_DF532W_PRICE)||2628000,note:"Đĩa trước Exciter 150; lòng trong 115mm theo thông số bán lẻ.",source:"Giá cố định trên website"},
    {id:"galfer-honda-256",brand:"Galfer",type:"wave",size:"256",bike:"Honda Winner Winner X",name:"Galfer Wave Honda 256mm",code:"Mã theo đời xe",image:"assets/images/galfer-floating-w-cw.webp",price:Number(config.DISC_GALFER_HONDA_256_PRICE)||2750000,note:"Bản 256mm cho ứng dụng Honda; cần tra đúng mã xe và năm.",source:"Giá cố định trên website"},
    {id:"galfer-df071w",brand:"Galfer",type:"wave",size:"220",bike:"Honda Winner Winner X",name:"Galfer Wave DF071W sau 220mm",code:"DF071W · 4 lỗ · dày 4,2mm",image:"assets/images/galfer-floating-w-cw.webp",price:Number(config.DISC_GALFER_DF071W_PRICE)||2430000,note:"Đĩa sau Winner, lòng trong 105mm theo thông số bán lẻ.",source:"Giá cố định trên website"},
    {id:"galfer-fixed-v",brand:"Galfer",type:"fixed",size:"Nhiều size",bike:"Urban Custom",name:"Galfer Fixed Round (V)",code:"Tra mã theo hãng xe và năm",image:"assets/images/galfer-fixed-round-v.webp",price:1890000,note:"Đĩa tròn fixed; chọn qua bộ tra cứu Galfer theo đúng ứng dụng.",source:"Giá shop cố định"},
    {id:"galfer-flv",brand:"Galfer",type:"floating",size:"Nhiều size",bike:"Urban Custom",name:"Galfer Floating Round (FLV)",code:"Tra mã theo hãng xe và năm",image:"assets/images/galfer-floating-round-flv.webp",price:2390000,note:"Đĩa tròn floating; cần khớp đường kính, offset và độ dày.",source:"Giá shop cố định"},
    {id:"galfer-cw",brand:"Galfer",type:"floating",size:"Nhiều size",bike:"Sport Urban",name:"Galfer Floating W Aluminium (CW)",code:"Tra mã theo ứng dụng",image:"assets/images/galfer-floating-w-cw.webp",price:2690000,note:"Dòng W floating tâm nhôm; chọn đúng mã cho xe, mâm và heo.",source:"Giá shop cố định"},
    {id:"x1r-winner-pair",brand:"X1R",type:"fixed",size:"256 + 220",bike:"Winner Winner X",name:"Cặp đĩa X1R Winner / Winner X",code:"Trước 256mm · sau 220mm",image:"assets/images/dia-phanh-xe-may.jpg",price:Number(config.DISC_X1R_WINNER_PAIR_PRICE)||550000,note:"Giá theo cặp; ảnh nhóm sản phẩm, shop xác nhận ngoại hình thực tế.",source:"Giá cố định trên website"},
    {id:"bum97-winner-256",brand:"BUM97",type:"fixed",size:"256",bike:"Winner X",name:"BUM97 Racing đĩa trước Winner X 256mm",code:"B97-2538",image:"assets/images/dia-phanh-xe-may.jpg",price:Number(config.DISC_BUM97_WINNER_256_PRICE)||450000,note:"Mẫu đĩa trước 256mm; ảnh nhóm sản phẩm, xác nhận lô trước khi đặt.",source:"Giá cố định trên website"}
  ];

  const byId=Object.fromEntries(products.map(product=>[product.id,product]));
  const formatMoney=value=>Number(value).toLocaleString("vi-VN")+" ₫";
  const normalize=value=>(value||"").toString().normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/đ/g,"d").replace(/Đ/g,"D").toLowerCase();
  const typeName={fixed:"Fixed / thép",floating:"Floating",wave:"Wave"};
  const search=document.getElementById("catalogSearch");
  const brand=document.getElementById("brandFilter");
  const type=document.getElementById("typeFilter");
  const size=document.getElementById("sizeFilter");
  const resultCount=document.getElementById("resultCount");
  const clear=document.getElementById("clearFilters");

  function priceMarkup(product){
    return product.price
      ? `<strong>${formatMoney(product.price)}</strong><small>${product.source} · hiển thị trên website</small>`
      : `<strong>Liên hệ shop</strong><small>Kiểm tra cấu hình trước khi đặt</small>`;
  }

  function renderCatalog(){
    const query=normalize(search.value);
    const selectedBrand=brand.value;
    const selectedType=type.value;
    const selectedSize=size.value;
    const filtered=products.filter(product=>{
      const haystack=normalize([product.name,product.code,product.brand,product.type,product.size,product.bike,product.note].join(" "));
      return (!query||haystack.includes(query))&&(!selectedBrand||product.brand===selectedBrand)&&(!selectedType||product.type===selectedType)&&(!selectedSize||product.size.includes(selectedSize));
    });

    resultCount.textContent=String(filtered.length);
    root.innerHTML=filtered.length?filtered.map(product=>`
      <article class="product-card" id="${product.id}">
        <figure class="product-image">
          <img src="${product.image}" width="900" height="900" loading="lazy" decoding="async" alt="${product.name}">
          <span class="size-pill">${product.size.includes("size")?product.size:product.size+" mm"}</span>
          <span class="stock-pill">Xác nhận tồn kho</span>
        </figure>
        <div class="product-info">
          <div class="product-meta">${product.brand} · ${typeName[product.type]}</div>
          <h3>${product.name}</h3>
          <div class="product-code">${product.code}</div>
          <div class="product-tags"><span>${product.size.includes("size")?product.size:product.size+" mm"}</span><span>${product.bike}</span></div>
          <p class="product-note">${product.note}</p>
          <div class="catalog-price">${priceMarkup(product)}</div>
          <div class="catalog-actions">
            <button class="add-disc" type="button" data-add-disc="${product.id}">Thêm vào giỏ</button>
            ${product.detail?`<a class="view-disc" href="${product.detail}" aria-label="Xem chi tiết ${product.name}">↗</a>`:""}
          </div>
        </div>
      </article>`).join(""):'<div class="empty-results"><strong>Không tìm thấy mẫu phù hợp.</strong><p>Thử xóa bớt bộ lọc hoặc nhập tên xe ngắn hơn.</p></div>';
  }

  [search,brand,type,size].forEach(control=>control.addEventListener(control===search?"input":"change",renderCatalog));
  clear.addEventListener("click",()=>{search.value="";brand.value="";type.value="";size.value="";renderCatalog();search.focus()});
  renderCatalog();

  const storageKey="dochoixe99DiscCartV1";
  const brakeStorageKey="dochoixe99BrakeCartV1";
  const rsStorageKey="dochoixe99CartV1";
  const brakeFallback={"rcb-r1":{"id":"rcb-r1","name":"RCB R1 Brake Caliper","image":"assets/images/rcb-r1-brake-caliper-1.webp","price":3490000,"brand":"RCB","source":"brake"},"rcb-e45":{"id":"rcb-e45","name":"RCB E-45 Rear Caliper","image":"assets/images/rcb-e-45-rear-caliper-1.webp","price":1190000,"brand":"RCB","source":"brake"},"rcb-e-series":{"id":"rcb-e-series","name":"RCB E Series Brake Caliper","image":"assets/images/rcb-e-series-brake-caliper-1.webp","price":1490000,"brand":"RCB","source":"brake"},"rcb-r55":{"id":"rcb-r55","name":"RCB R55 Brake Caliper","image":"assets/images/rcb-r55-brake-caliper-1.webp","price":2490000,"brand":"RCB","source":"brake"},"rcb-s45":{"id":"rcb-s45","name":"RCB S45 Series Rear Brake Caliper","image":"assets/images/rcb-s45-series-brake-caliper-1.webp","price":1290000,"brand":"RCB","source":"brake"},"rcb-s65":{"id":"rcb-s65","name":"RCB S65 Series Rear Brake Caliper","image":"assets/images/rcb-s65-series-brake-caliper-1.webp","price":1690000,"brand":"RCB","source":"brake"},"rcb-s26":{"id":"rcb-s26","name":"RCB S26 Front Brake Caliper","image":"assets/images/rcb-s26-front-brake-caliper-1.webp","price":1990000,"brand":"RCB","source":"brake"},"rcb-r55-evo":{"id":"rcb-r55-evo","name":"RCB R55-EVO Series Brake Caliper","image":"assets/images/rcb-brake-caliper-r55-evo-series-1.webp","price":5490000,"brand":"RCB","source":"brake"},"rcb-r1-evo":{"id":"rcb-r1-evo","name":"RCB R1-EVO Series Right / Left","image":"assets/images/rcb-brake-caliper-r1-evo-series-right-left-1.webp","price":6790000,"brand":"RCB","source":"brake"},"rcb-r34":{"id":"rcb-r34","name":"RCB R34 Radial Brake Caliper 4 Piston","image":"assets/images/rcb-r34-radial-brake-caliper-4-piston-size-100mm-108mm-universal-1.webp","price":5790000,"brand":"RCB","source":"brake"},"rcb-s27":{"id":"rcb-s27","name":"RCB S27 Series Brake Caliper","image":"assets/images/rcb-s27-series-brake-caliper-1.webp","price":2290000,"brand":"RCB","source":"brake"},"rcb-s26-30th":{"id":"rcb-s26-30th","name":"RCB 30th Anniversary S26 Limited","image":"assets/images/rcb-30th-anniversary-r1-brake-caliper-4-piston-limited-edition-copy-1.webp","price":2390000,"brand":"RCB","source":"brake"},"rcb-r1-30th":{"id":"rcb-r1-30th","name":"RCB 30th Anniversary R1 Limited","image":"assets/images/rcb-30th-anniversary-r1-brake-caliper-4-piston-limited-edition-1.webp","price":7490000,"brand":"RCB","source":"brake"},"rcb-e-hose":{"id":"rcb-e-hose","name":"RCB E Series Brake Hose","image":"assets/images/rcb-eseries-brake-hose-1.webp","price":490000,"brand":"RCB","source":"brake"},"rcb-s-hose":{"id":"rcb-s-hose","name":"RCB S Series Brake Hose","image":"assets/images/rcb-s-series-brake-hose-1.webp","price":890000,"brand":"RCB","source":"brake"}};
  const rsFallback={"rs267":{"id":"rs267","name":"RCB RS Series Floating 267mm","image":"assets/images/rcb-rs-floating.webp","price":1790000,"brand":"RCB","source":"rs"},"rs298":{"id":"rs298","name":"RCB RS Series Floating 298mm","image":"assets/images/rcb-rs-floating.webp","price":1990000,"brand":"RCB","source":"rs"}};
  let cart=[];
  try{cart=JSON.parse(localStorage.getItem(storageKey)||"[]").filter(item=>byId[item.id]&&Number.isInteger(item.quantity)&&item.quantity>0)}catch(error){cart=[]}
  cart=cart.map(item=>{const p=byId[item.id];return {...item,name:p.name,price:p.price,image:p.image,brand:p.brand,source:"disc"}});
  const cartButtons=document.querySelectorAll("[data-open-disc-cart]");
  const cartCounts=document.querySelectorAll("[data-disc-cart-count]");
  const drawer=document.getElementById("discCartDrawer");
  const backdrop=document.getElementById("discCartBackdrop");
  const cartItems=document.getElementById("discCartItems");
  const totalNode=document.getElementById("discCartTotal");
  const quoteNode=document.getElementById("discQuoteCount");
  const checkoutButton=document.getElementById("discCheckoutButton");
  const continueButton=document.getElementById("discContinueShopping");
  const toast=document.getElementById("discToast");

  function readStored(key){try{const v=JSON.parse(localStorage.getItem(key)||"[]");return Array.isArray(v)?v:[]}catch(error){return []}}
  function writeStored(key,items){try{localStorage.setItem(key,JSON.stringify(items))}catch(error){}}
  function saveCart(){writeStored(storageKey,cart)}
  function normalizeStored(items,source,fallback){return items.filter(item=>item&&item.id&&Number(item.quantity)>0).map(item=>{const p=item.name?item:(fallback[item.id]||{});return {id:item.id,quantity:Number(item.quantity)||1,name:item.name||p.name||item.id,price:Number(item.price??p.price)||0,image:item.image||p.image||"assets/images/logo-dochoixe99.webp",brand:item.brand||p.brand||"Sản phẩm",source:item.source||source}})}
  function allCartItems(){
    const discs=normalizeStored(cart,"disc",byId);
    const brakes=normalizeStored(readStored(brakeStorageKey),"brake",brakeFallback);
    const rs=normalizeStored(readStored(rsStorageKey),"rs",rsFallback);
    return [...discs,...brakes,...rs];
  }
  function totalCount(){return allCartItems().reduce((sum,item)=>sum+item.quantity,0)}
  function syncHeaderCount(count){
    cartCounts.forEach(node=>node.textContent=String(count));
    document.querySelectorAll("[data-dx-shell-cart-count],[data-global-cart-count]").forEach(node=>node.textContent=String(count));
  }
  function showToast(message,isError=false){toast.textContent=message;toast.classList.toggle("error",isError);toast.classList.add("show");clearTimeout(showToast.timer);showToast.timer=setTimeout(()=>toast.classList.remove("show"),2600)}
  function openCart(event){if(event)event.preventDefault();renderCart();document.body.classList.add("cart-open");drawer.classList.add("open");backdrop.classList.add("open");drawer.setAttribute("aria-hidden","false");cartButtons.forEach(button=>button.setAttribute("aria-expanded","true"));document.getElementById("discCartClose").focus()}
  function closeCart(){document.body.classList.remove("cart-open");drawer.classList.remove("open");backdrop.classList.remove("open");drawer.setAttribute("aria-hidden","true");cartButtons.forEach(button=>button.setAttribute("aria-expanded","false"))}
  function addToCart(id){const existing=cart.find(item=>item.id===id),p=byId[id];if(existing)existing.quantity=Math.min(10,existing.quantity+1);else cart.push({id,quantity:1,name:p.name,price:p.price,image:p.image,brand:p.brand,source:"disc"});saveCart();renderCart();showToast("Đã thêm vào giỏ hàng");openCart()}
  function updateStored(source,id,change,remove=false){
    if(source==="disc"){const item=cart.find(entry=>entry.id===id);if(item&&!remove)item.quantity=Math.max(0,Math.min(10,item.quantity+change));cart=remove?cart.filter(x=>x.id!==id):cart.filter(x=>x.quantity>0);saveCart();return}
    const key=source==="brake"?brakeStorageKey:rsStorageKey;
    let items=readStored(key);const item=items.find(entry=>entry.id===id);
    if(item&&!remove)item.quantity=Math.max(0,Math.min(10,(Number(item.quantity)||1)+change));
    items=remove?items.filter(x=>x.id!==id):items.filter(x=>(Number(x.quantity)||0)>0);writeStored(key,items);
  }
  function renderCart(){
    const items=allCartItems();
    const count=items.reduce((sum,item)=>sum+item.quantity,0);
    const total=items.reduce((sum,item)=>sum+item.price*item.quantity,0);
    syncHeaderCount(count);totalNode.textContent=formatMoney(total);
    quoteNode.textContent=count?`${count} sản phẩm trong giỏ · kiểm tra đúng cấu hình trước khi giao.`:"Giỏ hàng đang trống.";
    cartItems.innerHTML=items.length?items.map(item=>`<article class="cart-item"><img src="${item.image}" alt=""><div><h3>${item.name}</h3><div class="cart-item-price">${item.price?formatMoney(item.price):"Chờ báo giá"}</div><span class="cart-source">${({disc:"Đĩa thắng",brake:"Heo & dây dầu",rs:"RCB RS",phuoc:"Phuộc",mam:"Mâm xe",nhong:"Nhông sên đĩa"}[item.source]||"Sản phẩm")}</span><div class="quantity"><button type="button" data-global-minus="${item.id}" data-source="${item.source}" aria-label="Giảm số lượng">−</button><strong>${item.quantity}</strong><button type="button" data-global-plus="${item.id}" data-source="${item.source}" aria-label="Tăng số lượng">+</button></div></div><div><button class="remove-item" type="button" data-global-remove="${item.id}" data-source="${item.source}">Xóa</button></div></article>`).join(""):'<div class="cart-empty"><strong>Giỏ hàng đang trống</strong><p>Hãy thêm sản phẩm từ các danh mục trước khi đặt hàng.</p></div>';
    checkoutButton.classList.toggle("is-disabled",!items.length);checkoutButton.setAttribute("aria-disabled",String(!items.length));
  }

  root.addEventListener("click",event=>{const button=event.target.closest("[data-add-disc]");if(button)addToCart(button.dataset.addDisc)});
  cartItems.addEventListener("click",event=>{
    const minus=event.target.closest("[data-global-minus]"),plus=event.target.closest("[data-global-plus]"),remove=event.target.closest("[data-global-remove]");
    if(minus)updateStored(minus.dataset.source,minus.dataset.globalMinus,-1);
    if(plus)updateStored(plus.dataset.source,plus.dataset.globalPlus,1);
    if(remove)updateStored(remove.dataset.source,remove.dataset.globalRemove,0,true);
    if(minus||plus||remove)renderCart();
  });
  cartButtons.forEach(button=>button.addEventListener("click",openCart));
  document.getElementById("discCartClose").addEventListener("click",closeCart);
  backdrop.addEventListener("click",closeCart);
  continueButton.addEventListener("click",closeCart);
  addEventListener("keydown",event=>{if(event.key==="Escape")closeCart()});
  addEventListener("storage",renderCart);
  saveCart();renderCart();
  if(new URLSearchParams(location.search).get("cart")==="open")openCart();
})();
