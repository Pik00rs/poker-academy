// Lessons metadata. Exercise content (questions) defined per-type below.

export const LESSONS = [
  {
    id: "l1",
    titleKey: "l1.title",
    descKey: "l1.desc",
    contentKey: "l1",
    exerciseType: "qcm-positions",
  },
  {
    id: "l2",
    titleKey: "l2.title",
    descKey: "l2.desc",
    contentKey: "l2",
    exerciseType: "qcm",
  },
  {
    id: "l3",
    titleKey: "l3.title",
    descKey: "l3.desc",
    contentKey: "l3",
    exerciseType: "qcm",
  },
  {
    id: "l4",
    titleKey: "l4.title",
    descKey: "l4.desc",
    contentKey: "l4",
    exerciseType: "hand-naming",
  },
  {
    id: "l5",
    titleKey: "l5.title",
    descKey: "l5.desc",
    contentKey: "l5",
    exerciseType: "hand-ranking",
  },
  {
    id: "l6",
    titleKey: "l6.title",
    descKey: "l6.desc",
    contentKey: "l6",
    exerciseType: "qcm",
  },
  {
    id: "l7",
    titleKey: "l7.title",
    descKey: "l7.desc",
    contentKey: "l7",
    exerciseType: "bet-sizing",
  },
];

// Lesson content (rendered as HTML blocks)
export const LESSON_CONTENT = {
  l1: [
    { type: "p", key: "l1.p1" },
    { type: "table" }, // Visual seat map
    { type: "h", key: "l1.h.order" },
    { type: "p", key: "l1.p2" },
    {
      type: "ul",
      keys: [
        "l1.li.bu",
        "l1.li.co",
        "l1.li.hj",
        "l1.li.mp",
        "l1.li.u2",
        "l1.li.u1",
        "l1.li.u0",
      ],
    },
    { type: "callout", key: "l1.callout" },
  ],
  l2: [
    { type: "p", key: "l2.p1" },
    { type: "h", key: "l2.h.actions" },
    {
      type: "ul",
      keys: [
        "l2.li.fold",
        "l2.li.check",
        "l2.li.call",
        "l2.li.bet",
        "l2.li.raise",
        "l2.li.allin",
      ],
    },
    { type: "h", key: "l2.h.preflop" },
    { type: "p", key: "l2.p2" },
    { type: "h", key: "l2.h.flop" },
    { type: "p", key: "l2.p3" },
    { type: "callout", key: "l2.callout" },
  ],
  l3: [
    { type: "p", key: "l3.p1" },
    { type: "h", key: "l3.h.pot" },
    { type: "p", key: "l3.p2" },
    { type: "h", key: "l3.h.stack" },
    { type: "p", key: "l3.p3" },
    { type: "h", key: "l3.h.ratio" },
    { type: "p", key: "l3.p4" },
    { type: "callout", key: "l3.callout" },
  ],
  l4: [
    { type: "p", key: "l4.p1" },
    { type: "h", key: "l4.h.combos" },
    {
      type: "ul",
      keys: [
        "l4.li.sf",
        "l4.li.4k",
        "l4.li.fh",
        "l4.li.fl",
        "l4.li.st",
        "l4.li.3k",
        "l4.li.2p",
        "l4.li.1p",
        "l4.li.hc",
      ],
    },
    { type: "callout", key: "l4.callout" },
  ],
  l5: [
    { type: "p", key: "l5.p1" },
    { type: "h", key: "l5.h.order" },
    { type: "p", key: "l5.p2" },
    { type: "callout", key: "l5.callout" },
  ],
  l6: [
    { type: "p", key: "l6.p1" },
    { type: "h", key: "l6.h.flush" },
    { type: "p", key: "l6.p2" },
    { type: "h", key: "l6.h.straight" },
    { type: "p", key: "l6.p3" },
    { type: "callout", key: "l6.callout" },
  ],
  l7: [
    { type: "p", key: "l7.p1" },
    { type: "h", key: "l7.h.sizes" },
    {
      type: "ul",
      keys: ["l7.li.s1", "l7.li.s2", "l7.li.s3", "l7.li.s4", "l7.li.s5"],
    },
    { type: "callout", key: "l7.callout" },
  ],
};

