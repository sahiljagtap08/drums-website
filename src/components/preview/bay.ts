// Geometry for the "cartridge bay" figure: one shared runtime and four private rollout cartridges.
// Built once from the anatomy iso kit as SVG strings; the live component only moves the groups.
import * as k from "../anatomy/iso-kit";

export const WIDTH = 720;
export const HEIGHT = 540;
export const CART_X = [-132, -44, 44, 132];
export const CART_NAMES = ["Rollout A", "Rollout B", "Rollout C", "Rollout D"];
export const MODULES = ["files overlay", "browser session", "app state"] as const;

const PLATE = { x: -196, y: -104, w: 392, d: 208, r: 10 };
const PLATE_H = 10;
const FOOT_H = 5;
const CORE = { x: -176, y: -96, w: 352, d: 44, r: 4 };
const STRATUM_H = 25;
const DECK = { x: -176, y: -52, w: 352, d: 104, r: 6 };
const DECK_H = 14;
const SOCKET_Z = DECK_H;
const SOCKET_H = 4;
const CART_Z = SOCKET_Z + SOCKET_H; // 18
const MOD_H = 16;
const CAP_H = 4;
const CART_Y = -34;
const CART_D = 70;
const CART_W = 16;

/** How far each group travels when the figure is spread (0..1), in world units. */
export const TRAVEL = { strata: 16, lift: 62, module: 11 };

const P = k.fitProjection(
  [
    ...k.boxCorners(PLATE, -PLATE_H - FOOT_H, 0),
    ...k.boxCorners(CORE, 0, 114),
    [CART_X[0] - 8, CART_Y, 170],
    [CART_X[3] + 8, CART_Y + CART_D, 170],
    [CART_X[0] - 8, CART_Y + CART_D, 170],
  ],
  WIDTH,
  HEIGHT,
  { pad: 26, azimuth: 45 },
);
export { P };

const S = (paths: k.SolidPaths, style: k.SolidStyle) => k.solidSvg(paths, style);
const L = (d: string, style: k.LineStyle = {}) => k.lineSvg(d, style);
const D = (points: k.Flat[], style: { size?: number; tone?: k.Tone } = {}) => k.dotsSvg(points, style);
const at = (point: k.Point3) => k.iso(point, P);
const tint = (name: "blue" | "amber", body: string, extra: Record<string, string | number> = {}) => k.groupSvg(body, { class: `tint-${name}`, ...extra });

function rect(fixed: number, a: number, b: number, z0: number, z1: number) {
  const pts: k.Flat[] = [at([fixed, a, z0]), at([fixed, b, z0]), at([fixed, b, z1]), at([fixed, a, z1])];
  return k.pathOf(pts, true);
}

function plate() {
  const out = [`<path class="iso-halo" d="${k.haloOf(PLATE, -PLATE_H - FOOT_H, PLATE_H, P)}"/>`];
  const feet = k.corners(PLATE, 24).sort((a, b) => k.depthOf([a[0], a[1], 0], P) - k.depthOf([b[0], b[1], 0], P));
  for (const [x, y] of feet) {
    out.push(S(k.cylinder(x, y, 8, -PLATE_H - FOOT_H, 1.6, P, 28), { tone: "lo" }));
    out.push(S(k.cylinder(x, y, 6, -PLATE_H - FOOT_H + 1.6, FOOT_H - 1.6, P, 28), { tone: "mid" }));
  }
  out.push(S(k.slabOf(PLATE, -PLATE_H, PLATE_H, P, 8, 1.6), { tone: "mid" }));
  out.push(L(k.planOutline(k.insetPlan(PLATE, 6), 0, P), { tone: "faint" }));
  const screws = k.corners(PLATE, 12);
  out.push(L(screws.map(([x, y]) => k.ring(x, y, 2.4, 0, P, 16)).join(""), { tone: "lo" }));
  out.push(D(screws.map(([x, y]) => at([x, y, 0])), { size: 0.5 }));
  const strip = { x: -168, y: 70, w: 336, d: 8, r: 1 };
  out.push(S(k.slabOf(strip, 0, 0.6, P, 3), { tone: "lo", crease: "none" }));
  const ticks = k.topTicks(strip.x + 4, strip.x + strip.w - 4, 4, 5, strip.y + 0.8, 0.6, [2, 3.6], P);
  out.push(L(ticks.minor, { tone: "lo" }), L(ticks.major, { tone: "mid" }));
  out.push(D([at([strip.x + 2, strip.y + 4, 0.6]), at([strip.x + strip.w - 2, strip.y + 4, 0.6])], { size: 0.45 }));
  const label = { x: 112, y: 82, w: 62, d: 14, r: 2 };
  out.push(S(k.slabOf(label, 0, 1.2, P, 3, 0.3), { tone: "mid", crease: "none" }));
  out.push(L([86, 89, 92].map((y) => k.lineOnTop([label.x + 6, y], [label.x + label.w - 6, y], 1.2, P)).join(""), { tone: "lo", free: true }));
  out.push(D(k.corners(label, 3).map(([x, y]) => at([x, y, 1.2])), { size: 0.4 }));
  return out.join("");
}

