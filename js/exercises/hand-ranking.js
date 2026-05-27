import { el, renderCard } from "../dom.js";
import { t, getLang } from "../i18n/index.js";
import {
  HAND,
  HAND_SHORT,
  generateHandOfCategory,
  evaluate5,
  compareEval,
} from "../poker.js";

const POOL = [
  HAND.HIGH_CARD,
  HAND.PAIR,
  HAND.TWO_PAIR,
  HAND.THREE_KIND,
  HAND.STRAIGHT,
  HAND.FLUSH,
  HAND.FULL_HOUSE,
  HAND.FOUR_KIND,
  HAND.STRAIGHT_FLUSH,
];

export function buildHandRankingQuestion() {
  // Pick 5 distinct categories to make ranking unambiguous
  const pickedCats = shuffle([...POOL]).slice(0, 5);
  const hands = pickedCats.map((cat, i) => ({
    id: "h" + i,
    cards: generateHandOfCategory(cat),
    cat,
  }));
  // Compute correct order: strongest first (rank 1)
  const ranked = [...hands].sort((a, b) => {
    return compareEval(evaluate5(b.cards), evaluate5(a.cards));
  });
  return {
    type: "hand-ranking",
    hands, // initial order (will be shuffled for display)
    correctOrder: ranked.map((h) => h.id),
  };
}

export function renderHandRanking(question, container, onAnswer) {
  container.innerHTML = "";
  container.appendChild(
    el("h2", { class: "exercise-question", text: t("l7.ex.prompt") })
  );

  // Working order = shuffled copy of hands
  let order = shuffle([...question.hands.map((h) => h.id)]);
  const handMap = Object.fromEntries(question.hands.map((h) => [h.id, h]));

  const listHost = el("div", { class: "rank-list" });

  const actions = el("div", { class: "lesson-actions" }, []);
  const submitBtn = el("button", {
    class: "btn btn-primary",
    text: t("ex.validate"),
  });

  submitBtn.addEventListener("click", () => {
    if (question._answered) return;
    question._answered = true;

    let correctCount = 0;
    order.forEach((id, i) => {
      if (id === question.correctOrder[i]) correctCount++;
    });
    const isCorrect = correctCount === 5;

    // Show correct order alongside
    rebuild(true);

    submitBtn.disabled = true;
    const lang = getLang();
    const expl = explainRanking(question, lang);

    onAnswer({
      correct: isCorrect,
      pickedLabel: order.map((id) => HAND_SHORT[handMap[id].cat][lang]).join(" > "),
      correctLabel: question.correctOrder
        .map((id) => HAND_SHORT[handMap[id].cat][lang])
        .join(" > "),
      explanation: expl,
      partial: correctCount / 5, // partial scoring possible
    });
  });

  actions.appendChild(submitBtn);

  rebuild(false);
  container.appendChild(listHost);
  container.appendChild(actions);

  function rebuild(showCorrect) {
    listHost.innerHTML = "";
    order.forEach((id, i) => {
      const hand = handMap[id];
      const item = el("div", {
        class: "rank-item",
        attrs: { "data-id": id },
      });
      item.appendChild(el("span", { class: "rank-pos", text: String(i + 1) }));

      const cardsWrap = el("div", { class: "rank-cards" });
      hand.cards.forEach((c) => cardsWrap.appendChild(renderCard(c, { small: true })));
      item.appendChild(cardsWrap);

      if (showCorrect) {
        const correctPos = question.correctOrder.indexOf(id) + 1;
        const isHere = correctPos === i + 1;
        item.appendChild(
          el("span", {
            class: "badge " + (isHere ? "success" : "bad"),
            text: isHere ? "✓ " + (i + 1) : "→ " + correctPos,
          })
        );
      } else {
        const upDown = el("div", { class: "rank-up-down" });
        const upBtn = el("button", { text: "▲", attrs: { "aria-label": "up" } });
        const downBtn = el("button", { text: "▼", attrs: { "aria-label": "down" } });
        if (i === 0) upBtn.disabled = true;
        if (i === order.length - 1) downBtn.disabled = true;
        upBtn.addEventListener("click", () => {
          if (i === 0) return;
          [order[i - 1], order[i]] = [order[i], order[i - 1]];
          rebuild(false);
        });
        downBtn.addEventListener("click", () => {
          if (i === order.length - 1) return;
          [order[i + 1], order[i]] = [order[i], order[i + 1]];
          rebuild(false);
        });
        upDown.appendChild(upBtn);
        upDown.appendChild(downBtn);
        item.appendChild(upDown);
      }

      listHost.appendChild(item);
    });
  }
}

function explainRanking(question, lang) {
  const order = question.correctOrder
    .map((id) => question.hands.find((h) => h.id === id))
    .map((h) => HAND_SHORT[h.cat][lang]);
  if (lang === "en") {
    return `Order from strongest to weakest: ${order.join(" > ")}.`;
  }
  if (lang === "th") {
    return `ลำดับจากแข็งสุดถึงอ่อนสุด: ${order.join(" > ")}`;
  }
  if (lang === "zh") {
    return `从最强到最弱的顺序：${order.join(" > ")}。`;
  }
  return `Ordre de la plus forte à la plus faible : ${order.join(" > ")}.`;
}

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
