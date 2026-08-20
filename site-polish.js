/* =====================================================
   DOCHOIXE99 - ACCOUNT LOCAL
   Không dùng ACCOUNT_API_URL / Google Sheets
===================================================== */

const USERS_KEY = "DOCHOIXE99_USERS_V2";

function getLocalUsers() {
  try {
    const users = JSON.parse(
      localStorage.getItem(USERS_KEY) || "[]"
    );

    return Array.isArray(users) ? users : [];
  } catch (error) {
    return [];
  }
}

function saveLocalUsers(users) {
  localStorage.setItem(
    USERS_KEY,
    JSON.stringify(users)
  );
}

async function hashLocalPassword(password) {
  const text = String(password || "");

  if (
    window.crypto &&
    window.crypto.subtle
  ) {
    const data = new TextEncoder().encode(text);

    const hash = await crypto.subtle.digest(
      "SHA-256",
      data
    );

    return Array.from(
      new Uint8Array(hash)
    )
      .map(
        byte =>
          byte.toString(16).padStart(2, "0")
      )
      .join("");
  }

  return btoa(
    unescape(
      encodeURIComponent(text)
    )
  );
}

async function accountApi(payload) {
  const action = String(
    payload && payload.action || ""
  ).trim();

  const email = String(
    payload && payload.email || ""
  )
    .trim()
    .toLowerCase();

  const password = String(
    payload && payload.password || ""
  );

  const users = getLocalUsers();

  /* =========================
     ĐĂNG KÝ
  ========================= */
  if (action === "register") {
    const name = String(
      payload && payload.name || ""
    ).trim();

    const existed = users.some(
      user =>
        String(user.email || "")
          .toLowerCase() === email
    );

    if (existed) {
      return {
        ok: false,
        code: "EMAIL_EXISTS",
        message: "Gmail này đã được đăng ký."
      };
    }

    const passwordHash =
      await hashLocalPassword(password);

    const user = {
      id: "DX99-" + Date.now(),
      name: name,
      email: email,
      passwordHash: passwordHash,
      createdAt: Date.now()
    };

    users.push(user);

    saveLocalUsers(users);

    return {
      ok: true,
      user: {
        name: user.name,
        email: user.email
      }
    };
  }

  /* =========================
     ĐĂNG NHẬP
  ========================= */
  if (action === "login") {
    const passwordHash =
      await hashLocalPassword(password);

    const user = users.find(
      item =>
        String(item.email || "")
          .toLowerCase() === email &&
        item.passwordHash === passwordHash
    );

    if (!user) {
      return {
        ok: false,
        message: "Gmail hoặc mật khẩu không đúng."
      };
    }

    return {
      ok: true,
      user: {
        name: user.name,
        email: user.email
      }
    };
  }

  return {
    ok: false,
    message: "Yêu cầu tài khoản không hợp lệ."
  };
}
