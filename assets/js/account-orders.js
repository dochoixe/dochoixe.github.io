/* ============================================================
   DOCHOIXE99 — LỊCH SỬ ĐƠN HÀNG THEO TÀI KHOẢN
   - Không thay đổi giỏ hàng / giá sản phẩm.
   - Lưu bản sao đơn đã đặt trên chính trình duyệt này.
   - Gắn đơn theo Gmail của phiên đăng nhập hiện tại.
   ============================================================ */
(function () {
  "use strict";

  const SESSION_KEY = "DOCHOIXE99_SESSION_V2";
  const ORDER_PREFIX = "DOCHOIXE99_ORDERS_V1::";
  const DEVICE_KEY = "DOCHOIXE99_ORDERS_DEVICE_V1";
  const MAX_ORDERS = 50;

  function normalizeEmail(value) {
    return String(value || "").trim().toLowerCase();
  }

  function getSession() {
    try {
      const value = JSON.parse(localStorage.getItem(SESSION_KEY) || "null");
      return value && value.email ? value : null;
    } catch (error) {
      return null;
    }
  }

  function keyFor(email) {
    const normalized = normalizeEmail(email);
    return normalized ? ORDER_PREFIX + normalized : "";
  }

  function getOrders(email) {
    const key = keyFor(email);
    if (!key) return [];
    try {
      const value = JSON.parse(localStorage.getItem(key) || "[]");
      return Array.isArray(value) ? value : [];
    } catch (error) {
      return [];
    }
  }

  function getDeviceOrders() {
    try {
      const value = JSON.parse(localStorage.getItem(DEVICE_KEY) || "[]");
      return Array.isArray(value) ? value : [];
    } catch (error) {
      return [];
    }
  }

  function writeList(key, order) {
    if (!key || !order || !order.code) return false;
    const current = (() => {
      try {
        const value = JSON.parse(localStorage.getItem(key) || "[]");
        return Array.isArray(value) ? value : [];
      } catch (error) {
        return [];
      }
    })().filter(item => item && item.code !== order.code);

    current.unshift(order);
    try {
      localStorage.setItem(key, JSON.stringify(current.slice(0, MAX_ORDERS)));
      return true;
    } catch (error) {
      console.warn("DOCHOIXE99 ORDER HISTORY:", error);
      return false;
    }
  }

  function saveOrder(order, email) {
    if (!order || !order.code) return false;
    const normalized = normalizeEmail(email || (getSession() || {}).email);
    const saved = {
      ...order,
      accountEmail: normalized,
      savedAt: Date.now()
    };

    const deviceSaved = writeList(DEVICE_KEY, saved);
    const accountSaved = normalized ? writeList(keyFor(normalized), saved) : false;
    return deviceSaved || accountSaved;
  }

  function formatMoney(value) {
    const number = Number(value || 0);
    return Number.isFinite(number) && number > 0
      ? number.toLocaleString("vi-VN") + " ₫"
      : "Liên hệ";
  }

  window.DOCHOIXE99_ORDERS = Object.freeze({
    SESSION_KEY,
    ORDER_PREFIX,
    DEVICE_KEY,
    normalizeEmail,
    getSession,
    getOrders,
    getDeviceOrders,
    saveOrder,
    formatMoney
  });
})();
