import { el } from "../dom.js";
import { t } from "../i18n/index.js";
import { BET_SIZING_EXERCISES } from "../data/lessons.js";

export function buildBetSizingQuestions(n = 10) {
  // Shuffle and pick N from the bank
  const bank = BET_SIZING_EXERCISES.slice();
  for (let i = bank.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [bank[i], bank[j]] = [bank[j], bank[i]];
  }
  return bank.slice(0, n).map((ex) => ({
    type: "bet-sizing",
    pot: ex.pot,
    target: ex.target,
    tolerance: ex.tolerance ?? 0.15,
  }));
}

export function renderBetSizing(question, container, onAnswer) {
  container.innerHTML = "";

  container.appendChild(
    el("h2", {
      class: "exercise-question",
      text: t("l10.ex.prompt", { pot: question.pot }),
    })
  );

  const targetAmount = Math.round(question.pot * question.target);
  const tolAmount = Math.round(question.pot * question.tolerance);

  // Display: pot and current bet
  const display = el("div", { class: "bet-pot-display" });
  display.appendChild(
    el("div", { class: "stat-block" }, [
      el("div", { class: "stat-label", text: t("l7.ex.pot") }),
      el("div", { class: "stat-value", text: String(question.pot) }),
    ])
  );

  const yourBetBlock = el("div", { class: "stat-block" }, [
    el("div", { class: "stat-label", text: t("l7.ex.yourBet") }),
    el("div", { class: "stat-value accent", id: "betValue", text: "0" }),
  ]);
  display.appendChild(yourBetBlock);

  container.appendChild(display);

  // Slider
  const max = Math.round(question.pot * 1.5); // allow overbet up to 1.5x pot
  const slider = el("input", {
    class: "range",
    attrs: { type: "range", min: "0", max: String(max), value: String(Math.round(max / 2)), step: "1" },
  });

  const wrap = el("div", { class: "bet-slider-wrap" }, [
    el("div", { class: "bet-slider-header" }, [
      el("span", { class: "mono dim", text: "0" }),
      el("span", { class: "mono dim", text: String(max) }),
    ]),
    slider,
    el("div", { class: "bet-presets" }, [
      preset("⅓ pot", Math.round(question.pot / 3)),
      preset("½ pot", Math.round(question.pot / 2)),
      preset("⅔ pot", Math.round((question.pot * 2) / 3)),
      preset("Pot", question.pot),
    ]),
  ]);

  function preset(label, value) {
    const b = el("button", { class: "btn btn-sm btn-ghost", text: label });
    b.addEventListener("click", () => {
      slider.value = String(value);
      slider.dispatchEvent(new Event("input"));
    });
    return b;
  }

  const valueEl = yourBetBlock.querySelector("#betValue");
  slider.addEventListener("input", () => {
    valueEl.textContent = slider.value;
  });
  slider.dispatchEvent(new Event("input"));

  container.appendChild(wrap);

  const submitBtn = el("button", {
    class: "btn btn-primary",
    text: t("ex.validate"),
  });

  submitBtn.addEventListener("click", () => {
    if (question._answered) return;
    question._answered = true;

    const userBet = parseInt(slider.value, 10);
    const diff = Math.abs(userBet - targetAmount);
    const isCorrect = diff <= tolAmount;
    const isClose = diff <= tolAmount * 2 && !isCorrect;

    slider.disabled = true;
    submitBtn.disabled = true;

    const feedback = isCorrect
      ? t("l7.ex.feedback.good")
      : isClose
      ? t("l7.ex.feedback.close")
      : t("l7.ex.feedback.bad");

    const fractionLabel = describeFraction(question.target);
    const explanation =
      `${t("l7.ex.target")} : ${fractionLabel} = ${targetAmount}. ` + feedback;

    onAnswer({
      correct: isCorrect,
      pickedLabel: String(userBet),
      correctLabel: String(targetAmount) + ` (${fractionLabel})`,
      explanation,
      partial: isCorrect ? 1 : isClose ? 0.5 : 0,
    });
  });

  const actions = el("div", { class: "lesson-actions" }, [submitBtn]);
  container.appendChild(actions);
}

function describeFraction(f) {
  if (f <= 0.34) return "⅓ pot";
  if (f <= 0.5) return "½ pot";
  if (f <= 0.67) return "⅔ pot";
  if (f <= 0.8) return "¾ pot";
  if (f <= 1.05) return "pot";
  return "overbet";
}
