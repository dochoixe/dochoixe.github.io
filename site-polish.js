/* =========================================================
   DOCHOIXE99 - ĐĂNG NHẬP / ĐĂNG KÝ
   - Chỉ hiển thị 1 bộ tài khoản trên header
   - Đăng ký bằng Gmail
   - Đăng ký xong tự đăng nhập
   - Lưu tài khoản trên trình duyệt
   ========================================================= */

(function () {
  "use strict";

  const USERS_KEY = "DOCHOIXE99_USERS_V2";
  const SESSION_KEY = "DOCHOIXE99_SESSION_V2";

  /* =====================================================
     TIỆN ÍCH
  ===================================================== */

  function qs(selector, parent = document) {
    return parent.querySelector(selector);
  }

  function qsa(selector, parent = document) {
    return Array.from(parent.querySelectorAll(selector));
  }

  function escapeHTML(value) {
    return String(value || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  function getUsers() {
    try {
      const data = JSON.parse(localStorage.getItem(USERS_KEY) || "[]");
      return Array.isArray(data) ? data : [];
    } catch (error) {
      return [];
    }
  }

  function saveUsers(users) {
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
  }

  function getSession() {
    try {
      return JSON.parse(localStorage.getItem(SESSION_KEY) || "null");
    } catch (error) {
      return null;
    }
  }

  function saveSession(user) {
    localStorage.setItem(
      SESSION_KEY,
      JSON.stringify({
        name: user.name,
        email: user.email,
        loginAt: Date.now()
      })
    );
  }

  function logout() {
    localStorage.removeItem(SESSION_KEY);
    renderHeaderAuth();
    renderAccountSection();
  }

  function isGmail(email) {
    return /^[a-zA-Z0-9._%+-]+@gmail\.com$/i.test(
      String(email || "").trim()
    );
  }

  async function hashPassword(password) {
    if (!window.crypto || !window.crypto.subtle) {
      return btoa(unescape(encodeURIComponent(password)));
    }

    const data = new TextEncoder().encode(password);
    const buffer = await crypto.subtle.digest("SHA-256", data);

    return Array.from(new Uint8Array(buffer))
      .map(byte => byte.toString(16).padStart(2, "0"))
      .join("");
  }

  /* =====================================================
     CSS
  ===================================================== */

  function injectStyle() {
    if (document.getElementById("dx99-auth-style")) return;

    const style = document.createElement("style");
    style.id = "dx99-auth-style";

    style.textContent = `
      .dx99-auth-header{
        display:flex;
        align-items:center;
        gap:8px;
        flex-shrink:0;
      }

      .dx99-auth-btn{
        display:inline-flex;
        align-items:center;
        justify-content:center;
        min-height:42px;
        padding:0 15px;
        border:1px solid #343942;
        border-radius:11px;
        background:#171a20;
        color:#fff !important;
        text-decoration:none !important;
        font-size:13px;
        font-weight:850;
        cursor:pointer;
        transition:.2s;
        white-space:nowrap;
      }

      .dx99-auth-btn:hover{
        border-color:#ef233c;
        color:#fff;
        transform:translateY(-1px);
      }

      .dx99-auth-btn.primary{
        border-color:#ef233c;
        background:#ef233c;
      }

      .dx99-auth-user{
        max-width:130px;
        overflow:hidden;
        text-overflow:ellipsis;
      }

      .dx99-auth-modal{
        position:fixed;
        z-index:99999;
        inset:0;
        display:none;
        align-items:center;
        justify-content:center;
        padding:20px;
        background:rgba(0,0,0,.72);
        backdrop-filter:blur(7px);
      }

      .dx99-auth-modal.open{
        display:flex;
      }

      .dx99-auth-box{
        position:relative;
        width:min(440px,100%);
        overflow:hidden;
        border:1px solid #30353e;
        border-radius:22px;
        background:#111419;
        color:#fff;
        box-shadow:0 35px 100px rgba(0,0,0,.55);
      }

      .dx99-auth-top{
        padding:26px 26px 18px;
        border-bottom:1px solid #292e35;
      }

      .dx99-auth-top small{
        display:block;
        margin-bottom:5px;
        color:#ef233c;
        font-size:10px;
        font-weight:950;
        letter-spacing:.13em;
        text-transform:uppercase;
      }

      .dx99-auth-top h2{
        margin:0;
        font-size:27px;
      }

      .dx99-auth-close{
        position:absolute;
        top:17px;
        right:17px;
        width:39px;
        height:39px;
        border:1px solid #373c45;
        border-radius:10px;
        background:#191c22;
        color:#fff;
        font-size:21px;
        cursor:pointer;
      }

      .dx99-auth-tabs{
        display:grid;
        grid-template-columns:1fr 1fr;
        gap:7px;
        padding:16px 24px 0;
      }

      .dx99-auth-tab{
        min-height:43px;
        border:1px solid #343941;
        border-radius:10px;
        background:#181b20;
        color:#aaaeb7;
        font-weight:900;
        cursor:pointer;
      }

      .dx99-auth-tab.active{
        border-color:#ef233c;
        background:#ef233c;
        color:#fff;
      }

      .dx99-auth-form{
        display:none;
        padding:22px 24px 26px;
      }

      .dx99-auth-form.active{
        display:block;
      }

      .dx99-field{
        display:grid;
        gap:6px;
        margin-bottom:14px;
      }

      .dx99-field label{
        color:#d7dae0;
        font-size:11px;
        font-weight:850;
      }

      .dx99-field input{
        width:100%;
        height:47px;
        padding:0 13px;
        border:1px solid #343941;
        border-radius:10px;
        background:#191c22;
        color:#fff;
        outline:0;
      }

      .dx99-field input:focus{
        border-color:#ef233c;
        box-shadow:0 0 0 3px rgba(239,35,60,.10);
      }

      .dx99-submit{
        width:100%;
        min-height:49px;
        margin-top:4px;
        border:0;
        border-radius:11px;
        background:linear-gradient(135deg,#ef233c,#b6091c);
        color:#fff;
        font-weight:950;
        cursor:pointer;
      }

      .dx99-auth-message{
        display:none;
        margin-bottom:14px;
        padding:10px 12px;
        border-radius:9px;
        font-size:12px;
        line-height:1.5;
      }

      .dx99-auth-message.show{
        display:block;
      }

      .dx99-auth-message.error{
        border:1px solid #7f2730;
        background:#291317;
        color:#ffadb5;
      }

      .dx99-auth-message.success{
        border:1px solid #1f6546;
        background:#10261d;
        color:#87e8bb;
      }

      .dx99-account-logged{
        padding:25px;
      }

      .dx99-account-logged strong{
        display:block;
        margin-bottom:4px;
        font-size:20px;
      }

      .dx99-account-logged p{
        margin:0 0 18px;
        color:#aeb3bc;
      }

      @media(max-width:1100px){
        .dx99-auth-header{
          gap:5px;
        }

        .dx99-auth-btn{
          padding:0 10px;
          font-size:11px;
        }

        .dx99-auth-user{
          max-width:90px;
        }
      }
    `;

    document.head.appendChild(style);
  }

  /* =====================================================
     XÓA NHỮNG NÚT AUTH CŨ BỊ TRÙNG
  ===================================================== */

  function cleanupOldHeaderAuth() {
    qsa(
      "#dx99AuthHeader," +
      ".dx99-auth-header," +
      "[data-dx99-auth-header]," +
      ".header-auth," +
      ".account-header-actions"
    ).forEach(element => element.remove());

    const menu =
      qs(".site-header .menu") ||
      qs("header .menu") ||
      qs(".main-nav") ||
      qs("header nav");

    if (!menu) return;

    Array.from(menu.children).forEach(element => {
      const text = element.textContent.trim().toLowerCase();

      const oldTexts = [
        "tài khoản",
        "đăng nhập",
        "đăng ký",
        "đăng xuất"
      ];

      if (oldTexts.includes(text)) {
        element.remove();
      }

      if (
        element.dataset &&
        (
          element.dataset.auth === "true" ||
          element.dataset.dx99Auth === "true"
        )
      ) {
        element.remove();
      }
    });
  }

  /* =====================================================
     HEADER
  ===================================================== */

  function findHeaderInsertPoint() {
    return (
      qs(".site-header .menu") ||
      qs("header .menu") ||
      qs(".main-nav") ||
      qs("header nav")
    );
  }

  function renderHeaderAuth() {
    cleanupOldHeaderAuth();

    const menu = findHeaderInsertPoint();
    if (!menu) return;

    const session = getSession();

    const wrapper = document.createElement("div");
    wrapper.id = "dx99AuthHeader";
    wrapper.className = "dx99-auth-header";
    wrapper.dataset.dx99AuthHeader = "true";

    if (session && session.email) {
      wrapper.innerHTML = `
        <button
          class="dx99-auth-btn dx99-auth-user"
          id="dx99AccountButton"
          type="button"
          title="${escapeHTML(session.email)}"
        >
          ${escapeHTML(session.name || "Tài khoản")}
        </button>

        <button
          class="dx99-auth-btn"
          id="dx99LogoutButton"
          type="button"
        >
          Đăng xuất
        </button>
      `;
    } else {
      wrapper.innerHTML = `
        <button
          class="dx99-auth-btn"
          id="dx99LoginButton"
          type="button"
        >
          Đăng nhập
        </button>

        <button
          class="dx99-auth-btn primary"
          id="dx99RegisterButton"
          type="button"
        >
          Đăng ký
        </button>
      `;
    }

    /*
      Chèn trước giỏ hàng nếu tìm thấy.
      Nếu không thì đưa vào cuối menu.
    */
    const cart =
      qs(".header-cart", menu) ||
      qs("[href*='cart']", menu) ||
      qs("[data-cart]", menu);

    if (cart) {
      const cartParent =
        cart.closest("a,button,.header-cart-wrap") || cart;

      menu.insertBefore(wrapper, cartParent);
    } else {
      menu.appendChild(wrapper);
    }

    const loginButton = qs("#dx99LoginButton");
    const registerButton = qs("#dx99RegisterButton");
    const logoutButton = qs("#dx99LogoutButton");
    const accountButton = qs("#dx99AccountButton");

    if (loginButton) {
      loginButton.addEventListener("click", () => {
        openAuth("login");
      });
    }

    if (registerButton) {
      registerButton.addEventListener("click", () => {
        openAuth("register");
      });
    }

    if (logoutButton) {
      logoutButton.addEventListener("click", logout);
    }

    if (accountButton) {
      accountButton.addEventListener("click", () => {
        const accountSection =
          qs("#tai-khoan") ||
          qs("#account") ||
          qs("[data-account-section]");

        if (accountSection) {
          accountSection.scrollIntoView({
            behavior: "smooth",
            block: "center"
          });
        }
      });
    }
  }

  /* =====================================================
     MODAL
  ===================================================== */

  function createModal() {
    let modal = qs("#dx99AuthModal");
    if (modal) return modal;

    modal = document.createElement("div");
    modal.id = "dx99AuthModal";
    modal.className = "dx99-auth-modal";

    modal.innerHTML = `
      <div
        class="dx99-auth-box"
        role="dialog"
        aria-modal="true"
        aria-label="Tài khoản DOCHOIXE99"
      >
        <button
          class="dx99-auth-close"
          id="dx99AuthClose"
          type="button"
          aria-label="Đóng"
        >
          ×
        </button>

        <div class="dx99-auth-top">
          <small>DOCHOIXE99 ACCOUNT</small>
          <h2>Tài khoản của bạn</h2>
        </div>

        <div class="dx99-auth-tabs">
          <button
            class="dx99-auth-tab active"
            type="button"
            data-auth-tab="login"
          >
            Đăng nhập
          </button>

          <button
            class="dx99-auth-tab"
            type="button"
            data-auth-tab="register"
          >
            Đăng ký
          </button>
        </div>

        <form
          class="dx99-auth-form active"
          id="dx99LoginForm"
          autocomplete="on"
        >
          <div
            class="dx99-auth-message"
            id="dx99LoginMessage"
          ></div>

          <div class="dx99-field">
            <label>Gmail</label>
            <input
              type="email"
              name="email"
              required
              autocomplete="email"
              placeholder="tenban@gmail.com"
            >
          </div>

          <div class="dx99-field">
            <label>Mật khẩu</label>
            <input
              type="password"
              name="password"
              required
              minlength="8"
              autocomplete="current-password"
              placeholder="Nhập mật khẩu"
            >
          </div>

          <button
            class="dx99-submit"
            type="submit"
          >
            Đăng nhập
          </button>
        </form>

        <form
          class="dx99-auth-form"
          id="dx99RegisterForm"
          autocomplete="on"
        >
          <div
            class="dx99-auth-message"
            id="dx99RegisterMessage"
          ></div>

          <div class="dx99-field">
            <label>Họ và tên</label>
            <input
              type="text"
              name="name"
              required
              minlength="2"
              autocomplete="name"
              placeholder="Tên của bạn"
            >
          </div>

          <div class="dx99-field">
            <label>Gmail</label>
            <input
              type="email"
              name="email"
              required
              autocomplete="email"
              placeholder="tenban@gmail.com"
            >
          </div>

          <div class="dx99-field">
            <label>Mật khẩu</label>
            <input
              type="password"
              name="password"
              required
              minlength="8"
              autocomplete="new-password"
              placeholder="Tối thiểu 8 ký tự"
            >
          </div>

          <div class="dx99-field">
            <label>Nhập lại mật khẩu</label>
            <input
              type="password"
              name="confirmPassword"
              required
              minlength="8"
              autocomplete="new-password"
              placeholder="Nhập lại mật khẩu"
            >
          </div>

          <button
            class="dx99-submit"
            type="submit"
          >
            Tạo tài khoản
          </button>
        </form>
      </div>
    `;

    document.body.appendChild(modal);

    qs("#dx99AuthClose", modal).addEventListener("click", closeAuth);

    modal.addEventListener("click", event => {
      if (event.target === modal) {
        closeAuth();
      }
    });

    qsa("[data-auth-tab]", modal).forEach(button => {
      button.addEventListener("click", () => {
        switchTab(button.dataset.authTab);
      });
    });

    qs("#dx99LoginForm", modal).addEventListener(
      "submit",
      handleLogin
    );

    qs("#dx99RegisterForm", modal).addEventListener(
      "submit",
      handleRegister
    );

    return modal;
  }

  function switchTab(tab) {
    const modal = createModal();

    qsa("[data-auth-tab]", modal).forEach(button => {
      button.classList.toggle(
        "active",
        button.dataset.authTab === tab
      );
    });

    qs("#dx99LoginForm", modal).classList.toggle(
      "active",
      tab === "login"
    );

    qs("#dx99RegisterForm", modal).classList.toggle(
      "active",
      tab === "register"
    );
  }

  function openAuth(tab = "login") {
    const modal = createModal();

    switchTab(tab);

    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");

    document.body.style.overflow = "hidden";
  }

  function closeAuth() {
    const modal = qs("#dx99AuthModal");
    if (!modal) return;

    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");

    document.body.style.overflow = "";
  }

  function showMessage(id, message, type = "error") {
    const box = qs("#" + id);
    if (!box) return;

    box.textContent = message;
    box.className =
      "dx99-auth-message show " + type;
  }

  function clearMessage(id) {
    const box = qs("#" + id);
    if (!box) return;

    box.textContent = "";
    box.className = "dx99-auth-message";
  }

  /* =====================================================
     ĐĂNG KÝ
  ===================================================== */

  async function handleRegister(event) {
    event.preventDefault();

    clearMessage("dx99RegisterMessage");

    const form = event.currentTarget;
    const data = new FormData(form);

    const name = String(data.get("name") || "").trim();

    const email = String(data.get("email") || "")
      .trim()
      .toLowerCase();

    const password = String(
      data.get("password") || ""
    );

    const confirmPassword = String(
      data.get("confirmPassword") || ""
    );

    if (name.length < 2) {
      showMessage(
        "dx99RegisterMessage",
        "Vui lòng nhập họ tên hợp lệ."
      );
      return;
    }

    if (!isGmail(email)) {
      showMessage(
        "dx99RegisterMessage",
        "Vui lòng sử dụng địa chỉ Gmail, ví dụ: tenban@gmail.com."
      );
      return;
    }

    if (password.length < 8) {
      showMessage(
        "dx99RegisterMessage",
        "Mật khẩu phải có ít nhất 8 ký tự."
      );
      return;
    }

    if (password !== confirmPassword) {
      showMessage(
        "dx99RegisterMessage",
        "Hai mật khẩu chưa trùng nhau."
      );
      return;
    }

    const users = getUsers();

    const existed = users.some(
      user =>
        String(user.email).toLowerCase() === email
    );

    if (existed) {
      showMessage(
        "dx99RegisterMessage",
        "Gmail này đã được đăng ký. Hãy đăng nhập."
      );
      return;
    }

    const passwordHash = await hashPassword(password);

    const user = {
      id: "DXU-" + Date.now(),
      name,
      email,
      passwordHash,
      createdAt: Date.now()
    };

    users.push(user);

    saveUsers(users);

    /*
      QUAN TRỌNG:
      ĐĂNG KÝ XONG TỰ ĐĂNG NHẬP
    */
    saveSession(user);

    showMessage(
      "dx99RegisterMessage",
      "Đăng ký thành công. Bạn đã được đăng nhập tự động.",
      "success"
    );

    form.reset();

    renderHeaderAuth();
    renderAccountSection();

    setTimeout(() => {
      closeAuth();
    }, 650);
  }

  /* =====================================================
     ĐĂNG NHẬP
  ===================================================== */

  async function handleLogin(event) {
    event.preventDefault();

    clearMessage("dx99LoginMessage");

    const form = event.currentTarget;
    const data = new FormData(form);

    const email = String(data.get("email") || "")
      .trim()
      .toLowerCase();

    const password = String(
      data.get("password") || ""
    );

    if (!email || !password) {
      showMessage(
        "dx99LoginMessage",
        "Vui lòng nhập Gmail và mật khẩu."
      );
      return;
    }

    const passwordHash = await hashPassword(password);

    const users = getUsers();

    const user = users.find(item => {
      return (
        String(item.email).toLowerCase() === email &&
        item.passwordHash === passwordHash
      );
    });

    if (!user) {
      showMessage(
        "dx99LoginMessage",
        "Gmail hoặc mật khẩu không đúng."
      );
      return;
    }

    saveSession(user);

    showMessage(
      "dx99LoginMessage",
      "Đăng nhập thành công.",
      "success"
    );

    renderHeaderAuth();
    renderAccountSection();

    setTimeout(() => {
      closeAuth();
    }, 450);
  }

  /* =====================================================
     KHU TÀI KHOẢN Ở TRANG CHỦ
     Nếu trang bạn có #tai-khoan thì code sẽ cập nhật.
  ===================================================== */

  function renderAccountSection() {
    const section =
      qs("#tai-khoan") ||
      qs("[data-account-section]");

    if (!section) return;

    const session = getSession();

    let content =
      qs("[data-account-content]", section);

    if (!content) return;

    if (session && session.email) {
      content.innerHTML = `
        <div class="dx99-account-logged">
          <strong>
            Xin chào, ${escapeHTML(session.name)}
          </strong>

          <p>
            ${escapeHTML(session.email)}
          </p>

          <button
            type="button"
            class="dx99-auth-btn"
            id="dx99SectionLogout"
          >
            Đăng xuất
          </button>
        </div>
      `;

      const button = qs(
        "#dx99SectionLogout",
        content
      );

      if (button) {
        button.addEventListener(
          "click",
          logout
        );
      }
    }
  }

  /* =====================================================
     KHỞI ĐỘNG
  ===================================================== */

  function init() {
    injectStyle();

    /*
      Chờ các script header khác chạy xong trước,
      sau đó dọn auth cũ và chỉ tạo đúng 1 bộ.
    */
    setTimeout(() => {
      renderHeaderAuth();
      renderAccountSection();
    }, 250);

    /*
      Nếu footer/header dùng JS render muộn,
      kiểm tra lại thêm một lần nhưng KHÔNG tạo trùng.
    */
    setTimeout(() => {
      renderHeaderAuth();
    }, 1000);
  }

  if (document.readyState === "loading") {
    document.addEventListener(
      "DOMContentLoaded",
      init
    );
  } else {
    init();
  }
})();
