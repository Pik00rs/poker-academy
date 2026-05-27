// Card representation: { rank: 2..14, suit: 'h'|'d'|'c'|'s' }
// Ranks: 2..10 numeric, 11=J, 12=Q, 13=K, 14=A

export const SUITS = ["h", "d", "c", "s"];
export const SUIT_GLYPH = { h: "♥", d: "♦", c: "♣", s: "♠" };
export const SUIT_COLOR = { h: "red", d: "red", c: "black", s: "black" };
export const RANK_LABEL = {
  2: "2",
  3: "3",
  4: "4",
  5: "5",
  6: "6",
  7: "7",
  8: "8",
  9: "9",
  10: "10",
  11: "J",
  12: "Q",
  13: "K",
  14: "A",
};

export function cardLabel(c) {
  return RANK_LABEL[c.rank] + SUIT_GLYPH[c.suit];
}

export function newDeck() {
  const deck = [];
  for (const s of SUITS) {
    for (let r = 2; r <= 14; r++) deck.push({ rank: r, suit: s });
  }
  return deck;
}

export function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function drawCards(n) {
  return shuffle(newDeck()).slice(0, n);
}

// Hand categories (higher = stronger)
export const HAND = {
  HIGH_CARD: 1,
  PAIR: 2,
  TWO_PAIR: 3,
  THREE_KIND: 4,
  STRAIGHT: 5,
  FLUSH: 6,
  FULL_HOUSE: 7,
  FOUR_KIND: 8,
  STRAIGHT_FLUSH: 9,
};

export const HAND_NAME_KEYS = {
  [HAND.HIGH_CARD]: "l4.li.hc",
  [HAND.PAIR]: "l4.li.1p",
  [HAND.TWO_PAIR]: "l4.li.2p",
  [HAND.THREE_KIND]: "l4.li.3k",
  [HAND.STRAIGHT]: "l4.li.st",
  [HAND.FLUSH]: "l4.li.fl",
  [HAND.FULL_HOUSE]: "l4.li.fh",
  [HAND.FOUR_KIND]: "l4.li.4k",
  [HAND.STRAIGHT_FLUSH]: "l4.li.sf",
};

// Plain short names (locale-neutral keys we map separately)
export const HAND_SHORT = {
  [HAND.HIGH_CARD]: { fr: "Hauteur", en: "High Card", th: "ไพ่สูง", zh: "高牌" },
  [HAND.PAIR]: { fr: "Paire", en: "Pair", th: "คู่", zh: "对子" },
  [HAND.TWO_PAIR]: { fr: "Deux paires", en: "Two Pair", th: "สองคู่", zh: "两对" },
  [HAND.THREE_KIND]: { fr: "Brelan", en: "Three of a Kind", th: "ทริปเปิ้ล", zh: "三条" },
  [HAND.STRAIGHT]: { fr: "Quinte", en: "Straight", th: "สเตรท", zh: "顺子" },
  [HAND.FLUSH]: { fr: "Couleur", en: "Flush", th: "ฟลัช", zh: "同花" },
  [HAND.FULL_HOUSE]: { fr: "Full", en: "Full House", th: "ฟูลเฮ้าส์", zh: "葫芦" },
  [HAND.FOUR_KIND]: { fr: "Carré", en: "Four of a Kind", th: "โฟร์การ์ด", zh: "四条" },
  [HAND.STRAIGHT_FLUSH]: { fr: "Quinte flush", en: "Straight Flush", th: "สเตรทฟลัช", zh: "同花顺" },
};

