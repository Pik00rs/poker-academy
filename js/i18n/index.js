import { fr } from "./fr.js";
import { en } from "./en.js";
import { th } from "./th.js";

const DICTS = { fr, en, th };
const STORAGE_KEY = "pa.lang";

let currentLang = "fr";

export function initI18n() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved && DICTS[saved]) currentLang = saved;
  document.documentElement.lang = currentLang;
}

export function setLang(lang) {
  if (!DICTS[lang]) return;
  currentLang = lang;
  localStorage.setItem(STORAGE_KEY, lang);
  document.documentElement.lang = lang;
}

export function getLang() {
  return currentLang;
}

export function t(key, vars) {
  let value = DICTS[currentLang]?.[key] ?? DICTS.fr?.[key] ?? key;
  if (vars) {
    Object.keys(vars).forEach((k) => {
      value = value.replace(`{${k}}`, vars[k]);
    });
  }
  return value;
}

export function applyStaticI18n(root = document) {
  root.querySelectorAll("[data-i18n]").forEach((el) => {
    el.textContent = t(el.dataset.i18n);
  });
  root.querySelectorAll("[data-i18n-html]").forEach((el) => {
    el.innerHTML = t(el.dataset.i18nHtml);
  });
}
