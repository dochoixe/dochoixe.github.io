(function renderSharedFooter() {
  const config = window.DOCHOIXE99_CONFIG || {};
  const SOCIAL_LINKS = {
    facebook: config.FACEBOOK_URL || "",
    tiktok: config.TIKTOK_URL || "",
    instagram: config.INSTAGRAM_URL || ""
  };

  const socialItems = [
    {
      key: "facebook",
      label: "Facebook",
      icon: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M13.8 22v-9h3l.5-3.5h-3.5V7.3c0-1 .3-1.7 1.8-1.7h1.9V2.5c-.3 0-1.5-.1-2.8-.1-2.8 0-4.7 1.7-4.7 4.8v2.3H7V13h3v9h3.8Z"/></svg>'
    },
    {
      key: "tiktok",
      label: "TikTok",
      icon: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M19.6 5.8a5.7 5.7 0 0 1-3.4-1.1v10a6.2 6.2 0 1 1-5.4-6.1v3.3a3 3 0 1 0 2.2 2.8V2h3.2c.3 2.2 1.5 3.5 3.4 3.8Z"/></svg>'
    },
    {
      key: "instagram",
      label: "Instagram",
      icon: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7.2 2h9.6A5.2 5.2 0 0 1 22 7.2v9.6a5.2 5.2 0 0 1-5.2 5.2H7.2A5.2 5.2 0 0 1 2 16.8V7.2A5.2 5.2 0 0 1 7.2 2Zm-.2 2A3 3 0 0 0 4 7v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H7Zm10.2 1.5a1.3 1.3 0 1 1 0 2.6 1.3 1.3 0 0 1 0-2.6ZM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z"/></svg>'
    }
  ];
  const validSocialUrl = (value) => /^https:\/\//i.test(value);
  const socialMarkup = socialItems.map((item) => {
    const inner = item.icon;
    return validSocialUrl(SOCIAL_LINKS[item.key])
      ? `<a href="${SOCIAL_LINKS[item.key]}" target="_blank" rel="noopener noreferrer" aria-label="${item.label}" title="${item.label}">${inner}</a>`
      : `<span class="is-disabled" aria-label="${item.label} — link đang cập nhật" title="${item.label} — link đang cập nhật">${inner}</span>`;
  }).join("");

  const style = document.createElement("style");
  style.id = "shared-footer-style";
  style.textContent = `
    #shared-site-footer{border-top:1px solid #1c2026;background:#060708;color:#a6abb5;padding:36px 0 18px;font-family:Arial,Helvetica,sans-serif}
    .shared-footer-wrap{width:min(1180px,calc(100% - 40px));margin:auto}
    .shared-footer-grid{display:grid;grid-template-columns:1.3fr .8fr .8fr;gap:42px;align-items:start}
    .shared-footer-brand{display:inline-flex;align-items:center;gap:14px;color:#fff;text-decoration:none}
    .shared-footer-logo{width:52px;height:52px;border-radius:14px;object-fit:cover;border:1px solid #282d34;box-shadow:0 10px 25px rgba(239,35,60,.18)}
    .shared-footer-name{display:block;color:#fff;font-size:17px;font-weight:900;line-height:1.05}
    .shared-footer-name em{color:#ef233c;font-style:normal}
    .shared-footer-tagline{display:block;margin-top:4px;color:#8f949d;font-size:11px;font-weight:700}
    .shared-footer-copy{margin:16px 0 0;max-width:470px;color:#8f949d;font-size:15px;line-height:1.65}
    .shared-footer-title{margin:8px 0 18px;color:#81786b;font-size:13px;font-weight:900;letter-spacing:.12em;text-transform:uppercase}
    .shared-footer-links{display:grid;gap:14px}
    .shared-footer-links a{color:#f4f4f5;text-decoration:none;font-size:14px;transition:.2s}
    .shared-footer-links a:hover{color:#ef233c;transform:translateX(2px)}
    .shared-footer-social{display:flex;gap:10px;margin-top:18px}
    .shared-footer-social a,.shared-footer-social span{display:inline-flex;align-items:center;justify-content:center;width:34px;height:34px;border:1px solid #242932;border-radius:10px;background:#090b0f;color:#fff;text-decoration:none;transition:.22s}
    .shared-footer-social a:hover{border-color:#ef233c;background:#151012;color:#ef233c;transform:translateY(-2px)}
    .shared-footer-social .is-disabled{opacity:.55;cursor:not-allowed}
    .shared-footer-social svg{width:15px;height:15px;fill:currentColor}
    .shared-footer-bottom{margin-top:28px;padding-top:16px;border-top:1px solid #171a20;color:#737983;font-size:12px}
    .shared-header-cart{position:relative;display:inline-flex!important;width:44px;height:44px;flex:0 0 44px;align-items:center;justify-content:center;padding:0!important;border:1px solid #3b4049!important;border-radius:13px!important;background:#171a20!important;color:#fff!important;text-decoration:none!important;box-shadow:none!important}
    .shared-header-cart:hover{border-color:#ef233c!important;color:#ff6577!important;transform:translateY(-1px)}
    .shared-header-cart svg{width:21px;height:21px;fill:none;stroke:currentColor;stroke-width:1.9;stroke-linecap:round;stroke-linejoin:round}
    .shared-header-cart-count{position:absolute;top:-7px;right:-7px;display:grid;min-width:22px;height:22px;padding:0 5px;place-items:center;border:2px solid #090a0d;border-radius:999px;background:#ef233c;color:#fff;font-size:10px;font-weight:950;line-height:1}
    .mobile-lead-bar{display:none}
    @media(max-width:850px){.shared-footer-grid{grid-template-columns:1fr 1fr;gap:30px}.shared-footer-grid>div:first-child{grid-column:1/-1}}
    @media(max-width:520px){body{padding-bottom:70px}#shared-site-footer{padding:34px 0 16px}.shared-footer-wrap{width:min(100% - 24px,1180px)}.shared-footer-grid{grid-template-columns:1fr;gap:20px}.shared-footer-logo{width:48px;height:48px}.shared-footer-copy{font-size:14px}.shared-footer-title{margin-bottom:12px}.shared-header-cart{width:40px;height:40px;flex-basis:40px}.mobile-lead-bar{position:fixed;z-index:1000;left:0;right:0;bottom:0;display:grid;grid-template-columns:.72fr .72fr 1.56fr;gap:1px;padding:max(7px,env(safe-area-inset-bottom)) 8px 8px;background:#090a0d;border-top:1px solid #30343c;box-shadow:0 -12px 30px rgba(0,0,0,.38)}.mobile-lead-bar a{min-height:50px;display:flex;align-items:center;justify-content:center;border-radius:11px;background:#171a20;color:#fff;text-decoration:none;font-size:12px;font-weight:900}.mobile-lead-bar a:last-child{background:#d91f26}}
  `;
  document.head.appendChild(style);

  const existingHeaderCart = document.querySelector("header .cart-button, header .cart-link, header [data-open-disc-cart], header [data-header-cart], header a[href*='cart=open']");
  if (!existingHeaderCart) {
    const headerHost = document.querySelector("header .nav-actions") || document.querySelector("header .nav");
    if (headerHost) {
      let count = 0;
      try {
        const items = JSON.parse(localStorage.getItem("dochoixe99DiscCartV1") || "[]");
        count = Array.isArray(items) ? items.reduce((sum, item) => sum + (Number(item.quantity) || 0), 0) : 0;
      } catch (error) {}
      const cartLink = document.createElement("a");
      cartLink.className = "shared-header-cart";
      cartLink.href = "/dia-thang-xe-may.html?cart=open";
      cartLink.dataset.headerCart = "";
      cartLink.setAttribute("aria-label", `Mở giỏ hàng, ${count} sản phẩm`);
      cartLink.innerHTML = `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 4h2l2.2 10.1a2 2 0 0 0 2 1.6h7.9a2 2 0 0 0 1.9-1.4L21 8H6.1"/><circle cx="10" cy="20" r="1"/><circle cx="18" cy="20" r="1"/></svg><span class="shared-header-cart-count">${count}</span>`;
      if (headerHost.classList.contains("nav-actions")) headerHost.insertBefore(cartLink, headerHost.firstChild);
      else headerHost.appendChild(cartLink);
    }
  }

  const footer = document.querySelector("footer");
  if (!footer) return;
  const logo = document.querySelector("header .brand img, .brand img, .foot-brand img, footer img");
  const logoSource = logo ? logo.getAttribute("src") : "/assets/images/logo-dochoixe99.webp";
  footer.outerHTML = `
    <footer id="shared-site-footer">
      <div class="shared-footer-wrap">
        <div class="shared-footer-grid">
          <div>
            <a class="shared-footer-brand" href="https://dochoixe.github.io/">
              <img class="shared-footer-logo" src="${logoSource}" alt="Logo DOCHOIXE99" width="160" height="160" loading="lazy" decoding="async">
              <span>
                <span class="shared-footer-name">DOCHOIXE<em>99</em></span>
                <span class="shared-footer-tagline">Đồ chơi xe máy • Phụ tùng • Phụ kiện</span>
              </span>
            </a>
            <div class="shared-footer-copy">Phụ kiện và phụ tùng xe máy theo phong cách đen–đỏ, ưu tiên kiểm tra tương thích trước khi lắp.</div>
            <div class="shared-footer-social" role="navigation" aria-label="Mạng xã hội DOCHOIXE99">${socialMarkup}</div>
          </div>
          <div>
            <div class="shared-footer-title">Danh mục</div>
            <nav class="shared-footer-links" aria-label="Danh mục cuối trang">
              <a href="/he-thong-phanh.html">Hệ thống phanh</a>
              <a href="/cnc-he-thong-treo.html">CNC & hệ thống treo</a>
            </nav>
          </div>
          <div>
            <div class="shared-footer-title">Liên kết</div>
            <nav class="shared-footer-links" aria-label="Liên kết cuối trang">
              <a href="/">Trang chủ</a>
              <a href="/bai-viet/">Blog</a>
              <a href="/index.html#lien-he">Liên hệ</a>
              <a href="tel:${config.PHONE_RAW || "0878976186"}">${config.PHONE_DISPLAY || "0878 976 186"}</a>
            </nav>
          </div>
        </div>
        <div class="shared-footer-bottom">© 2026 DOCHOIXE99. Đồ chơi và phụ kiện xe máy.</div>
      </div>
    </footer>`;

  const phone = config.PHONE_RAW || "0878976186";
  const vehiclePath = config.VEHICLE_SELECTOR_PATH || "chon-phu-kien-theo-xe.html";
  document.body.insertAdjacentHTML("beforeend", `
    <nav class="mobile-lead-bar" aria-label="Liên hệ nhanh">
      <a href="tel:${phone}" aria-label="Gọi DOCHOIXE99">☎ GỌI</a>
      <a href="https://zalo.me/${phone}" target="_blank" rel="noopener" aria-label="Nhắn Zalo DOCHOIXE99">ZALO</a>
      <a href="${(config.HOME_URL || "/").replace(/\/?$/, "/") + vehiclePath}">TÌM ĐỒ CHO XE</a>
    </nav>`);
})();
