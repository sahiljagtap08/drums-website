// Custom ASCII / pixel renderer for the hero study.
// A small isometric machine is painted into a cell-resolution buffer (one pixel per character cell),
// then every cell is drawn as a glyph whose density follows luminance and whose colour follows hue.
// Nothing here is a measurement: it is an illustration of the intended sharing model.

type Rgb = [number, number, number];

const RAMP = " .:-=+*#%@";
const TOP = " .\u00b7:+*#@";
const RIGHT = " ,/zZ%#@";
const LEFT = " ,|lI!#@";
const CODE =
  "const run=fork(os.base);fs.overlay(run).write(p,b);browser.session(run).open(tab);app.state[run].set(k,v);if(!shared.dirty)reuse();0x7f3a9c1e 0b10110 rollout.reset();snapshot(run);";
const BLUE: Rgb = [58, 140, 255];
const CYAN: Rgb = [90, 220, 255];
const AMBER: Rgb = [255, 170, 60];

const hash = (a: number, b: number, c = 0) => {
  let h = Math.imul(a | 0, 374761393) ^ Math.imul(b | 0, 668265263) ^ Math.imul(c | 0, 1274126177);
  h = Math.imul(h ^ (h >>> 13), 1274126177);
  return ((h ^ (h >>> 16)) >>> 0) / 4294967296;
};
const smoothstep = (t: number) => {
  const x = Math.min(1, Math.max(0, t));
  return x * x * (3 - 2 * x);
};
const mix = (a: Rgb, b: Rgb, t: number): Rgb => [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t];
const rgb = (c: Rgb, k = 1) => `rgb(${Math.round(c[0] * k)},${Math.round(c[1] * k)},${Math.round(c[2] * k)})`;

export interface SceneOptions {
  compact: boolean;
  centered: boolean;
  fontFamily: string;
}

export const LOOP_SECONDS = 14;
export const STILL_TIME = 6.4;

export interface Renderer {
  resize(width: number, height: number, dpr: number): void;
  draw(t: number): void;
  cells(): { cols: number; rows: number };
}

