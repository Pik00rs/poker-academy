// Lessons metadata + content blocks. Question banks are in /js/data/question-banks/

export const LESSONS = [
  {
    id: "l1",
    titleKey: "l1.title",
    descKey: "l1.desc",
    exerciseType: "qcm",
  },
  {
    id: "l2",
    titleKey: "l2.title",
    descKey: "l2.desc",
    exerciseType: "qcm",
  },
  {
    id: "l3",
    titleKey: "l3.title",
    descKey: "l3.desc",
    exerciseType: "qcm",
  },
  {
    id: "l4",
    titleKey: "l4.title",
    descKey: "l4.desc",
    exerciseType: "qcm",
  },
  {
    id: "l5",
    titleKey: "l5.title",
    descKey: "l5.desc",
    exerciseType: "qcm",
  },
  {
    id: "l6",
    titleKey: "l6.title",
    descKey: "l6.desc",
    exerciseType: "hand-naming",
  },
  {
    id: "l7",
    titleKey: "l7.title",
    descKey: "l7.desc",
    exerciseType: "hand-ranking",
  },
  {
    id: "l8",
    titleKey: "l8.title",
    descKey: "l8.desc",
    exerciseType: "qcm",
  },
  {
    id: "l9",
    titleKey: "l9.title",
    descKey: "l9.desc",
    exerciseType: "qcm",
  },
  {
    id: "l10",
    titleKey: "l10.title",
    descKey: "l10.desc",
    exerciseType: "bet-sizing",
  },
  {
    id: "l11",
    titleKey: "l11.title",
    descKey: "l11.desc",
    exerciseType: "qcm",
  },
];

