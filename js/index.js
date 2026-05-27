import { BANK_L1 } from "./l1-streets.js";
import { BANK_L2 } from "./l2-positions.js";
import { BANK_L3 } from "./l3-blinds.js";
import { BANK_L4 } from "./l4-actions.js";
import { BANK_L5 } from "./l5-pot-stack.js";
import { BANK_L6 } from "./l6-hand-reading.js";
import { BANK_L7 } from "./l7-hand-strength.js";
import { BANK_L8 } from "./l8-draws.js";
import { BANK_L9 } from "./l9-pot-odds.js";
import { BANK_L10 } from "./l10-bet-sizing.js";
import { BANK_L11 } from "./l11-mistakes.js";

export const BANKS = {
  l1: BANK_L1,
  l2: BANK_L2,
  l3: BANK_L3,
  l4: BANK_L4,
  l5: BANK_L5,
  l6: BANK_L6,
  l7: BANK_L7,
  l8: BANK_L8,
  l9: BANK_L9,
  l10: BANK_L10,
  l11: BANK_L11,
};

// Pick N random questions from the bank (shuffled). For each question,
// also shuffle the options to avoid memorization of positions.
export function sampleQuestions(lessonId, n = 10) {
  const bank = BANKS[lessonId];
  if (!bank) return [];
  const shuffled = shuffle(bank.slice());
  const picked = shuffled.slice(0, Math.min(n, shuffled.length));
  return picked.map((q) => ({
    ...q,
    options: shuffle(q.options.slice()),
  }));
}

function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}
