import { initI18n, setLang, getLang, applyStaticI18n } from "./i18n/index.js";
import { initRouter, route } from "./router.js";

function syncLangSwitch() {
  const el = document.getElementById("langSwitch");
  if (!el) return;
  const lang = getLang();
  el.querySelectorAll("button").forEach((b) => {
    b.classList.toggle("active", b.dataset.lang === lang);
  });
}

function boot() {
  const app = document.getElementById("app");
  const langSwitchEl = document.getElementById("langSwitch");

  initI18n();
  applyStaticI18n();
  syncLangSwitch();
  initRouter(app);

  if (!window.location.hash) {
    window.location.hash = "#/home";
  } else {
    route();
  }

  if (langSwitchEl) {
    langSwitchEl.addEventListener("click", (e) => {
      const btn = e.target.closest("button[data-lang]");
      if (!btn) return;
      setLang(btn.dataset.lang);
      syncLangSwitch();
      applyStaticI18n();
      route();
    });
  }
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", boot);
} else {
  boot();
}