// Lesson content (rendered as HTML blocks)
export const LESSON_CONTENT = {
  // L1 — Streets
  l1: [
    { type: "p", key: "l1.p1" },
    { type: "streets" }, // Visual: streets timeline
    { type: "h", key: "l1.h.preflop" },
    { type: "p", key: "l1.p2" },
    { type: "h", key: "l1.h.flop" },
    { type: "p", key: "l1.p3" },
    { type: "h", key: "l1.h.turn" },
    { type: "p", key: "l1.p4" },
    { type: "h", key: "l1.h.river" },
    { type: "p", key: "l1.p5" },
    { type: "callout", key: "l1.callout" },
  ],
  // L2 — Positions
  l2: [
    { type: "p", key: "l2.p1" },
    { type: "table" }, // poker table visual
    { type: "h", key: "l2.h.order" },
    { type: "p", key: "l2.p2" },
    {
      type: "ul",
      keys: [
        "l2.li.bu",
        "l2.li.sb",
        "l2.li.bb",
        "l2.li.utg",
        "l2.li.mp",
        "l2.li.hj",
        "l2.li.co",
      ],
    },
    { type: "callout", key: "l2.callout" },
  ],
  // L3 — Blinds
  l3: [
    { type: "p", key: "l3.p1" },
    { type: "h", key: "l3.h.sb" },
    { type: "p", key: "l3.p2" },
    { type: "h", key: "l3.h.bb" },
    { type: "p", key: "l3.p3" },
    { type: "h", key: "l3.h.role" },
    { type: "p", key: "l3.p4" },
    { type: "table" },
    { type: "callout", key: "l3.callout" },
  ],
  // L4 — Actions
  l4: [
    { type: "p", key: "l4.p1" },
    { type: "h", key: "l4.h.actions" },
    {
      type: "ul",
      keys: [
        "l4.li.fold",
        "l4.li.check",
        "l4.li.call",
        "l4.li.bet",
        "l4.li.raise",
        "l4.li.allin",
      ],
    },
    { type: "h", key: "l4.h.preflop" },
    { type: "p", key: "l4.p2" },
    { type: "h", key: "l4.h.flop" },
    { type: "p", key: "l4.p3" },
    { type: "callout", key: "l4.callout" },
  ],
  // L5 — Pot & Stack
  l5: [
    { type: "p", key: "l5.p1" },
    { type: "h", key: "l5.h.pot" },
    { type: "p", key: "l5.p2" },
    { type: "h", key: "l5.h.stack" },
    { type: "p", key: "l5.p3" },
    { type: "h", key: "l5.h.ratio" },
    { type: "p", key: "l5.p4" },
    { type: "callout", key: "l5.callout" },
  ],
  // L6 — Hand reading
  l6: [
    { type: "p", key: "l6.p1" },
    { type: "h", key: "l6.h.combos" },
    {
      type: "ul",
      keys: [
        "l6.li.sf",
        "l6.li.4k",
        "l6.li.fh",
        "l6.li.fl",
        "l6.li.st",
        "l6.li.3k",
        "l6.li.2p",
        "l6.li.1p",
        "l6.li.hc",
      ],
    },
    { type: "callout", key: "l6.callout" },
  ],
  // L7 — Hand strength
  l7: [
    { type: "p", key: "l7.p1" },
    { type: "h", key: "l7.h.order" },
    { type: "p", key: "l7.p2" },
    { type: "callout", key: "l7.callout" },
  ],
  // L8 — Draws
  l8: [
    { type: "p", key: "l8.p1" },
    { type: "h", key: "l8.h.flush" },
    { type: "p", key: "l8.p2" },
    { type: "h", key: "l8.h.straight" },
    { type: "p", key: "l8.p3" },
    { type: "callout", key: "l8.callout" },
  ],
  // L9 — Pot odds
  l9: [
    { type: "p", key: "l9.p1" },
    { type: "h", key: "l9.h.calc" },
    { type: "p", key: "l9.p2" },
    { type: "h", key: "l9.h.compare" },
    { type: "p", key: "l9.p3" },
    { type: "callout", key: "l9.callout" },
  ],
  // L10 — Bet sizing
  l10: [
    { type: "p", key: "l10.p1" },
    { type: "h", key: "l10.h.sizes" },
    {
      type: "ul",
      keys: ["l10.li.s1", "l10.li.s2", "l10.li.s3", "l10.li.s4", "l10.li.s5"],
    },
    { type: "callout", key: "l10.callout" },
  ],
  // L11 — Beginner mistakes
  l11: [
    { type: "p", key: "l11.p1" },
    { type: "h", key: "l11.h.list" },
    {
      type: "ul",
      keys: [
        "l11.li.m1",
        "l11.li.m2",
        "l11.li.m3",
        "l11.li.m4",
        "l11.li.m5",
        "l11.li.m6",
      ],
    },
    { type: "callout", key: "l11.callout" },
  ],
};

// Bet sizing exercises pool (20 items — sampled)
export const BET_SIZING_EXERCISES = [
  { pot: 100, target: 0.5, tolerance: 0.15 },
  { pot: 200, target: 0.66, tolerance: 0.15 },
  { pot: 60, target: 0.33, tolerance: 0.15 },
  { pot: 150, target: 0.75, tolerance: 0.15 },
  { pot: 80, target: 1.0, tolerance: 0.2 },
  { pot: 120, target: 0.5, tolerance: 0.15 },
  { pot: 250, target: 0.33, tolerance: 0.15 },
  { pot: 90, target: 0.66, tolerance: 0.15 },
  { pot: 300, target: 0.75, tolerance: 0.15 },
  { pot: 50, target: 0.5, tolerance: 0.2 },
  { pot: 180, target: 0.33, tolerance: 0.15 },
  { pot: 220, target: 1.0, tolerance: 0.2 },
  { pot: 400, target: 0.5, tolerance: 0.15 },
  { pot: 70, target: 0.66, tolerance: 0.15 },
  { pot: 160, target: 0.75, tolerance: 0.15 },
  { pot: 110, target: 0.33, tolerance: 0.15 },
  { pot: 280, target: 0.5, tolerance: 0.15 },
  { pot: 95, target: 1.0, tolerance: 0.2 },
  { pot: 130, target: 0.66, tolerance: 0.15 },
  { pot: 65, target: 0.75, tolerance: 0.15 },
];
