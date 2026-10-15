"use client";

import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import { LOOP_SECONDS, STATIC_ASCII, STILL_TIME, createRenderer, type Renderer } from "./ascii-scene";

/** Animated ASCII / pixel runtime apparatus. Decorative: the headline and caption carry the meaning. */
const QUERY = "(prefers-reduced-motion: reduce)";
const subscribe = (cb: () => void) => {
  const m = window.matchMedia(QUERY);
  m.addEventListener("change", cb);
  return () => m.removeEventListener("change", cb);
};

export function AsciiApparatus() {
  const wrap = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const renderer = useRef<Renderer | null>(null);
  const clock = useRef(STILL_TIME);
  const raf = useRef(0);
  const visible = useRef(true);
  const reduced = useSyncExternalStore(subscribe, () => window.matchMedia(QUERY).matches, () => false);
  const [choice, setChoice] = useState<boolean | null>(null);
  const playing = choice ?? !reduced;
  const [fallback, setFallback] = useState(false);
  const playingRef = useRef(true);

  const drawOnce = useCallback(() => renderer.current?.draw(clock.current % LOOP_SECONDS), []);

  const loop = useCallback(() => {
    cancelAnimationFrame(raf.current);
    let last = 0;
    const step = (now: number) => {
      if (!playingRef.current) return;
      if (visible.current && now - last > 1000 / 24) {
        const dt = last ? Math.min((now - last) / 1000, 0.1) : 0;
        last = now;
        clock.current += dt;
        drawOnce();
      }
      raf.current = requestAnimationFrame(step);
    };
    raf.current = requestAnimationFrame(step);
  }, [drawOnce]);

  useEffect(() => {
    const host = wrap.current;
    const el = canvas.current;
    if (!host || !el) return;
    let disposed = false;

    const build = () => {
      const family = getComputedStyle(document.documentElement).getPropertyValue("--font-mono").trim() || "ui-monospace, monospace";
      const rect = host.getBoundingClientRect();
      renderer.current = createRenderer(el, { compact: rect.width < 640, centered: window.innerWidth <= 1100, fontFamily: `${family}, ui-monospace, monospace` });
      if (!renderer.current) {
        setFallback(true);
        return;
      }
      renderer.current.resize(rect.width, rect.height, Math.min(window.devicePixelRatio || 1, 2));
      drawOnce();
    };

    const start = () => {
      if (disposed) return;
      build();
      if (playingRef.current) loop();
    };
    if (document.fonts?.ready) document.fonts.ready.then(start);
    else start();

    let width = 0;
    const resizer = new ResizeObserver(([entry]) => {
      const w = Math.round(entry.contentRect.width);
      if (w === width) return;
      width = w;
      if (renderer.current) build();
    });
    resizer.observe(host);
    const io = new IntersectionObserver(([entry]) => {
      visible.current = entry.isIntersecting;
    });
    io.observe(host);

    return () => {
      disposed = true;
      cancelAnimationFrame(raf.current);
      resizer.disconnect();
      io.disconnect();
    };
  }, [drawOnce, loop]);

  useEffect(() => {
    playingRef.current = playing;
    if (playing) loop();
    else {
      cancelAnimationFrame(raf.current);
      drawOnce();
    }
  }, [playing, loop, drawOnce]);

  return (
    <div className="pv-ascii">
      <div ref={wrap} className="pv-ascii-stage">
        {fallback ? (
          <pre className="pv-ascii-fallback" aria-hidden="true">
            {STATIC_ASCII}
          </pre>
        ) : (
          <canvas ref={canvas} aria-hidden="true" />
        )}
      </div>
      {!fallback && (
      <div className="pv-ascii-bar">
        <button type="button" onClick={() => setChoice(!playing)} aria-pressed={!playing}>
          {playing ? "Pause motion" : "Play motion"}
        </button>
        {reduced && <span>Reduced motion is on, so this starts still.</span>}
      </div>
      )}
    </div>
  );
}
