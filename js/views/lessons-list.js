import { el } from "../dom.js";
import { t } from "../i18n/index.js";
import { LESSONS } from "../data/lessons.js";
import { getBestScore, isLessonCompleted } from "../storage.js";

export function renderLessonsList(root) {
  root.innerHTML = "";

  const head = el("div", { class: "section-head fade-in" }, [
    el("div", {}, [
      el("div", { class: "eyebrow", text: t("nav.lessons") }),
      el("h1", { text: t("lessons.title") }),
      el("p", { class: "dim", text: t("lessons.subtitle") }),
    ]),
  ]);

  const grid = el("div", { class: "lesson-grid" });

  LESSONS.forEach((lesson, i) => {
    const done = isLessonCompleted(lesson.id);
    const best = getBestScore(lesson.id);

    const card = el(
      "a",
      {
        class: "lesson-card fade-in-" + Math.min(i + 1, 4),
        attrs: { href: `#/lesson/${lesson.id}` },
      },
      [
        el("div", { class: "lesson-card-num", text: String(i + 1).padStart(2, "0") }),
        el("div", { class: "lesson-card-title", text: t(lesson.titleKey) }),
        el("p", { class: "lesson-card-desc", text: t(lesson.descKey) }),
        el("div", { class: "lesson-card-foot" }, [
          el("span", { text: t("lessons.lesson") + " " + (i + 1) }),
          done
            ? el("span", {
                class: "badge success",
                text: `${t("lessons.score")} ${best}%`,
              })
            : el("span", { class: "badge", text: t("lessons.start") }),
        ]),
      ]
    );

    grid.appendChild(card);
  });

  root.appendChild(head);
  root.appendChild(grid);
}
