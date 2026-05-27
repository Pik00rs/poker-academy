import { el } from "../dom.js";
import { t, getLang } from "../i18n/index.js";
import { LESSONS } from "../data/lessons.js";
import { sampleQuestions } from "../data/banks/index.js";
import { recordAttempt } from "../storage.js";

import { buildQcmQuestion, renderQcm } from "../exercises/qcm.js";
import {
  buildHandNamingQuestions,
  renderHandNaming,
} from "../exercises/hand-naming.js";
import {
  buildHandRankingQuestion,
  renderHandRanking,
} from "../exercises/hand-ranking.js";
import {
  buildBetSizingQuestions,
  renderBetSizing,
} from "../exercises/bet-sizing.js";

export function renderExercise(root, lessonId) {
  root.innerHTML = "";

  const idx = LESSONS.findIndex((l) => l.id === lessonId);
  if (idx === -1) {
    root.appendChild(el("p", { text: "Lesson not found" }));
    return;
  }
  const lesson = LESSONS[idx];

  // Build the question list according to exercise type
  const questions = buildQuestions(lesson);

  const state = {
    questions,
    current: 0,
    score: 0,
    rawScore: 0, // sum of partial scores
    details: [],
  };

  const wrap = el("section", { class: "exercise-shell fade-in" });

  wrap.appendChild(
    el("a", {
      class: "back-link",
      attrs: { href: `#/lesson/${lessonId}` },
      text: t("lessons.back"),
    })
  );

  wrap.appendChild(el("div", { class: "eyebrow", text: t(lesson.titleKey) }));

  // Progress header
  const progressBar = el("div", { class: "progress-bar" }, [el("span")]);
  const progressLabel = el("div", { class: "exercise-progress-label" }, [
    el("span", { text: `${t("ex.question")} 1 ${t("ex.of")} ${questions.length}` }),
    el("span", { class: "mono", text: `${state.rawScore}/${state.current}` }),
  ]);

  const head = el("div", { class: "exercise-head" }, [
    el("div", { class: "exercise-progress" }, [progressLabel, progressBar]),
  ]);
  wrap.appendChild(head);

  const questionHost = el("div");
  const feedbackHost = el("div");
  const navHost = el("div");

  wrap.appendChild(questionHost);
  wrap.appendChild(feedbackHost);
  wrap.appendChild(navHost);

  root.appendChild(wrap);

  showCurrent();

  function updateProgress() {
    progressBar.firstChild.style.width = `${(state.current / questions.length) * 100}%`;
    progressLabel.firstChild.textContent = `${t("ex.question")} ${
      Math.min(state.current + 1, questions.length)
    } ${t("ex.of")} ${questions.length}`;
    progressLabel.lastChild.textContent = `${roundScore(state.rawScore)}/${state.current}`;
  }

  function showCurrent() {
    feedbackHost.innerHTML = "";
    navHost.innerHTML = "";
    updateProgress();

    if (state.current >= questions.length) {
      showScoreScreen();
      return;
    }

    const q = questions[state.current];
    renderQuestion(q, questionHost, (result) => handleAnswer(q, result));
  }

  function handleAnswer(q, result) {
    const partial = result.partial != null ? result.partial : result.correct ? 1 : 0;
    state.rawScore += partial;
    if (result.correct) state.score++;

    state.details.push({
      question: questionTitle(q),
      correct: result.correct,
      partial,
      picked: result.pickedLabel,
      answer: result.correctLabel,
      explanation: result.explanation,
    });

    showFeedback(result);
    showNextButton();
    updateProgress();
  }

  function showFeedback(result) {
    feedbackHost.innerHTML = "";
    const cls = result.correct ? "feedback good" : "feedback bad";
    const title = result.correct ? t("ex.correct") : t("ex.wrong");

    const block = el("div", { class: cls + " fade-in" }, [
      el("div", { class: "feedback-title", text: title }),
      el("p", { text: result.explanation }),
    ]);

    if (!result.correct && result.correctLabel) {
      block.appendChild(
        el("p", {
          class: "mono dim",
          text: `${t("ex.correctAnswer")} ${result.correctLabel}`,
        })
      );
    }

    feedbackHost.appendChild(block);
  }

  function showNextButton() {
    navHost.innerHTML = "";
    const isLast = state.current === questions.length - 1;
    const btn = el("button", {
      class: "btn btn-primary",
      text: isLast ? t("ex.finish") : t("ex.next"),
    });
    btn.addEventListener("click", () => {
      state.current++;
      showCurrent();
    });
    navHost.appendChild(
      el("div", { class: "lesson-actions" }, [
        el("span"), // spacer
        btn,
      ])
    );
  }

  function showScoreScreen() {
    questionHost.innerHTML = "";
    feedbackHost.innerHTML = "";
    navHost.innerHTML = "";
    head.style.display = "none";

    const rounded = roundScore(state.rawScore);
    const total = questions.length;
    const pct = Math.round((rounded / total) * 100);

    // Save
    recordAttempt(lessonId, rounded, total, state.details);

    const msgKey =
      pct === 100 ? "score.perfect" :
      pct >= 80  ? "score.great" :
      pct >= 50  ? "score.ok" :
                   "score.low";

    const screen = el("div", { class: "score-screen fade-in" }, [
      el("div", { class: "eyebrow", text: t("ex.score.title") }),
      el("div", { class: "score-num", text: String(rounded) }),
      el("div", { class: "score-out", text: `/ ${total} ${t("ex.score.outOf")}` }),
      el("div", { class: "score-msg", text: t(msgKey) }),
    ]);

    // Recap
    const recap = el("div", {}, [
      el("div", { class: "eyebrow", text: t("ex.score.recap") }),
      el("div", { class: "recap-list" }),
    ]);
    const list = recap.querySelector(".recap-list");
    state.details.forEach((d, i) => {
      const cls = d.correct ? "good" : d.partial > 0 ? "good" : "bad";
      const icon = d.correct ? "✓" : d.partial > 0 ? "≈" : "✗";
      list.appendChild(
        el("div", { class: "recap-item " + cls }, [
          el("div", { class: "recap-icon", text: icon }),
          el("div", {}, [
            el("div", { class: "recap-q", text: `${i + 1}. ${d.question}` }),
            d.correct
              ? null
              : el("div", {
                  class: "recap-detail",
                  text: `${t("ex.correctAnswer")} ${d.answer}`,
                }),
          ]),
        ])
      );
    });

    const retryBtn = el("button", {
      class: "btn btn-primary",
      text: t("ex.retry"),
    });
    retryBtn.addEventListener("click", () => {
      renderExercise(root, lessonId);
    });

    const actions = el("div", { class: "score-actions" }, [
      el("a", {
        class: "btn btn-ghost",
        attrs: { href: `#/lesson/${lessonId}` },
        text: t("ex.toLesson"),
      }),
      el("a", {
        class: "btn btn-ghost",
        attrs: { href: `#/lessons` },
        text: t("ex.toLessons"),
      }),
      retryBtn,
    ]);

    questionHost.appendChild(screen);
    questionHost.appendChild(recap);
    questionHost.appendChild(actions);
  }
}