/** One shared layer of the read-only image: a stratum of the core. */
function stratum(index: number) {
  const z = index * STRATUM_H;
  const out: string[] = [];
  const steps = 4;
  const inner = L(k.sideSeam(CORE, z + 12, P, steps), { tone: "faint" });
  out.push(S(k.slabOf(CORE, z, STRATUM_H, P, steps, 0.8), { tone: "mid", inner }));
  // vents: closed slots on the +y front face, ending on their own outline
  const face = CORE.y + CORE.d;
  const slots: string[] = [];
  for (let n = 0; n < 8; n++) {
    const y0 = CORE.x + 28 + n * 12;
    const pts: k.Flat[] = [at([y0, face, z + 7]), at([y0 + 7, face, z + 7]), at([y0 + 7, face, z + 11]), at([y0, face, z + 11])];
    slots.push(k.pathOf(pts, true));
  }
  out.push(L(slots.join(""), { tone: "lo" }));
  if (index === 0) {
    const t = k.sideTicks(CORE.x + 16, CORE.x + CORE.w - 16, 4, 5, face, z + STRATUM_H, [2, 4], P);
    out.push(L(t.minor, { tone: "lo" }), L(t.major, { tone: "mid" }));
  } else {
    out.push(D([at([CORE.x + CORE.w - 14, face, z + 12]), at([CORE.x + CORE.w - 22, face, z + 12])], { size: 0.5, tone: "hi" }));
  }
  if (index === 2) {
    const top = z + STRATUM_H;
    out.push(L(k.planOutline(k.insetPlan(CORE, 5), top, P, steps), { tone: "faint" }));
    const lugs = k.corners(CORE, 9);
    out.push(L(lugs.map(([x, y]) => k.ring(x, y, 2.1, top, P, 14)).join(""), { tone: "lo" }));
    out.push(D(lugs.map(([x, y]) => at([x, y, top])), { size: 0.45 }));
    // application blocks sit on the top stratum
    for (let n = 0; n < 5; n++) {
      const plan = { x: CORE.x + 24 + n * 40, y: CORE.y + 12, w: 26, d: 20, r: 2 };
      out.push(S(k.slabOf(plan, top, 3, P, 3, 0.4), { tone: "mid", crease: "faint" }));
      out.push(L(k.planOutline(k.insetPlan(plan, 3.4), top + 3, P, 3), { tone: "faint" }));
    }
    // read-only latch: the one lit part of the shared side
    const latch = { x: CORE.x + CORE.w - 46, y: CORE.y + 26, w: 30, d: 12, r: 2 };
    out.push(S(k.slabOf(latch, top, 5, P, 3, 0.5), { tone: "hi", lit: true }));
    out.push(L(k.lineOnTop([latch.x, latch.y + 6], [latch.x + latch.w, latch.y + 6], top + 5, P), { tone: "lit" }));
    out.push(D([at([latch.x + 4, latch.y + 3, top + 5]), at([latch.x + latch.w - 4, latch.y + 3, top + 5])], { size: 0.45, tone: "hi" }));
  }
  return out.join("");
}

