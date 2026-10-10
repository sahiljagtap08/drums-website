import type { ReactNode } from "react";

export function Button({ href, children, variant = "sky", external = false, className = "" }: { href: string; children: ReactNode; variant?: "sky" | "ghost" | "paper" | "yellow"; external?: boolean; className?: string }) {
  const v = variant === "sky" ? "" : variant;
  return (
    <a href={href} className={`md-btn ${v} ${className}`} {...(external ? { target: "_blank", rel: "noopener" } : {})}>
      <span className="face">{children}</span>
    </a>
  );
}

export function Arrow({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" className={className} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M2 8h11M9 3.5 13.5 8 9 12.5" />
    </svg>
  );
}

export function TextLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a href={href} className="md-link">
      <span>{children}</span>
      <Arrow />
    </a>
  );
}

export function Cloud({ className = "", flip = false }: { className?: string; flip?: boolean }) {
  return (
    <svg viewBox="0 0 220 90" className={className} style={flip ? { transform: "scaleX(-1)" } : undefined} aria-hidden="true">
      <path d="M30 80c-14 0-24-9-24-21 0-11 8-19 19-20 3-17 17-29 35-29 14 0 26 8 32 19 5-4 12-6 19-6 16 0 29 11 31 26 3-1 6-2 9-2 13 0 23 9 23 20 0 7-4 13-10 17H30z" fill="#fff" stroke="#383838" strokeWidth="2" strokeLinejoin="round" />
    </svg>
  );
}