function roundScore(s) {
  return Math.round(s * 10) / 10;
}

function questionTitle(q) {
  if (q.type === "qcm") {
    const lang = getLang();
    const qDef = q.qDef;
    if (lang === 'en' && qDef.qEn) return qDef.qEn;
    if (lang === 'th' && qDef.qTh) return qDef.qTh;
    if (lang === 'zh') return qDef.qZh || qDef.qEn || qDef.q;
    return qDef.q;
  }
  if (q.type === "hand-naming") return t("l6.ex.prompt");
  if (q.type === "hand-ranking") return t("l7.ex.prompt");
  if (q.type === "bet-sizing") return t("l10.ex.prompt", { pot: q.pot });
  return "?";
}

function buildQuestions(lesson) {
  switch (lesson.exerciseType) {
    case "qcm": {
      // Sample 10 random questions from the 20-question bank
      const sampled = sampleQuestions(lesson.id, 10);
      return sampled.map(buildQcmQuestion);
    }
    case "hand-naming":
      return buildHandNamingQuestions(10);
    case "hand-ranking":
      return [buildHandRankingQuestion()];
    case "bet-sizing":
      return buildBetSizingQuestions(10);
    default:
      return [];
  }
}

function renderQuestion(q, host, onAnswer) {
  if (q.type === "qcm") return renderQcm(q, host, onAnswer);
  if (q.type === "hand-naming") return renderHandNaming(q, host, onAnswer);
  if (q.type === "hand-ranking") return renderHandRanking(q, host, onAnswer);
  if (q.type === "bet-sizing") return renderBetSizing(q, host, onAnswer);
}