function deck() {
  const out: string[] = [];
  const steps = 5;
  out.push(S(k.slabOf(DECK, 0, DECK_H, P, steps, 0.8), { tone: "mid", inner: L(k.sideSeam(DECK, 7, P, steps), { tone: "faint" }) }));
  out.push(L(k.planOutline(k.insetPlan(DECK, 5), DECK_H, P, steps), { tone: "faint" }));
  // shared bus bar feeding every socket
  const bus = { x: -164, y: -50, w: 328, d: 6, r: 1 };
  out.push(S(k.slabOf(bus, DECK_H, 3, P, 3, 0.4), { tone: "hi", crease: "faint" }));
  const bt = k.topTicks(bus.x + 4, bus.x + bus.w - 4, 4, 5, bus.y + 0.6, DECK_H + 3, [1.6, 2.8], P);
  out.push(L(bt.minor, { tone: "lo" }), L(bt.major, { tone: "mid" }));
  const screws = k.corners(DECK, 9);
  out.push(L(screws.map(([x, y]) => k.ring(x, y, 2, DECK_H, P, 14)).join(""), { tone: "lo" }));
  out.push(D(screws.map(([x, y]) => at([x, y, DECK_H])), { size: 0.45 }));
  CART_X.forEach((cx) => {
    // stub from the bus to the socket, then the socket itself with its pin rows
    out.push(S(k.slabOf({ x: cx - 3, y: -44, w: 6, d: 6, r: 1 }, DECK_H, 2, P, 2), { tone: "mid", crease: "none" }));
    const sock = { x: cx - 12, y: -40, w: 24, d: 84, r: 2 };
    out.push(S(k.slabOf(sock, SOCKET_Z, SOCKET_H, P, 3, 0.4), { tone: "mid", crease: "faint" }));
    out.push(L(k.planOutline(k.insetPlan(sock, 3), CART_Z, P, 3), { tone: "faint" }));
    const pins: k.Flat[] = [];
    for (let n = 0; n < 9; n++) for (const dx of [-5, 5]) pins.push(at([cx + dx, -34 + n * 8.5, CART_Z]));
    out.push(D(pins, { size: 0.5, tone: "hi" }));
  });
  return out.join("");
}

/** A single private module of a cartridge, drawn with its own face detail. */
function module(cx: number, m: number) {
  const z = CART_Z + m * MOD_H;
  const plan = { x: cx - CART_W / 2, y: CART_Y, w: CART_W, d: CART_D, r: 1 };
  const fx = plan.x + plan.w;
  const y0 = plan.y + 5;
  const y1 = plan.y + plan.d - 5;
  const out: string[] = [];
  const inner = L(k.sideSeam(plan, z + MOD_H / 2, P, 2), { tone: "faint" });
  out.push(S(k.slabOf(plan, z, MOD_H, P, 2, 0.4), { tone: "mid", inner }));
  if (m === 0) {
    // files: stacked file bars
    const bars = [0, 1, 2].map((n) => rect(fx, y0, y1 - n * 10, z + 3 + n * 4, z + 5.4 + n * 4)).join("");
    out.push(L(bars, { tone: "lo" }));
  } else if (m === 1) {
    // browser: three tab windows
    const tabs = [0, 1, 2].map((n) => rect(fx, y0 + n * 21, y0 + n * 21 + 17, z + 4, z + 12)).join("");
    out.push(L(tabs, { tone: "lo" }));
  } else {
    // app state: a gauge ring and a counter window
    out.push(L(k.sideRing([fx, plan.y + 22, z + 8], 4.6, "x", P, 22), { tone: "mid" }));
    out.push(D([at([fx, plan.y + 22, z + 8])], { size: 0.55, tone: "hi" }));
    out.push(L(rect(fx, plan.y + 36, plan.y + 64, z + 4.5, z + 11.5), { tone: "lo" }));
  }
  return out.join("");
}

