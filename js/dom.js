import { SUIT_GLYPH, SUIT_COLOR, RANK_LABEL } from "./poker.js";

export function el(tag, opts = {}, children = []) {
  const node = document.createElement(tag);
  if (opts.class) node.className = opts.class;
  if (opts.id) node.id = opts.id;
  if (opts.attrs) Object.entries(opts.attrs).forEach(([k, v]) => node.setAttribute(k, v));
  if (opts.text != null) node.textContent = opts.text;
  if (opts.html != null) node.innerHTML = opts.html;
  if (opts.on) Object.entries(opts.on).forEach(([ev, fn]) => node.addEventListener(ev, fn));
  for (const child of children) {
    if (child == null) continue;
    if (typeof child === "string") node.appendChild(document.createTextNode(child));
    else node.appendChild(child);
  }
  return node;
}

export function clear(node) {
  while (node.firstChild) node.removeChild(node.firstChild);
}

// Render a playing card
export function renderCard(card, opts = {}) {
  const cls = ["pcard", SUIT_COLOR[card.suit]];
  if (opts.small) cls.push("small");
  if (opts.extra) cls.push(opts.extra);
  const node = document.createElement("div");
  node.className = cls.join(" ");
  const rank = document.createElement("span");
  rank.className = "rank";
  rank.textContent = RANK_LABEL[card.rank];
  const suit = document.createElement("span");
  suit.className = "suit";
  suit.textContent = SUIT_GLYPH[card.suit];
  node.appendChild(rank);
  node.appendChild(suit);
  if (opts.data) {
    Object.entries(opts.data).forEach(([k, v]) => node.setAttribute(`data-${k}`, v));
  }
  return node;
}

export function renderCardBack() {
  const n = document.createElement("div");
  n.className = "pcard back";
  return n;
}

let toastEl = null;
let toastTimer = null;

export function toast(message, kind = "") {
  if (!toastEl) {
    toastEl = document.createElement("div");
    toastEl.className = "toast";
    document.body.appendChild(toastEl);
  }
  toastEl.className = "toast" + (kind ? " " + kind : "");
  toastEl.textContent = message;
  // Force reflow
  void toastEl.offsetWidth;
  toastEl.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toastEl.classList.remove("show"), 2400);
}
