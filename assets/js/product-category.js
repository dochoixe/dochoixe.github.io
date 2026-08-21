(function initProductCategory(){
  const menuButton=document.querySelector("[data-menu-button]");
  const menu=document.querySelector("[data-category-menu]");
  if(menuButton&&menu){
    menuButton.addEventListener("click",()=>{
      const open=menu.classList.toggle("open");
      menuButton.setAttribute("aria-expanded",String(open));
    });
    menu.querySelectorAll("a").forEach(link=>link.addEventListener("click",()=>menu.classList.remove("open")));
  }
  let count=0;
  try{
    const keys=["dochoixe99DiscCartV1","dochoixe99BrakeCartV1","dochoixe99CartV1"];
    count=keys.reduce((total,key)=>{const items=JSON.parse(localStorage.getItem(key)||"[]");return total+(Array.isArray(items)?items.reduce((sum,item)=>sum+(Number(item.quantity)||0),0):0)},0);
  }catch(error){}
  document.querySelectorAll("[data-global-cart-count]").forEach(node=>node.textContent=String(count));
  const config=window.DOCHOIXE99_CONFIG||{};
  const phone=config.PHONE_RAW||"0878976186";
  document.querySelectorAll("[data-phone]").forEach(link=>link.href="tel:"+phone);
})();
