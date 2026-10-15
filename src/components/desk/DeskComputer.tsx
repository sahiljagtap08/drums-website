"use client";

import { useEffect, useRef } from "react";
import { LOGO_H, LOGO_PATHS, LOGO_W } from "../Mark";
import { HEIGHT, INITIAL_TEXT, ISO_CSS, WIDTH, buildDesk } from "./geometry.mjs";
import { mountDesk } from "./live";

const DESK = buildDesk({ a: LOGO_PATHS.a, b: LOGO_PATHS.b, w: LOGO_W, h: LOGO_H });
const pct = (value: number, total: number) => `${((value / total) * 100).toFixed(2)}%`;

const CSS = `
.iso.desk[data-theme="light"]{--anatomy-page:#fff;--anatomy-card:#fff;--anatomy-paper:#fff;--anatomy-halo:#9a9a94;--anatomy-halo-opacity:.28;background:transparent}
.pc-well{fill:var(--anatomy-shade-1)}
.pc-bezel{fill:var(--anatomy-top)}
.pc-dark{fill:var(--anatomy-shade-0)}
.pc-glass{fill:var(--anatomy-shade-0);transition:fill .5s var(--anatomy-ease)}
.pc-glass[data-on]{fill:var(--anatomy-lit-shade)}
.pc-glow{fill:var(--anatomy-lit);opacity:.07;filter:blur(6px)}
.pc-scan{fill:none;stroke:var(--anatomy-faint);stroke-width:.5px;vector-effect:non-scaling-stroke;opacity:.7}
.pc-logo{fill:var(--anatomy-lit);fill-rule:evenodd}
.pc-text{fill:var(--anatomy-lit);font-family:var(--anatomy-mono);letter-spacing:.02em}
.pc-cursor{fill:var(--anatomy-lit);animation:pc-blink 1.06s steps(1,end) infinite}
.pc-beam{fill:none;stroke:var(--anatomy-lit);stroke-width:1.4px;vector-effect:non-scaling-stroke;stroke-linecap:round}
.pc-dot{fill:var(--anatomy-lit)}
.pc-cord{stroke-width:1.1px}
.pc-key,[data-rocker]{cursor:pointer}
.pc-key[data-down] .iso-edge{stroke:var(--anatomy-hi)}
[data-part="led"]{transition:opacity .4s var(--anatomy-ease)}
@keyframes pc-blink{50%{opacity:0}}
@media (prefers-reduced-motion:reduce){.pc-cursor{animation:none}.pc-glass{transition:none}}
.desk-stage{position:relative;touch-action:manipulation;border-radius:4px}
.desk-stage:focus-within{outline:2px solid #1d1d1b;outline-offset:8px}
.desk-stage .iso-svg{width:100%;height:auto}
.desk-input{position:absolute;opacity:0;pointer-events:none;font-size:16px;border:0;padding:0;margin:0;background:transparent;color:transparent;caret-color:transparent}
.desk-sr{position:absolute;width:1px;height:1px;overflow:hidden;clip-path:inset(50%);white-space:nowrap}
`;

export function DeskComputer() {
  const root = useRef<HTMLDivElement>(null);
  const input = useRef<HTMLInputElement>(null);
  const status = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!root.current || !input.current || !status.current) return;
    return mountDesk({ root: root.current, input: input.current, status: status.current, keys: DESK.keys, initial: INITIAL_TEXT });
  }, []);

  const s = DESK.screen;
  return (
    <div className="iso desk" data-theme="light">
      <style>{ISO_CSS + CSS}</style>
      <div className="desk-stage" ref={root}>
        <div dangerouslySetInnerHTML={{ __html: DESK.svg }} />
        <input
          ref={input}
          id="desk-input"
          className="desk-input"
          type="text"
          inputMode="text"
          enterKeyHint="enter"
          autoComplete="off"
          autoCapitalize="off"
          autoCorrect="off"
          spellCheck={false}
          aria-label="Type on the computer. Press Escape to switch the screen off or on."
          maxLength={20}
          defaultValue=""
          style={{ left: pct(s.left, WIDTH), top: pct(s.top, HEIGHT), width: pct(s.width, WIDTH), height: pct(s.height, HEIGHT) }}
        />
        <span className="desk-sr" role="status" aria-live="polite" ref={status} />
      </div>
    </div>
  );
}
