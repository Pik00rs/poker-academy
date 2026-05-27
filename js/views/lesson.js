import { el } from "../dom.js";
import { t } from "../i18n/index.js";
import { LESSONS, LESSON_CONTENT } from "../data/lessons.js";
import { renderPositionTable } from "../components/position-table.js";

export function renderLesson(root, lessonId) {
  root.innerHTML = "";

  const idx = LESSONS.findIndex((l) => l.id === lessonId);
  if (idx === -1) {
    root.appendChild(el("p", { text: "Lesson not found" }));
    return;
  }
  const lesson = LESSONS[idx];
  const content = LESSON_CONTENT[lesson.id] || [];

  const wrap = el("article", { class: "lesson-page fade-in" });

  wrap.appendChild(
    el("a", {
      class: "back-link",
      attrs: { href: "#/lessons" },
      text: t("lessons.back"),
    })
  );

  wrap.appendChild(el("div", { class: "eyebrow", text: `${t("lessons.lesson")} ${String(idx + 1).padStart(2, "0")}` }));
  wrap.appendChild(el("h1", { text: t(lesson.titleKey) }));

  const body = el("div", { class: "lesson-content" });

  content.forEach((block) => {
    if (block.type === "p") {
      body.appendChild(el("p", { html: t(block.key) }));
    } else if (block.type === "h") {
      body.appendChild(el("h3", { text: t(block.key) }));
    } else if (block.type === "ul") {
      const ul = el("ul");
      block.keys.forEach((k) => {
        ul.appendChild(el("li", { html: t(k) }));
      });
      body.appendChild(ul);
    } else if (block.type === "callout") {
      body.appendChild(
        el("div", { class: "callout" }, [
          el("p", {}, [
            el("span", { class: "callout-icon", text: "✦ " }),
            el("span", { html: t(block.key) }),
          ]),
        ])
      );
    } else if (block.type === "table") {
      body.appendChild(renderPositionTable());
    } else if (block.type === "streets") {
      body.appendChild(renderStreetTimeline());
    }
  });

  wrap.appendChild(body);

  const actions = el("div", { class: "lesson-actions" }, [
    el("a", {
      class: "btn btn-ghost",
      attrs: { href: "#/lessons" },
      text: t("lessons.back"),
    }),
    el("a", {
      class: "btn btn-primary",
      attrs: { href: `#/exercise/${lesson.id}` },
      text: t("lessons.toExercise"),
    }),
  ]);

  wrap.appendChild(actions);
  root.appendChild(wrap);
}

function renderStreetTimeline() {
  const steps = [
    { num: "1", nameKey: "l1.h.preflop", cards: "—" },
    { num: "2", nameKey: "l1.h.flop", cards: "3 ♠ ♥ ♦" },
    { num: "3", nameKey: "l1.h.turn", cards: "+ 1 ♣" },
    { num: "4", nameKey: "l1.h.river", cards: "+ 1 ♠" },
  ];
  const wrap = el("div", { class: "street-timeline" });
  steps.forEach((s) => {
    wrap.appendChild(
      el("div", { class: "street-step" }, [
        el("div", { class: "street-step-num", text: `STREET ${s.num}` }),
        el("div", { class: "street-step-name", text: t(s.nameKey) }),
        el("div", { class: "street-step-cards", text: s.cards }),
      ])
    );
  });
  return wrap;
}
