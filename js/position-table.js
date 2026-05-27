import { el } from "../dom.js";

// 7-max table. Order acting preflop: UTG → MP → HJ → CO → BU → SB → BB
// Order acting postflop: SB → BB → UTG → MP → HJ → CO → BU
// Seating around the table (clockwise from BU):
const SEATS = [
  { name: "BU", angle: 90 },
  { name: "SB", angle: 90 + 360 / 7 },
  { name: "BB", angle: 90 + (360 / 7) * 2 },
  { name: "UTG", angle: 90 + (360 / 7) * 3 },
  { name: "MP", angle: 90 + (360 / 7) * 4 },
  { name: "HJ", angle: 90 + (360 / 7) * 5 },
  { name: "CO", angle: 90 + (360 / 7) * 6 },
];

// Acting order postflop (from earliest to latest)
export const POSTFLOP_ORDER = ["SB", "BB", "UTG", "MP", "HJ", "CO", "BU"];
// Acting order preflop (BB acts last preflop)
export const PREFLOP_ORDER = ["UTG", "MP", "HJ", "CO", "BU", "SB", "BB"];
// Clockwise from button (used in pedagogy: "Nth from the button")
export const FROM_BUTTON_CLOCKWISE = ["BU", "SB", "BB", "UTG", "MP", "HJ", "CO"];

export const ALL_SEATS = SEATS.map((s) => s.name);

export function renderPositionTable(opts = {}) {
  const {
    highlight,
    onClick,
    getSeatState,
    showRoles = true,
    showLabels = true,
  } = opts;

  const wrap = el("div", { class: "poker-table-wrap" });
  const table = el("div", { class: "poker-table" });
  table.appendChild(
    el("div", { class: "table-felt-text", text: "POKER ACADEMY" })
  );

  SEATS.forEach((seat) => {
    const rad = (seat.angle * Math.PI) / 180;
    const rx = 44;
    const ry = 38;
    const x = 50 + rx * Math.cos(rad);
    const y = 50 + ry * Math.sin(rad);

    const seatNode = el("div", {
      class: "seat",
      attrs: { "data-seat": seat.name },
    });

    if (getSeatState) {
      const state = getSeatState(seat.name);
      if (state === "correct") seatNode.classList.add("correct");
      if (state === "wrong") seatNode.classList.add("wrong");
    }

    seatNode.style.left = `${x}%`;
    seatNode.style.top = `${y}%`;

    const cls = ["seat-marker"];
    if (highlight === seat.name) cls.push("hero");

    const m = el("div", { class: cls.join(" "), text: seat.name });
    seatNode.appendChild(m);

    if (showLabels) {
      seatNode.appendChild(el("div", { class: "seat-label", text: seat.name }));
    }

    if (showRoles) {
      if (seat.name === "BU") {
        seatNode.appendChild(el("div", { class: "role-chip dealer", text: "D" }));
      } else if (seat.name === "SB") {
        seatNode.appendChild(el("div", { class: "role-chip sb", text: "SB" }));
      } else if (seat.name === "BB") {
        seatNode.appendChild(el("div", { class: "role-chip bb", text: "BB" }));
      }
    }

    if (onClick) {
      seatNode.style.cursor = "pointer";
      seatNode.addEventListener("click", () => onClick(seat.name));
    }

    table.appendChild(seatNode);
  });

  wrap.appendChild(table);
  return wrap;
}

// Legacy export (kept for backward compat)
export const ORDER_FROM_BUTTON = FROM_BUTTON_CLOCKWISE;
