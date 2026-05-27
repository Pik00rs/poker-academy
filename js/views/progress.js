import { el, toast } from "../dom.js";
import { t, getLang } from "../i18n/index.js";
import { LESSONS } from "../data/lessons.js";
import { getProgress, getStats, resetAll } from "../storage.js";

export function renderProgress(root) {
  root.innerHTML = "";

  const data = getProgress();
  const stats = getStats();

  const head = el("div", { class: "section-head fade-in" }, [
    el("div", {}, [
      el("div", { class: "eyebrow", text: t("nav.progress") }),
      el("h1", { text: t("prog.title") }),
      el("p", { class: "dim", text: t("prog.subtitle") }),
    ]),
  ]);
  root.appendChild(head);

  const statsRow = el("div", { class: "stats-row fade-in" }, [
    statCard(stats.avg + "%", t("prog.stats.avg")),
    statCard(stats.count, t("prog.stats.attempts")),
    statCard(stats.lessonsTouched + "/" + LESSONS.length, t("prog.stats.lessons")),
    statCard(stats.best + "%", t("prog.stats.best")),
  ]);
  root.appendChild(statsRow);

  // History
  const histHead = el("div", { class: "section-head" }, [
    el("h2", { text: t("prog.history") }),
  ]);
  root.appendChild(histHead);

  if (data.attempts.length === 0) {
    root.appendChild(
      el("div", { class: "card" }, [
        el("p", { class: "dim", text: t("prog.history.empty") }),
      ])
    );
  } else {
    const table = el("div", { class: "card" }, [
      el("table", { class: "history-table" }, [
        el("thead", {}, [
          el("tr", {}, [
            el("th", { text: t("prog.col.date") }),
            el("th", { text: t("prog.col.lesson") }),
            el("th", { text: t("prog.col.score") }),
          ]),
        ]),
        el(
          "tbody",
          {},
          data.attempts.slice(0, 30).map((a) => {
            const lesson = LESSONS.find((l) => l.id === a.lessonId);
            const pct = Math.round((a.score / a.total) * 100);
            const cls = pct === 100 ? "success" : pct >= 50 ? "warn" : "bad";
            return el("tr", {}, [
              el("td", { class: "mono dim", text: formatDate(a.date) }),
              el("td", { text: lesson ? t(lesson.titleKey) : a.lessonId }),
              el("td", { class: "score-cell" }, [
                el("span", { class: "badge " + cls, text: `${a.score}/${a.total} · ${pct}%` }),
              ]),
            ]);
          })
        ),
      ]),
    ]);
    root.appendChild(table);
  }

  if (data.attempts.length > 0) {
    const resetBtn = el("button", {
      class: "btn btn-ghost",
      text: t("prog.reset"),
    });
    resetBtn.addEventListener("click", () => {
      if (confirm(t("prog.reset.confirm"))) {
        resetAll();
        toast(t("prog.reset"));
        renderProgress(root);
      }
    });
    root.appendChild(
      el("div", { class: "lesson-actions" }, [el("span"), resetBtn])
    );
  }
}

function statCard(value, label) {
  return el("div", { class: "stat-card" }, [
    el("div", { class: "stat-card-label", text: label }),
    el("div", { class: "stat-card-value", text: String(value) }),
  ]);
}

function formatDate(iso) {
  const d = new Date(iso);
  const lang = getLang();
  return d.toLocaleString(lang === "th" ? "th-TH" : lang === "en" ? "en-US" : "fr-FR", {
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
}