export function createRenderer(canvas: HTMLCanvasElement, options: SceneOptions): Renderer | null {
  const ctx = canvas.getContext("2d");
  const off = document.createElement("canvas");
  const mask = document.createElement("canvas");
  const faceCanvas = document.createElement("canvas");
  const octx = off.getContext("2d", { willReadFrequently: true });
  const mctx = mask.getContext("2d", { willReadFrequently: true });
  const fctx = faceCanvas.getContext("2d", { willReadFrequently: true });
  if (!ctx || !octx || !mctx || !fctx) return null;

  const fontSize = options.compact ? 11 : 13;
  ctx.font = `${fontSize}px ${options.fontFamily}`;
  const cw = Math.max(5, ctx.measureText("M").width);
  const ch = Math.round(fontSize * 1.18);
  const pods = options.compact ? 3 : 5;
  const SPACING = 30;
  const half = (pods * SPACING) / 2 + 4;
  const BY = 38; // half depth of the shared base

  let W = 0;
  let H = 0;
  let cols = 0;
  let rows = 0;
  let u = 1;
  let cx = 0;
  let cy = 0;
  let styles: string[] = [];
  let sceneL = 0;
  let sceneR = 0;

  const buildStyles = () => {
    styles = [];
    const bases: Rgb[] = [BLUE, CYAN, AMBER, [225, 240, 255]];
    for (const base of bases) for (let level = 0; level < 8; level++) styles.push(rgb(base, 0.28 + (level / 7) * 0.72));
  };
  buildStyles();

  // Front-on oblique view: x runs across, z up, and depth (y) recedes up and to the right.
  const px = (x: number, y: number, z: number): [number, number] => [cx + (x + y * 0.5) * u, cy - (z + y * 0.3) * u];

  function poly(c: CanvasRenderingContext2D, pts: Array<[number, number, number]>, fill: string | null, stroke?: string, lw = 1) {
    c.beginPath();
    pts.forEach((p, i) => {
      const [sx, sy] = px(p[0], p[1], p[2]);
      if (i) c.lineTo(sx, sy);
      else c.moveTo(sx, sy);
    });
    c.closePath();
    if (fill) {
      c.fillStyle = fill;
      c.fill();
    }
    if (stroke) {
      c.strokeStyle = stroke;
      c.lineWidth = lw;
      c.lineJoin = "round";
      c.stroke();
    }
  }

  function box(x0: number, y0: number, z0: number, x1: number, y1: number, z1: number, color: Rgb, edge: Rgb, edgeK = 0.9, shade = 1) {
    const e = rgb(edge, edgeK);
    const lw = cw * (shade > 2 ? 0.75 : 0.5);
    const left: Array<[number, number, number]> = [[x0, y0, z0], [x1, y0, z0], [x1, y0, z1], [x0, y0, z1]];
    const right: Array<[number, number, number]> = [[x1, y0, z0], [x1, y1, z0], [x1, y1, z1], [x1, y0, z1]];
    const top: Array<[number, number, number]> = [[x0, y0, z1], [x1, y0, z1], [x1, y1, z1], [x0, y1, z1]];
    for (const face of [left, right, top]) poly(mctx!, face, "#000");
    poly(octx!, left, rgb(color, 0.17 * shade), e, lw);
    poly(fctx!, left, "rgb(0,0,255)");
    poly(octx!, right, rgb(color, 0.26 * shade), e, lw);
    poly(fctx!, right, "rgb(0,255,0)");
    poly(octx!, top, rgb(color, 0.4 * shade), e, lw);
    poly(fctx!, top, "rgb(255,0,0)");
  }

  function resize(width: number, height: number, dpr: number) {
    W = Math.max(1, Math.floor(width));
    H = Math.max(1, Math.floor(height));
    canvas.width = Math.floor(W * dpr);
    canvas.height = Math.floor(H * dpr);
    canvas.style.width = `${W}px`;
    canvas.style.height = `${H}px`;
    ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx!.font = `${fontSize}px ${options.fontFamily}`;
    ctx!.textBaseline = "top";
    cols = Math.max(8, Math.floor(W / cw));
    rows = Math.max(8, Math.floor(H / ch));
    off.width = mask.width = faceCanvas.width = cols;
    off.height = mask.height = faceCanvas.height = rows;
    const probe: Array<[number, number, number]> = [
      [-half, -BY, 0], [half, -BY, 0], [half, BY, 0], [-half, BY, 0], [-half, -BY, 66], [half, -BY, 66], [half, BY, 66], [-half, BY, 66],
    ];
    cx = 0;
    cy = 0;
    u = 1;
    const pts = probe.map(([x, y, z]) => px(x, y, z));
    const minX = Math.min(...pts.map((p) => p[0]));
    const maxX = Math.max(...pts.map((p) => p[0]));
    const minY = Math.min(...pts.map((p) => p[1]));
    const maxY = Math.max(...pts.map((p) => p[1]));
    u = Math.min((W * (options.compact ? 0.94 : options.centered ? 0.66 : 0.53)) / (maxX - minX), (H * (options.compact ? 0.86 : 0.8)) / (maxY - minY));
    const targetX = W * (options.centered ? 0.5 : 0.72);
    const targetY = H * (options.centered ? 0.52 : 0.52);
    cx = targetX - ((minX + maxX) / 2) * u;
    sceneL = Math.floor((cx + minX * u) / cw);
    sceneR = Math.ceil((cx + maxX * u) / cw);
    cy = targetY - ((minY + maxY) / 2) * u;
  }

  function scene(t: number) {
    const o = octx!;
    const m = mctx!;
    for (const c of [o, m, fctx!]) {
      c.setTransform(1, 0, 0, 1, 0, 0);
      c.clearRect(0, 0, cols, rows);
      c.fillStyle = "#000";
      c.fillRect(0, 0, cols, rows);
      c.setTransform(cols / W, 0, 0, rows / H, 0, 0);
    }

    // floor registration dots
    o.fillStyle = rgb(BLUE, 0.22);
    for (let gx = -half - 40; gx <= half + 40; gx += 16) {
      for (let gy = -64; gy <= 64; gy += 16) {
        const [sx, sy] = px(gx, gy, 0);
        o.fillRect(sx - cw * 0.3, sy - ch * 0.3, cw * 0.6, ch * 0.6);
      }
    }

    // shared base: three read-only strata of one chassis
    const strata: Array<[number, number, number]> = [[0, 5, 0.92], [5, 10, 1.05], [10, 14, 0.82]];
    for (const [z0, z1, shade] of strata) box(-half, -BY, z0, half, BY, z1, BLUE, BLUE, 0.75, shade);
    o.fillStyle = "#000";
    for (let x = -half + 8; x < half - 8; x += 7) poly(o, [[x, -BY, 2], [x + 2.4, -BY, 2], [x + 2.4, -BY, 12], [x, -BY, 12]], "#000");
    // the running OS, as code on the top face of the chassis
    const topFace: Array<[number, number, number]> = [[-half + 4, -BY + 4, 14], [half - 4, -BY + 4, 14], [half - 4, BY - 4, 14], [-half + 4, BY - 4, 14]];
    poly(o, topFace, rgb(BLUE, 0.34));
    poly(m, topFace, "#fff");

    // shared bus along the top of the chassis
    const busY = 0;
    poly(o, [[-half + 6, busY, 14], [half - 6, busY, 14], [half - 6, busY + 2, 14], [-half + 6, busY + 2, 14]], rgb(CYAN, 0.9), rgb(CYAN, 0.9), cw * 0.3);

    const FLOAT = 40; // underside of a pod
    for (let i = 0; i < pods; i++) {
      const x = (i - (pods - 1) / 2) * SPACING;
      const amberLean = i % 2 === 0 ? 0.62 : 0.2;
      const x0 = x - 8;
      const x1 = x + 8;
      const y0 = busY - 8;
      const y1 = busY + 8;
      // pillar: the shared read path from the chassis into this rollout
      box(x - 1.4, busY - 0.4, 14, x + 1.4, busY + 2.4, FLOAT, CYAN, CYAN, 1, 3);
      const top = FLOAT + 22;
      box(x0, y0, FLOAT, x1, y1, top, BLUE, CYAN, 1, 3.2);
      // private signature on the front face: a tab strip and file bars that differ per rollout
      const tabs = 2 + (i % 3);
      for (let k = 0; k < tabs; k++) {
        const tw = 13 / tabs;
        const tx = x0 + 1.5 + k * tw;
        poly(o, [[tx, y0, top - 4], [tx + tw - 1.2, y0, top - 4], [tx + tw - 1.2, y0, top - 1.6], [tx, y0, top - 1.6]], rgb(mix(CYAN, AMBER, k === 0 ? 0.85 : 0.1), 0.95));
      }
      // private state grid on the front face. A read arrives, then the cells settle.
      const phase = t / 7 + i * 0.19;
      const epoch = Math.floor(phase);
      const age = phase - epoch;
      for (let gx = 0; gx < 3; gx++) {
        for (let gy = 0; gy < 3; gy++) {
          const before = hash(i * 31 + gx, gy, epoch - 1);
          const after = hash(i * 31 + gx, gy, epoch);
          const v = before + (after - before) * smoothstep(age * 5);
          const colour = v > 1 - amberLean * 0.6 ? AMBER : CYAN;
          const wx = x0 + 1.5 + gx * 5.2;
          const wz = FLOAT + 2 + gy * 5.2;
          poly(o, [[wx, y0, wz], [wx + 4, y0, wz], [wx + 4, y0, wz + 4], [wx, y0, wz + 4]], rgb(colour, 0.35 + 0.65 * Math.min(1, v * 1.4)));
        }
      }
    }

    // packets: a read travels along the shared bus, up its pillar and into the rollout
    for (let i = 0; i < pods; i++) {
      const x = (i - (pods - 1) / 2) * SPACING;
      const p = (t / 7 + i * 0.19) % 1;
      if (p > 0.8) continue;
      let wx: number;
      let wz = 14.6;
      if (p < 0.5) wx = -half + 6 + (x + half - 6) * smoothstep(p / 0.5);
      else {
        wx = x;
        wz = 14.6 + (FLOAT - 14.6) * smoothstep((p - 0.5) / 0.3);
      }
      const [sx, sy] = px(wx, busY + 1, wz);
      o.fillStyle = "#e8f6ff";
      o.beginPath();
      o.ellipse(sx, sy, cw * 0.9, ch * 0.7, 0, 0, Math.PI * 2);
      o.fill();
    }
  }

  function draw(t: number) {
    scene(t);
    const img = octx!.getImageData(0, 0, cols, rows).data;
    const msk = mctx!.getImageData(0, 0, cols, rows).data;
    const fc = fctx!.getImageData(0, 0, cols, rows).data;
    ctx!.clearRect(0, 0, W, H);
    ctx!.font = `${fontSize}px ${options.fontFamily}`;
    ctx!.textBaseline = "top";
    const scroll = Math.floor(t * 5);
    let last = -1;
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const i = (r * cols + c) * 4;
        const R = img[i];
        const G = img[i + 1];
        const B = img[i + 2];
        const top = Math.max(R, G, B);
        let glyph: string | null = null;
        let style = 0;
        if (top > 20) {
          const lum = top / 255;
          const isCode = msk[i] > 128;
          const face = fc[i] > fc[i + 1] && fc[i] > fc[i + 2] ? TOP : fc[i + 1] > fc[i + 2] ? RIGHT : fc[i + 2] > 40 ? LEFT : RAMP;
          const idx = Math.min(face.length - 1, Math.floor(Math.pow(lum, 0.8) * face.length));
          glyph = isCode ? CODE[(c + r * 5 + scroll + (c % 3) * r) % CODE.length] : face[idx];
          if (glyph === " " || glyph === undefined) glyph = isCode ? "·" : null;
          const hue = R > B * 0.85 && R > 120 ? 2 : Math.min(R, G, B) > top * 0.8 ? 3 : G > B * 0.82 ? 1 : 0;
          style = hue * 8 + Math.min(7, Math.floor(lum * 8));
        } else if (hash(c, 0, 5) < 0.09 && (c > cols * 0.45 || options.centered) && (c < sceneL - 2 || c > sceneR + 2)) {
          // quiet code rain: short streams with a bright head and a fading tail
          const period = 46;
          const len = 9;
          const pos = (r + Math.floor(t * 2.2) + Math.floor(hash(c, 1, 5) * period)) % period;
          if (pos < len) {
            glyph = CODE[(r * 7 + c * 3 + Math.floor(t * 2.2)) % CODE.length];
            style = pos === 0 ? 8 + 5 : Math.max(0, 5 - Math.floor(pos * 0.55));
          }
        }
        if (glyph) {
          if (style !== last) {
            ctx!.fillStyle = styles[style];
            last = style;
          }
          ctx!.fillText(glyph, c * cw, r * ch);
        }
      }
    }
  }

  return { resize, draw, cells: () => ({ cols, rows }) };
}

/** Static text version used when no canvas context exists (kept under 44 columns for phones). */
export const STATIC_ASCII = String.raw`
  .----. .----. .----. .----. .----.
  | A  | | B  | | C  | | D  | | E  |
  '-||-' '-||-' '-||-' '-||-' '-||-'
  ===================================
  : const run = fork(os.base);      :
  : fs.overlay(run).write(p, b);    :
  ===================================
   shared base: one copy, read-only
`;
