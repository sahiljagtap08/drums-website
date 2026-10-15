"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ISO_CSS, translateAlong } from "../anatomy/iso-kit";
import { CART_NAMES, CART_X, MODULES, P, TRAVEL, bayStyles, buildBay } from "./bay";

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
const smooth = (t: number) => t * t * (3 - 2 * t);

/** Vertical travel of every moving group for a spread amount 0..1. */
function poseOf(spread: number) {
  const out: Record<string, number> = {};
  for (let i = 0; i < 3; i++) out[`stratum-${i}`] = TRAVEL.strata * i * spread;
  CART_X.forEach((_, i) => {
    const e = smooth(clamp01((spread - 0.07 * i) / (1 - 0.07 * (CART_X.length - 1))));
    for (let m = 0; m < 4; m++) out[`cart-${i}-${m}`] = TRAVEL.lift * e + TRAVEL.module * m * e;
  });
  return out;
}

export function BayFigure() {
  const bay = useMemo(() => buildBay(), []);
  const [percent, setPercent] = useState(0);
  const [focus, setFocus] = useState(-1);
  const svgHost = useRef<HTMLDivElement>(null);
  const nodes = useRef<Map<string, SVGGElement>>(new Map());
  const current = useRef(0);
  const target = useRef(0);
  const frame = useRef(0);
  const last = useRef(0);

  const paint = useCallback((spread: number) => {
    const pose = poseOf(spread);
    nodes.current.forEach((node, id) => node.setAttribute("transform", translateAlong(P, [0, 0, pose[id] ?? 0])));
  }, []);

  useEffect(() => {
    const host = svgHost.current;
    if (!host) return;
    host.querySelectorAll<SVGGElement>("[data-part]").forEach((node) => {
      const id = node.getAttribute("data-part");
      if (id && (id.startsWith("cart-") || id.startsWith("stratum-"))) nodes.current.set(id, node);
    });
    paint(current.current);
  }, [paint]);

  const tick = useRef<(now: number) => void>(() => {});
  useEffect(() => {
    tick.current = (now: number) => {
      const dt = last.current ? Math.min((now - last.current) / 1000, 1 / 30) : 1 / 60;
      last.current = now;
      const calm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const gap = target.current - current.current;
      current.current = calm || Math.abs(gap) < 0.0005 ? target.current : current.current + gap * (1 - Math.exp(-dt / 0.2));
      paint(current.current);
      frame.current = current.current === target.current ? 0 : requestAnimationFrame((n) => tick.current(n));
    };
  }, [paint]);

  const setSpread = useCallback((next: number) => {
    const value = Math.round(Math.min(100, Math.max(0, next)));
    setPercent(value);
    target.current = value / 100;
    if (!frame.current) {
      last.current = 0;
      frame.current = requestAnimationFrame((n) => tick.current(n));
    }
  }, []);

  useEffect(() => () => cancelAnimationFrame(frame.current), []);

  const onKey = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if ((event.target as HTMLElement).tagName === "INPUT") return;
    const step = event.shiftKey ? 25 : 10;
    let handled = true;
    if (event.key === "ArrowUp" || event.key === "ArrowRight") setSpread(percent + step);
    else if (event.key === "ArrowDown" || event.key === "ArrowLeft") setSpread(percent - step);
    else if (event.key === "Home") setSpread(0);
    else if (event.key === "End") setSpread(100);
    else if (event.key === "]") setFocus((f) => (f + 1) % CART_X.length);
    else if (event.key === "[") setFocus((f) => (f <= 0 ? CART_X.length - 1 : f - 1));
    else if (event.key === "Escape") setFocus(-1);
    else if (event.key === " " || event.key === "Enter") {
      if ((event.target as HTMLElement).tagName === "BUTTON") return;
      setSpread(percent > 50 ? 0 : 100);
    } else handled = false;
    if (handled) event.preventDefault();
  };

  const state = percent === 0 ? "assembled" : percent === 100 ? "fully spread" : `spread ${percent}%`;
  const readout = focus >= 0 ? `${CART_NAMES[focus]} · ${state}` : state;

  return (
    <div className="iso pv-bay" data-theme="light">
      <style>{ISO_CSS + bayStyles}</style>
      <div className="pv-bay-card">
        <div className="pv-bay-corners" aria-hidden="true">
          <span>Fig 02</span>
          <span>Cartridge bay</span>
        </div>
        <div
          className="bay-stage"
          data-focus={focus >= 0 ? focus : undefined}
          tabIndex={0}
          role="group"
          aria-label="Cartridge bay figure. Arrow keys change the spread, Home and End assemble or fully spread, left and right square brackets pick a rollout cartridge, Escape clears the pick."
          onKeyDown={onKey}
        >
          <div ref={svgHost} dangerouslySetInnerHTML={{ __html: bay.svg }} />
        </div>
        <p className="pv-bay-readout" role="status" aria-live="polite">
          {readout}
        </p>
      </div>

      <div className="pv-bay-controls">
        <label className="pv-slider">
          <span>Spread</span>
          <input
            type="range"
            min={0}
            max={100}
            step={1}
            value={percent}
            onChange={(e) => setSpread(Number(e.target.value))}
            aria-valuetext={state}
          />
          <output>{percent}%</output>
        </label>
        <div className="pv-btns">
          <button type="button" onClick={() => setSpread(0)} disabled={percent === 0}>
            Assemble
          </button>
          <button type="button" onClick={() => setSpread(100)} disabled={percent === 100}>
            Spread
          </button>
        </div>
      </div>

      <div className="pv-pick" role="group" aria-label="Highlight one rollout cartridge">
        {CART_NAMES.map((name, i) => (
          <button key={name} type="button" aria-pressed={focus === i} onClick={() => setFocus(focus === i ? -1 : i)}>
            {name}
          </button>
        ))}
      </div>

      <dl className="pv-ledger">
        <div>
          <dt>
            <i className="sw sw-blue" aria-hidden="true" />
            Shared runtime
          </dt>
          <dd>Read-only OS image, system frameworks and applications, plus the bus and sockets every rollout plugs into. One copy.</dd>
        </div>
        <div>
          <dt>
            <i className="sw sw-amber" aria-hidden="true" />
            {focus >= 0 ? `${CART_NAMES[focus]}: private` : "Per-rollout cartridge"}
          </dt>
          <dd>{MODULES.join(", ")}. Each rollout gets its own; nothing here is shared with its neighbours.</dd>
        </div>
      </dl>
    </div>
  );
}
