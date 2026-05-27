import { el } from "../dom.js";
import { getLang } from "../i18n/index.js";

// New question format expected:
// { q, qEn, qTh, options: [{text, textEn, textTh, correct}], exp, expEn, expTh }

export function buildQcmQuestion(qDef) {
  // Note: shuffling already happens in sampleQuestions, but we redo here for safety
  return {
    type: "qcm",
    qDef,
    correctIndex: qDef.options.findIndex((o) => o.correct),
  };
}

function pickLang(obj, baseKey) {
  const lang = getLang();
  if (lang === "en" && obj[baseKey + "En"]) return obj[baseKey + "En"];
  if (lang === "th" && obj[baseKey + "Th"]) return obj[baseKey + "Th"];
  return obj[baseKey];
}

function pickOptionLabel(opt) {
  const lang = getLang();
  if (lang === "en" && opt.textEn) return opt.textEn;
  if (lang === "th" && opt.textTh) return opt.textTh;
  return opt.text;
}

export function renderQcm(question, container, onAnswer) {
  container.innerHTML = "";

  const qDef = question.qDef;
  const title = pickLang(qDef, "q");
  container.appendChild(el("h2", { class: "exercise-question", text: title }));

  const grid = el("div", { class: "options-grid" });
  const letters = ["A", "B", "C", "D", "E"];

  qDef.options.forEach((opt, i) => {
    const label = pickOptionLabel(opt);

    const btn = el(
      "button",
      {
        class: "option-btn",
        attrs: { "data-i": String(i) },
      },
      [
        el("span", { class: "opt-letter", text: letters[i] }),
        el("span", { text: label }),
      ]
    );

    btn.addEventListener("click", () => {
      if (question._answered) return;
      question._answered = true;

      const buttons = grid.querySelectorAll(".option-btn");
      buttons.forEach((b, j) => {
        b.disabled = true;
        if (j === question.correctIndex) b.classList.add("correct");
        else if (j === i) b.classList.add("wrong");
      });

      const isCorrect = i === question.correctIndex;
      onAnswer({
        correct: isCorrect,
        pickedLabel: label,
        correctLabel: pickOptionLabel(qDef.options[question.correctIndex]),
        explanation: pickLang(qDef, "exp"),
      });
    });

    grid.appendChild(btn);
  });

  container.appendChild(grid);
}
