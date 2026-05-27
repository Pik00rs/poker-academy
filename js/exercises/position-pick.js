import { el } from "../dom.js";
import { getLang } from "../i18n/index.js";
import {
  renderPositionTable,
  ORDER_FROM_BUTTON,
} from "../components/position-table.js";

// "Click the position N from the button" — built dynamically.

export function buildPositionPickQuestions(n = 3) {
  // We avoid asking position 1 (BU itself) since that's trivial.
  const targets = shuffle([2, 3, 4, 5, 6, 7]).slice(0, n);
  return targets.map((idx) => {
    const expected = ORDER_FROM_BUTTON[idx - 1];
    return {
      type: "position-pick",
      title: positionPickPrompt(idx),
      targetIndex: idx,
      correctSeat: expected,
    };
  });
}

function positionPickPrompt(n) {
  const lang = getLang();
  const ord = (n) => {
    if (lang === "en") {
      const ords = ["", "1st", "2nd", "3rd", "4th", "5th", "6th", "7th"];
      return ords[n];
    }
    if (lang === "th") return `ลำดับที่ ${n}`;
    const fr = ["", "1ère", "2ème", "3ème", "4ème", "5ème", "6ème", "7ème"];
    return fr[n];
  };

  if (lang === "en") return `Click the ${ord(n)} position from the button (clockwise).`;
  if (lang === "th") return `คลิกตำแหน่ง${ord(n)}จากปุ่ม (ตามเข็มนาฬิกา)`;
  return `Clique sur la ${ord(n)} position depuis le bouton (sens horaire).`;
}

export function renderPositionPick(question, container, onAnswer) {
  container.innerHTML = "";
  container.appendChild(el("h2", { class: "exercise-question", text: question.title }));

  const state = { answered: false, seatState: {} };

  const tableHost = el("div");
  rebuild();
  container.appendChild(tableHost);

  function rebuild() {
    tableHost.innerHTML = "";
    tableHost.appendChild(
      renderPositionTable({
        marker: "BU",
        getSeatState: (s) => state.seatState[s],
        onClick: (seat) => {
          if (state.answered) return;
          state.answered = true;
          const isCorrect = seat === question.correctSeat;
          state.seatState[seat] = isCorrect ? "correct" : "wrong";
          if (!isCorrect) state.seatState[question.correctSeat] = "correct";
          rebuild();
          onAnswer({
            correct: isCorrect,
            pickedLabel: seat,
            correctLabel: question.correctSeat,
            explanation: explainPosition(question.targetIndex, question.correctSeat),
          });
        },
      })
    );
  }
}

function explainPosition(idx, seat) {
  const lang = getLang();
  if (lang === "en") {
    return `Order from the button: ${ORDER_FROM_BUTTON.join(" → ")}. Position #${idx} is ${seat}.`;
  }
  if (lang === "th") {
    return `ลำดับจากปุ่ม: ${ORDER_FROM_BUTTON.join(" → ")} ตำแหน่งที่ ${idx} คือ ${seat}`;
  }
  return `Ordre depuis le bouton : ${ORDER_FROM_BUTTON.join(" → ")}. La position n°${idx} est ${seat}.`;
}

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
