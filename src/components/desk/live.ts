// Live behaviour for the desk computer: typing, key travel, CRT power on/off, and an idle tour.
// Adapted from the live script of examples/desk-computer in https://github.com/wheresryan22/anatomy
// (MIT, Copyright (c) 2026 Ryan; see ./LICENSE). Text entry goes through a real <input>, so phone
// keyboards, IMEs and physical keyboards all use one path.
import { axisVector, P, CRT_MID_Z, TEXT_X } from "./geometry.mjs";

const MAX_CHARS = 20;
const PHRASES = ["many attempts", "one running os", "own files, own tabs"];
const SHIFTED: Record<string, string> = {
  "~": "`", "!": "1", "@": "2", "#": "3", $: "4", "%": "5", "^": "6", "&": "7", "*": "8", "(": "9", ")": "0", _: "-", "+": "=",
  "{": "[", "}": "]", "|": "\\", ":": ";", '"': "'", "<": ",", ">": ".", "?": "/",
};

interface Mount {
  root: HTMLElement;
  input: HTMLInputElement;
  status: HTMLElement;
  keys: string[];
  initial: string;
}

export function mountDesk({ root, input, status, keys, initial }: Mount) {
  const svg = root.querySelector("svg") as SVGSVGElement;
  const keyEls = keys.map((_, i) => svg.querySelector(`[data-key="${i}"]`) as SVGGElement);
  const textEl = svg.querySelector('[data-part="text"]') as SVGTextElement;
  const cursor = svg.querySelector('[data-part="cursor"]') as SVGRectElement;
  const crt = svg.querySelector('[data-part="crt"]') as SVGGElement;
  const beam = svg.querySelector('[data-part="beam"]') as SVGPathElement;
  const dot = svg.querySelector('[data-part="dot"]') as SVGCircleElement;
  const glass = svg.querySelector(".pc-glass") as SVGPathElement;
  const led = svg.querySelector('[data-part="led"]') as SVGGElement;
  const rockerOn = svg.querySelector('[data-rocker="on"]') as SVGGElement;
  const rockerOff = svg.querySelector('[data-rocker="off"]') as SVGGElement;
  const still = window.matchMedia("(prefers-reduced-motion: reduce)");
  const DOWN = 2.2;
  const down = axisVector(P, [0, 0, -1]);

  const keyState = keys.map(() => ({ at: 0, held: 0 }));
  const active = new Set<number>();
  let line = still.matches ? initial : "";
  let power = 1;
  let powerClock = 9;
  let frame = 0;
  let previous = 0;
  let visible = true;
  let touring = !still.matches;
  let tour = { phrase: 0, step: "type", index: 0, wait: 1.2 };
  let disposed = false;

  const indexOf = (code: string) => keys.indexOf(code);

  function press(code: string, hold = 0.09) {
    const i = indexOf(code);
    if (i < 0) return;
    keyState[i].held = hold;
    active.add(i);
    run();
  }
  function write() {
    textEl.textContent = "> " + line;
    cursor.setAttribute("x", String(TEXT_X + textEl.getComputedTextLength() + 0.4));
    if (!touring && input.value !== line) input.value = line;
  }
  function type(char: string) {
    if (!power) return;
    const lower = char.toLowerCase();
    const code = SHIFTED[char] || lower;
    if (indexOf(code) < 0) return;
    if (SHIFTED[char] || char !== lower) press("Shift", 0.14);
    press(code);
    if (line.length < MAX_CHARS) line += char;
    write();
  }
  function erase() {
    if (!power) return;
    press("Backspace");
    line = line.slice(0, -1);
    write();
  }
  function enter() {
    if (!power) return;
    press("Enter");
    line = "";
    write();
  }
  function setPower(next: number) {
    if (next === power) return;
    power = next;
    powerClock = still.matches ? 9 : 0;
    rockerOn.style.display = power ? "" : "none";
    rockerOff.style.display = power ? "none" : "";
    led.style.opacity = power ? "" : "0.15";
    status.textContent = power ? "Computer on." : "Computer off.";
    write();
    run();
  }
  const ease = (t: number) => 1 - Math.pow(1 - Math.min(1, Math.max(0, t)), 3);
  function crtFrame() {
    const t = powerClock;
    let sx = 1;
    let sy = 1;
    let beamAt = 0;
    let dotAt = 0;
    let lit = power;
    if (power) {
      if (t < 0.14) { sx = ease(t / 0.14); sy = 0.012; beamAt = 1; }
      else if (t < 0.36) { sy = 0.012 + 0.988 * ease((t - 0.14) / 0.22); beamAt = 1 - ease((t - 0.14) / 0.22); }
    } else if (t < 0.1) { sy = 1 - 0.988 * ease(t / 0.1); beamAt = ease(t / 0.1); lit = 1; }
    else if (t < 0.26) { sy = 0.012; sx = 1 - ease((t - 0.1) / 0.16); beamAt = 1; lit = 1; }
    else { sx = 0; sy = 0; dotAt = Math.max(0, 1 - (t - 0.26) / 0.5); }
    crt.setAttribute("transform", `translate(0 ${-CRT_MID_Z}) scale(${sx.toFixed(3)} ${sy.toFixed(3)}) translate(0 ${CRT_MID_Z})`);
    beam.setAttribute("transform", `translate(0 ${-CRT_MID_Z}) scale(${Math.max(sx, 0.001).toFixed(3)} 1) translate(0 ${CRT_MID_Z})`);
    beam.style.opacity = beamAt.toFixed(2);
    dot.style.opacity = dotAt.toFixed(2);
    glass.toggleAttribute("data-on", !!lit);
    return t > 0.8;
  }
  function tourStep(dt: number) {
    tour.wait -= dt;
    if (tour.wait > 0) return;
    const phrase = PHRASES[tour.phrase];
    if (tour.step === "type") {
      if (tour.index < phrase.length) {
        type(phrase[tour.index++]);
        tour.wait = 0.09 + Math.random() * 0.11 + (phrase[tour.index - 1] === " " ? 0.08 : 0);
      } else { tour.step = "erase"; tour.wait = 2.2; }
    } else if (tour.step === "erase") {
      if (line.length) { erase(); tour.wait = 0.055; }
      else if (tour.phrase === PHRASES.length - 1) { touring = false; line = ""; setPower(1); line = initial; write(); }
      else { tour.phrase++; tour.index = 0; tour.step = "type"; tour.wait = 0.7; }
    }
  }
  function tick(now: number) {
    if (disposed) return;
    const dt = previous ? Math.min((now - previous) / 1000, 1 / 30) : 1 / 60;
    previous = now;
    const calm = still.matches;
    if (touring) tourStep(dt);
    powerClock += dt;
    const settled = crtFrame();
    for (const i of active) {
      const s = keyState[i];
      s.held = Math.max(0, s.held - dt);
      const want = s.held > 0 ? DOWN : 0;
      s.at = calm ? want : s.at + (want - s.at) * (1 - Math.exp(-dt / (want ? 0.025 : 0.07)));
      if (Math.abs(want - s.at) < 0.01) s.at = want;
      keyEls[i].setAttribute("transform", `translate(${(down[0] * s.at).toFixed(2)} ${(down[1] * s.at).toFixed(2)})`);
      keyEls[i].toggleAttribute("data-down", s.at > 0.6);
      if (!s.held && s.at === 0) active.delete(i);
    }
    frame = visible && (touring || active.size || !settled) ? requestAnimationFrame(tick) : 0;
  }
  function run() {
    if (!frame && visible && !disposed) { previous = 0; frame = requestAnimationFrame(tick); }
  }
  function takeOver() {
    if (touring) { touring = false; tour = { phrase: 0, step: "type", index: 0, wait: 1.2 }; line = ""; write(); }
  }

  const io = new IntersectionObserver((entries) => {
    visible = entries[entries.length - 1].isIntersecting;
    if (visible) run();
  }, { rootMargin: "120px 0px" });
  io.observe(root);

  // Every character path goes through `input`: physical keys, phone keyboards and IME alike.
  const onInput = () => {
    const next = input.value;
    takeOver();
    if (next.startsWith(line) && next.length > line.length) for (const ch of next.slice(line.length)) type(ch);
    else if (line.startsWith(next) && next.length < line.length) while (line.length > next.length && line.length) erase();
    else { line = ""; for (const ch of next) type(ch); }
    if (input.value !== line) input.value = line;
  };
  const onKey = (event: KeyboardEvent) => {
    if (event.metaKey || event.ctrlKey || event.altKey) return;
    if (event.key === "Escape") { event.preventDefault(); takeOver(); setPower(power ? 0 : 1); }
    else if (event.key === "Enter") { event.preventDefault(); takeOver(); enter(); }
    else if (event.key === "Shift") press(event.code === "ShiftRight" ? "ShiftRight" : "Shift", 0.14);
  };
  const onClick = (event: MouseEvent) => {
    const target = event.target as Element;
    const key = target.closest("[data-key]") as HTMLElement | null;
    if (key) {
      takeOver();
      const code = keys[Number(key.dataset.key)];
      if (code.length === 1) type(code);
      else if (code === "Backspace") erase();
      else if (code === "Enter" || code === "NumpadEnter") enter();
      else press(code);
    } else if (target.closest("[data-rocker]")) {
      takeOver();
      setPower(power ? 0 : 1);
    }
    input.focus({ preventScroll: true });
  };

  input.addEventListener("input", onInput);
  input.addEventListener("keydown", onKey);
  svg.addEventListener("click", onClick);
  write();
  crtFrame();
  if (touring) run();

  return () => {
    disposed = true;
    cancelAnimationFrame(frame);
    io.disconnect();
    input.removeEventListener("input", onInput);
    input.removeEventListener("keydown", onKey);
    svg.removeEventListener("click", onClick);
  };
}