// Evaluate exactly 5 cards. Returns { category, ranks: tieBreakers desc }
export function evaluate5(cards) {
  if (cards.length !== 5) throw new Error("evaluate5 needs 5 cards");

  const ranks = cards.map((c) => c.rank).sort((a, b) => b - a);
  const suits = cards.map((c) => c.suit);

  const rankCounts = {};
  for (const r of ranks) rankCounts[r] = (rankCounts[r] || 0) + 1;
  // Sorted as [rank, count] by count desc, then rank desc
  const counts = Object.entries(rankCounts)
    .map(([r, c]) => [parseInt(r, 10), c])
    .sort((a, b) => b[1] - a[1] || b[0] - a[0]);

  const isFlush = suits.every((s) => s === suits[0]);

  // Straight detection
  const uniqueRanks = [...new Set(ranks)].sort((a, b) => b - a);
  let straightHigh = null;
  if (uniqueRanks.length === 5) {
    if (uniqueRanks[0] - uniqueRanks[4] === 4) {
      straightHigh = uniqueRanks[0];
    }
    // Wheel: A-2-3-4-5
    if (
      uniqueRanks[0] === 14 &&
      uniqueRanks[1] === 5 &&
      uniqueRanks[2] === 4 &&
      uniqueRanks[3] === 3 &&
      uniqueRanks[4] === 2
    ) {
      straightHigh = 5;
    }
  }

  if (isFlush && straightHigh) {
    return { category: HAND.STRAIGHT_FLUSH, ranks: [straightHigh] };
  }

  if (counts[0][1] === 4) {
    return { category: HAND.FOUR_KIND, ranks: [counts[0][0], counts[1][0]] };
  }

  if (counts[0][1] === 3 && counts[1][1] === 2) {
    return { category: HAND.FULL_HOUSE, ranks: [counts[0][0], counts[1][0]] };
  }

  if (isFlush) {
    return { category: HAND.FLUSH, ranks };
  }

  if (straightHigh) {
    return { category: HAND.STRAIGHT, ranks: [straightHigh] };
  }

  if (counts[0][1] === 3) {
    const kickers = counts
      .slice(1)
      .map((x) => x[0])
      .sort((a, b) => b - a);
    return { category: HAND.THREE_KIND, ranks: [counts[0][0], ...kickers] };
  }

  if (counts[0][1] === 2 && counts[1][1] === 2) {
    const pairs = [counts[0][0], counts[1][0]].sort((a, b) => b - a);
    return { category: HAND.TWO_PAIR, ranks: [...pairs, counts[2][0]] };
  }

  if (counts[0][1] === 2) {
    const kickers = counts
      .slice(1)
      .map((x) => x[0])
      .sort((a, b) => b - a);
    return { category: HAND.PAIR, ranks: [counts[0][0], ...kickers] };
  }

  return { category: HAND.HIGH_CARD, ranks };
}

// Compare two evaluation results. Returns positive if a > b
export function compareEval(a, b) {
  if (a.category !== b.category) return a.category - b.category;
  for (let i = 0; i < Math.max(a.ranks.length, b.ranks.length); i++) {
    const ar = a.ranks[i] ?? 0;
    const br = b.ranks[i] ?? 0;
    if (ar !== br) return ar - br;
  }
  return 0;
}