function cap(cx: number) {
  const z = CART_Z + 3 * MOD_H;
  const plan = k.insetPlan({ x: cx - CART_W / 2, y: CART_Y, w: CART_W, d: CART_D, r: 1 }, 0.8);
  const out: string[] = [];
  out.push(S(k.slabOf(plan, z, CAP_H, P, 2, 0.4), { tone: "hi", lit: true }));
  out.push(L(k.lineOnTop([cx - 4, CART_Y + 6], [cx - 4, CART_Y + CART_D - 6], z + CAP_H, P), { tone: "lit" }));
  const t = k.topTicks(CART_Y + 8, CART_Y + CART_D - 8, 4, 5, cx - 4, z + CAP_H, [2, 3.6], P, "y");
  out.push(L(t.minor, { tone: "lo" }), L(t.major, { tone: "mid" }));
  const pull = { x: cx - 3.5, y: CART_Y + CART_D - 14, w: 7, d: 8, r: 1.5 };
  out.push(S(k.slabOf(pull, z + CAP_H, 4, P, 2, 0.3), { tone: "hi", lit: true }));
  out.push(D([at([cx + 2.4, CART_Y + 6, z + CAP_H]), at([cx + 2.4, CART_Y + CART_D - 20, z + CAP_H])], { size: 0.45, tone: "hi" }));
  return out.join("");
}

export interface Bay {
  svg: string;
  groups: Array<{ id: string; kind: "stratum" | "module"; cart: number; slot: number }>;
}

export function buildBay(): Bay {
  const groups: Bay["groups"] = [];
  const body: string[] = [plate()];
  for (let i = 0; i < 3; i++) {
    groups.push({ id: `stratum-${i}`, kind: "stratum", cart: -1, slot: i });
    body.push(tint("blue", stratum(i), { "data-part": `stratum-${i}`, transform: k.translateAlong(P, [0, 0, 0]) }));
  }
  body.push(tint("blue", deck(), { "data-part": "deck" }));
  // Cartridges are separated from each other by planes of constant x, so far-to-near is ascending x.
  CART_X.forEach((cx, i) => {
    const mods: string[] = [];
    for (let m = 0; m < 3; m++) {
      const id = `cart-${i}-${m}`;
      groups.push({ id, kind: "module", cart: i, slot: m });
      mods.push(k.groupSvg(module(cx, m), { "data-part": id, transform: k.translateAlong(P, [0, 0, 0]) }));
    }
    const capId = `cart-${i}-3`;
    groups.push({ id: capId, kind: "module", cart: i, slot: 3 });
    mods.push(k.groupSvg(cap(cx), { "data-part": capId, transform: k.translateAlong(P, [0, 0, 0]) }));
    body.push(tint("amber", mods.join(""), { "data-cart": i, class: "tint-amber cart" }));
  });
  const svg = k.figureSvg({
    width: WIDTH,
    height: HEIGHT,
    label:
      "An isometric machine: one shared runtime with three read-only layers and a bus bar, and four removable rollout cartridges, each made of files, browser session and app state modules, that plug into sockets on the shared deck. Spreading the figure lifts each cartridge off its socket and separates its three private modules.",
    body,
    className: "bay-svg",
  });
  return { svg, groups };
}

export const bayStyles = `
.tint-blue{--anatomy-paper:#dfeafc;--anatomy-face:#eaf1fd;--anatomy-top:#f3f7fe;--anatomy-shade-0:#bcd0f1;--anatomy-shade-1:#cbdaf5;--anatomy-shade-2:#d9e5f8;--anatomy-shade-3:#e6eefb;--anatomy-lit-top:#ffffff;--anatomy-lit-shade:#dfe9fb}
.tint-amber{--anatomy-paper:#fbe9cf;--anatomy-face:#fdf1dd;--anatomy-top:#fff7ea;--anatomy-shade-0:#efc795;--anatomy-shade-1:#f4d5ac;--anatomy-shade-2:#f8e0c1;--anatomy-shade-3:#fcebd3;--anatomy-lit-top:#fff3dd;--anatomy-lit-shade:#f6d6a3}
.iso[data-theme="light"] .tint-blue .iso-edge[data-tone]{stroke:#2f4f86}
.iso[data-theme="light"] .tint-amber .iso-edge[data-tone]{stroke:#8a4b06}
.iso[data-theme="light"] .tint-blue .iso-line[data-tone="lit"]{stroke:#1f4fd8}
.iso[data-theme="light"] .tint-amber .iso-line[data-tone="lit"]{stroke:#b45309}
.bay-svg .cart{transition:filter 260ms var(--anatomy-ease)}
${CART_X.map((_, i) => `.bay-stage[data-focus="${i}"] .cart:not([data-cart="${i}"]){filter:grayscale(.92) brightness(1.04)}`).join("\n")}
`;
