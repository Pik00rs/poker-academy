import { el, renderCard } from "../dom.js";
import { t, getLang } from "../i18n/index.js";
import {
  HAND,
  HAND_SHORT,
  generateHandOfCategory,
  evaluate5,
} from "../poker.js";

const CATEGORIES = [
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

// Pick categories with realistic frequencies — weight common ones higher
const WEIGHTED = [
  HAND.HIGH_CARD, HAND.HIGH_CARD,
  HAND.PAIR, HAND.PAIR, HAND.PAIR,
  HAND.TWO_PAIR, HAND.TWO_PAIR,
  HAND.THREE_KIND, HAND.THREE_KIND,
  HAND.STRAIGHT,
  HAND.FLUSH,
  HAND.FULL_HOUSE,
  HAND.FOUR_KIND,
  HAND.STRAIGHT_FLUSH,
];

export function buildHandNamingQuestions(n = 5) {
  const picks = [];
  const used = new Set();
  // Try to vary
  while (picks.length < n) {
    const cat = WEIGHTED[Math.floor(Math.random() * WEIGHTED.length)];
    // Allow repeats but bias toward variety on small n
    if (picks.length < CATEGORIES.length && used.has(cat) && Math.random() < 0.7) continue;
    used.add(cat);
    picks.push(cat);
  }

  return picks.map((cat) => {
    const cards = generateHandOfCategory(cat);
    return {
      type: "hand-naming",
      cards,
      correctCategory: cat,
    };
  });
}

export function renderHandNaming(question, container, onAnswer) {
  container.innerHTML = "";
  const lang = getLang();

  container.appendChild(
    el("h2", { class: "exercise-question", text: t("l6.ex.prompt") })
  );

  const handDisplay = el("div", { class: "hand-display" });
  question.cards.forEach((c) => handDisplay.appendChild(renderCard(c)));
  container.appendChild(handDisplay);

  // Build 4 options: the correct one + 3 distractors
  const options = buildOptions(question.correctCategory);
  const correctIndex = options.findIndex((o) => o.cat === question.correctCategory);

  const grid = el("div", { class: "options-grid" });
  const letters = ["A", "B", "C", "D"];

  options.forEach((opt, i) => {
    const label = HAND_SHORT[opt.cat][lang] || HAND_SHORT[opt.cat].fr;
    const btn = el(
      "button",
      { class: "option-btn", attrs: { "data-i": String(i) } },
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
        if (j === correctIndex) b.classList.add("correct");
        else if (j === i) b.classList.add("wrong");
      });

      const isCorrect = i === correctIndex;
      const ev = evaluate5(question.cards);
      onAnswer({
        correct: isCorrect,
        pickedLabel: label,
        correctLabel: HAND_SHORT[question.correctCategory][lang],
        explanation: explainHand(question.cards, ev, lang),
      });
    });

    grid.appendChild(btn);
  });

  container.appendChild(grid);
}

function buildOptions(correctCat) {
  // 1 correct + 3 plausible distractors from neighboring categories
  const all = [...CATEGORIES];
  const distractors = all
    .filter((c) => c !== correctCat)
    .sort(() => Math.random() - 0.5)
    .slice(0, 3);
  const opts = [correctCat, ...distractors].map((c) => ({ cat: c }));
  // Shuffle
  for (let i = opts.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [opts[i], opts[j]] = [opts[j], opts[i]];
  }
  return opts;
}

function explainHand(cards, ev, lang) {
  const name = HAND_SHORT[ev.category][lang];
  const explainByCat = {
    fr: {
      [HAND.HIGH_CARD]: `Aucune paire ni série : la main est une hauteur, on lit juste la plus haute carte.`,
      [HAND.PAIR]: `Deux cartes de même rang forment une paire.`,
      [HAND.TWO_PAIR]: `Deux paires distinctes.`,
      [HAND.THREE_KIND]: `Trois cartes de même rang = brelan.`,
      [HAND.STRAIGHT]: `Cinq cartes consécutives, suites pas toutes de même couleur = quinte.`,
      [HAND.FLUSH]: `Cinq cartes de la même couleur, non consécutives = couleur.`,
      [HAND.FULL_HOUSE]: `Un brelan + une paire = full.`,
      [HAND.FOUR_KIND]: `Quatre cartes de même rang = carré.`,
      [HAND.STRAIGHT_FLUSH]: `Cinq cartes consécutives ET de la même couleur = quinte flush.`,
    },
    en: {
      [HAND.HIGH_CARD]: `No pair or run: high card hand — only the top card counts.`,
      [HAND.PAIR]: `Two cards of the same rank make a pair.`,
      [HAND.TWO_PAIR]: `Two distinct pairs.`,
      [HAND.THREE_KIND]: `Three of the same rank = three of a kind.`,
      [HAND.STRAIGHT]: `Five consecutive cards, not all same suit = straight.`,
      [HAND.FLUSH]: `Five cards of the same suit, not consecutive = flush.`,
      [HAND.FULL_HOUSE]: `Three of a kind + a pair = full house.`,
      [HAND.FOUR_KIND]: `Four cards of the same rank = four of a kind.`,
      [HAND.STRAIGHT_FLUSH]: `Five consecutive cards of the SAME suit = straight flush.`,
    },
    th: {
      [HAND.HIGH_CARD]: `ไม่มีคู่หรือแถว: ใช้ไพ่สูงสุดเทียบ`,
      [HAND.PAIR]: `ไพ่สองใบเลขเดียวกัน = คู่`,
      [HAND.TWO_PAIR]: `สองคู่ที่ต่างกัน`,
      [HAND.THREE_KIND]: `สามใบเลขเดียวกัน = ทริปเปิ้ล`,
      [HAND.STRAIGHT]: `ห้าใบเรียง ไม่ใช่สีเดียวกัน = สเตรท`,
      [HAND.FLUSH]: `ห้าใบสีเดียวกัน ไม่เรียง = ฟลัช`,
      [HAND.FULL_HOUSE]: `ทริปเปิ้ล + คู่ = ฟูลเฮ้าส์`,
      [HAND.FOUR_KIND]: `สี่ใบเลขเดียวกัน = โฟร์การ์ด`,
      [HAND.STRAIGHT_FLUSH]: `ห้าใบเรียงและสีเดียวกัน = สเตรทฟลัช`,
    },
    zh: {
      [HAND.HIGH_CARD]: `没有对子也没有连续：这是高牌，只看最大的一张。`,
      [HAND.PAIR]: `两张同点数的牌构成一个对子。`,
      [HAND.TWO_PAIR]: `两个不同的对子。`,
      [HAND.THREE_KIND]: `三张同点数 = 三条。`,
      [HAND.STRAIGHT]: `五张连续的牌，但不全是同花色 = 顺子。`,
      [HAND.FLUSH]: `五张同花色但不连续的牌 = 同花。`,
      [HAND.FULL_HOUSE]: `一个三条 + 一个对子 = 葫芦。`,
      [HAND.FOUR_KIND]: `四张同点数 = 四条。`,
      [HAND.STRAIGHT_FLUSH]: `五张连续且同花色的牌 = 同花顺。`,
    },
  };
  return `${name} — ${explainByCat[lang]?.[ev.category] || explainByCat.fr[ev.category]}`;
}
