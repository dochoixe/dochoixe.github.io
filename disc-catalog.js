(function initDiscCatalog(){
  const root=document.getElementById("catalogGrid");
  if(!root)return;

  const config=window.DOCHOIXE99_CONFIG||{};
  const phone=config.PHONE_RAW||"0878976186";
  const zalo=`https://zalo.me/${phone}`;
  const products=[
    {id:"rcb-rs-267",brand:"RCB",type:"floating",size:"267",bike:"LC135 5S 125ZR",name:"RCB RS Series Floating 267mm",code:"01D0532B",image:"assets/images/rcb-rs-floating.webp",price:Number(config.RCB_RS_267_PRICE)||1790000,note:"Tâm nhôm 7-series T6; LC135 4S/LCV8 có cấu hình cần pat.",detail:"rcb-rs-series-floating.html",source:"Giá shop tham khảo"},
    {id:"rcb-rs-298",brand:"RCB",type:"floating",size:"298",bike:"Y15ZR Y16ZR",name:"RCB RS Series Floating 298mm",code:"01D0545",image:"assets/images/rcb-rs-floating.webp",price:Number(config.RCB_RS_298_PRICE)||1990000,note:"Bản floating lớn cho Y15ZR/Y16ZR; kiểm tra mâm, pat và heo.",detail:"rcb-rs-series-floating.html",source:"Giá shop tham khảo"},
    {id:"rcb-exciter-front-245",brand:"RCB",type:"fixed",size:"245",bike:"Exciter 150 Exciter 155",name:"RCB đĩa trước Exciter 150/155 245mm",code:"Mã theo phiên bản",image:"assets/images/rcb-e2-steel.webp",price:Number(config.DISC_RCB_EXCITER_FRONT_245_PRICE)||460000,note:"Cấu hình trước 245mm; cần xác nhận lỗ bắt và đời xe trước khi giao.",source:"Giá thị trường tham khảo"},
    {id:"rcb-exciter-rear-203",brand:"RCB",type:"fixed",size:"203",bike:"Exciter 150 Exciter 155",name:"RCB đĩa sau Exciter 150/155 203mm",code:"Mã theo phiên bản",image:"assets/images/rcb-e2-steel.webp",price:Number(config.DISC_RCB_EXCITER_REAR_203_PRICE)||90000,note:"Đĩa sau 203mm; giá và ngoại hình xác nhận theo lô hàng.",source:"Giá thị trường tham khảo"},
    {id:"rcb-e2-190",brand:"RCB",type:"fixed",size:"190",bike:"Vario 150 Click 150 Beat",name:"RCB E2 Series Steel 190mm",code:"Dòng 01D0525Z",image:"assets/images/rcb-e2-steel.webp",price:null,note:"Có mã cho Vario/Click/Beat; vị trí và số lỗ thay đổi theo mã.",source:"Chờ xác nhận đúng mã"},
    {id:"rcb-e2-220",brand:"RCB",type:"fixed",size:"220",bike:"Vario 160",name:"RCB E2 Series Steel 220mm",code:"Dòng 01D0525Z",image:"assets/images/rcb-e2-steel.webp",price:null,note:"Biến thể tham khảo cho Vario 160; kiểm tra đời, mâm và vị trí đĩa.",source:"Chờ xác nhận đúng mã"},
    {id:"rcb-e2-230",brand:"RCB",type:"fixed",size:"230",bike:"NMAX NVX",name:"RCB E2 Series Steel 230mm",code:"Dòng 01D0525Z",image:"assets/images/rcb-e2-steel.webp",price:null,note:"Có ứng dụng NMAX/NVX; không chọn chỉ dựa trên đường kính.",source:"Chờ xác nhận đúng mã"},
    {id:"rcb-e2-256",brand:"RCB",type:"fixed",size:"256",bike:"Winner X RSX 150",name:"RCB E2 Series Steel 256mm",code:"Dòng 01D0525Z",image:"assets/images/rcb-e2-steel.webp",price:null,note:"Có mã cho Winner X/RSX150; phải khớp tâm, lỗ và offset.",source:"Chờ xác nhận đúng mã"},
    {id:"rcb-e2-267",brand:"RCB",type:"fixed",size:"267",bike:"LC135 Y15ZR Y16ZR",name:"RCB E2 Series Steel 267mm",code:"Dòng 01D0525Z",image:"assets/images/rcb-e2-steel.webp",price:null,note:"Đường kính 267mm, có nhiều cấu hình lỗ bắt theo xe.",source:"Chờ xác nhận đúng mã"},
    {id:"rcb-e2plus-260",brand:"RCB",type:"floating",size:"260",bike:"NMAX NVX Vario 125 Vario 150 Click 150",name:"RCB E2+ Floating 260mm",code:"SKU theo ứng dụng",image:"assets/images/rcb-e2-plus-floating.webp",price:null,note:"Dòng floating 260mm cho một số cấu hình NMAX/NVX/Vario/Click.",source:"Chờ xác nhận mã và pat"},
    {id:"rcb-e2plus-267-4",brand:"RCB",type:"floating",size:"267",bike:"LC135 125ZR",name:"RCB E2+ Floating 267mm · 4 lỗ",code:"01D0520",image:"assets/images/rcb-e2-plus-floating.webp",price:null,note:"Bản bốn lỗ cho LC135/125ZR; xác nhận phiên bản xe trước khi đặt.",source:"Chờ xác nhận đúng mã"},
    {id:"rcb-e2plus-267-5",brand:"RCB",type:"floating",size:"267",bike:"Y15ZR Y16ZR",name:"RCB E2+ Floating 267mm · 5 lỗ",code:"01D0533",image:"assets/images/rcb-e2-plus-floating.webp",price:null,note:"Bản năm lỗ cho Y15ZR/Y16ZR; kiểm tra cấu hình heo và pat.",source:"Chờ xác nhận đúng mã"},
    {id:"galfer-df532w",brand:"Galfer",type:"wave",size:"245",bike:"Exciter 150",name:"Galfer Wave DF532W 245mm",code:"DF532W · 5 lỗ · dày 4mm",image:"assets/images/galfer-floating-w-cw.webp",price:Number(config.DISC_GALFER_DF532W_PRICE)||2628000,note:"Đĩa trước Exciter 150; lòng trong 115mm theo thông số bán lẻ.",source:"Giá thị trường tham khảo"},
    {id:"galfer-honda-256",brand:"Galfer",type:"wave",size:"256",bike:"Honda Winner Winner X",name:"Galfer Wave Honda 256mm",code:"Mã theo đời xe",image:"assets/images/galfer-floating-w-cw.webp",price:Number(config.DISC_GALFER_HONDA_256_PRICE)||2750000,note:"Bản 256mm cho ứng dụng Honda; cần tra đúng mã xe và năm.",source:"Giá thị trường tham khảo"},
    {id:"galfer-df071w",brand:"Galfer",type:"wave",size:"220",bike:"Honda Winner Winner X",name:"Galfer Wave DF071W sau 220mm",code:"DF071W · 4 lỗ · dày 4,2mm",image:"assets/images/galfer-floating-w-cw.webp",price:Number(config.DISC_GALFER_DF071W_PRICE)||2430000,note:"Đĩa sau Winner, lòng trong 105mm theo thông số bán lẻ.",source:"Giá thị trường tham khảo"},
    {id:"galfer-fixed-v",brand:"Galfer",type:"fixed",size:"Nhiều size",bike:"Urban Custom",name:"Galfer Fixed Round (V)",code:"Tra mã theo hãng xe và năm",image:"assets/images/galfer-fixed-round-v.webp",price:null,note:"Đĩa tròn fixed; chọn qua bộ tra cứu Galfer theo đúng ứng dụng.",source:"Chờ tra mã Galfer"},
    {id:"galfer-flv",brand:"Galfer",type:"floating",size:"Nhiều size",bike:"Urban Custom",name:"Galfer Floating Round (FLV)",code:"Tra mã theo hãng xe và năm",image:"assets/images/galfer-floating-round-flv.webp",price:null,note:"Đĩa tròn floating; cần khớp đường kính, offset và độ dày.",source:"Chờ tra mã Galfer"},
    {id:"galfer-cw",brand:"Galfer",type:"floating",size:"Nhiều size",bike:"Sport Urban",name:"Galfer Floating W Aluminium (CW)",code:"Tra mã theo ứng dụng",image:"assets/images/galfer-floating-w-cw.webp",price:null,note:"Dòng W floating tâm nhôm; chọn đúng mã cho xe, mâm và heo.",source:"Chờ tra mã Galfer"},
    {id:"x1r-winner-pair",brand:"X1R",type:"fixed",size:"256 + 220",bike:"Winner Winner X",name:"Cặp đĩa X1R Winner / Winner X",code:"Trước 256mm · sau 220mm",image:"assets/images/dia-phanh-xe-may.jpg",price:Number(config.DISC_X1R_WINNER_PAIR_PRICE)||550000,note:"Giá theo cặp; ảnh nhóm sản phẩm, shop xác nhận ngoại hình thực tế.",source:"Giá thị trường tham khảo"},
    {id:"bum97-winner-256",brand:"BUM97",type:"fixed",size:"256",bike:"Winner X",name:"BUM97 Racing đĩa trước Winner X 256mm",code:"B97-2538",image:"assets/images/dia-phanh-xe-may.jpg",price:Number(config.DISC_BUM97_WINNER_256_PRICE)||450000,note:"Mẫu đĩa trước 256mm; ảnh nhóm sản phẩm, xác nhận lô trước khi đặt.",source:"Giá thị trường tham khảo"}
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
      ? `<strong>${formatMoney(product.price)}</strong><small>${product.source} · xác nhận lại khi đặt</small>`
      : `<strong>Liên hệ báo giá</strong><small>${product.source}</small>`;
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
            <button class="add-disc" type="button" data-add-disc="${product.id}">${product.price?"Thêm vào giỏ":"Thêm để báo giá"}</button>
            <a class="view-disc" href="${product.detail||zalo}" ${product.detail?"":"target=\"_blank\" rel=\"noopener\""} aria-label="${product.detail?"Xem chi tiết":"Hỏi qua Zalo"} ${product.name}">${product.detail?"↗":"Z"}</a>
          </div>
        </div>
      </article>`).join(""):'<div class="empty-results"><strong>Không tìm thấy mẫu phù hợp.</strong><p>Thử xóa bớt bộ lọc hoặc nhập tên xe ngắn hơn.</p></div>';
  }

  [search,brand,type,size].forEach(control=>control.addEventListener(control===search?"input":"change",renderCatalog));
  clear.addEventListener("click",()=>{search.value="";brand.value="";type.value="";size.value="";renderCatalog();search.focus()});
  renderCatalog();

  const storageKey="dochoixe99DiscCartV1";
  let cart=[];
  try{cart=JSON.parse(localStorage.getItem(storageKey)||"[]").filter(item=>byId[item.id]&&Number.isInteger(item.quantity)&&item.quantity>0)}catch(error){cart=[]}
  const cartButtons=document.querySelectorAll("[data-open-disc-cart]");
  const cartCounts=document.querySelectorAll("[data-disc-cart-count]");
  const drawer=document.getElementById("discCartDrawer");
  const backdrop=document.getElementById("discCartBackdrop");
  const cartItems=document.getElementById("discCartItems");
  const totalNode=document.getElementById("discCartTotal");
  const quoteNode=document.getElementById("discQuoteCount");
  const form=document.getElementById("discOrderForm");
  const toast=document.getElementById("discToast");

  function saveCart(){try{localStorage.setItem(storageKey,JSON.stringify(cart))}catch(error){}}
  function showToast(message,isError=false){toast.textContent=message;toast.classList.toggle("error",isError);toast.classList.add("show");clearTimeout(showToast.timer);showToast.timer=setTimeout(()=>toast.classList.remove("show"),2600)}
  function openCart(){document.body.classList.add("cart-open");drawer.classList.add("open");backdrop.classList.add("open");drawer.setAttribute("aria-hidden","false");cartButtons.forEach(button=>button.setAttribute("aria-expanded","true"));document.getElementById("discCartClose").focus()}
  function closeCart(){document.body.classList.remove("cart-open");drawer.classList.remove("open");backdrop.classList.remove("open");drawer.setAttribute("aria-hidden","true");cartButtons.forEach(button=>button.setAttribute("aria-expanded","false"))}
  function addToCart(id){const existing=cart.find(item=>item.id===id);if(existing)existing.quantity=Math.min(10,existing.quantity+1);else cart.push({id,quantity:1});saveCart();renderCart();showToast("Đã thêm vào giỏ hàng");openCart()}
  function updateQuantity(id,change){const item=cart.find(entry=>entry.id===id);if(!item)return;item.quantity=Math.max(0,Math.min(10,item.quantity+change));cart=cart.filter(entry=>entry.quantity>0);saveCart();renderCart()}
  function removeItem(id){cart=cart.filter(item=>item.id!==id);saveCart();renderCart()}

  function renderCart(){
    const count=cart.reduce((sum,item)=>sum+item.quantity,0);
    const total=cart.reduce((sum,item)=>sum+(byId[item.id].price||0)*item.quantity,0);
    const quoteCount=cart.reduce((sum,item)=>sum+(byId[item.id].price?0:item.quantity),0);
    cartCounts.forEach(node=>node.textContent=String(count));
    totalNode.textContent=formatMoney(total);
    quoteNode.textContent=quoteCount?`${quoteCount} sản phẩm đang chờ shop báo giá.`:"Tất cả sản phẩm trong giỏ đã có giá tham khảo.";
    cartItems.innerHTML=cart.length?cart.map(item=>{const product=byId[item.id];return `<article class="cart-item"><img src="${product.image}" alt=""><div><h3>${product.name}</h3><div class="cart-item-price">${product.price?formatMoney(product.price):"Chờ báo giá"}</div><div class="quantity"><button type="button" data-disc-decrease="${item.id}" aria-label="Giảm số lượng">−</button><strong>${item.quantity}</strong><button type="button" data-disc-increase="${item.id}" aria-label="Tăng số lượng">+</button></div></div><div><button class="remove-item" type="button" data-disc-remove="${item.id}">Xóa</button></div></article>`}).join(""):'<div class="cart-empty"><strong>Giỏ hàng đang trống</strong><p>Chọn đĩa theo xe, size hoặc thương hiệu ở catalog.</p></div>';
    form.querySelector('button[type="submit"]').disabled=!cart.length;
  }

  root.addEventListener("click",event=>{const button=event.target.closest("[data-add-disc]");if(button)addToCart(button.dataset.addDisc)});
  cartItems.addEventListener("click",event=>{const decrease=event.target.closest("[data-disc-decrease]"),increase=event.target.closest("[data-disc-increase]"),remove=event.target.closest("[data-disc-remove]");if(decrease)updateQuantity(decrease.dataset.discDecrease,-1);if(increase)updateQuantity(increase.dataset.discIncrease,1);if(remove)removeItem(remove.dataset.discRemove)});
  cartButtons.forEach(button=>button.addEventListener("click",openCart));
  document.getElementById("discCartClose").addEventListener("click",closeCart);
  backdrop.addEventListener("click",closeCart);
  addEventListener("keydown",event=>{if(event.key==="Escape")closeCart()});

  form.addEventListener("submit",async event=>{
    event.preventDefault();
    if(!cart.length){showToast("Giỏ hàng đang trống",true);return}
    if(!form.reportValidity())return;
    const endpoint=config.LEAD_WEB_APP_URL||"";
    if(!/^https:\/\/script\.google\.com\/macros\/s\/.+\/exec$/.test(endpoint)){showToast("Kênh nhận đơn đang bảo trì. Vui lòng nhắn Zalo.",true);return}
    const formData=Object.fromEntries(new FormData(form).entries());
    if(formData.company)return;
    const button=form.querySelector('button[type="submit"]');
    const original=button.textContent;
    const totalKnown=cart.reduce((sum,item)=>sum+(byId[item.id].price||0)*item.quantity,0);
    const payload={type:"disc_catalog_order",name:formData.name,phone:formData.phone,bike:formData.bike,note:formData.note,items:cart.map(item=>({...byId[item.id],quantity:item.quantity})),totalKnown,page:location.href,submittedAt:new Date().toISOString()};
    button.disabled=true;button.textContent="Đang gửi...";
    try{await fetch(endpoint,{method:"POST",mode:"no-cors",headers:{"Content-Type":"text/plain;charset=utf-8"},body:JSON.stringify(payload),keepalive:true});cart=[];saveCart();renderCart();form.reset();closeCart();showToast("Đã gửi giỏ hàng — shop sẽ liên hệ xác nhận!")}
    catch(error){showToast("Không gửi được. Vui lòng gọi hoặc nhắn Zalo.",true)}
    finally{button.disabled=!cart.length;button.textContent=original}
  });

  renderCart();
  if(new URLSearchParams(location.search).get("cart")==="open")openCart();
})();