// Generate a 5-card hand that matches a target category. Returns array of cards.
export function generateHandOfCategory(category) {
  // We attempt by construction, then verify.
  const deck = newDeck();
  const byRank = (r) => deck.filter((c) => c.rank === r);
  const bySuit = (s) => deck.filter((c) => c.suit === s);
  const rand = (arr) => arr[Math.floor(Math.random() * arr.length)];

  const randomRank = () => 2 + Math.floor(Math.random() * 13);
  const distinctRanks = (n) => {
    const set = new Set();
    while (set.size < n) set.add(randomRank());
    return [...set];
  };

  let tries = 0;
  while (tries++ < 200) {
    let cards;
    switch (category) {
      case HAND.STRAIGHT_FLUSH: {
        const suit = rand(SUITS);
        const high = 5 + Math.floor(Math.random() * 10); // 5..14
        cards = [];
        for (let r = high - 4; r <= high; r++) {
          cards.push({ rank: r, suit });
        }
        break;
      }
      case HAND.FOUR_KIND: {
        const r = randomRank();
        const kickerR = distinctRanks(2).find((x) => x !== r) ?? (r === 2 ? 3 : 2);
        cards = byRank(r).slice(0, 4);
        const kicker = byRank(kickerR)[0];
        cards.push(kicker);
        break;
      }
      case HAND.FULL_HOUSE: {
        const [r1, r2] = distinctRanks(2);
        cards = [...byRank(r1).slice(0, 3), ...byRank(r2).slice(0, 2)];
        break;
      }
      case HAND.FLUSH: {
        const suit = rand(SUITS);
        const all = bySuit(suit);
        // Pick 5 random non-consecutive ranks
        const ranks = [];
        while (ranks.length < 5) {
          const r = randomRank();
          if (!ranks.includes(r)) ranks.push(r);
        }
        ranks.sort((a, b) => a - b);
        // Avoid 5 consecutive (= straight flush)
        if (ranks[4] - ranks[0] === 4 && new Set(ranks).size === 5) continue;
        // Avoid wheel
        if (ranks[0] === 2 && ranks[1] === 3 && ranks[2] === 4 && ranks[3] === 5 && ranks[4] === 14) continue;
        cards = ranks.map((r) => ({ rank: r, suit }));
        break;
      }
      case HAND.STRAIGHT: {
        const high = 5 + Math.floor(Math.random() * 10);
        const ranks = [];
        for (let r = high - 4; r <= high; r++) ranks.push(r);
        // Assign suits ensuring not all same
        const suitsArr = ranks.map(() => rand(SUITS));
        if (suitsArr.every((s) => s === suitsArr[0])) suitsArr[0] = SUITS.find((s) => s !== suitsArr[0]);
        cards = ranks.map((r, i) => ({ rank: r, suit: suitsArr[i] }));
        break;
      }
      case HAND.THREE_KIND: {
        const r = randomRank();
        const kickers = distinctRanks(3).filter((x) => x !== r).slice(0, 2);
        while (kickers.length < 2) {
          const k = randomRank();
          if (k !== r && !kickers.includes(k)) kickers.push(k);
        }
        cards = [...byRank(r).slice(0, 3), byRank(kickers[0])[0], byRank(kickers[1])[1] || byRank(kickers[1])[0]];
        // ensure distinct
        const seen = new Set();
        const dedup = [];
        for (const c of cards) {
          const k = c.rank + c.suit;
          if (!seen.has(k)) { seen.add(k); dedup.push(c); }
        }
        if (dedup.length !== 5) continue;
        cards = dedup;
        break;
      }
      case HAND.TWO_PAIR: {
        const [r1, r2] = distinctRanks(2);
        const kickerR = distinctRanks(3).find((x) => x !== r1 && x !== r2) ?? 14;
        cards = [
          ...byRank(r1).slice(0, 2),
          ...byRank(r2).slice(0, 2),
          byRank(kickerR)[0],
        ];
        break;
      }
      case HAND.PAIR: {
        const r = randomRank();
        const kickers = [];
        while (kickers.length < 3) {
          const k = randomRank();
          if (k !== r && !kickers.includes(k)) kickers.push(k);
        }
        cards = [
          ...byRank(r).slice(0, 2),
          byRank(kickers[0])[0],
          byRank(kickers[1])[1] || byRank(kickers[1])[0],
          byRank(kickers[2])[2] || byRank(kickers[2])[0],
        ];
        break;
      }
      case HAND.HIGH_CARD:
      default: {
        const ranks = [];
        while (ranks.length < 5) {
          const r = randomRank();
          if (!ranks.includes(r)) ranks.push(r);
        }
        ranks.sort((a, b) => a - b);
        // Avoid straight
        if (ranks[4] - ranks[0] === 4 && new Set(ranks).size === 5) continue;
        if (ranks[0] === 2 && ranks[1] === 3 && ranks[2] === 4 && ranks[3] === 5 && ranks[4] === 14) continue;
        const suitsArr = ranks.map(() => rand(SUITS));
        // Avoid flush
        if (suitsArr.every((s) => s === suitsArr[0])) suitsArr[1] = SUITS.find((s) => s !== suitsArr[0]);
        cards = ranks.map((r, i) => ({ rank: r, suit: suitsArr[i] }));
        break;
      }
    }

    // Verify uniqueness and category
    const ids = new Set(cards.map((c) => c.rank + c.suit));
    if (ids.size !== 5) continue;
    const ev = evaluate5(cards);
    if (ev.category === category) {
      return cards;
    }
  }
  // Fallback: generate random until match (very rare)
  while (true) {
    const cards = drawCards(5);
    if (evaluate5(cards).category === category) return cards;
  }
}
