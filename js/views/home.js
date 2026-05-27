import { el, renderCard } from "../dom.js";
import { t } from "../i18n/index.js";
import { LESSONS } from "../data/lessons.js";

export function renderHome(root) {
  root.innerHTML = "";

  const hero = el("section", { class: "hero fade-in" }, [
    el("div", {}, [
      el("div", { class: "eyebrow", text: t("home.eyebrow") }),
      el("h1", {
        html: `${escape(t("home.title.1"))}<em>${escape(t("home.title.em"))}</em>${escape(t("home.title.2"))}`,
      }),
      el("p", { class: "lead", text: t("home.lead") }),
      el("div", { class: "hero-cta" }, [
        el("a", {
          class: "btn btn-primary btn-lg",
          attrs: { href: "#/lessons" },
          text: t("home.cta.start"),
        }),
        el("a", {
          class: "btn btn-ghost btn-lg",
          attrs: { href: "#/progress" },
          text: t("home.cta.progress"),
        }),
      ]),
    ]),
    renderHeroVisual(),
  ]);

  const stats = el("section", { class: "stats-row fade-in-2" }, [
    statCard(LESSONS.length, t("home.stats.lessons")),
    statCard(LESSONS.length, t("home.stats.exercises")),
    statCard("3", t("home.stats.languages")),
  ]);

  root.appendChild(hero);
  root.appendChild(stats);
}

function statCard(value, label) {
  return el("div", { class: "stat-card" }, [
    el("div", { class: "stat-card-label", text: label }),
    el("div", { class: "stat-card-value", text: String(value) }),
  ]);
}

function renderHeroVisual() {
  const wrap = el("div", { class: "hero-visual" });
  const cards = [
    { rank: 14, suit: "s" },
    { rank: 14, suit: "h" },
    { rank: 13, suit: "h" },
    { rank: 12, suit: "h" },
    { rank: 11, suit: "h" },
  ];
  cards.forEach((c) => wrap.appendChild(renderCard(c)));
  return wrap;
}

function escape(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}