// QCM exercises (lesson 1, 2, 3, 6). Each: { qKey, options: [{textKey | text, correct}], expKey }
// Lesson 1 — positions, partially QCM and partially position-pick (handled as qcm-positions)
export const QCM_BANK = {
  l1: [
    {
      qKey: "l1.ex.q1",
      options: [
        { text: "BU (Button)", correct: true },
        { text: "UTG", correct: false },
        { text: "HJ", correct: false },
        { text: "MP", correct: false },
      ],
      expKey: "l1.ex.q1.exp",
    },
    {
      qKey: "l1.ex.q2",
      options: [
        { text: "Under The Gun", correct: true },
        { text: "Under The Game", correct: false },
        { text: "Up To Go", correct: false },
        { text: "Until The Gun", correct: false },
      ],
      expKey: "l1.ex.q2.exp",
    },
    {
      qKey: "l1.ex.q3",
      options: [
        { text: "CO (Cut-Off)", correct: true },
        { text: "HJ", correct: false },
        { text: "MP", correct: false },
        { text: "UTG", correct: false },
      ],
      expKey: "l1.ex.q3.exp",
    },
    {
      qKey: "l1.ex.q4",
      options: [
        { text: "1ère (juste après BU)", correct: false, textEn: "1st (right after BU)", textTh: "ที่ 1 (หลัง BU)" },
        { text: "2ème (juste après CO)", correct: false, textEn: "2nd (right after CO)", textTh: "ที่ 2 (หลัง CO)" },
        { text: "3ème (BU → CO → HJ)", correct: true, textEn: "3rd (BU → CO → HJ)", textTh: "ที่ 3 (BU → CO → HJ)" },
        { text: "5ème", correct: false, textEn: "5th", textTh: "ที่ 5" },
      ],
      expKey: "l1.ex.q4.exp",
    },
    {
      qKey: "l1.ex.q5",
      options: [
        { text: "BU", correct: false },
        { text: "CO", correct: false },
        { text: "UTG", correct: true },
        { text: "HJ", correct: false },
      ],
      expKey: "l1.ex.q5.exp",
    },
  ],
  l2: [
    {
      qKey: "l2.ex.q1",
      options: [
        { text: "Check", correct: true },
        { text: "Fold", correct: false },
        { text: "Call", correct: false },
        { text: "Raise", correct: false },
      ],
      expKey: "l2.ex.q1.exp",
    },
    {
      qKey: "l2.ex.q2",
      options: [
        { text: "Augmenter la mise en jeu", correct: true, textEn: "Increase the current bet", textTh: "เพิ่มเดิมพันที่มี" },
        { text: "Égaliser la mise", correct: false, textEn: "Match the bet", textTh: "จ่ายเท่าเดิมพัน" },
        { text: "Abandonner sa main", correct: false, textEn: "Fold the hand", textTh: "ทิ้งมือ" },
        { text: "Passer son tour", correct: false, textEn: "Pass turn", textTh: "ผ่านตา" },
      ],
      expKey: "l2.ex.q2.exp",
    },
    {
      qKey: "l2.ex.q3",
      options: [
        { text: "Check ou raise", correct: true, textEn: "Check or raise", textTh: "Check หรือ raise" },
        { text: "Call uniquement", correct: false, textEn: "Call only", textTh: "Call เท่านั้น" },
        { text: "Fold uniquement", correct: false, textEn: "Fold only", textTh: "Fold เท่านั้น" },
        { text: "Raise obligatoire", correct: false, textEn: "Must raise", textTh: "ต้อง raise" },
      ],
      expKey: "l2.ex.q3.exp",
    },
    {
      qKey: "l2.ex.q4",
      options: [
        { text: "Tu jettes tes cartes et tu sors du coup", correct: true, textEn: "You discard your cards and exit the hand", textTh: "ทิ้งไพ่และออกจากมือ" },
        { text: "Tu reçois ta mise en retour", correct: false, textEn: "You get your bet back", textTh: "ได้เงินเดิมพันคืน" },
        { text: "Tu doubles ta mise", correct: false, textEn: "You double your bet", textTh: "เพิ่มเดิมพันสองเท่า" },
        { text: "Tu vois les cartes adverses", correct: false, textEn: "You see opponent cards", textTh: "เห็นไพ่คู่แข่ง" },
      ],
      expKey: "l2.ex.q4.exp",
    },
    {
      qKey: "l2.ex.q5",
      options: [
        { text: "Check ou bet", correct: true, textEn: "Check or bet", textTh: "Check หรือ bet" },
        { text: "Call ou raise", correct: false, textEn: "Call or raise", textTh: "Call หรือ raise" },
        { text: "Fold ou call", correct: false, textEn: "Fold or call", textTh: "Fold หรือ call" },
        { text: "All-in uniquement", correct: false, textEn: "All-in only", textTh: "All-in เท่านั้น" },
      ],
      expKey: "l2.ex.q5.exp",
    },
  ],
  l3: [
    {
      qKey: "l3.ex.q1",
      options: [
        { text: "Tu es short stack, ta mise max est 50", correct: true, textEn: "You're short stack, max bet is 50", textTh: "คุณเป็น short stack เดิมพันสูงสุด 50" },
        { text: "Tu peux miser 200", correct: false, textEn: "You can bet 200", textTh: "คุณเดิมพัน 200 ได้" },
        { text: "Tu as un gros stack", correct: false, textEn: "You have a big stack", textTh: "คุณมีสแต็กใหญ่" },
        { text: "Le pot t'appartient", correct: false, textEn: "The pot is yours", textTh: "พอทเป็นของคุณ" },
      ],
      expKey: "l3.ex.q1.exp",
    },
    {
      qKey: "l3.ex.q2",
      options: [
        { text: "2", correct: false },
        { text: "5", correct: true },
        { text: "10", correct: false },
        { text: "50", correct: false },
      ],
      expKey: "l3.ex.q2.exp",
    },
    {
      qKey: "l3.ex.q3",
      options: [
        { text: "Il aide à décider d'aller all-in ou non", correct: true, textEn: "It helps decide whether to go all-in", textTh: "ช่วยตัดสินใจว่าจะ all-in หรือไม่" },
        { text: "Il calcule les blindes", correct: false, textEn: "It calculates the blinds", textTh: "คำนวณ blind" },
        { text: "Il révèle les cartes adverses", correct: false, textEn: "It reveals opponents' cards", textTh: "เผยไพ่คู่แข่ง" },
        { text: "Il sert juste à compter", correct: false, textEn: "Just for counting", textTh: "ใช้นับเท่านั้น" },
      ],
      expKey: "l3.ex.q3.exp",
    },
    {
      qKey: "l3.ex.q4",
      options: [
        { text: "250", correct: true },
        { text: "200", correct: false },
        { text: "150", correct: false },
        { text: "500", correct: false },
      ],
      expKey: "l3.ex.q4.exp",
    },
    {
      qKey: "l3.ex.q5",
      options: [
        { text: "Tu as payé les blindes/antes", correct: true, textEn: "You paid blinds/antes", textTh: "คุณจ่าย blind/ante" },
        { text: "Tu as gagné un pot", correct: false, textEn: "You won a pot", textTh: "คุณชนะพอท" },
        { text: "Un autre joueur t'a donné des jetons", correct: false, textEn: "Another player gave you chips", textTh: "ผู้เล่นอื่นให้ชิป" },
        { text: "Le croupier a triché", correct: false, textEn: "The dealer cheated", textTh: "ดีลเลอร์โกง" },
      ],
      expKey: "l3.ex.q5.exp",
    },
  ],
  l6: [
    {
      qKey: "l6.ex.q1",
      options: [
        { text: "9", correct: true },
        { text: "4", correct: false },
        { text: "13", correct: false },
        { text: "8", correct: false },
      ],
      expKey: "l6.ex.q1.exp",
    },
    {
      qKey: "l6.ex.q2",
      options: [
        { text: "Tirage bilatéral (open-ended)", correct: true, textEn: "Open-ended", textTh: "Open-ended" },
        { text: "Tirage ventral (gutshot)", correct: false, textEn: "Gutshot", textTh: "Gutshot" },
        { text: "Tirage couleur", correct: false, textEn: "Flush draw", textTh: "Flush draw" },
        { text: "Aucun tirage", correct: false, textEn: "No draw", textTh: "ไม่มี draw" },
      ],
      expKey: "l6.ex.q2.exp",
    },
    {
      qKey: "l6.ex.q3",
      options: [
        { text: "Ventral (gutshot)", correct: true, textEn: "Gutshot", textTh: "Gutshot" },
        { text: "Bilatéral (open-ended)", correct: false, textEn: "Open-ended", textTh: "Open-ended" },
        { text: "Aucun", correct: false, textEn: "None", textTh: "ไม่มี" },
        { text: "Tirage couleur", correct: false, textEn: "Flush draw", textTh: "Flush draw" },
      ],
      expKey: "l6.ex.q3.exp",
    },
    {
      qKey: "l6.ex.q4",
      options: [
        { text: "≈ 35 %", correct: true },
        { text: "≈ 17 %", correct: false },
        { text: "≈ 50 %", correct: false },
        { text: "≈ 10 %", correct: false },
      ],
      expKey: "l6.ex.q4.exp",
    },
    {
      qKey: "l6.ex.q5",
      options: [
        { text: "8", correct: true },
        { text: "4", correct: false },
        { text: "9", correct: false },
        { text: "12", correct: false },
      ],
      expKey: "l6.ex.q5.exp",
    },
  ],
};

// Bet sizing exercises — pot sizes and target fractions
export const BET_SIZING_EXERCISES = [
  { pot: 100, target: 0.5, tolerance: 0.15 },
  { pot: 200, target: 0.66, tolerance: 0.15 },
  { pot: 60, target: 0.33, tolerance: 0.15 },
  { pot: 150, target: 0.75, tolerance: 0.15 },
  { pot: 80, target: 1.0, tolerance: 0.2 },
];
