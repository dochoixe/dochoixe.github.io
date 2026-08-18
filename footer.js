(function renderSharedFooter() {
  const SOCIAL_LINKS = {
    tiktok: "LINK_TIKTOK_CUA_BAN",
    facebook: "LINK_FACEBOOK_CUA_BAN",
    instagram: "LINK_INSTAGRAM_CUA_BAN"
  };

  const style = document.createElement("style");
  style.id = "shared-footer-style";
  style.textContent = `
    #shared-site-footer{border-top:1px solid #242830;background:#090a0d;color:#999da7;padding:48px 0;font-family:Arial,Helvetica,sans-serif}
    .shared-footer-wrap{width:min(1180px,calc(100% - 40px));margin:auto;display:flex;align-items:center;justify-content:space-between;gap:32px}
    .shared-footer-brand{display:inline-flex;align-items:center;gap:12px;color:#fff;text-decoration:none}
    .shared-footer-logo{width:68px;height:68px;border-radius:16px;object-fit:cover;border:1px solid #343943}
    .shared-footer-name{display:block;color:#aebee3;font-size:28px;font-weight:900;line-height:1}
    .shared-footer-name em{color:#ef233c;font-style:normal}
    .shared-footer-tagline{display:block;margin-top:7px;color:#aeb3bd;font-size:11px;font-weight:800;letter-spacing:1.2px;text-transform:uppercase}
    .shared-footer-copy{margin-top:10px;color:#b5b8c1;font-size:13px}
    .shared-footer-note{margin-top:10px;max-width:690px;color:#a9adb6;font-size:11px;line-height:1.6}
    .shared-footer-right{display:flex;align-items:center;justify-content:flex-end;gap:18px;flex-wrap:wrap}
    .shared-footer-nav{display:flex;align-items:center;gap:24px;flex-wrap:wrap}
    .shared-footer-nav a{color:#b8bbc4;text-decoration:none;font-size:14px;transition:.2s}
    .shared-footer-nav a:hover{color:#ef233c}
    .shared-footer-social{display:inline-flex;align-items:center;gap:8px}
    .shared-footer-social a{display:inline-flex;align-items:center;justify-content:center;width:30px;height:30px;border:1px solid #30343c;border-radius:50%;background:#111318;color:#aeb3bd;text-decoration:none;transition:.2s}
    .shared-footer-social a:hover{transform:translateY(-2px);border-color:#ef233c;background:#211315;color:#ef233c}
    .shared-footer-social svg{width:14px;height:14px;fill:currentColor}
    @media(max-width:850px){.shared-footer-wrap{align-items:flex-start;flex-direction:column}.shared-footer-right{justify-content:flex-start}.shared-footer-nav{gap:16px}}
    @media(max-width:520px){#shared-site-footer{padding:38px 0}.shared-footer-wrap{width:min(100% - 24px,1180px)}.shared-footer-logo{width:56px;height:56px}.shared-footer-name{font-size:23px}.shared-footer-right{align-items:flex-start;flex-direction:column}.shared-footer-nav{display:grid;grid-template-columns:repeat(2,1fr);width:100%}}
  `;
  document.head.appendChild(style);

  const footer = document.querySelector("footer");
  if (!footer) return;
  const logo = footer.querySelector("img") || document.querySelector(".brand img, .foot-brand img");
  const logoSource = logo ? logo.getAttribute("src") : "logo-dochoixe99.jpg";

  footer.outerHTML = `
    <footer id="shared-site-footer">
      <div class="shared-footer-wrap">
        <div>
          <a class="shared-footer-brand" href="https://dochoixe.github.io/">
            <img class="shared-footer-logo" src="${logoSource}" alt="Logo DOCHOIXE99" width="160" height="160" loading="lazy" decoding="async">
            <span>
              <span class="shared-footer-name">DOCHOIXE<em>99</em></span>
              <span class="shared-footer-tagline">Đồ chơi xe máy • Phụ tùng • Phụ kiện</span>
            </span>
          </a>
          <div class="shared-footer-copy">© 2026 DOCHOIXE99. Đồ chơi và phụ kiện xe máy.</div>
          <div class="shared-footer-note">Hình ảnh trong bản mẫu dùng để minh họa giao diện; tên và nhãn hiệu xe thuộc chủ sở hữu tương ứng.</div>
        </div>

        <div class="shared-footer-right">
          <nav class="shared-footer-nav" aria-label="Liên kết cuối trang">
            <a href="/#kham-pha-xe">Dòng xe</a>
            <a href="/#phu-tung">Phụ tùng</a>
            <a href="/#phu-kien">Phụ kiện</a>
            <a href="/bai-viet/">Blog</a>
            <a href="/#lien-he">Liên hệ</a>
          </nav>

          <div class="shared-footer-social" role="navigation" aria-label="Mạng xã hội DOCHOIXE99">
            <a href="${SOCIAL_LINKS.tiktok}" target="_blank" rel="noopener noreferrer" aria-label="TikTok" title="TikTok">
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M19.6 5.8a5.7 5.7 0 0 1-3.4-1.1v10a6.2 6.2 0 1 1-5.4-6.1v3.3a3 3 0 1 0 2.2 2.8V2h3.2c.3 2.2 1.5 3.5 3.4 3.8Z"/></svg>
            </a>
            <a href="${SOCIAL_LINKS.facebook}" target="_blank" rel="noopener noreferrer" aria-label="Facebook" title="Facebook">
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M13.8 22v-9h3l.5-3.5h-3.5V7.3c0-1 .3-1.7 1.8-1.7h1.9V2.5c-.3 0-1.5-.1-2.8-.1-2.8 0-4.7 1.7-4.7 4.8v2.3H7V13h3v9h3.8Z"/></svg>
            </a>
            <a href="${SOCIAL_LINKS.instagram}" target="_blank" rel="noopener noreferrer" aria-label="Instagram" title="Instagram">
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7.2 2h9.6A5.2 5.2 0 0 1 22 7.2v9.6a5.2 5.2 0 0 1-5.2 5.2H7.2A5.2 5.2 0 0 1 2 16.8V7.2A5.2 5.2 0 0 1 7.2 2Zm-.2 2A3 3 0 0 0 4 7v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H7Zm10.2 1.5a1.3 1.3 0 1 1 0 2.6 1.3 1.3 0 0 1 0-2.6ZM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z"/></svg>
            </a>
          </div>
        </div>
      </div>
    </footer>`;
})();
