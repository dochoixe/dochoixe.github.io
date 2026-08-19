(function renderSharedFooter() {
  const config = window.DOCHOIXE99_CONFIG || {};
  const phoneRaw = config.PHONE_RAW || "0878976186";
  const phoneDisplay = config.PHONE_DISPLAY || "0878 976 186";
  const SOCIAL_LINKS = {
    facebook: config.FACEBOOK_URL || "",
    tiktok: config.TIKTOK_URL || "",
    instagram: config.INSTAGRAM_URL || ""
  };

  const socialItems = [
    {key:"facebook",label:"Facebook",icon:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M13.8 22v-9h3l.5-3.5h-3.5V7.3c0-1 .3-1.7 1.8-1.7h1.9V2.5c-.3 0-1.5-.1-2.8-.1-2.8 0-4.7 1.7-4.7 4.8v2.3H7V13h3v9h3.8Z"/></svg>'},
    {key:"tiktok",label:"TikTok",icon:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M19.6 5.8a5.7 5.7 0 0 1-3.4-1.1v10a6.2 6.2 0 1 1-5.4-6.1v3.3a3 3 0 1 0 2.2 2.8V2h3.2c.3 2.2 1.5 3.5 3.4 3.8Z"/></svg>'},
    {key:"instagram",label:"Instagram",icon:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7.2 2h9.6A5.2 5.2 0 0 1 22 7.2v9.6a5.2 5.2 0 0 1-5.2 5.2H7.2A5.2 5.2 0 0 1 2 16.8V7.2A5.2 5.2 0 0 1 7.2 2Zm-.2 2A3 3 0 0 0 4 7v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H7Zm10.2 1.5a1.3 1.3 0 1 1 0 2.6 1.3 1.3 0 0 1 0-2.6ZM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z"/></svg>'}
  ];
  const validSocialUrl = value => /^https:\/\//i.test(value);
  const socialMarkup = socialItems.map(item => validSocialUrl(SOCIAL_LINKS[item.key])
    ? `<a href="${SOCIAL_LINKS[item.key]}" target="_blank" rel="noopener noreferrer" aria-label="${item.label}" title="${item.label}">${item.icon}</a>`
    : `<span class="is-disabled" role="img" aria-label="${item.label} — link đang cập nhật" title="${item.label} — link đang cập nhật">${item.icon}</span>`
  ).join("");

  if (!document.getElementById("shared-footer-style")) {
    const style = document.createElement("style");
    style.id = "shared-footer-style";
    style.textContent = `
      #shared-site-footer{border-top:1px solid #1c2026;background:#060708;color:#a6abb5;padding:38px 0 18px;font-family:Inter,Arial,Helvetica,sans-serif}
      .shared-footer-wrap{width:min(1180px,calc(100% - 40px));margin:auto}
      .shared-footer-grid{display:grid;grid-template-columns:1.25fr .9fr .9fr;gap:42px;align-items:start}
      .shared-footer-brand{display:inline-flex;align-items:center;gap:13px;color:#fff;text-decoration:none}
      .shared-footer-logo{width:48px;height:48px;border-radius:13px;object-fit:cover;border:1px solid #282d34;box-shadow:0 10px 25px rgba(239,35,60,.18)}
      .shared-footer-name{display:block;color:#fff;font-size:18px;font-weight:950;line-height:1.05;letter-spacing:-.02em}.shared-footer-name em{color:#ef233c;font-style:normal}
      .shared-footer-tagline{display:block;margin-top:5px;color:#8f949d;font-size:10px;font-weight:750;letter-spacing:.04em}
      .shared-footer-copy{margin:16px 0 0;max-width:470px;color:#8f949d;font-size:14px;line-height:1.65}
      .shared-footer-title{margin:8px 0 16px;color:#81786b;font-size:12px;font-weight:900;letter-spacing:.12em;text-transform:uppercase}
      .shared-footer-links{display:grid;grid-template-columns:1fr;gap:11px}.shared-footer-links a{color:#f4f4f5;text-decoration:none;font-size:13px;transition:.2s}.shared-footer-links a:hover{color:#ef233c;transform:translateX(2px)}
      .shared-footer-social{display:flex;gap:9px;margin-top:17px}.shared-footer-social a,.shared-footer-social span{display:inline-flex;align-items:center;justify-content:center;width:34px;height:34px;border:1px solid #242932;border-radius:10px;background:#090b0f;color:#fff;text-decoration:none;transition:.22s}.shared-footer-social a:hover{border-color:#ef233c;color:#ef233c;transform:translateY(-2px)}.shared-footer-social .is-disabled{opacity:.5;cursor:not-allowed}.shared-footer-social svg{width:15px;height:15px;fill:currentColor}
      .shared-footer-bottom{margin-top:28px;padding-top:16px;border-top:1px solid #171a20;color:#737983;font-size:12px;display:flex;justify-content:space-between;gap:16px;flex-wrap:wrap}
      .mobile-lead-bar{display:none}
      @media(max-width:820px){.shared-footer-grid{grid-template-columns:1fr 1fr}.shared-footer-grid>div:first-child{grid-column:1/-1}}
      @media(max-width:520px){body{padding-bottom:70px}.shared-footer-wrap{width:min(100% - 24px,1180px)}.shared-footer-grid{grid-template-columns:1fr;gap:22px}.shared-footer-grid>div:first-child{grid-column:auto}.shared-footer-bottom{display:block}.mobile-lead-bar{position:fixed;z-index:1000;left:0;right:0;bottom:0;display:grid;grid-template-columns:.72fr .72fr 1.56fr;gap:2px;padding:7px 8px max(8px,env(safe-area-inset-bottom));background:#090a0d;border-top:1px solid #30343c;box-shadow:0 -12px 30px rgba(0,0,0,.38)}.mobile-lead-bar a{min-height:48px;display:flex;align-items:center;justify-content:center;border-radius:10px;background:#171a20;color:#fff;text-decoration:none;font-size:11px;font-weight:900}.mobile-lead-bar a:last-child{background:#d91f26}}
    `;
    document.head.appendChild(style);
  }

  const footer = document.querySelector("footer");
  if (footer) {
    footer.outerHTML = `
      <footer id="shared-site-footer">
        <div class="shared-footer-wrap">
          <div class="shared-footer-grid">
            <div>
              <a class="shared-footer-brand" href="/" aria-label="DOCHOIXE99 - Trang chủ">
                <img class="shared-footer-logo" src="/assets/images/logo-dochoixe99.webp" alt="Logo DOCHOIXE99" width="48" height="48" loading="lazy" decoding="async">
                <span><span class="shared-footer-name">DOCHOIXE<em>99</em></span><span class="shared-footer-tagline">Đồ chơi xe máy • Phụ tùng • Phụ kiện</span></span>
              </a>
              <div class="shared-footer-copy">Phụ kiện và phụ tùng xe máy, ưu tiên kiểm tra đúng dòng xe và cấu hình trước khi lắp.</div>
              <div class="shared-footer-social" role="navigation" aria-label="Mạng xã hội DOCHOIXE99">${socialMarkup}</div>
            </div>
            <div>
              <div class="shared-footer-title">Sản phẩm</div>
              <nav class="shared-footer-links" aria-label="Danh mục cuối trang">
                <a href="/dia-thang-xe-may.html">Đĩa thắng</a>
                <a href="/heo-dau-xe-may.html">Heo & dây dầu</a>
                <a href="/do-choi-tay-lai.html">Đồ chơi tay lái</a>
                <a href="/phuoc-rcb.html">Phuộc RCB</a>
                <a href="/nhong-sen-dia.html">Nhông sên đĩa</a>
                <a href="/mam-xe.html">Mâm xe</a>
              </nav>
            </div>
            <div>
              <div class="shared-footer-title">Liên kết</div>
              <nav class="shared-footer-links" aria-label="Liên kết cuối trang">
                <a href="/chon-phu-kien-theo-xe.html">Chọn phụ kiện theo xe</a>
                <a href="/bai-viet/">Blog</a>
                <a href="/gioi-thieu.html">Giới thiệu</a>
                <a href="/#lien-he">Liên hệ</a>
                <a href="tel:${phoneRaw}">${phoneDisplay}</a>
              </nav>
            </div>
          </div>
          <div class="shared-footer-bottom"><span>© 2026 DOCHOIXE99. Đồ chơi và phụ kiện xe máy.</span><span>Thông tin giá và tương thích được xác nhận trước khi đặt.</span></div>
        </div>
      </footer>`;
  }

  if (!document.querySelector(".mobile-lead-bar")) {
    document.body.insertAdjacentHTML("beforeend", `
      <nav class="mobile-lead-bar" aria-label="Liên hệ nhanh">
        <a href="tel:${phoneRaw}">☎ GỌI</a>
        <a href="https://zalo.me/${phoneRaw}" target="_blank" rel="noopener">ZALO</a>
        <a href="/chon-phu-kien-theo-xe.html">TÌM ĐỒ CHO XE</a>
      </nav>`);
  }
})();
